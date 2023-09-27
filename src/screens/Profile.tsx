import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { useAuth } from '@contexts/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { Center, Heading, Skeleton, Text, VStack, useToast } from 'native-base'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, TouchableOpacity } from 'react-native'
import { z } from 'zod'

const photoSize = 33

const formDataSchema = z
  .object({
    name: z.string().min(1, 'O nome não pode ser vazio'),
    email: z.string(),
    old_password: z
      .optional(z.string())
      .transform((value) => (value === '' ? null : value)),
    password: z
      .string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .or(z.literal('')),
    password_confirmation: z.string().or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    const { password, password_confirmation } = data

    if (password !== password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Senhas não conferem',
        path: ['password_confirmation'],
      })
    }

    return data
  })

type FormData = z.infer<typeof formDataSchema>

export function Profile() {
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/GabriPires.png',
  )

  const { user, updateUserProfile } = useAuth()
  const { show } = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      old_password: '',
      password: '',
      password_confirmation: '',
    },
  })

  async function handleUpdateProfile(data: FormData) {
    try {
      setIsUpdatingProfile(true)

      const userToUpdate = user

      await api.put('/users', data)
      userToUpdate.name = data.name

      await updateUserProfile(userToUpdate)

      show({
        title: 'Perfil atualizado com sucesso!',
        placement: 'top',
        bgColor: 'green.700',
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Erro ao atualizar perfil'

      show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  async function handleSelectUserPhoto() {
    setPhotoIsLoading(true)

    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        selectionLimit: 1,
      })

      if (selectedPhoto.canceled) return

      if (selectedPhoto.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          selectedPhoto.assets[0].uri,
        )

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          return show({
            title: 'A imagem deve ter no máximo 5MB',
            bgColor: 'red.500',
            placement: 'top',
          })
        }

        setUserPhoto(selectedPhoto.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={8}>
          {photoIsLoading ? (
            <Skeleton
              w={photoSize}
              h={photoSize}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
              alt="Foto do usuário"
              size={photoSize}
            />
          )}

          <TouchableOpacity onPress={handleSelectUserPhoto}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                bg="gray.600"
                value={value}
                errorMessage={errors.name?.message}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value } }) => (
              <Input
                placeholder="E-mail"
                bg="gray.600"
                isDisabled
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Heading
            fontFamily={'heading'}
            color="gray.200"
            fontSize="md"
            mt={12}
            mb={2}
            alignSelf="flex-start"
          >
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha antiga"
                secureTextEntry
                bg="gray.600"
                errorMessage={errors.old_password?.message}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Nova senha"
                secureTextEntry
                bg="gray.600"
                errorMessage={errors.password?.message}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="password_confirmation"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Confirme a nova senha"
                secureTextEntry
                bg="gray.600"
                errorMessage={errors.password_confirmation?.message}
                onChangeText={onChange}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={4}
            isDisabled={!isDirty}
            isLoading={isUpdatingProfile}
            onPress={handleSubmit(handleUpdateProfile)}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
