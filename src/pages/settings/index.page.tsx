import Avatar from "@/components/avatar";
import { ActionButton, ActionButtons, AvatarLabel, Container, DialogClose, DialogContent, DialogOverlay, Flex, Form, FormAnnotation, Label } from "./styles";
import { GetServerSideProps } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from "zod";
import { useForm } from "react-hook-form";
import * as Dialog from '@radix-ui/react-dialog';
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/auth-context";
import { Eye, EyeSlash, PencilSimple, PencilSimpleLine, SignOut, Tag, X } from "phosphor-react";
import Menu from "@/components/menu/index.page";
import { firstLetterUppercase } from "@/utils/first-letter-uppercase";
import { Button } from "@/styles/button";
import { api } from "@/lib/axios";
import { getBase64 } from "@/utils/convert-to-base64";
import Router from "next/router";
import Head from "next/head";

const updateAccountFormValidationSchema = zod.object({
  name: zod
  .string()
  .min(3, {message: "o nome deve ter no mínimo três letras."})
  .regex(/^([a-z\\áàâãéèêíïóôõöúçñ ]+)$/i, {
    message: 'o usuário deve conter apenas letras.',
  })
  .transform(name => firstLetterUppercase(name)),
  email: zod
  .string()
  .min(1, {message: 'você deve adicionar um email.'})
  .email({message: 'digite o email corretamente.'})
  .transform((email) => email.toLowerCase()),
  phone: zod
  .string()
  .min(11, {message: 'digite o número completo com DDD.'})
  .regex(/^\d+$/, {message: 'digite apenas números '}),
  password: zod
  .string()
  .min(8, {message:'a senha deve conter pelo menos 8 dígitos.'}),
})

type UpdateAccountFormData = zod.infer<typeof updateAccountFormValidationSchema>

export default function Settings () {
  const {user} = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [ableToEdit, setAbleToEdit] = useState(false)
  const [file, setFile] = useState<File>()
  const [fileUrl, setFileUrl] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)

  useEffect(() => {
    if(file) {
      setFileUrl(URL.createObjectURL(file))
    }
  },[file])

  const { handleSubmit, watch, setValue, register, formState: {isSubmitting, errors} } = useForm<UpdateAccountFormData>({
    resolver: zodResolver(updateAccountFormValidationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  })

  useEffect(()=> {
    setValue('email', user?.email || '')
    setValue('name', user?.name || '')
    setValue('phone', user?.phone || '')
  },[setValue, user?.email, user?.name, user?.password, user?.phone])

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }
  async function handlePasswordMatch() {
    try {
      await api.post('users/authenticate', {
        email: user?.email, password
      })
      setValue('password', password)
      setAbleToEdit(true)
      setIsOpenDialog(false)
      setPasswordError(false)
      setPassword('')
    } catch (error) {
      setPasswordError(true)
    }
  }

  async function handleUpdateUser ({email,name,password,phone}: UpdateAccountFormData) {
    const avatar_url = file ? await getBase64(file) : user?.avatar_url!
    try {
      await api.put('users/update', {
        email,name,password,phone, avatar_url
      })
      setAbleToEdit(false)
    } catch (error) {
      
    }
  }

  async function handleSingOut () {
    localStorage.removeItem('@marketspace:pre-announcement')
    destroyCookie(undefined, 'marketspace.token')
    Router.replace('/login')
  }
  return (
    <>
      <Head>
        <title>Editar usuário | Marketspace</title>
      </Head>
      <Container>
        <ActionButtons>
          <ActionButton disabled={ableToEdit} onClick={()=> setIsOpenDialog(true)} >
            <PencilSimpleLine size={24}/>
          </ActionButton>
        </ActionButtons>

        <Form as="form" onSubmit={handleSubmit(handleUpdateUser)}>
          <AvatarLabel>
            <Avatar avatarType="create" avatarUrl={fileUrl || user?.avatar_url!} avatarWidth={88} />
            {ableToEdit && (
              <div onClick={()=> {
                document.getElementById('userAvatar')?.click();
              }}><PencilSimple size={24} /></div>
            )}
            <input type="file" accept="image/png, image/jpeg, image/jpg" name="file" id="userAvatar" onChange={handleFileChange} />
          </AvatarLabel>

          <Label>
            <input type="text" placeholder="Nome completo" readOnly={!ableToEdit} {...register('name')} />
            <p>{errors.name ? <FormAnnotation>* {errors.name.message}</FormAnnotation>: ''}</p>
          </Label>
          <Label>
            <input type="email" placeholder="E-mail" readOnly={!ableToEdit} {...register('email')} />
            <p>{errors.email ? <FormAnnotation>* {errors.email.message}</FormAnnotation>: ''}</p>
          </Label>
          <Label>
            <input type="tel" placeholder="Telefone" readOnly={!ableToEdit} {...register('phone')} />
            <p>{errors.phone ? <FormAnnotation>* {errors.phone.message}</FormAnnotation>: ''}</p>
          </Label>
          {ableToEdit && (
            <Label>
              <input type={showPassword ? "text" : "password"} readOnly={!ableToEdit} placeholder="Senha" {...register('password')} />
              <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}</span>
              <p>{errors.password ? <FormAnnotation>* {errors.password.message}</FormAnnotation>: ''}</p>
            </Label>
          )}
          {ableToEdit ? (
            <Button color='black' type="submit"><Tag />Salvar</Button>
          ):(
            <Button color='black' onClick={handleSingOut}><SignOut style={{color: '#EE7979'}}/>Sair</Button>
          )}
        </Form>
        <Dialog.Root open={isOpenDialog} onOpenChange={()=> setIsOpenDialog(!isOpenDialog)}>
          <Dialog.Portal>
            <DialogOverlay />
            <DialogContent>
              <DialogClose>
                <X size={16}/>
              </DialogClose>
              <Flex>
                <p>digite sua senha:</p>
                <Label css={{border: '1px solid $gray300', marginBottom: '1.5rem'}}>
                  <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                  <p>{passwordError ? <FormAnnotation>* senha incorreta</FormAnnotation>: ''}</p>
                </Label>
                <Button css={{width: 'max-content'}} color="black" onClick={handlePasswordMatch}>Avançar</Button>
              </Flex>
            </DialogContent>
          </Dialog.Portal>
        </Dialog.Root>
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
  
  return { 
    props: {}
  }
}