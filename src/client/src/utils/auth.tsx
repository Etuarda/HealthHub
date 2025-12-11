import React, { createContext, useContext } from 'react'
import { api } from './api'

type User = { id:number; nome:string; email:string }
type Ctx = {
  user: User | null
  loading: boolean
  login: (email:string, senha:string)=>Promise<void>
  logout: ()=>void
}
const AuthContext = createContext<Ctx>({} as any)

export function AuthProvider({ children }:{ children:React.ReactNode }){
  const [user,setUser] = React.useState<User|null>(null)
  const [loading,setLoading] = React.useState(true)

  React.useEffect(()=>{
    try{
      const raw = localStorage.getItem('hh_auth')
      if(raw){
        const { token, user } = JSON.parse(raw)
        if(token && user){ localStorage.setItem('hh_token', token); setUser(user) }
      }
    } finally { setLoading(false) }
  },[])

  async function login(email:string, senha:string){
    const resp = await api('/login',{ email, senha },'POST')
    localStorage.setItem('hh_token', resp.token)
    localStorage.setItem('hh_auth', JSON.stringify(resp))
    setUser(resp.user)
  }
  function logout(){ localStorage.removeItem('hh_token'); localStorage.removeItem('hh_auth'); setUser(null) }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = ()=>useContext(AuthContext)
