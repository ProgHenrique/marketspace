import { styled } from "@/styles/stitches.config";
import * as Dialog from '@radix-ui/react-dialog';
import { keyframes } from "@stitches/react";

export const Container = styled('div', {
  width: '100%',
  margin: '0 auto',
  maxWidth: 1024,
  height: '100vh',
  padding: '1.5rem',
})

export const ActionButtons = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '100%',
  paddingBottom: '1.5rem',
})

export const ActionButton = styled('button', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  lineHeight: 0,
  color: '$gray900',
  cursor: 'pointer',
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
    display: 'grid',
    placeItems: 'center',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: '9999px',
    width: 70,
    height: 70,
    color: '$gray600',
    lineHeight: 0,
    backgroundColor: 'rgba(217, 216, 218, 0.7)',
    cursor: 'pointer'
  },

  'input[type=file]': {
    position: 'absolute',
    display: 'none',
  }

})

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});


export const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: 'rgba(0,0,0,0.5)',
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  zIndex: 2
});

export const DialogContent = styled(Dialog.Content, {
  backgroundColor: '$gray100',
  borderRadius: 8,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '94vw',
  maxWidth: 1024,
  maxHeight: '85vh',
  padding: '1rem',
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  '&:focus': { outline: 'none' },
  zIndex: 10
});

export const DialogClose = styled(Dialog.Close, {
  all: 'unset',
  position: 'absolute',
  right: 8, top: 8,
  color: '$gray900',
  lineHeight: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const Flex = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
})
