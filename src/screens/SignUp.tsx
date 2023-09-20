import backgroundImage from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { api } from '@services/api'
import axios from 'axios'
import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base'
import { Controller, useForm } from 'react-hook-form'
import { Alert } from 'react-native'
import { z } from 'zod'

const signUpSchema = z
  .object({
    name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    email: z.string().min(1, 'E-mail inválido').email('E-mail inválido'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Senhas não conferem',
        path: ['confirmPassword'],
      })
    }
  })

type SignUpSchemaType = z.infer<typeof signUpSchema>

export function SignUp() {
  const navigation = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function handleSignUp({ name, email, password }: SignUpSchemaType) {
    try {
      const response = await api.post('/users', {
        name,
        email,
        password,
      })

      const data = await response.data
      console.log(data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert('Erro', error.response?.data.message)
      }
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={backgroundImage}
          defaultSource={backgroundImage}
          alt="Imagem com pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />
          <Text color={'gray.100'} fontSize={'sm'}>
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading
            fontFamily={'heading'}
            color={'gray.100'}
            fontSize={'xl'}
            mb={6}
          >
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                value={value}
                errorMessage={errors.name?.message}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                errorMessage={errors.email?.message}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                value={value}
                errorMessage={errors.password?.message}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a senha"
                secureTextEntry
                value={value}
                errorMessage={errors.confirmPassword?.message}
                onChangeText={onChange}
              />
            )}
          />

          {errors.confirmPassword?.message && (
            <Text color="white" mb={2}>
              {errors.confirmPassword.message}
            </Text>
          )}

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Button
          title="Voltar para o login"
          variant={'outline'}
          mt={24}
          onPress={() => navigation.goBack()}
        />
      </VStack>
    </ScrollView>
  )
}
