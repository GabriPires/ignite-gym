import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { FlatList, VStack } from 'native-base'
import { useState } from 'react'

export function Home() {
  const [groupSelected, setGroupSelected] = useState('costas')
  const [groups, setGroups] = useState([
    'costas',
    'ombro',
    'peito',
    'biceps',
    'triceps',
    'perna',
  ])

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
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
      />
    </VStack>
  )
}
