import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/auth'
import '../styles/forms.css'

export default function Login(){
  const { login } = useAuth()
  const nav = useNavigate()
  const [email,setEmail] = React.useState('')
  const [senha,setSenha] = React.useState('')
  const [err,setErr] = React.useState('')

  async function handle(e:React.FormEvent){
    e.preventDefault(); setErr('')
    try{ await login(email,senha); nav('/home') }catch(e:any){ setErr(e?.message||'Credenciais inválidas') }
  }
  return (
    <div className="card container-sm">
      <h2 className="center">Seja bem-vindo</h2>
      <form onSubmit={handle} className="stack">
        <label>Email<input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Entre com seu email"/></label>
        <label>Senha<input className="input" type="password" value={senha} onChange={e=>setSenha(e.target.value)} placeholder="Entre com sua senha"/></label>
        {err && <div className="err">{err}</div>}
        <button className="btn">Entrar</button>
      </form>
      <p className="center mt-8">Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
    </div>
  )
}
