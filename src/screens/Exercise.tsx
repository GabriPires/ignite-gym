import BodyIcon from '@assets/body.svg'
import RepetitionsIcon from '@assets/repetitions.svg'
import SeriesIcon from '@assets/series.svg'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { Feather } from '@expo/vector-icons'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base'
import { useCallback, useState } from 'react'
import { TouchableOpacity } from 'react-native'

interface RouteParamsProps {
  exerciseId: string
}

export function Exercise() {
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
  const [isLoading, setIsLoading] = useState(true)
  const [submittingHistory, setSubmittingHistory] = useState(false)

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute()
  const { show } = useToast()

  const { exerciseId } = route.params as RouteParamsProps

  async function fetchExercise() {
    try {
      setIsLoading(true)

      const { data } = await api.get(`/exercises/${exerciseId}`)
      setExercise(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os detalhes do exercício'

      show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleRegisterExerciseHistory() {
    try {
      setSubmittingHistory(true)

      await api.post('/history', {
        exercise_id: exerciseId,
      })

      show({
        title: 'Exercício registrado em seu histórico',
        placement: 'top',
        bgColor: 'green.700',
      })

      navigation.navigate('history')
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível registrar o exercício'

      show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setSubmittingHistory(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchExercise()
    }, [exerciseId]),
  )

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading
            fontFamily={'heading'}
            color="gray.100"
            fontSize="lg"
            flexShrink={1}
          >
            {exercise.name}
          </Heading>

          <HStack alignItems="center">
            <BodyIcon />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Box rounded="lg" overflow="hidden" mb={3}>
            <Image
              w="full"
              h={80}
              source={{
                uri: `${api.defaults.baseURL}exercise/demo/${exercise.demo}`,
              }}
              resizeMode="cover"
              alt={exercise.name}
            />
          </Box>

          <Box bg="gray.600" pb={4} px={4}>
            <HStack
              alignItems={'center'}
              justifyContent={'space-around'}
              mb={6}
              mt={5}
            >
              <HStack>
                <SeriesIcon />
                <Text color="gray.200" ml={2}>
                  {exercise.series} séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsIcon />
                <Text color="gray.200" ml={2}>
                  {exercise.repetitions} repetições
                </Text>
              </HStack>
            </HStack>

            <Button
              title="Marcar como realizado"
              isLoading={submittingHistory}
              onPress={handleRegisterExerciseHistory}
            />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
