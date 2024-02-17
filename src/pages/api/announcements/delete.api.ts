import { prisma } from "@/lib/prisma"
import { authenticateUser } from "@/middleware/auth-middleware"
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method} = req
  if(method !== 'DELETE') {
    return res.status(405).end()
  }

  //authenticate user
  const user = await authenticateUser(req, res)

  if(!user) {
    return res.status(404).send('User not found!')
  }

  const {id} = req.body

  const announcement = await prisma.announcement.findUnique({
    where: {
      id
    }
  })

  // announcement was found?
  if(!announcement) {
    return res.status(404).send('Announcement not found!')
  }

  // announcement own to authenticate user
  if(announcement?.userId !== user.id) {
    return res.status(401).end()
  }

  await prisma.announcement.delete({
    where: {
      id
    },
  })

  return res.status(204).end()
}