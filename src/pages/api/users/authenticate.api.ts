import type { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcrypt'
import {sign } from 'jsonwebtoken'
import { prisma } from "@/lib/prisma"

type IResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    avatar_url: string | null;
    created_at: Date;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method} = req
  if(method !== 'POST') {
    return res.status(405).end()
  }

  const {email, password} = req.body

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if(!user) {
    return res.status(401).send('Email or password incorrect!')
  }

  const passwordMatch = await compare(password, user.password)

  if(!passwordMatch) {
    return res.status(401).send('Email or password incorrect!')
  }

  const token = sign({email}, '589beaff4a1fe045f44812a39b00abad', {
    subject: user.id,
    expiresIn: '1d'
  })

  const successfulResponse: IResponse = {
    token,
    user
  }

  return res.json(successfulResponse)
}