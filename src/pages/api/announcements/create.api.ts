import { prisma } from "@/lib/prisma"
import { authenticateUser } from "@/middleware/auth-middleware";
import type { NextApiRequest, NextApiResponse } from 'next'

interface IRequest {
  images: string[];
  title: string;
  description: string;
  isNew: boolean;
  price: number;
  userId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method} = req
  if(method !== 'POST') {
    return res.status(405).end()
  }
  
  // authenticate user
  const user  = await authenticateUser(req, res)

  if(!user) {
    return res.status(404).send('User not found!')
  }

  const {description,images,isNew,price,title, userId}:IRequest = req.body

  const announcement = await prisma.announcement.create({
    data: {
      description,
      isNew,
      price,
      title,
      userId,
    }
  })

  images.map(async (image) => {
    await prisma.announcementImages.create({
      data: {
        image_url: image,
        announcementId: announcement.id
      }
    })
  })

  return res.status(201).json(announcement)
}