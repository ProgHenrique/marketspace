import { styled } from "@/styles/stitches.config"
import * as RadioGroup from '@radix-ui/react-radio-group';

export const Container = styled('div', {
  position: 'relative',
  width: '100%',
  margin: '0 auto',
  maxWidth: 1024,
  height: '100vh',
})

export const Header = styled('header', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1.25rem 1.5rem',
  marginBottom: '1.5rem',
  h1: {
    width: '100%',
    textAlign: 'center',
    fontSize: '$lg',
    lineHeight: '$default',
    color: '$gray900',
  }
})

export const HeaderButton = styled('button', {
  all: 'unset',
  position: 'absolute',
  top: '1.25rem', left: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 0,
  color: '$gray900',
  cursor: 'pointer',
})

export const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  paddingBottom: '7rem',
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '0 1.5rem',
  }
  
})

export const NewImagesText = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  strong: {
    lineHeight: '$default',
    color: '$gray600',
  },
  p: {
    fontSize: '$sm',
    color: '$gray500',
    lineHeight: '$default',
    
  }
})

export const NewImages = styled('div', {
  position: 'relative',
  display: 'flex',
  gap: '0.5rem',
  width: '100%',
  p: {
    position: 'absolute',
    bottom: -22, left: 0,
  },
})

export const AnnouncementImage = styled('div', {
  position: 'relative',
  display: 'flex',
  width: 100,
  height: 100,
  borderRadius: 6,
  overflow: 'hidden',
})

export const RemoveImage = styled('button', {
  all: 'unset',
  position: 'absolute',
  right: 4, top: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '9999px',
  backgroundColor: '$gray600',
  color: '$gray100',
  width: 16,
  height: 16,
  lineHeight: 0,
  padding: 1,
  cursor: 'pointer',
  userSelect: 'none',

})

export const AddNewImagesButton = styled('button', {
  all: 'unset',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 100,
  height: 100,
  background: '$gray300',
  color: '$gray400',
  borderRadius: 6,
  lineHeight: 0,
  'input[type=file]': {
    position: 'absolute',
    display: 'none',
  }
})

export const Strong = styled('strong', {
  lineHeight: '$default',
  color: '$gray600',
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
    cursor: 'text',
    flex: 1,
    color: '$gray600',
    '-moz-appearance': 'textfield',
  },

  'input::placeholder': {
    color: "$gray400",
    lineHeight: '$default',

  },

  'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0
  },

  textarea: {
    flex: 1,
    color: '$gray600',
    border: 'none',
    outline: 'none',
    resize: 'none',
    height: 160,
    backgroundColor: 'transparent',
  },

  'textarea::placeholder': {
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

export const RadioGroupRoot = styled(RadioGroup.Root, {
  position: 'relative',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  gap: '1.375rem',
  p: {
    position: 'absolute',
    bottom: -22, left: 0,
  },
})

export const RadioLabel = styled('label', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer',
})

export const RadioGroupItem = styled(RadioGroup.Item, {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  backgroundColor: 'transparent',
  borderRadius: '9999px',
  border:'2px solid $gray400',
  '&[data-state=checked]': { border: '2px solid $blueLight' },
})

export const RadioGroupIndicator = styled(RadioGroup.Indicator,{
  width: '100%',
  height: '100%',
  outline: '2px solid $gray200',
  outlineOffset: '-2px',
  backgroundColor: '$blueLight',
  borderRadius: '9999px',
})

export const CreateAnnouncement = styled('div',{
  position: 'fixed',
  bottom: 0,
  maxWidth: 1024,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.75rem',
  backgroundColor: '$gray100',
  padding: '1.25rem 1.5rem',
  paddingBottom: '1.75rem',
})