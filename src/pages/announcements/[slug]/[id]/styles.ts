import { styled } from "@/styles/stitches.config";
import Link from "next/link";
import {Swiper} from "swiper/react";

export const Container = styled('div', {
  position: 'relative',
  width: '100%',
  margin: '0 auto',
  maxWidth: 1024,
  height: '100vh',
})

export const ActionButtons = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '1.25rem 1.5rem 0.75rem',
})

export const ReturnButton = styled(Link, {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  lineHeight: 0,
  color: '$gray900',
  cursor: 'pointer',

})

export const AnnouncementImages = styled('div', {
  position: 'relative',
  userSelect: 'none',
  width: '100%',
  height: 280,
})

export const SwiperContainer = styled( Swiper, {
  width: '100%',
  height: '100%',
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
  zIndex: 10,
  variants: {
    inactive: {
      true: {
        opacity: 0.6
      }
    }
  }
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

export const ProductInactive = styled('div', {
  position: 'absolute',
  display: 'grid',
  placeItems: 'center',
  left: 0, top: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.6)',
  zIndex: 10,
  '&::after': {
    content: 'ANÚNCIO DESATIVADO',
    fontSize: '$sm',
    lineHeight: '$default',
    fontWeight: 'bold',
    color: '$gray100',
  }

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

export const FinishedBuy = styled('div',{
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

  strong: {
    fontSize: '$xl',
    color: '$blue',
    lineHeight: '$default',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    span: {
      fontSize: '$sm',
    }
  },

  variants: {
    ownAnnouncement: {
      true: {
        gap: '0.5rem',
        flexDirection: 'column',
      }
    }
  }
})