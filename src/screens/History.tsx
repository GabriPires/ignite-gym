import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { Heading, SectionList, Text, VStack } from 'native-base'
import { useState } from 'react'

type Exercise = {
  title: string
  data: string[]
}

export function History() {
  const [exercises] = useState<Exercise[]>([
    {
      data: ['Puxada frontal', 'Remada curvada'],
      title: '26.08.2023',
    },
    {
      data: ['Puxada frontal', 'Remada curvada'],
      title: '27.08.2023',
    },
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        px={8}
        renderItem={() => <HistoryCard />}
        renderSectionHeader={({ section: { title } }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
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
    </VStack>
  )
}
