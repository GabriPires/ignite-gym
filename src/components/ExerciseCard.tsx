import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { HStack, Heading, Icon, Image, Text, VStack } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type ExerciseCardProps = TouchableOpacityProps & {
  exercise: ExerciseDTO
}

export function ExerciseCard({ exercise, ...props }: ExerciseCardProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleNavigateToExerciseDetails() {
    navigation.navigate('exercise')
  }

  return (
    <TouchableOpacity onPress={handleNavigateToExerciseDetails} {...props}>
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >
        <Image
          alt="Imagem do exercício"
          resizeMode="cover"
          source={{
            uri: `${api.defaults.baseURL}exercise/thumb/${exercise.thumb}`,
          }}
          w={16}
          h={16}
          rounded="md"
          mr={4}
        />

        <VStack flex={1}>
          <Heading fontFamily={'heading'} fontSize="lg" color="white">
            {exercise.name}
          </Heading>
          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            {exercise.series} séries x {exercise.repetitions} repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  )
}
