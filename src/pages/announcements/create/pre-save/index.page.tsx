import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"
import { SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
import { AnnouncementImages, AnnouncementInfo, Container, CreateAnnouncement, DialogContent, DialogDescription, DialogOverlay, DialogTitle, Flex, Header, Method, PaymentMethods, Processing, Step, Steps, SwiperContainer, TitleAndPrice, UserInfo } from "./styles";
import Avatar from "@/components/avatar";
import { Button } from "@/styles/button";
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowLeft, Barcode, CircleNotch, CreditCard, Money, QrCode, SpinnerGap, Tag, X } from "phosphor-react";
import Image from "next/image";
import { useWindowSize } from "@/hooks/use-window-size";
import * as Dialog from '@radix-ui/react-dialog';
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/auth-context";
import { useRouter } from "next/router";
import Head from "next/head";
interface Announcement {
  id: string;
  title: string;
  description: string;
  isNew: boolean;
  price: number;
  available: boolean;
  created_at: Date;
  user: {
    name: string;
    avatar_url: string | null;
  }
  images: string [];
}

export default function Announcement () {
  const {user, preAnnouncement, saveAnnouncementOnDatabase} = useContext(AuthContext)
  const [currentImage, setCurrentImage] = useState(0)
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [processing, setProcessing] = useState(false)
  const windowSize = useWindowSize()
  const router = useRouter()
  const images = preAnnouncement.images
  const price = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL',}).format(preAnnouncement.price / 100)

  //create a new announcement on database
  async function handleSaveAnnouncement () {
    setProcessing(true)
    setIsOpenDialog(true)
    const {description,images,isNew,price,title} = preAnnouncement
    await saveAnnouncementOnDatabase({description,images,isNew,price,title, userId: user?.id!})
    setProcessing(false)
  }

  return(
    <>
      <Head>
        <title>Publicar anúncio | Marketspace</title>
      </Head>
      <Container>
        <Header>
          <strong>Pré visualização do anúncio</strong>
          <p>É assim que seu produto vai aparecer!</p>
        </Header>
        <main>
          <AnnouncementImages >
            <SwiperContainer 
              navigation = {windowSize > 600}
              modules={[Navigation, A11y]}
              onActiveIndexChange={(swiper)=> setCurrentImage(swiper.activeIndex)}
            >
              {images.map((image, index)=> {
                return (
                  <SwiperSlide key={index}>
                    <Image alt="" src={image} height={280} width={windowSize > 600 ? 1024 : windowSize}/>
                  </SwiperSlide>
                )
              })}
              
            </SwiperContainer>
            <Steps css={{ '--steps-size': images.length }}>
              {Array.from({ length: images.length }, (_, i) => i + 1).map((image) => {
                return <Step key={image} active={image === currentImage + 1} />
              })}
            </Steps>
          </AnnouncementImages>
          
          <section style={{padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <UserInfo>
              <Avatar avatarType="announcement" avatarUrl={user?.avatar_url!} avatarWidth={24}/>
              <p>{user?.name}</p>
            </UserInfo>
            <AnnouncementInfo>
              <span>{preAnnouncement.isNew ? 'NOVO': 'USADO'}</span>
              <TitleAndPrice>
                <h1>{preAnnouncement.title}</h1>
                <strong>
                  <span>{price.substring(0,2)}</span>{price.substring(2)}
                </strong>
              </TitleAndPrice>
              <p>{preAnnouncement.description}</p>
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
        <CreateAnnouncement>
          <Button color="gray" onClick={()=> router.back()}>
            <ArrowLeft size={16}/>
            Voltar e editar
          </Button>

          <Button color="blue" onClick={handleSaveAnnouncement}>
            <Tag size={16}/>
            Publicar
          </Button>
        </CreateAnnouncement>

        <Dialog.Root open={isOpenDialog}>
          <Dialog.Portal>
            <DialogOverlay />
            <DialogContent>
              {processing && (
                <Processing>
                  <strong>Processando <span><CircleNotch size={24}/></span></strong>
                </Processing>
              )}
              <DialogTitle>Sucesso!!!</DialogTitle>
              <DialogDescription>
                O seu anúncio foi criado com sucesso.
              </DialogDescription>
              <Flex>
                <Button color="blue" onClick={()=> router.push('/announcements/create')}>
                <Tag size={16}/>
                  Criar novo anúncio
                </Button>

                <Button color="black" onClick={()=> router.push('/announcements')}>
                  <Tag size={16}/>
                  Ver seus anúncios
                </Button>
              </Flex>
            </DialogContent>
          </Dialog.Portal>
        </Dialog.Root>
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

  return {
    props: {}
  }
}