import React from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import '../styles/forms.css'

export default function CheckoutPayment(){
  const nav = useNavigate()
  const [card,setCard] = React.useState({ numero:'4111111111111111', nome:'E DUARDA', validade:'12/28', cvv:'123' })
  const [err,setErr] = React.useState('')
  async function pay(e:React.FormEvent){
    e.preventDefault(); setErr('')
    try{
      const cart = JSON.parse(localStorage.getItem('hh_cart')||'[]')
      if(!cart.length) throw new Error('Carrinho vazio')
      const endereco = localStorage.getItem('hh_checkout_addr')||'Sem endereço'
      const pedido = await api('/pedidos', { itens: cart.map((c:any)=>({ produtoId:c.produtoId, qtd:c.qtd })), endereco }, 'POST')
      await api(`/pedidos/${pedido.id}/pagar`, undefined, 'POST')
      localStorage.removeItem('hh_cart')
      nav(`/orders/${pedido.id}`)
    }catch(e:any){ setErr(e?.message||'Erro ao pagar') }
  }
  return (
    <div className="card container-lg">
      <h2>Método de pagamento</h2>
      <form onSubmit={pay} className="stack">
        <label>Número do cartão<input className="input" value={card.numero} onChange={e=>setCard({...card, numero:e.target.value})}/></label>
        <label>Nome impresso<input className="input" value={card.nome} onChange={e=>setCard({...card, nome:e.target.value})}/></label>
        <div className="row">
          <label>Validade<input className="input" value={card.validade} onChange={e=>setCard({...card, validade:e.target.value})}/></label>
          <label>CVV<input className="input" value={card.cvv} onChange={e=>setCard({...card, cvv:e.target.value})}/></label>
        </div>
        {err && <div className="err">{err}</div>}
        <button className="btn">Pagar</button>
      </form>
    </div>
  )
}
