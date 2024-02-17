import { styled } from "./stitches.config";


export const Button = styled('button', {
  variants: {
    color: {
      blue: { backgroundColor: '$blueLight', color: '$gray100' },
      black: { backgroundColor: '$gray900', color: '$gray100' },
      gray: { backgroundColor: '$gray300', color: '$gray600' },
    }
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.75rem',
  fontWeight: 700,
  fontSize: '$sm',
  borderRadius: 6,
  border: 'none',
  width: '100%',
  cursor: 'pointer',

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.3
  }
})