import { Button } from "@/styles/button";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { Container } from "@/pages/styles";
import { pusherClient } from "@/lib/pusher";

interface Message {
  id: string;
  text: string;
  senderUser: string;
  chatRoomId: string;
  created_at: Date;
}

export default function Messages() {
  const [incomingMessages, setIncomingMessages] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [existingMessages, setExistingMessages] = useState<Message[]>([])
  const [roomId, setRoomId] = useState('7e58df52-207d-4f99-90c1-47a4fa6852f7')

  pusherClient.subscribe(roomId)

  pusherClient.bind('incoming-message', (text: string) => {
    setIncomingMessages((prev) => [...prev, text])
  })

  return () => {
    pusherClient.unsubscribe(roomId)
  }
  async function getMessages() {
    try {
      const response = await api.get(`message/get?roomId=${roomId}`)
      const {messages} = await response.data
      console.log(messages)
      setExistingMessages(messages)
    } catch (error) {
      console.log(error)
    }
  }

  async function createRoom () {
    try {
      const response  = await api.post('chatroom/create')
      const {roomId} = await response.data
      setRoomId(roomId)
    } catch (error) {
      console.log(error)
    }
  }

  async function sendMessage() {
    try {
      await api.post('message/create', {
        text: inputValue,
        roomId
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container>
      <h1>Mensagens</h1>
      <Button color={"black"} onClick={createRoom}>create room</Button>
      <input type="text" value={inputValue} placeholder="sua mensagem aqui" onChange={({target})=> setInputValue(target.value)}/>
      <Button color={"black"} onClick={sendMessage}>enviar mensagem</Button>
      <Button color={"black"} onClick={getMessages}>todas mensagens</Button>
      <div>
        {existingMessages.map((message)=> {
          return (
            <p key={message.id}>{message.text}</p>
          )
        })}
        {incomingMessages.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
    </Container>
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