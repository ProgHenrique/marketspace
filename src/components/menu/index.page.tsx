import { ChatsCircle, GearSix, House } from "phosphor-react";
import { MenuRoot } from "./styles";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Menu() {
  const [active, setActive] = useState<"house" | "chat" | "gear">("house")
  const router = useRouter()

  useEffect(()=> {
    switch (router.pathname) {
      case "/":
        setActive("house")
        break;

      case "/messages":
          setActive("chat")
          break;
  
      case "/settings":
        setActive("gear")
        break;

      default:
        break;
    }
  },[router.pathname])
  return (
    <MenuRoot>
      <Link href={'/'} style={{all: 'unset', cursor: 'pointer'}}>
        <House size={24} className={active === "house" ? "active" : ""} weight={active === "house" ? "bold" : "regular"} />
      </Link>
      <Link href={'messages'} style={{all: 'unset', cursor: 'pointer'}}>
        <ChatsCircle size={24} className={active === "chat" ? "active" : ""} weight={active === "chat" ? "bold" : "regular"} />
      </Link>
      <Link href={'settings'} style={{all: 'unset', cursor: 'pointer'}}>
        <GearSix size={24} className={active === "gear" ? "active" : ""} weight={active === "gear" ? "bold" : "regular"} />
      </Link>
    </MenuRoot>
    
  )
}