import { prisma } from "@/lib/prisma"
import { authenticateUser } from "@/middleware/auth-middleware"
import { hash } from "bcrypt";
import type { NextApiRequest, NextApiResponse } from 'next'

interface IRequest {
  email: string;
  name: string;
  password: string;
  phone: string;
  avatar_url: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method} = req
  if(method !== 'PUT') {
    return res.status(405).end()
  }

  //authenticate user
  const user = await authenticateUser(req, res)

  if(!user) {
    return res.status(404).send('User not found!')
  }

  const {email,name,password,phone, avatar_url}:IRequest = req.body
  const passwordHash = await hash(password, 8)

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      avatar_url,
      email,
      name,
      password: passwordHash,
      phone
    }
  })

  return res.status(204).end()
}