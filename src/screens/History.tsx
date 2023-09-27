import { HistoryCard } from '@components/HistoryCard'
import { Loading } from '@components/Loading'
import { ScreenHeader } from '@components/ScreenHeader'
import { HistoryGroupByDayDTO } from '@dtos/HistoryGroupByDayDTO'
import { useFocusEffect } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { Heading, SectionList, Text, VStack, useToast } from 'native-base'
import { useCallback, useState } from 'react'

export function History() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercises, setExercises] = useState<HistoryGroupByDayDTO[]>([])
  const { show } = useToast()

  async function fetchHistory() {
    try {
      setIsLoading(true)
      const { data } = await api.get('/history')
      setExercises(data)
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
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory()
    }, []),
  )

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          px={8}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Heading
              fontFamily={'heading'}
              color="gray.200"
              fontSize="md"
              mt={10}
              mb={3}
            >
              {title}
            </Heading>
          )}
          contentContainerStyle={
            exercises.length === 0 ? { flex: 1, justifyContent: 'center' } : {}
          }
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrados ainda.{'\n'}Vamos fazer exercícios
              hoje?
            </Text>
          }
        />
      )}
    </VStack>
  )
}
