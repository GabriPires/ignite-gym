import { Image, VStack } from 'native-base'

import backgroundImage from '@assets/background.png'

interface SignInProps {}

export function SignIn(props: SignInProps) {
  return (
    <VStack flex={1} bg={'gray.700'}>
      <Image
        source={backgroundImage}
        alt="Imagem com pessoas treinando"
        resizeMode="contain"
        position="absolute"
      />
    </VStack>
  )
}
