import Head from "next/head";
import Image from "next/image";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from "zod";
import { useForm } from "react-hook-form";
import logo from "@/assets/logo.svg";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { CircleNotch, Eye, EyeSlash, PencilSimpleLine, User } from "phosphor-react";
import { api } from "@/lib/axios";
import { AvatarLabel, Container, Form, Header, Label, FormAnnotation, Footer, Spinner } from "./styles";
import { firstLetterUppercase } from "@/utils/first-letter-uppercase";
import { Button } from "@/styles/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { AuthContext } from "@/contexts/auth-context";
import Avatar from "@/components/avatar";
import { getBase64 } from "@/utils/convert-to-base64";

const createAccountFormValidationSchema = zod.object({
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
  confirmPassword: zod
  .string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'as senhas não coincidem.',
  path: ['confirmPassword']
})

type CreateAccountFormData = zod.infer<typeof createAccountFormValidationSchema>

export default function Create() {
  const {signIn} = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)
  const [file, setFile] = useState<File>()
  const [fileUrl, setFileUrl] = useState('')

  const router = useRouter()

  useEffect(() => {
    if(file) {
      setFileUrl(URL.createObjectURL(file))
    }
  },[file])

  const { handleSubmit, watch, reset, register, formState: {isSubmitting, errors} } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountFormValidationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  })

  const passwordMatch = watch('confirmPassword') === watch('password')

  async function handleCreateAccount(data: CreateAccountFormData) {
    const {email,name,password,phone, confirmPassword} = data
    if(password !== confirmPassword) {
      return alert('Senhas diferem')
    }

    const base64Image = file ? await getBase64(file) : ''
    try {
      await api.post('users/create', {email,name,password,phone, avatar_url: base64Image})
      await signIn({email, password})
      reset()
    } catch (error) {
      if(error instanceof AxiosError) {
        if(error.response?.status === 400) {
          alert('Email já em uso, faça login ou use outro email')
        }
      }
    }
    
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  return (
    <>
      <Head>
        <title>Criar conta | Marketspace</title>
      </Head>

      <Container>
        <Header>
          <Image alt="" src={logo} />
          <h2>Boas vindas!</h2>
          <p>Crie sua conta e use o espaço para comprar itens variados e vender seus produtos</p>
        </Header>

        <main>
          <section>
            <Form as='form' onSubmit={handleSubmit(handleCreateAccount)}>
              <AvatarLabel onClick={()=> {
                document.getElementById('userAvatar')?.click();
              }}>
                <Avatar avatarType="create" avatarUrl={fileUrl} avatarWidth={88}/>
                <div><PencilSimpleLine size={16} /></div>
                <input type="file" accept="image/png, image/jpeg, image/jpg" name="file" id="userAvatar" onChange={handleFileChange} />
              </AvatarLabel>

              <Label>
                <input type="text" placeholder="Nome completo" {...register('name')} />
                <p>{errors.name ? <FormAnnotation>* {errors.name.message}</FormAnnotation>: ''}</p>
              </Label>
              <Label>
                <input type="email" placeholder="E-mail" {...register('email')} />
                <p>{errors.email ? <FormAnnotation>* {errors.email.message}</FormAnnotation>: ''}</p>
              </Label>
              <Label>
                <input type="tel" placeholder="Telefone" {...register('phone')} />
                <p>{errors.phone ? <FormAnnotation>* {errors.phone.message}</FormAnnotation>: ''}</p>
              </Label>
              <Label>
                <input type={showPassword ? "text" : "password"} placeholder="Senha" {...register('password')} />
                <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}</span>
                <p>{errors.password ? <FormAnnotation>* {errors.password.message}</FormAnnotation>: ''}</p>
              </Label>
              <Label>
                <input type={showPassword ? "text" : "password"} placeholder="Confirmar senha" {...register('confirmPassword')} />
                <p>{errors.confirmPassword ? !passwordMatch && <FormAnnotation>* {errors.confirmPassword.message}</FormAnnotation>: ''}</p>
              </Label>

              <Button type="submit" disabled={isSubmitting} color="black">{isSubmitting ? <Spinner><CircleNotch size={14} weight="bold" /></Spinner> : "Criar"}</Button>
            </Form>
          </section>
        </main>

        <Footer>
          <p>Já tem uma conta?</p>
          <Link style={{all: 'unset', width: '100%'}} href="/login" onClick={()=> {window.innerHeight = 0}}>
            <Button color="gray">Ir para o login</Button>
          </Link>
        </Footer>
      </Container>
    </>
  )
}