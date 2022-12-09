import { styled } from "..";

export const Container = styled('div', {
  width: '100%',
  margin: '0 auto',
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

export const FormSection = styled('section', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  p: {
    fontSize: '$sm',
    color: '$gray600',
  },

  form: {
    marginTop: '1rem',
    width: '100%',
    display: 'flex',
    gap: '1rem',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    div: {
      display: 'flex',
      width: '100%',
      backgroundColor: '$gray100',
      borderRadius: 6,
      padding: '0.75rem 1rem',

      input: {
        all: 'unset',
        flex: 1,
      },

      span: {
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer',
      },
    },
  }
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