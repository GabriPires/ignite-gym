import { IInputProps, Input as NativeBaseInput } from 'native-base'

export function Input(props: IInputProps) {
  return (
    <NativeBaseInput
      bg={'gray.700'}
      h={14}
      px={4}
      borderWidth={1}
      borderColor={'transparent'}
      fontSize={'md'}
      color={'white'}
      fontFamily={'body'}
      placeholderTextColor={'gray.300'}
      _focus={{
        bg: 'gray.700',
        borderWidth: 1,
        borderColor: 'green.500',
      }}
      {...props}
    />
  )
}
