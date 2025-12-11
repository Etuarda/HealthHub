import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './utils/auth'
import Navbar from './components/Navbar'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import Favorites from './views/Favorites'
import Cart from './views/Cart'
import CheckoutAddress from './views/CheckoutAddress'
import CheckoutPayment from './views/CheckoutPayment'
import OrderList from './views/OrderList'
import OrderDetail from './views/OrderDetail'
import Protected from './routes/Protected'

export default function App(){
  return (
    <AuthProvider>
      <Navbar/>
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

          <Route path="/home" element={<Protected><Home/></Protected>} />
          <Route path="/favorites" element={<Protected><Favorites/></Protected>} />
          <Route path="/cart" element={<Protected><Cart/></Protected>} />
          <Route path="/checkout/address" element={<Protected><CheckoutAddress/></Protected>} />
          <Route path="/checkout/payment" element={<Protected><CheckoutPayment/></Protected>} />
          <Route path="/orders" element={<Protected><OrderList/></Protected>} />
          <Route path="/orders/:id" element={<Protected><OrderDetail/></Protected>} />
          <Route path="*" element={<Navigate to="/home" replace/>}/>
        </Routes>
      </main>
    </AuthProvider>
  )
}
