import Pusher from "pusher";
import PusherClient from 'pusher-js'


export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID ?? '',
  key: process.env.PUSHER_APP_KEY ?? '',
  secret: process.env.PUSHER_APP_SECRET ?? '',
  cluster: process.env.PUSHER_APP_CLUSTER ?? '',
  useTLS: false,
})

export const pusherClient = new PusherClient(process.env.PUSHER_APP_KEY ?? '', {
  cluster: process.env.PUSHER_APP_CLUSTER  ?? '',
})