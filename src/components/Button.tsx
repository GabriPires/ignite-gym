import { IButtonProps, Button as NativeBaseButton } from 'native-base'

interface ButtonProps extends IButtonProps {
  title: string
}

export function Button({ title, ...props }: ButtonProps) {
  return <NativeBaseButton {...props}>{title}</NativeBaseButton>
}
