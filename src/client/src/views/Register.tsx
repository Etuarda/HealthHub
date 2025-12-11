import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import '../styles/forms.css'

export default function Register(){
  const nav = useNavigate()
  const [form,setForm] = React.useState({ nome:'', email:'', senha:'' })
  const [err,setErr] = React.useState('')
  async function handle(e:React.FormEvent){
    e.preventDefault(); setErr('')
    try{ await api('/register', form, 'POST'); nav('/login') }catch(e:any){ setErr(e?.message||'Erro ao registrar') }
  }
  return (
    <div className="card container-sm">
      <h2 className="center">Crie sua conta</h2>
      <form onSubmit={handle} className="stack">
        <label>Nome<input className="input" value={form.nome} onChange={e=>setForm({...form, nome:e.target.value})} placeholder="Digite seu nome"/></label>
        <label>Email<input className="input" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Digite seu email"/></label>
        <label>Senha<input className="input" type="password" value={form.senha} onChange={e=>setForm({...form, senha:e.target.value})} placeholder="Crie sua senha"/></label>
        {err && <div className="err">{err}</div>}
        <button className="btn">Cadastrar-se</button>
      </form>
      <p className="center mt-8">Já tem uma conta? <Link to="/login">Faça login</Link></p>
    </div>
  )
}
