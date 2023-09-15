import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Center, ScrollView, Skeleton, VStack } from 'native-base'
import { useState } from 'react'

const photoSize = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView>
        <Center mt={6}>
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
              source={{ uri: 'https://github.com/GabriPires.png' }}
              alt="Foto do usuário"
              size={photoSize}
            />
          )}
        </Center>
      </ScrollView>
    </VStack>
  )
}
