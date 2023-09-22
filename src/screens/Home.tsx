import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { FlatList, HStack, Heading, Text, VStack, useToast } from 'native-base'
import { useEffect, useState } from 'react'

export function Home() {
  const [groupSelected, setGroupSelected] = useState('costas')
  const [exercises] = useState([
    'Remada unilateral',
    'Remada curvada',
    'Remada cavalinho',
    'Remada na polia',
    'Remada na polia alta',
    'Remada na polia baixa',
    'Remada na polia com triângulo',
  ])
  const [groups, setGroups] = useState<string[]>([])

  const { show } = useToast()

  async function fetchGroups() {
    try {
      const { data } = await api.get('/groups')

      setGroups(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Erro ao buscar grupos'

      show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return (
    <VStack flex={1}>
      <HomeHeader />

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
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 20,
          }}
          renderItem={() => <ExerciseCard />}
        />
      </VStack>
    </VStack>
  )
}
