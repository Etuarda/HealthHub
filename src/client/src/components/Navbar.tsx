import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/auth'
import '../styles/navbar.css'

export default function Navbar(){
  const { user, logout } = useAuth()
  const nav = useNavigate()
  function handleLogout(){
    logout(); nav('/login')
  }
  return (
    <header className="nav">
      <div className="nav-left"><Link to="/home" className="brand">HealthHub</Link></div>
      <nav className="nav-mid">
        {user && (<>
          <Link to="/home">Shop</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/cart">Cart</Link>
        </>)}
      </nav>
      <div className="nav-right">
        {user
          ? <><span className="hello">Olá, {user.nome}</span><button className="btn" onClick={handleLogout}>Sair</button></>
          : <Link to="/login" className="btn">Login</Link>}
      </div>
    </header>
  )
}
