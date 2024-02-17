import { prisma } from "@/lib/prisma"
import { authenticateUser } from "@/middleware/auth-middleware"
import type { NextApiRequest, NextApiResponse } from 'next'

interface IRequest {
  images: string[];
  title: string;
  description: string;
  isNew: boolean;
  price: number;
  userId: string;
  id: string;
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

  const {description,images,isNew,price,title, id}:IRequest = req.body

  const announcement = await prisma.announcement.findUnique({
    where: {
      id
    }
  })

  //authenticate announcement is of authenticated user
  if(announcement?.userId !== user.id) {
    return res.status(401).end()
  }

  await prisma.announcementImages.deleteMany({
    where: {
      announcementId: id
    }
  })

  await prisma.announcement.update({
    where: {
      id
    },
    data: {
      title,
      description,
      isNew,
      price,
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

  return res.status(204).end()
}