import React from 'react'
import { api } from '../utils/api'
import ProductCard from '../components/ProductCard'
import '../styles/products.css'

type Produto = { id:number; nome:string; descricao?:string; preco:number; imagem?:string }

export default function Favorites(){
  const [items,setItems] = React.useState<Produto[]>([])
  const [err,setErr] = React.useState('')
  React.useEffect(()=>{ api('/favoritos').then(setItems).catch(e=>setErr(String(e?.message||e))) },[])

  async function toggleFav(id:number){
    try{
      const exists = items.find(p=>p.id===id)
      if(exists){
        await api(`/favoritos/${id}`, undefined, 'DELETE')
        setItems(items.filter(p=>p.id!==id))
      }
    }catch(e:any){ setErr(e?.message||'Erro') }
  }
  function addToCart(p:Produto){
    const cart = JSON.parse(localStorage.getItem('hh_cart')||'[]')
    const ix = cart.findIndex((i:any)=>i.produtoId===p.id)
    if(ix>=0) cart[ix].qtd++; else cart.push({ produtoId:p.id, nome:p.nome, preco:p.preco, qtd:1 })
    localStorage.setItem('hh_cart', JSON.stringify(cart))
    alert('Adicionado ao carrinho')
  }
  return (
    <section className="container">
      <h2>Favoritos</h2>
      {err && <div className="err mt-16">{err}</div>}
      {items.length===0 && <div className="empty mt-24">Nenhum favorito.</div>}
      <div className="grid">
        {items.map(p=>(<ProductCard key={p.id} item={p} onAdd={addToCart} fav onToggleFav={toggleFav}/>))}
      </div>
    </section>
  )
}
