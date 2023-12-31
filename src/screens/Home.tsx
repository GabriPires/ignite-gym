import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { Loading } from '@components/Loading'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { useFocusEffect } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import {
  Box,
  FlatList,
  HStack,
  Heading,
  Text,
  VStack,
  useToast,
} from 'native-base'
import { useCallback, useEffect, useState } from 'react'

export function Home() {
  const [isLoadingExercises, setIsLoadingExercises] = useState(true)
  const [isLoadingGroups, setIsLoadingGroups] = useState(true)
  const [groupSelected, setGroupSelected] = useState('antebraço')
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])
  const [groups, setGroups] = useState<string[]>([])

  const { show } = useToast()

  async function fetchGroups() {
    try {
      setIsLoadingGroups(true)

      const { data } = await api.get('/groups')

      setGroups(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Erro ao carregar grupos'

      show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoadingGroups(false)
    }
  }

  async function fetchExercisesByGroup(group: string) {
    try {
      setIsLoadingExercises(true)

      const { data } = await api.get(`/exercises/bygroup/${group}`)

      setExercises(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Erro ao carregar exercícios'

      show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoadingExercises(false)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup(groupSelected)
    }, [groupSelected]),
  )

  return (
    <VStack flex={1}>
      <HomeHeader />

      {isLoadingGroups ? (
        <Box maxH={10} minH={10} my={10}>
          <Loading />
        </Box>
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          _contentContainerStyle={{
            px: 8,
          }}
          my={10}
          maxH={10}
          minH={10}
          renderItem={({ item }) => (
            <Group
              name={item}
              isActive={groupSelected === item}
              onPress={() => setGroupSelected(item)}
            />
          )}
        />
      )}

      {isLoadingExercises ? (
        <Loading />
      ) : (
        <VStack flex={1} px={8}>
          <HStack justifyContent="space-between" mb={5}>
            <Heading fontFamily={'heading'} color="gray.200" fontSize="md">
              Exercícios
            </Heading>

            <Text color="gray.200" fontSize="sm">
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
              paddingBottom: 20,
            }}
            renderItem={({ item }) => <ExerciseCard exercise={item} />}
          />
        </VStack>
      )}
    </VStack>
  )
}
