import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { Center, Heading, Skeleton, Text, VStack, useToast } from 'native-base'
import { useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'

const photoSize = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/GabriPires.png',
  )

  const { show } = useToast()

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

          <Input placeholder="Nome" bg="gray.600" mb={4} />
          <Input placeholder="E-mail" bg="gray.600" isDisabled />

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

          <Input
            placeholder="Senha antiga"
            secureTextEntry
            bg="gray.600"
            mb={4}
          />
          <Input
            placeholder="Nova senha"
            secureTextEntry
            bg="gray.600"
            mb={4}
          />
          <Input
            placeholder="Confirme a nova senha"
            secureTextEntry
            bg="gray.600"
            mb={4}
          />

          <Button title="Atualizar" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  )
}
