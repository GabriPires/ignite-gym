import backgroundImage from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useAuth } from '@contexts/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

type SignInFormProps = z.infer<typeof signInSchema>

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const { user, signIn } = useAuth()

  console.log(user)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormProps>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  async function handleSignIn(data: SignInFormProps) {
    await signIn(data.email, data.password)
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
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />
        </Center>

        <Center mt={24}>
          <Text color={'gray.100'} fontSize={'sm'} mb={3} fontFamily={'body'}>
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar conta"
            variant={'outline'}
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
