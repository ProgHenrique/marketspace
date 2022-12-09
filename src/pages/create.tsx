import Head from "next/head";
import Image from "next/image";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { AvatarDiv, Container, Footer, FormSection, LogoSection } from "../styles/pages/create";
import logo from "../assets/logo.svg";
import { ChangeEvent, useState } from "react";
import { Button } from "../styles/button";
import { Eye, EyeSlash, PencilSimpleLine } from "phosphor-react";
import avatar from "../assets/avatar.svg";

const createAccountFormValidationSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  phone: zod.number(),
  password: zod.string(),
  confirmPassword: zod.string(),
})

type CreateAccountFormData = zod.infer<typeof createAccountFormValidationSchema>

export default function Create() {
  const [showPassword, setShowPassword] = useState(false)
  const [file, setFile] = useState<File>()

  const { handleSubmit, watch, reset, register } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountFormValidationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  })

  function handleCreateAccount() {}
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }
  const isSubmitDisabled = watch('email') && watch('password') ? false : true;
  return (
    <>
      <Head>
        <title>Nova conta | Marketspace</title>
      </Head>
      <Container>
        <main>
          <LogoSection>
            <Image src={logo} alt="" height={40} />
            <h1>Boas vindas!</h1>
            <p>Crie sua conta e use o espaço para comprar itens variados e vender seus produtos</p>
          </LogoSection>

          <FormSection>

            <AvatarDiv>
              <Image src={file ? URL.createObjectURL(file) : avatar} alt="" height={88} width={88} />
              <button onClick={() => {
                document.getElementById('userAvatar')?.click();
              }}><PencilSimpleLine size={16} /></button>
              <input type="file" accept="image/png, image/jpeg, image/jpg" name="file" id="userAvatar" onChange={handleFileChange} />
            </AvatarDiv>

            <form onSubmit={handleSubmit(handleCreateAccount)}>
              <div>
                <input type="text" id="name" placeholder="Nome" {...register('name')} />
              </div>

              <div>
                <input type="email" id="email" placeholder="E-mail" {...register('email')} />
              </div>

              <div>
                <input type="text" id="phone" placeholder="Telefone" {...register('phone')} />
              </div>

              <div>
                <input type={showPassword ? "text" : "password"} id="password" placeholder="Senha" {...register('password')} />
                <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}</span>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <input type={showPassword ? "text" : "password"} id="confirmPassword" placeholder="Confirmar senha" {...register('confirmPassword')} />
              </div>

              <Button color="black" type="submit" disabled={isSubmitDisabled} >Criar</Button>
            </form>
          </FormSection>
        </main>

        <Footer>
          <p>Já tem uma conta?</p>
          <Button color="gray" onClick={() => window.location.href = '/login'} >Ir para o login</Button>
        </Footer>
      </Container>
    </>
  )
}