import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/cart.css'

type CartItem = { produtoId:number; nome:string; preco:number; qtd:number }

export default function Cart(){
  const nav = useNavigate()
  const [items,setItems] = React.useState<CartItem[]>([])
  React.useEffect(()=>{
    setItems(JSON.parse(localStorage.getItem('hh_cart')||'[]'))
  },[])

  function setQtd(id:number, qtd:number){
    const next = items.map(i=> i.produtoId===id ? {...i, qtd: Math.max(1,qtd)} : i)
    setItems(next); localStorage.setItem('hh_cart', JSON.stringify(next))
  }
  function remove(id:number){
    const next = items.filter(i=>i.produtoId!==id)
    setItems(next); localStorage.setItem('hh_cart', JSON.stringify(next))
  }
  const subtotal = items.reduce((s,i)=> s + i.preco*i.qtd, 0)
  const frete = items.length ? 12 : 0
  const total = subtotal + frete

  return (
    <section className="container">
      <h2>Carrinho</h2>
      {items.length===0 && <div className="empty mt-24">Seu carrinho está vazio.</div>}
      {items.length>0 && (
        <div className="cart">
          {items.map(i=>(
            <div className="cart-row" key={i.produtoId}>
              <div className="cart-name">{i.nome}</div>
              <div className="cart-qtd">
                <button className="btn-outline" onClick={()=>setQtd(i.produtoId, i.qtd-1)}>-</button>
                <span>{i.qtd}</span>
                <button className="btn-outline" onClick={()=>setQtd(i.produtoId, i.qtd+1)}>+</button>
              </div>
              <div className="cart-price">R$ {(i.preco*i.qtd).toFixed(2)}</div>
              <button className="btn-outline" onClick={()=>remove(i.produtoId)}>Remover</button>
            </div>
          ))}
          <div className="cart-summary">
            <div>Subtotal: <strong>R$ {subtotal.toFixed(2)}</strong></div>
            <div>Frete: <strong>R$ {frete.toFixed(2)}</strong></div>
            <div>Total: <strong>R$ {total.toFixed(2)}</strong></div>
          </div>
          <div className="row right">
            <Link to="/checkout/address" className="btn">Continuar</Link>
          </div>
        </div>
      )}
    </section>
  )
}
