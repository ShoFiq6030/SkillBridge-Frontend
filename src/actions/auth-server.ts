import { cookies } from "next/headers"

export const getUserInServer= async ()=>{
  const cookieStore = await cookies()
  const res= await fetch (`${process.env.API_URL}/api/auth/get-session`,{
    headers :{
      Cookie:cookieStore.toString()
    },
    cache:"no-store"
  })

  const session = await res.json()
  return session
}