import { HStack, Heading, Text, VStack } from 'native-base'
import { UserPhoto } from './UserPhoto'

export function HomeHeader() {
  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={{ uri: 'https://github.com/GabriPires.png' }}
        alt="Foto de perfil do usuário"
        size={16}
        mr={4}
      />
      <VStack>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md">
          Gabriel
        </Heading>
      </VStack>
    </HStack>
  )
}
