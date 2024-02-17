import { styled } from "@/styles/stitches.config"
import { keyframes } from "@stitches/react"


export const Container = styled('div', {
  position: 'fixed',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100vw',
  maxWidth: 1024,
  height: '100vh',
  backgroundColor: '$gray100',
})

export const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4rem',
  padding: '3.5rem 2.5rem',
  backgroundColor: '$gray200',
  borderRadius: '0 0 1.5rem 1.5rem'
})

export const LogoSection = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  h1: {
    marginTop: '0.75rem',
    color: '$gray900',
    fontSize: '2rem',
  },

  p: {
    marginTop: 4,
    fontSize: '$sm',
    fontWeight: 300,
    color: '$gray500',
  }
})

export const Section = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  gap: '1rem',
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
  gap: '1rem',
  flexDirection: 'column',
  padding: '3rem 2.5rem',

  p: {
    fontSize: '$sm',
    color: '$gray600',
  }
})