import { styled } from '..';

export const Container = styled('div', {
  width: '100%',
  margin: '0 auto',
  maxWidth: 1024,
  height: '100vh',
  padding: '1.5rem'
})

export const Header = styled('header', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2.5rem',
  marginBottom: '2.5rem'
})

export const ProfileAndNewAd = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '0.5rem',

  div: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',

    p: {
      color: '$gray900',
      lineHeight: '$default',
      span: {
        fontWeight: 700,
      }
    },

    img: {
      objectFit: 'contain',
      outline: '2px solid $blueLight',
      outlineOffset: -2,
      borderRadius: '9999px',
    },
  }
})

export const UserAds = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  'p:first-child': {
    fontSize: '$sm',
    lineHeight: '$default',
    color: '$gray500'
  },
})

export const ShowUserAds = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.75rem 1.25rem 0.75rem 1rem',
  backgroundColor: 'rgba(100, 122, 199, 0.1)',
  borderRadius: 6,

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',

    p: {
      strong: {
        fontSize: '$lg',
        color: '$gray600',
        lineHeight: '$default',
      },
      fontSize: '$xs',
      lineHeight: '$default',
      color: '$gray600',
    },

    span: {
      color: '$blue',
    }
  },

  button: {
    all: 'unset',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '$xs',
    lineHeight: '$default',
    gap: '0.5rem',
    color: '$blue',
    fontWeight: 700,
    cursor: 'pointer',
  }
})

export const Search = styled('section', {
  p: {
    fontSize: '$sm',
    lineHeight: '$default',
    color: '$gray500',
    marginBottom: '0.875rem',
  },

  form: {
    width: '100%',
  }
})

export const InputSearch = styled('div', {
  display: 'flex',
  width: '100%',
  backgroundColor: '$gray100',
  borderRadius: 6,
  padding: '0.75rem 1rem',

  input: {
    all: 'unset',
    flex: 1,
  },

  'input::placeholder': {
    color: '$gray400',
    lineHeight: '$default',

  },

  div: {
    display: 'flex',
    gap: '1.5rem',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',

    span: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      lineHeight: 0,
      color: '$gray600',
    },

    p: {
      all: 'unset',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 1,
      height: '1.25rem',
      borderLeft: '1px solid $gray400',
    },
  }
})