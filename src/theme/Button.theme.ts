export const ButtonTheme = {
  defaultProps: {
    h: 14,
    w: 'full',
    rounded: 'sm',
  },
  variants: {
    solid: {
      bg: 'green.700',
      _pressed: {
        bg: 'green.500',
      },
      _text: {
        fontSize: 'md',
        fontFamily: 'heading',
      },
    },
    outline: {
      borderColor: 'green.500',
      borderWidth: 1,
      bg: 'transparent',
      rounded: 'full',
      _pressed: {
        bg: 'gray.500',
      },
      _text: {
        color: 'green.500',
        fontSize: 'md',
        fontFamily: 'heading',
      },
    },
  },
}
