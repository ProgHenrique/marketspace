import { styled } from "@/styles/stitches.config";

export const MenuRoot = styled('div',{
  position: 'fixed',
  bottom: 0,
  maxWidth: 1024,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  backgroundColor: '$gray100',
  padding: '1.25rem 1.5rem',
  paddingBottom: '1.75rem',
  lineHeight: 0,
  color: '$gray400',

  '.active':{
    color: '$gray600',
  },
})