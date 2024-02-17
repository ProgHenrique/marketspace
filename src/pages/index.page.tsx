import { Button } from "@/styles/button";
import { Plus, Tag, ArrowRight, MagnifyingGlass, Sliders, } from "phosphor-react";
import { Container, Header, ProfileAndNewAd, Search, InputSearch, Products, Product, ProductCover, ProductInfo, ProductCondition, ShowUserAnnouncements, UserAnnouncements } from "./styles";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { ChangeEvent, useContext, useState } from "react";
import { Announcement, AuthContext } from "@/contexts/auth-context";
import { parseCookies } from "nookies";
import Link from "next/link";
import Avatar from "@/components/avatar";
import { api } from "@/lib/axios";
import Menu from "@/components/menu/index.page";

interface HomeProps {
  announcements: Announcement[];
  userAnnouncements: number
}

export default function Home({
  announcements,
  userAnnouncements
}:HomeProps) {
  const {user} = useContext(AuthContext)
  const [listAnnouncements, setListAnnouncements] = useState<Announcement[]>(announcements)

  async function handleSearchAnnouncements(event: ChangeEvent<HTMLInputElement>){
    event.preventDefault()

    const searchLike = event.target.value.trim()
    if(!searchLike) {
      setListAnnouncements(announcements)
      return 
    }
    const response = await api.get(`announcements/search/${searchLike}`)
    setListAnnouncements(response.data)

  }
  return (
    <>
      <Head>
        <title>Página inicial | Marketspace</title>
      </Head>

      <Container>
        <Header>
          <ProfileAndNewAd>
            <div >
              <Avatar avatarType="profile" avatarUrl={user?.avatar_url ? user.avatar_url : ""} avatarWidth={45} />
              <p>
                Boas vindas,<br />
                <span>{user?.name.split(" ")[0]}!</span>
              </p>
            </div>
            <Link href={'/announcements/create'} style={{all: 'unset', width: '100%'}}>
              <Button color={'black'}>
                <Plus size={16} />
                Criar anúncio
              </Button>
            </Link>
          </ProfileAndNewAd>

          <UserAnnouncements>
            <p>Seus produtos anunciados para venda</p>
            <ShowUserAnnouncements>
              <div>
                <span><Tag size={22} /></span>
                <p>
                  <strong>{userAnnouncements}</strong> <br />
                  anúncios ativos
                </p>
              </div>

              <Link href={'/announcements'}>Meus anúncios <ArrowRight size={16} /></Link>
            </ShowUserAnnouncements>
          </UserAnnouncements>
        </Header>
        <main>
          <Search>
            <p>Compre produtos variados</p>
            <form>
              <InputSearch>
                <input type="text" id="search" placeholder="Buscar anúncio" onChange={handleSearchAnnouncements} />
                <div>
                  <span><MagnifyingGlass size={20} /></span>
                  <span><Sliders size={20} /></span>
                  <p></p>
                </div>
              </InputSearch>
            </form>
          </Search>
          <Products>
            {listAnnouncements.map((announcement, index)=> {
              const price = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL',}).format(announcement.price / 100)
              const slug = announcement.title.toLowerCase().split(' ').join('-')
              return (
                <Link style={{all:'unset'}} href={`/announcements/${slug}/${announcement.id}`} key={announcement.id}>
                  <Product>
                    <Avatar avatarType="announcementsList" avatarUrl={announcement.avatar_url} avatarWidth={24} />
                    <ProductCondition condition={announcement.isNew ? 'new': 'used'}>{announcement.isNew ? 'NOVO': 'USADO'}</ProductCondition>
                    <ProductCover
                      alt="" 
                      src={announcement.cover}
                      height={100}
                    />
                    <ProductInfo>
                      <p>{announcement.title}</p>
                      <strong>
                        <span>{price.substring(0,2)}</span>{price.substring(2)}
                      </strong>
                    </ProductInfo>
                  </Product>
                </Link>  
              )
            })}
            
          </Products>
        </main>
      </Container>
      <Menu />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {['marketspace.token']: token} = parseCookies(ctx)

  if(!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const userResponse = await fetch('http://localhost:3000/api/announcements/all/user', {
    headers: {Authorization: `Bearer ${token}`}
  })

  const userAnnouncements: Announcement[] = await userResponse.json()
  const activeUserAnnouncements = userAnnouncements.filter(announcement => announcement.available === true)

  const response = await fetch('http://localhost:3000/api/announcements/all', {
    headers: {Authorization: `Bearer ${token}`}
  })
  const announcements: Announcement[] = await response.json()
  
  return { 
    props: {
      announcements,
      userAnnouncements: activeUserAnnouncements.length
    }
  }
}
