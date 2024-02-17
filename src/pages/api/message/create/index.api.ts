import { prisma } from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher"
import { authenticateUser } from "@/middleware/auth-middleware"
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method} = req
  if(method !== 'POST') {
    return res.status(405).end()
  }

  //authenticate user
  const user = await authenticateUser(req, res)

  if(!user) {
    return res.status(404).send('User not found!')
  }

  const {roomId, text} = req.body
  pusherServer.trigger(roomId, 'incoming-message', text)

  await prisma.chatRoom.update({
    where: {
      id: roomId,
    },
    data: {
      messages: {
        create: {
          text,
          senderUser: user.id
        }
      }
    }
  })

  return res.status(204).end()
}