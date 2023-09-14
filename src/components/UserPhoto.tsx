import { IImageProps, Image } from 'native-base'

type UserPhotoProps = {
  size: number
} & IImageProps

export function UserPhoto({ size, ...props }: UserPhotoProps) {
  return (
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...props}
    />
  )
}
