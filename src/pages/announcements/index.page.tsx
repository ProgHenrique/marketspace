import { ArrowLeft, CaretDown, Plus } from "phosphor-react";
import { AnnouncementFilter,Container, Header, HeaderButton, Product, ProductCondition, ProductCover, ProductInactive, ProductInfo, Products, SelectContent, SelectIcon, SelectItem, SelectTrigger, SelectViewport } from "./styles";
import * as Select from '@radix-ui/react-select';
import { useState } from "react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

interface Announcement {
  id: string;
  title: string;
  isNew: boolean;  
  price: number;   
  available: boolean;
  avatar_url: string;
  cover: string;
}

type AnnouncementProps = {
  announcements: Announcement[]
}

export default function AnnouncementsUser ({announcements}: AnnouncementProps) {
  const [announcementType, setAnnouncementType] = useState('all');
  const router = useRouter()
  
  return (
    <>
      <Head>
        <title>Anúncios | Marketspace</title>
      </Head>
      <Container>
        <Header>
          <Link href={'/'} style={{all: 'unset'}}>
            <HeaderButton>
              <ArrowLeft size={24}/>
            </HeaderButton>
          </Link>

          <h1>Meus anúncios</h1>

          <Link href={'/announcements/create'} style={{all: 'unset'}}>
            <HeaderButton>
              <Plus size={24}/>
            </HeaderButton>
          </Link>
          
        </Header>
        <main style={{padding: '0 1.5rem'}}>
          <section>
            <AnnouncementFilter>
              <span>{announcements.length } anúncios</span>
              <Select.Root value={announcementType} onValueChange={(value)=> setAnnouncementType(value)}>
                <SelectTrigger>
                  <Select.Value />
                  <SelectIcon>
                    <CaretDown size={16}/>
                  </SelectIcon>
                </SelectTrigger>

                <Select.Portal>
                  <SelectContent position="popper">
                    <SelectViewport>
                      <SelectItem value="all">
                        <Select.ItemText>Todos</Select.ItemText>
                      </SelectItem>
                      <SelectItem value="active">
                        <Select.ItemText>Ativos</Select.ItemText>
                      </SelectItem>
                      <SelectItem value="inactive">
                        <Select.ItemText>Inativos</Select.ItemText>
                      </SelectItem>
                    </SelectViewport>
                  </SelectContent>
                </Select.Portal>
              </Select.Root>
            </AnnouncementFilter>

            <Products>
              {announcements.map((announcement, index)=> {
                switch (announcementType) {
                  case 'active':
                    if(!announcement.available) return 
                    break;
                  case 'inactive':
                    if(announcement.available) return 
                    break;
                  default:
                    break;
                }
                const price = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL',}).format(announcement.price / 100)
                const slug = announcement.title.split(' ').join('-').toLowerCase()
                return (
                  <Product key={index} onClick={()=> router.push(`announcements/${slug}/${announcement.id}`)}>
                    {!announcement.available && (
                      <ProductInactive></ProductInactive>
                    )}
                    <ProductCondition condition={announcement.isNew ? 'new': 'used'}>{announcement.isNew ? 'NOVO': 'USADO'}</ProductCondition>
                    
                    <ProductCover
                      alt="" 
                      src={announcement.cover}
                      height={100}
                    />
                    <ProductInfo available={announcement.available}>
                      <p>{announcement.title}</p>
                      <strong>
                        <span>{price.substring(0,2)}</span>{price.substring(2)}
                      </strong>
                    </ProductInfo>
                  </Product>
                )
              })}
              
            </Products>
          </section>
        </main>
      </Container>
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

  const response = await fetch('http://localhost:3000/api/announcements/all/user', {
    headers: {Authorization: `Bearer ${token}`}
  })

  const announcements: Announcement[] = await response.json()
  return { 
    props: {
      announcements,
    }
  }
}