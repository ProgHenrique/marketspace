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

  const user = await authenticateUser(req, res)
  if(!user) {
    return res.status(404).send('user not found')
  }

  return res.status(200).json(user)
}