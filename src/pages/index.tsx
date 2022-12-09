import Head from 'next/head'
import Image from 'next/image'
import { ArrowRight, MagnifyingGlass, Plus, Sliders, Tag } from 'phosphor-react'
import avatar from '../assets/avatar.svg'
import { Button } from '../styles/button'
import { Container, Header, InputSearch, ProfileAndNewAd, Search, ShowUserAds, UserAds } from '../styles/pages/home'

export default function Home() {
  return (
    <>
      <Head>
        <title>Página inicial | Marketspace</title>
      </Head>

      <Container>
        <Header>
          <ProfileAndNewAd>
            <div>
              <Image src={avatar} alt="" width={45} height={45} />
              <p>
                Boas vindas,<br />
                <span>Maria!</span>
              </p>
            </div>
            <Button color={'black'}>
              <Plus size={16} />
              Criar anúncio
            </Button>
          </ProfileAndNewAd>

          <UserAds>
            <p>Seus produtos anunciados para venda</p>
            <ShowUserAds>
              <div>
                <span><Tag size={22} /></span>
                <p>
                  <strong>4</strong> <br />
                  anúncios ativos
                </p>
              </div>

              <button>Meus anúncios <ArrowRight size={16} /></button>
            </ShowUserAds>
          </UserAds>
        </Header>
        <main>
          <Search>
            <p>Compre produtos variados</p>
            <form>
              <InputSearch>
                <input type="text" id="search" placeholder="Buscar anúncio" />
                <div>
                  <span><MagnifyingGlass size={20} /></span>
                  <span><Sliders size={20} /></span>
                  <p></p>
                </div>
              </InputSearch>
            </form>
          </Search>
        </main>
      </Container>
    </>
  )
}
