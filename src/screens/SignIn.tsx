import { Input } from '@components/Input'
import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base'

import backgroundImage from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Button } from '@components/Button'

interface SignInProps {}

export function SignIn(props: SignInProps) {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={backgroundImage}
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
            color={'gray.100'}
            fontSize={'xl'}
            mb={6}
            fontFamily={'heading'}
          >
            Acesse sua conta
          </Heading>

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            mb={4}
          />

          <Input placeholder="Senha" secureTextEntry mb={4} />

          <Button title="Acessar" />
        </Center>

        <Center mt={24}>
          <Text color={'gray.100'} fontSize={'sm'} mb={3} fontFamily={'body'}>
            Ainda não tem acesso?
          </Text>
          <Button title="Criar conta" variant={'outline'} />
        </Center>
      </VStack>
    </ScrollView>
  )
}
