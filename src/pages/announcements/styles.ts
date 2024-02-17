import { styled } from "@/styles/stitches.config";
import * as Select from '@radix-ui/react-select';

export const Container = styled('div', {
  width: '100%',
  margin: '0 auto',
  maxWidth: 1024,
  height: '100vh',
})

export const Header = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1.25rem 1.5rem',
  marginBottom: '0.75rem',
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 0,
  color: '$gray900',
  cursor: 'pointer',
})

export const AnnouncementFilter = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '1.25rem',

  span: {
    fontSize: '$sm',
    lineHeight: '$default',
  }
})

export const SelectTrigger = styled(Select.SelectTrigger, {
  all: 'unset',
  display: 'inline-flex',
  width:85,
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: 6,
  padding: '0.5rem 0.75rem',
  fontSize: '$sm',
  lineHeight: '$default',
  color: '$gray900',
  border: '1px solid $gray300',
  cursor: 'pointer',
  userSelect: 'none',
})

export const SelectIcon = styled(Select.SelectIcon, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'gray500',
  lineHeight: 0,
  
  transition: 'transform 100ms cubic-bezier(0.87, 0, 0.13, 1)',
  '[data-state=open] &': { transform: 'rotate(-180deg)' },  
  
})


export const SelectContent = styled(Select.Content, {
  overflow: 'hidden',
  width: 111,
  backgroundColor: '$gray100',
  borderRadius: 6,
  zIndex: 10,
})

export const SelectViewport = styled(Select.Viewport, {
  padding: 3,
})

export const SelectItem = styled(Select.Item, {
  fontSize: '$sm',
  padding: '0.75rem',
  color: '$gray600',
  lineHeight: '$default',
  cursor: 'pointer',
  outline: 'none',
  '&[data-state=checked]': {
    fontWeight: 'bold',
  },
})

export const Products = styled('div', {
  marginTop: '1.5rem',
  paddingBottom: '1.5rem',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridGap: '1.25rem',
  gridRow: '1.5rem',
})

export const Product = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  cursor: 'pointer',
})

export const ProductCover = styled('img', {
  borderRadius: 6,
})

export const ProductCondition = styled('div', {
  position: 'absolute',
  right: 4, top: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2px 8px',
  userSelect: 'none',
  color: '#FFFFFF',
  fontSize: '0.625rem',
  fontWeight: 'bold',
  lineHeight: '$default',
  borderRadius: '9999px',

  variants: {
    condition: {
      used: {
        backgroundColor: '$gray600',
      },
      new: {
        backgroundColor: '$blue',
      }
    }
  }

})

export const ProductInactive = styled('div', {
  position: 'absolute',
  left: 0, top: 0,
  borderRadius: 6,
  width: '100%',
  height: 100,
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 2,
  '&::after': {
    content: 'ANÚNCIO DESATIVADO',
    position: 'absolute',
    left: 8, bottom: 8,
    fontSize: 11,
    lineHeight: '$default',
    fontWeight: 'bold',
    color: '$gray100',
  }

})

export const ProductInfo = styled('div', {
  p: {
    color: '$gray600',
    fontSize: '$sm',
    lineHeight: '$default'
  },
  strong: {
    color: '$gray900',
    lineHeight: '$default',
    span: {
      fontSize: '$sm',
    }
  },

  variants: {
    available: {
      false: {
        p:{color: '$gray400',},
        strong:{color: '$gray400', fontWeight: 'normal'},
      }
    }
  }
})



