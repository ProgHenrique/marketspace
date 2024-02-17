import { styled } from "@/styles/stitches.config";
import { keyframes } from "@stitches/react";
import * as Dialog from '@radix-ui/react-dialog';
import {Swiper} from "swiper/react";

export const Container = styled('div', {
  position: 'relative',
  width: '100%',
  margin: '0 auto',
  maxWidth: 1024,
  height: '100vh',
})

export const Header = styled('header', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: '$blueLight',
  padding: '2.25rem 1.5rem 1rem 1.5rem',

  strong: {
    color: '$gray100',
    lineHeight: '$default',
    textAlign: 'center',
  },

  p: {
    fontSize: '$sm',
    color: '$gray100',
    lineHeight: '$default',
    textAlign: 'center',
  }
})

export const AnnouncementImages = styled('div', {
  position: 'relative',
  userSelect: 'none',
  width: '100%',
  height: 280,
})

export const SwiperContainer = styled( Swiper, {
  width: '100%',
  '.swiper-button-prev': {
    color: '$gray100',
  },
  '.swiper-button-next': {
    color: '$gray100',
  },
})

export const Steps = styled('div', {
  position: 'absolute',
  left: 2, bottom: 2,
  display: 'grid',
  gridTemplateColumns: 'repeat(var(--steps-size), 1fr)',
  gap: '0.5rem',
  width: 'calc(100% - 4px)',
  zIndex: 1
})

export const Step = styled('div', {
  height: 4,
  width: '100%',
  borderRadius: '9999px',
  backgroundColor: '$gray100',
  opacity: 0.5,

  variants: {
    active: {
      true: {
        opacity: 0.75,
      },
    },
  },
})

export const UserInfo = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '$sm',
  lineHeight: '$default',
  color: '$gray900',
})

export const AnnouncementInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  '& > span': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '9999px',
    maxWidth: 'max-content',
    padding: '2px 0.5rem',
    backgroundColor: '$gray300',
    color: '$gray600',
    fontSize: '0.625rem',
    lineHeight: '$default',
    fontWeight: 'bold',
  },

  '& > p': {
    fontSize: '$sm',
    lineHeight: '$default',
  },
})

export const TitleAndPrice = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.75rem',
  h1: {
    fontSize: '$lg',
    color: '$gray900',
    lineHeight: '$default',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  strong: {
    fontSize: '$lg',
    color: '$blueLight',
    lineHeight: '$default',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    span: {
      fontSize: '$sm',
    }
  },
})

export const PaymentMethods = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  strong: {
    fontSize: '$sm',
    color: '$gray600',
    lineHeight: '$default',
  },

  div: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  }
})

export const Method = styled('p', {
  display: 'flex',
  alignItems: 'center',
  lineHeight: '$default',
  fontSize: '$sm',
  color:'$gray600',
  span: {
    color: 'gray900',
    marginRight: '0.5rem',
    lineHeight: 0,
  },
})

export const CreateAnnouncement = styled('div',{
  position: 'fixed',
  bottom: 0,
  maxWidth: 1024,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '$gray100',
  padding: '1.25rem 1.5rem',
  paddingBottom: '1.75rem',
  gap: '0.75rem',
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
  padding: '1.5rem',
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  '&:focus': { outline: 'none' },
  zIndex: 10
});

export const DialogTitle = styled(Dialog.Title, {
  margin: 0,
  fontWeight: 500,
  color: "$gray600",
  fontSize: '$lg',
});

export const DialogDescription = styled(Dialog.Description, {
  margin: '0.625rem 0 1.25rem',
  color: "$gray400",
  lineHeight: 1.5,
});

export const Flex = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
})

const rotation = keyframes({
  '0%': {transform: 'rotate(0deg)',},
  '100%': {transform: 'rotate(360deg)',},
})

export const Processing = styled('div', {
  display: 'grid',
  position: 'absolute',
  left: 0,
  top: 0,
  placeItems: 'center',
  borderRadius: 8,
  backgroundColor: '$gray100',
  width: '100%',
  height: '100%',
  color: 'gray600',
  strong: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.825rem',
    fontSize: '$lg',
  },

  span: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 0,
    animation: `${rotation} 900ms ease-in-out infinite`,
  }
})




