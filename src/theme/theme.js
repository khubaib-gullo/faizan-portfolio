import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#e6fffa',
      100: '#b2f5ea',
      200: '#81e6d9',
      300: '#4fd1c5',
      400: '#38b2ac',
      500: '#319795',
      600: '#2c7a7b',
      700: '#285e61',
      800: '#234e52',
      900: '#1d4044',
    },
    dark: {
      50: '#f7fafc',
      100: '#edf2f7',
      200: '#e2e8f0',
      300: '#cbd5e0',
      400: '#a0aec0',
      500: '#718096',
      600: '#4a5568',
      700: '#2d3748',
      800: '#1a202c',
      900: '#0d1117',
    },
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'dark.900',
        color: 'white',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'lg',
      },
      variants: {
        primary: {
          bg: 'brand.400',
          color: 'white',
          _hover: {
            bg: 'brand.500',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 40px -10px rgba(56, 178, 172, 0.5)',
          },
          transition: 'all 0.3s ease',
        },
        outline: {
          borderColor: 'brand.400',
          color: 'brand.400',
          _hover: {
            bg: 'brand.400',
            color: 'white',
          },
        },
        ghost: {
          color: 'gray.400',
          _hover: {
            bg: 'whiteAlpha.100',
            color: 'brand.400',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'dark.800',
          borderRadius: 'xl',
          border: '1px solid',
          borderColor: 'whiteAlpha.100',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          _hover: {
            transform: 'translateY(-5px)',
            boxShadow: '0 20px 40px -20px rgba(56, 178, 172, 0.3)',
            borderColor: 'brand.400',
          },
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: 'dark.800',
            borderColor: 'whiteAlpha.200',
            _hover: {
              bg: 'dark.700',
            },
            _focus: {
              bg: 'dark.700',
              borderColor: 'brand.400',
            },
          },
        },
      },
      defaultProps: {
        variant: 'filled',
      },
    },
    Textarea: {
      variants: {
        filled: {
          bg: 'dark.800',
          borderColor: 'whiteAlpha.200',
          _hover: {
            bg: 'dark.700',
          },
          _focus: {
            bg: 'dark.700',
            borderColor: 'brand.400',
          },
        },
      },
      defaultProps: {
        variant: 'filled',
      },
    },
  },
});

export default theme;
