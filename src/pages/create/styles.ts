import { styled } from "@/styles/stitches.config"
import * as Avatar from "@radix-ui/react-avatar";
import { keyframes } from "@stitches/react";

export const Container = styled('div', {
  width: '100%',
  maxWidth: 1024,
  margin: '0 auto',
  height: '100vh',
  padding: '1.5rem',
})

export const Header = styled('header', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '2rem',

  h2: {
    marginTop: '0.75rem',
    marginBottom: '0.5rem',
    fontSize: '$lg',
    lineHeight: '$default',
    color: '$gray900',
  },

  p: {
    fontSize: '$sm',
    lineHeight: '$default',
    textAlign: 'center',
  }
})

export const Form = styled('form', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
})

export const Label = styled('label', {
  position: 'relative',
  display: 'flex',
  width: '100%',
  borderRadius: 6,
  backgroundColor: '$gray100',
  padding: '0.75rem 1rem',
  justifyContent: 'space-between',

  input: {
    all: 'unset',
    flex: 1,
    color: '$gray600',
  },

  'input::placeholder': {
    color: "$gray400",
    lineHeight: '$default',

  },

  span: {
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
  },

  p: {
    position: 'absolute',
    bottom: -22, left: 0,
  },
})

export const FormAnnotation = styled('span', {
  color: '#f75a68',
  fontSize: '$xs',
})

export const AvatarLabel = styled('div', {
  display: 'flex',
  position: 'relative',

  '& > div': {
    position: 'absolute',
    right: -8,
    bottom: 0,
    border: 'none',
    borderRadius: '9999px',
    padding: '0.75rem',
    color: '$gray200',
    lineHeight: 0,
    backgroundColor: '$blueLight',
    cursor: 'pointer'
  },

  'input[type=file]': {
    position: 'absolute',
    display: 'none',
  }

})

const rotate = keyframes({
  '0%': {transform: 'rotate(0deg)',},
  '100%': {transform: 'rotate(360deg)',}
})

export const Spinner = styled('span', {
  padding: 1,
  clipPath: 'circle()',
  lineHeight: 0,
  animation: `${rotate} 1.2s linear infinite`,
})

export const Footer = styled('footer', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '0 0 1.5rem 0',
  marginTop: '1rem',

  p: {
    fontSize: '$sm',
    color: '$gray600',
  },
})