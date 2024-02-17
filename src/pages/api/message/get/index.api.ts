import { prisma } from "@/lib/prisma"
import { authenticateUser } from "@/middleware/auth-middleware"
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method} = req
  if(method !== 'GET') {
    return res.status(405).end()
  }

  //authenticate user
  const user = await authenticateUser(req, res)

  if(!user) {
    return res.status(404).send('User not found!')
  }

  const {roomId} = req.query

  const messages = await prisma.message.findMany({
    where: {
      chatRoomId: String(roomId)
    },
    orderBy: {
      created_at: 'asc'
    }
  })

  return res.json({messages})
}