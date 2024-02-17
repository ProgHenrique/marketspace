import { styled } from "@/styles/stitches.config";
import * as Avatar from "@radix-ui/react-avatar";

export const AvatarRoot = styled(Avatar.Root, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  borderRadius: '9999px',

  variants: {
    type: {
      profile: {
        width: 45,
        height: 45,
        outline: '2px solid $blueLight',
        outlineOffset: -2,
      },
      announcementsList: {
        position: 'absolute',
        left: 4, top: 4,
        width: 24,
        height: 24,
        outline: '1px solid $gray100',
        outlineOffset: -1,
      },
      create: {
        width: 88,
        height: 88,
        outline: '4px solid $blueLight',
        outlineOffset: -4,
      },
      announcement: {
        width: 24,
        height: 24,
        outline: '2px solid $blueLight',
        outlineOffset: -2,
      }
    }
  }
});

export const AvatarImage = styled(Avatar.Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
});

export const AvatarFallback = styled(Avatar.Fallback, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '$sm',
  fontWeight: 500,
  backgroundColor: '$gray300',
  color: '$gray400',
  lineHeight: 0,
  
});