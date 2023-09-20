import { FormControl, IInputProps, Input as NativeBaseInput } from 'native-base'

type InputProps = IInputProps & {
  errorMessage?: string
}

export function Input({ errorMessage, ...props }: InputProps) {
  const isInvalid = !!errorMessage

  return (
    <FormControl isInvalid={isInvalid} mb={4}>
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
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        _focus={{
          bg: 'gray.700',
          borderWidth: 1,
          borderColor: 'green.500',
        }}
        {...props}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}
