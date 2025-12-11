import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../utils/api'
import '../styles/orders.css'

type Item = { id:number; qtd:number; preco:number; produto:{ id:number; nome:string } }
type Pedido = { id:number; status:string; total:number; endereco:string; itens:Item[]; tracking?:string[] }

export default function OrderDetail(){
  const { id } = useParams()
  const [pedido,setPedido] = React.useState<Pedido|null>(null)
  const [err,setErr] = React.useState('')
  React.useEffect(()=>{ api(`/pedidos/${id}`).then(setPedido).catch(e=>setErr(String(e?.message||e))) },[id])

  if(err) return <div className="err mt-16">{err}</div>
  if(!pedido) return null

  return (
    <section className="container">
      <h2>Pedido #{pedido.id}</h2>
      <div className="card">
        <div><strong>Status:</strong> <span className={"badge "+pedido.status}>{pedido.status}</span></div>
        <div><strong>Endereço:</strong> {pedido.endereco}</div>
        <div className="mt-8"><strong>Itens:</strong></div>
        <ul className="ul">
          {pedido.itens.map(i=>(<li key={i.id}>{i.qtd}× {i.produto?.nome} — R$ {(i.preco*i.qtd).toFixed(2)}</li>))}
        </ul>
        <div className="mt-8"><strong>Total:</strong> R$ {Number(pedido.total).toFixed(2)}</div>
        <div className="mt-8"><strong>Tracking:</strong> {(pedido.tracking||[]).join(' → ')}</div>
      </div>
      <div className="row mt-16">
        <Link to="/orders" className="btn-outline">Voltar</Link>
        <Link to="/home" className="btn">Continuar comprando</Link>
      </div>
    </section>
  )
}
