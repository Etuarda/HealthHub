import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/forms.css'

export default function CheckoutAddress(){
  const nav = useNavigate()
  const [endereco, setEndereco] = React.useState(
    localStorage.getItem('hh_checkout_addr') || 'Rua Exemplo, 123, Centro, Cidade - BR'
  )
  function next(e:React.FormEvent){ e.preventDefault(); localStorage.setItem('hh_checkout_addr', endereco); nav('/checkout/payment') }
  return (
    <div className="card container-lg">
      <h2>Endereço de entrega</h2>
      <form onSubmit={next} className="stack">
        <label>Endereço completo
          <textarea className="input" rows={3} value={endereco} onChange={e=>setEndereco(e.target.value)}/>
        </label>
        <button className="btn">Continuar</button>
      </form>
    </div>
  )
}
