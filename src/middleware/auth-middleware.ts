import { prisma } from "@/lib/prisma";
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

interface IPayload {
  sub: string;
}

// authentication ofr user, check token and existence of user
export async function authenticateUser(req:NextApiRequest, res: NextApiResponse){
  const authHeader = req.headers.authorization

  if(!authHeader) {
    return res.status(401).send("Token missing.")
  }
 
  const [, token] = authHeader.split(' ');

  try {
    const {sub: id} = verify(token, '589beaff4a1fe045f44812a39b00abad') as IPayload;
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return user 
  } catch (error) {
  }
}