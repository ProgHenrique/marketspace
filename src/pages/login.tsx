import Head from "next/head";
import Image from "next/image";
import { Eye, EyeSlash } from "phosphor-react";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from "zod";
import { useState } from "react";
import logo from "../assets/logo.svg";
import { Container, Footer, FormSection, LogoSection, Main } from "../styles/pages/login";
import { useForm } from "react-hook-form";
import { Button } from "../styles/button";

const loginFormValidationSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6)
})

type LoginFormData = zod.infer<typeof loginFormValidationSchema>

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const { handleSubmit, watch, reset, register } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormValidationSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function handleLogin() {
    window.location.href = '/'
  }
  const isSubmitDisabled = watch('email') && watch('password') ? false : true;

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

          <FormSection>
            <p>Acesse sua conta</p>
            <form onSubmit={handleSubmit(handleLogin)}>

              <div>
                <input type="email" id="email" placeholder="E-mail" {...register('email')} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <input type={showPassword ? "text" : "password"} id="password" placeholder="Senha" {...register('password')} />
                <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}</span>
              </div>

              <Button color="blue" type="submit" disabled={isSubmitDisabled} >Entrar</Button>
            </form>
          </FormSection>
        </Main>

        <Footer>
          <p>Ainda não tem acesso?</p>
          <Button color="gray" onClick={() => window.location.href = '/create'} >Criar uma conta</Button>
        </Footer>
      </Container>

    </>
  )
}