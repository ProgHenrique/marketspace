import { globalCss } from ".";


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
    color: '#313131',
    padding: 0,
    '-webkit-font-smoothing': 'antialiased',
  },

  'body, input, textarea, button': {
    fontFamily: 'Karla',
    fontWeight: 400,
    lineHeight: '$default'
  }
})