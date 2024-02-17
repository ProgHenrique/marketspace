import { prisma } from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcrypt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method} = req
  if(method !== 'POST') {
    return res.status(405).end()
  }

  const {name, email, phone, password, avatar_url} = req.body

  const userExists = await prisma.user.findUnique({
    where: {
      email
    },
  })

  if(userExists) {
    return res.status(400).send('User already exists.')
  }

  const passwordHash = await hash(password, 8)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password: passwordHash,
      avatar_url
    }
  })

  return res.status(201).json(user)
}