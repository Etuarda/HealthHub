import React from 'react'
import { Link } from 'react-router-dom'
import { api } from '../utils/api'
import '../styles/orders.css'

type Pedido = { id:number; status:string; total:number }

export default function OrderList(){
  const [data,setData] = React.useState<{items:Pedido[]}>({ items:[] })
  const [err,setErr] = React.useState('')
  React.useEffect(()=>{ api('/pedidos').then(setData).catch(e=>setErr(String(e?.message||e))) },[])

  return (
    <section className="container">
      <h2>Meus pedidos</h2>
      {err && <div className="err mt-16">{err}</div>}
      {data.items.length===0 && <div className="empty mt-24">Você ainda não tem pedidos.</div>}
      <div className="list">
        {data.items.map(p=>(
          <Link to={`/orders/${p.id}`} key={p.id} className="order-row">
            <span>#{p.id}</span>
            <span className={"badge "+p.status}>{p.status}</span>
            <span>R$ {Number(p.total).toFixed(2)}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
