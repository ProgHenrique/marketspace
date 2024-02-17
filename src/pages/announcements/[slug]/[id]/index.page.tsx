import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"
import { SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
import { ActionButtons, AnnouncementImages, AnnouncementInfo, Container, FinishedBuy, Method, PaymentMethods, ProductInactive, ReturnButton, Step, Steps, SwiperContainer, TitleAndPrice, UserInfo } from "./styles";
import Avatar from "@/components/avatar";
import { Button } from "@/styles/button";
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowLeft, Barcode, ChatsCircle, CreditCard, Money, PencilSimpleLine, Power, QrCode, TrashSimple } from "phosphor-react";
import Image from "next/image";
import { useWindowSize } from "@/hooks/use-window-size";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/auth-context";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";
import Head from "next/head";
export type Announcement = {
  id: string;
  title: string;
  description: string;
  isNew: boolean;
  price: number;
  available: boolean;
  created_at: Date;
  user: {
    id: string;
    name: string;
    avatar_url: string | null;
  }
  images: string [];
}

type AnnouncementProps = {
  announcement: Announcement;
}

export default function Announcement ({announcement}:AnnouncementProps) {
  const {user} = useContext(AuthContext)
  const [currentImage, setCurrentImage] = useState(0)
  const [isAvailable, setIsAvailable] = useState(announcement.available)
  const windowSize = useWindowSize()
  const price = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL',}).format(announcement.price / 100)
  const images = announcement.images
  const ownAnnouncement = user?.id === announcement.user.id
  const slug = announcement.title.split(' ').join('-').toLowerCase()
  const router = useRouter()

  // to change of announcement's availability
  async function handleChangeAnnouncementAvailability () {
    announcement['available'] = !announcement.available
    await api.patch('announcements/update/availability', {
      id: announcement.id,
    })
    setIsAvailable(announcement.available)
  } 

  // delete announcement
  async function handleDeleteAnnouncement () {
    await api.delete('announcements/delete', {data: {id: announcement.id}})
    setIsAvailable(announcement.available)
    router.replace('/announcements')
  } 

  return(
    <>
      <Head>
        <title>{slug} | Marketspace</title>
      </Head>
      <Container>
        <ActionButtons>
          <ReturnButton as='button' onClick={()=> router.back()}>
            <ArrowLeft size={24}/>
          </ReturnButton>
          {ownAnnouncement && (
            <ReturnButton href={`/announcements/${slug}/${announcement.id}/update`}>
              <PencilSimpleLine size={24}/>
            </ReturnButton>
          )}
        </ActionButtons>
        
        <main>
          <AnnouncementImages >
            {!isAvailable && (
              <ProductInactive></ProductInactive>
            )}
            <SwiperContainer 
              navigation = {windowSize > 600}
              modules={[Navigation, A11y]}
              onActiveIndexChange={(swiper)=> setCurrentImage(swiper.activeIndex)}
            >
              {images.map((image, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Image alt="" src={image} height={280} width={windowSize > 600 ? 1024 : windowSize}/>
                  </SwiperSlide>
                )
              })}
              
            </SwiperContainer>
            <Steps css={{ '--steps-size': images.length }} inactive={!isAvailable}>
              {Array.from({ length: images.length }, (_, i) => i + 1).map((image) => {
                return <Step key={image} active={image === currentImage + 1} />
              })}
            </Steps>
          </AnnouncementImages>
          
          <section style={{padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <UserInfo>
              <Avatar avatarType="announcement" avatarUrl={announcement.user.avatar_url!} avatarWidth={24}/>
              <p>{announcement.user.name}</p>
            </UserInfo>
            <AnnouncementInfo>
              <span>{announcement.isNew? 'NOVO': 'USADO'}</span>
              <TitleAndPrice>
                <h1>{announcement.title}</h1>
                <strong>
                  <span>{price.substring(0,2)}</span>{price.substring(2)}
                </strong>
              </TitleAndPrice>
              <p>{announcement.description}</p>
            </AnnouncementInfo>
          </section>
          <section style={{padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <PaymentMethods>
              <strong>Meios de pagamento:</strong>
              <div>
                <Method><span><Barcode size={18}/></span>Boleto</Method>
                <Method><span><QrCode size={18}/></span>Pix</Method>
                <Method><span><Money size={18}/></span>Dinheiro</Method>
                <Method><span><CreditCard size={18}/></span>Cartão de crédito e débito</Method>
              </div>
            </PaymentMethods>
          </section>
        </main>
        <FinishedBuy ownAnnouncement={ownAnnouncement}>
          {ownAnnouncement && (
            <>
              <Button color={isAvailable ? 'black': 'blue'} onClick={handleChangeAnnouncementAvailability}>
                <Power size={16} style={{lineHeight: 0}} />
                {isAvailable ? 'Desativar anúncio': 'Reativar anúncio'}
                
              </Button>
              <Button color="gray" onClick={handleDeleteAnnouncement}>
                <TrashSimple size={16} style={{lineHeight: 0}} />
                Excluir anúncio
              </Button>
            </>
          )}

          {!ownAnnouncement && (
            <>
              <strong>
                <span>{price.substring(0,2)}</span>{price.substring(2)}
              </strong>

              <Button color="blue">
                <ChatsCircle size={16} weight="fill" style={{lineHeight: 0}} />
                Entrar em contato
              </Button>
            </>
          )}
        </FinishedBuy>
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

  const {id} = ctx.query

  const response = await fetch(`http://localhost:3000/api/announcements/${id}`, {
    headers: {Authorization: `Bearer ${token}`}
  })
  
  if(response.status !== 201) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const announcement: Announcement = await response.json()
  

  return {
    props: {
      announcement,
    },
  }
}