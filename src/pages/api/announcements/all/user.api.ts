import { prisma } from "@/lib/prisma"
import { authenticateUser } from "@/middleware/auth-middleware"
import type { NextApiRequest, NextApiResponse } from 'next'

interface IRequest {
  userId: string
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method} = req
  if(method !== 'GET') {
    return res.status(405).end()
  }

  // authenticate user
  const user = await authenticateUser(req, res)

  if(!user) {
    return res.status(404).send('User not found!')
  }

  // get all user announcements
  const announcements = await prisma.announcement.findMany({
    where: {
      userId: user.id,
    },
    include: {
      user: {
        select: {
          avatar_url: true,
        }
      },
      AnnouncementImages: {
        select: {
          image_url: true,
        }
      }
    },
    orderBy: {
      created_at: 'desc',
    }
  })

  const announcementFormatted = announcements.map(announcement => {
    return {
      id: announcement.id,
      title: announcement.title,
      isNew: announcement.isNew,  
      price: announcement.price,   
      available: announcement.available,
      created_at: announcement.created_at,
      avatar_url: announcement.user.avatar_url,
      cover: announcement.AnnouncementImages[0].image_url 
    }
  })

  return res.status(201).json(announcementFormatted)
}