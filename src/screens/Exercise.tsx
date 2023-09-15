import BodyIcon from '@assets/body.svg'
import RepetitionsIcon from '@assets/repetitions.svg'
import SeriesIcon from '@assets/series.svg'
import { Button } from '@components/Button'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { Box, HStack, Heading, Icon, Image, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
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
          <Heading color="gray.100" fontSize="lg" flexShrink={1}>
            Puxada frontal
          </Heading>

          <HStack alignItems="center">
            <BodyIcon />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <VStack p={8}>
        <Image
          w="full"
          h={80}
          source={{
            uri: 'http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg',
          }}
          resizeMode="cover"
          alt="Nome do exercício"
          rounded="lg"
          overflow="hidden"
          mb={3}
        />

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
                3 séries
              </Text>
            </HStack>

            <HStack>
              <RepetitionsIcon />
              <Text color="gray.200" ml={2}>
                12 repetições
              </Text>
            </HStack>
          </HStack>

          <Button title="Marcar como realizado" />
        </Box>
      </VStack>
    </VStack>
  )
}
