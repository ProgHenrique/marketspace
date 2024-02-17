import { globalCss } from "./stitches.config";



export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  focus: {
    outline: 0,
    boxShadow: '0 0 0 2px $gray500',
  },

  body: {
    backgroundColor: '$gray200',
    color: '$gray600',
    '-webkit-font-smoothing': 'antialiased',
  },

  'body, input, textarea, button': {
    fontFamily: 'Karla',
    fontWeight: 400,
    lineHeight: '$default'
  }
})