import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { Controller, useForm } from "react-hook-form";
import { AddNewImagesButton, AnnouncementImage, Container, CreateAnnouncement, Form, FormAnnotation, Header, HeaderButton, Label, Main, NewImages, NewImagesText, RadioGroupIndicator, RadioGroupItem, RadioGroupRoot, RadioLabel, RemoveImage, Strong } from "./styles";
import { ArrowLeft, Plus, X } from "phosphor-react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/styles/button";
import { AuthContext } from "@/contexts/auth-context";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { getBase64 } from "@/utils/convert-to-base64";
import Head from "next/head";

// control format of inputs
const createAnnouncementFormValidationSchema = zod.object({
  title: zod
  .string()
  .min(3, {message: 'o título deve conter pelo menos 3 letras'})
  .transform((title)=> title.trim()),
  description: zod
  .string()
  .min(3, {message: 'adicione uma descrição mais completa'}),
  condition: zod.enum(['new', 'used'], {required_error: 'defina a condição do produto'}),
  price: zod
  .string()
  .min(1, {message: 'adicione o valor do produto'})
})

type CreateAnnouncementFormData = zod.infer<typeof createAnnouncementFormValidationSchema>

export default function CreateNewAnnouncement() {
  const {createPreAnnouncement, preAnnouncement} = useContext(AuthContext)
  const [files, setFiles] = useState<string[]>([])
  const [isImagesError, setIsImagesError] = useState(false)
  const [inputPriceValue, setInputPriceValue] = useState('')
  const [price, setPrice] = useState('')
  const radioValue = preAnnouncement.title ? preAnnouncement.isNew ? 'new': 'used': undefined

  const router = useRouter()

  useEffect(()=> {
    if(preAnnouncement.images.length > 0) {
      setFiles(preAnnouncement.images)
    }
  },[preAnnouncement.images])

  useEffect(()=> {
    if(files.length > 0) {
      setIsImagesError(false)
    }
  },[files, files.length])

  useEffect(()=> {
    if(preAnnouncement.price > 0) {
      priceFormatted(String(preAnnouncement.price))
    }
  },[preAnnouncement.price])

  // control the form
  const { control, handleSubmit, watch, reset, setValue, register, formState: {isSubmitting, errors} } = useForm<CreateAnnouncementFormData>({
    resolver: zodResolver(createAnnouncementFormValidationSchema),
    defaultValues: {
      title: preAnnouncement.title,
      description: preAnnouncement.description,
      price: '',
      condition: radioValue
    }
  })
  useEffect(()=> {
    setValue('title', preAnnouncement.title)
    setValue('description', preAnnouncement.description)
    if(preAnnouncement.price > 0) {
      setValue('price', String(preAnnouncement.price))
    }
    if(radioValue) {
      setValue('condition', radioValue)
    }
  },[preAnnouncement.description, preAnnouncement.price, preAnnouncement.title, radioValue, setValue])

  // add image file to image file's array
  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const file = await getBase64(event.target.files[0])
      setFiles([...files, file])
    }
  }

  // remove image from images file's array
  function handleRemoveImage (indexFile: number) {
    const newFiles = files.filter((file, index) => index !== indexFile)
    setFiles([...newFiles])
  }

  function handlePriceChange (event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value.replace(/\D/g, '')
    const price = priceFormatted(inputValue)
    setPrice(price)
  }

  // turn price friendly in to input
  function priceFormatted(inputValue: string) {
    const price = String(Number(inputValue) / 100)
    let priceFormatted: string[] = []
    price.split('.').map((value, index) => {
      if(value.length < 2 && index > 0) {
        const newValue = Number(value) * 10
        return priceFormatted.push(String(newValue))
      }

      return priceFormatted.push(value)
    })

    if(priceFormatted.length < 2) {
      priceFormatted.push('00')
    }
    return priceFormatted.join(',')
  }

  //execute on submit form, pre save data on useContext
  async function preSaveAnnouncement({condition,description,price,title}: CreateAnnouncementFormData) {
    if(files.length < 1) {
      setIsImagesError(true)
      return
    }
    createPreAnnouncement({
      images: files,
      isNew: condition === 'new' ? true : false,
      price: parseFloat(price) * 100,
      title,
      description
    })
    router.push('/announcements/create/pre-save')
    
  }

  return (
    <>
      <Head>
        <title>Criar anúncio | Marketspace</title>
      </Head>
      <Container>
        <Header>
          <HeaderButton onClick={()=> router.back()}>
            <ArrowLeft size={24}/>
          </HeaderButton>

          <h1>Criar anúncio</h1>
        </Header>
        <Main>
          <section>
            <NewImagesText>
              <strong>Imagens</strong>
              <p>Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!</p>
            </NewImagesText>
            <NewImages>

              {files.map((file, index) => {
                return (
                  <AnnouncementImage key={index}>
                    <Image alt="" src={file} width={100} height={100} />
                    <RemoveImage onClick={()=> handleRemoveImage(index)}>
                      <X size={12}/>
                    </RemoveImage>
                  </AnnouncementImage>
                )
              })}
              {files.length < 3 && (
                <AddNewImagesButton onClick={()=> document.getElementById('userAvatar')?.click()}>
                  <Plus size={24}/>
                  <input type="file" accept="image/png, image/jpeg, image/jpg" name="file" id="userAvatar" onChange={handleFileChange} />
                </AddNewImagesButton>
              )}
              <p>{isImagesError ? <FormAnnotation>* adicione pelo menos uma imagem do produto</FormAnnotation>: ''}</p>
            </NewImages>
          </section>
          <section>
            <Strong>Sobre o produto</Strong>
            <Form as='form' id='formToSubmit' onSubmit={handleSubmit(preSaveAnnouncement)}>
              <Label>
                <input type="text" placeholder="Título do anúncio" {...register('title')}/>
                <p>{errors.title ? <FormAnnotation>* {errors.title.message}</FormAnnotation>: ''}</p>
              </Label>
              <Label>
                <textarea placeholder="Descrição do produto" {...register('description')}/>
                <p>{errors.description ? <FormAnnotation>* {errors.description.message}</FormAnnotation>: ''}</p>
              </Label>
              <Controller 
                name="condition"
                control={control}
                render={({field}) => {
                  return (
                    <RadioGroupRoot
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <RadioLabel>
                        <RadioGroupItem value="new">
                          <RadioGroupIndicator />
                        </RadioGroupItem>
                        Produto novo
                      </RadioLabel>
                      <RadioLabel>
                        <RadioGroupItem value="used">
                          <RadioGroupIndicator />
                        </RadioGroupItem>
                        Produto usado
                      </RadioLabel>
                      <p>{errors.condition ? <FormAnnotation>* {errors.condition.message}</FormAnnotation>: ''}</p>
                    </RadioGroupRoot>
                  )
                }}
              />

              <Label css={{gap: '0.5rem'}}>
                R$
                <input type="text" inputMode="numeric" maxLength={11} placeholder="Valor do produto" value={price}  {...register('price')} onChange={handlePriceChange}/>
                <p>{errors.price ? <FormAnnotation>* {errors.price.message}</FormAnnotation>: ''}</p>
              </Label>

              <button type="submit" id="buttonSubmit" style={{position: 'absolute', opacity: 0}}></button>
            </Form>
          </section>
        </Main>
        <CreateAnnouncement>
          <Button color="gray" onClick={()=> router.back()}>Cancelar</Button>
          <Button color="black" onClick={()=> {
            document.getElementById('buttonSubmit')?.click()
            if(files.length < 1) {
              setIsImagesError(true)
              return
            }
          }}>Avançar</Button>
        </CreateAnnouncement>
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
    props: {
      
    }
  }
}