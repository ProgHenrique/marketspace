import Head from "next/head";
import Image from "next/image";
import { CircleNotch, Eye, EyeSlash } from "phosphor-react";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from "zod";
import { useContext, useState } from "react";
import logo from "@/assets/logo.svg";
import { Container, Footer, Form, FormAnnotation, Label, LogoSection, Main, Section, Spinner } from "./styles";
import { useForm } from "react-hook-form";
import { Button } from "@/styles/button";
import Link from "next/link";
import { AuthContext } from "@/contexts/auth-context";

const loginFormValidationSchema = zod.object({
  email: zod
  .string()
  .min(1, {message: 'você deve adicionar um email.'})
  .email({message: 'digite o email corretamente.'})
  .transform((email) => email.toLowerCase()),
  password: zod
  .string()
  .min(8, {message:'a senha deve conter pelo menos 8 dígitos.'}),
})

type LoginFormData = zod.infer<typeof loginFormValidationSchema>

export default function Login() {
  const { signIn } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)

  const { handleSubmit, watch, reset, register, formState: {errors, isSubmitting} } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormValidationSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function handleSignIn({email, password}: LoginFormData) {
    await signIn({email, password})
  }

  const inputValues = watch(['email', 'password'])
  const isSubmitDisabled = inputValues[1].length >= 8 && !inputValues.includes('')

  return (
    <>
      <Head>
        <title>Login | MarketSpace</title>
      </Head>
      <Container>
        <Main>
          <LogoSection>
            <Image src={logo} alt="" height={64} />
            <h1>marketspace</h1>
            <p>Seu espaço de compra e venda</p>
          </LogoSection>

          <Section>
            <p>Acesse sua conta</p>
            <Form as="form" onSubmit={handleSubmit(handleSignIn)}>

              <Label>
                <input type="email" placeholder="E-mail" {...register('email')} />
                <p>{errors.email ? <FormAnnotation>* {errors.email.message}</FormAnnotation>: ''}</p>
              </Label>

              <Label>
                <input type={showPassword ? "text" : "password"} placeholder="Senha" {...register('password')} />
                <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}</span>
                <p>{errors.password ? <FormAnnotation>* {errors.password.message}</FormAnnotation>: ''}</p>
              </Label>

              <Button type="submit" disabled={!isSubmitDisabled || isSubmitting} color="blue">{isSubmitting ? <Spinner><CircleNotch size={14} weight="bold" /></Spinner> : "Entrar"}</Button>
            </Form>
          </Section>
        </Main>

        <Footer>
          <p>Ainda não tem acesso?</p>
          <Link style={{all: 'unset', width: '100%'}} href="/create">
            <Button color="gray" onClick={() => window.location.href = '/create'} >Criar uma conta</Button>
          </Link>
        </Footer>
      </Container>

    </>
  )
}