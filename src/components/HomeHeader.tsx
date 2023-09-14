import { Avatar, HStack, Heading, Text, VStack } from 'native-base'

export function HomeHeader() {
  return (
    <HStack space={4}>
      <Avatar />
      <VStack>
        <Text color="gray.100">Ola</Text>
        <Heading color="gray.100">Gabriel</Heading>
      </VStack>
    </HStack>
  )
}
