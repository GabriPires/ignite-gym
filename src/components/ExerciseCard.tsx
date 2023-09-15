import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { HStack, Heading, Icon, Image, Text, VStack } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface ExerciseCardProps extends TouchableOpacityProps {}

export function ExerciseCard({ ...props }: ExerciseCardProps) {
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
          resizeMode="center"
          source={{
            uri: 'http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg',
          }}
          w={16}
          h={16}
          rounded="md"
          mr={4}
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white">
            Remada unilateral
          </Heading>
          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  )
}
