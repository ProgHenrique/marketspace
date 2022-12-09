import { styled } from "..";

export const Container = styled('div', {
  width: '100%',
  maxWidth: 1024,
  margin: '0 auto',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  backgroundColor: '$gray200',
  padding: '1.5rem 2.5rem 0 2.5rem',
})

export const LogoSection = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '1.5rem',

  h1: {
    marginTop: '0.75rem',
    color: '$gray900',
    fontSize: '$lg',
  },

  p: {
    marginTop: 4,
    fontSize: '$sm',
    fontWeight: 400,
    color: '$gray500',
    textAlign: 'center',
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
    },
  }
})

export const AvatarDiv = styled('div', {
  display: 'flex',
  position: 'relative',
  img: {
    objectFit: 'contain',
    outline: '4px solid $blueLight',
    outlineOffset: -4,
    borderRadius: '9999px',
  },

  button: {
    position: 'absolute',
    right: -8,
    bottom: 0,
    border: 'none',
    borderRadius: '999px',
    padding: '0.75rem',
    color: '$gray200',
    lineHeight: 0,
    backgroundColor: '$blueLight',
    cursor: 'pointer'
  },

  '#userAvatar': {
    position: 'absolute',
    zIndex: -10,
    display: 'hidden',
    opacity: 0
  }

})

export const Footer = styled('footer', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  flexDirection: 'column',
  padding: '0 0 1.5rem 0',

  p: {
    fontSize: '$sm',
    color: '$gray600',
  },
})