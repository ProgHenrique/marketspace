import { api } from "@/lib/axios";
import { parseCookies, setCookie } from "nookies";
import Router from 'next/router'
import { ReactNode, createContext, useEffect, useState } from "react"

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  avatar_url: string | null;
  created_at: Date;
}

export type Announcement = {
  id: string;
  title: string;
  isNew: boolean;  
  price: number;   
  available: boolean;
  avatar_url: string;
  cover: string;
}

export type saveNewAnnouncement = {
  images: string[];
  title: string;
  description: string;
  isNew: boolean;
  price: number;
  userId: string;
}

export type PreAnnouncement = {
  title: string;
  isNew: boolean;  
  price: number;
  description: string;
  images: string[];
}

type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | undefined;
  preAnnouncement: PreAnnouncement;
  signIn: ({ email, password }: SignInData)=> Promise<void>;
  createPreAnnouncement: ({description,images,isNew,price,title}: PreAnnouncement)=> void;
  saveAnnouncementOnDatabase: ({description,images,isNew,price,title,userId}: saveNewAnnouncement) => Promise<void>;
}

type IResponse = {
  token: string;
  user: User;
}

export const AuthContext = createContext({} as AuthContextType)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const [preAnnouncement, setPreAnnouncement] = useState<PreAnnouncement>({
    description: '',
    images: [],
    isNew: false,
    price: 0,
    title: ''
  })
  const isAuthenticated = !!user

  // get user by cookies
  useEffect(()=> {
    const { 'marketspace.token': token } = parseCookies()
    if(token) {
      api.get('users').then((response) => setUser(response.data))
    }
  },[])

  // get pre-announcement on local storage
  useEffect(() => {
    const stateJSON = localStorage.getItem('@marketspace:pre-announcement') || ''
    if(stateJSON) {
      setPreAnnouncement(JSON.parse(stateJSON))
      return 
    }
  }, [])

  // login create token on cookie
  async function signIn({email, password}: SignInData) {
    try {
      const response = await api.post('users/authenticate', {
        email, password
      })
      const {token, user }: IResponse = response.data
      setCookie(undefined, 'marketspace.token', token,{
        maxAge: 60 * 60 * 24, // 24 hours(1 day)
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`
      setUser(user)

      Router.push('/')

    } catch (error) {
    }
  }

  // pre announcement of new announcement
  async function createPreAnnouncement({description,images,isNew,price,title}: PreAnnouncement) {
    const preAnnouncement = {description,images,isNew,price,title}
    const stateJSON = JSON.stringify(preAnnouncement)
    localStorage.setItem('@marketspace:pre-announcement', stateJSON)
    setPreAnnouncement(preAnnouncement)
  }

  // create a new announcement
  async function saveAnnouncementOnDatabase ({description,images,isNew,price,title,userId}:saveNewAnnouncement ) {
    try {
      await api.post('announcements/create', {
        description,images,isNew,price,title,userId
      })
    
      localStorage.removeItem('@marketspace:pre-announcement')

    } catch (error) {
      
    }
  }

  return (
    <AuthContext.Provider value={{user, isAuthenticated, preAnnouncement, signIn, createPreAnnouncement, saveAnnouncementOnDatabase}}>
      {children}
    </AuthContext.Provider>
  )
}