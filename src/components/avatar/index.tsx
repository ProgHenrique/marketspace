import { User } from "phosphor-react";
import { AvatarFallback, AvatarImage, AvatarRoot } from "./styles";

type AvatarProps = {
  avatarUrl: string;
  avatarType: "profile" | "announcement" | "announcementsList" | "create" ;
  avatarWidth: number;
}

export default function Avatar ({avatarType, avatarUrl, avatarWidth}: AvatarProps) {
  return (
    <AvatarRoot type={avatarType}>
      <AvatarImage
        src= {avatarUrl}
        alt=""
      />
      <AvatarFallback delayMs={600}><User size={avatarWidth} /></AvatarFallback>
    </AvatarRoot>
  )
}