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

  // authenticate user
  const user = await authenticateUser(req, res)

  if(!user) {
    return res.status(404).send('User not found!')
  }

  const {id} = req.query

  const announcement = await prisma.announcement.findUnique({
    where: {
      id: String(id),
    },
    include: {
      user: {
        select: {
          avatar_url: true,
          name: true,
          id: true,
        }
      },
      AnnouncementImages: {
        select: {
          image_url: true,
        }
      }
    }
  })

  // announcement was found?
  if(!announcement) {
    return res.status(404).send('Announcement not found!')
  }

  // announcement is own of authenticated user
  if(announcement.userId !== user.id) {
    return res.status(401).end()
  }

  const images = announcement.AnnouncementImages.map(image => image.image_url)

  const announcementFormatted = {
    id: announcement.id, 
    title: announcement.title, 
    description: announcement.description, 
    isNew: announcement.isNew, 
    price: announcement.price, 
    available: announcement.available, 
    created_at: announcement.created_at,
    user: announcement.user,
    images 
  }

  return res.status(201).json(announcementFormatted)
}