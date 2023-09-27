import DefaultUserPhoto from '@assets/userPhotoDefault.png'
import { useAuth } from '@contexts/AuthContext'
import { MaterialIcons } from '@expo/vector-icons'
import { api } from '@services/api'
import { HStack, Heading, Icon, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { UserPhoto } from './UserPhoto'

export function HomeHeader() {
  const { user, signOut } = useAuth()

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}avatar/${user.avatar}` }
            : DefaultUserPhoto
        }
        alt="Foto de perfil do usuário"
        size={16}
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading fontFamily={'heading'} color="gray.100" fontSize="md">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  )
}
