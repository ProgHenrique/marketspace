import { createStitches } from "@stitches/react";


export const { styled, getCssText, globalCss } = createStitches({
  theme: {
    colors: {
      blue: '#364D9D',
      blueLight: '#647AC7',
      redLight: '#EE7979',

      gray100: '#F7F7F8',
      gray200: '#EDECEE',
      gray300: '#D9D8DA',
      gray400: '#9F9BA1',
      gray500: '#5F5B62',
      gray600: '#3E3A40',
      gray900: '#1A181B',
    },

    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
    },

    lineHeights: {
      default: '130%',
    }
  }
})