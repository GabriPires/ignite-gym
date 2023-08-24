import { Input } from '@components/Input'
import { Center, Heading, Image, Text, VStack } from 'native-base'

import backgroundImage from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'

interface SignInProps {}

export function SignIn(props: SignInProps) {
  return (
    <VStack flex={1} bg={'gray.700'} px={10}>
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

        <VStack flex={1} w={'100%'} space={4}>
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input placeholder="Senha" secureTextEntry />
        </VStack>
      </Center>
    </VStack>
  )
}
