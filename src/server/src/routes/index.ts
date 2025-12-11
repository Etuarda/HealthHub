import { Router } from 'express'
import { AuthController } from '../controllers/AuthController.js'
import { ProductController } from '../controllers/ProductController.js'
import { FavoriteController } from '../controllers/FavoriteController.js'
import { OrderController } from '../controllers/OrderController.js'
import { requireAuth } from '../middlewares/auth.js'

export const router = Router()

// Auth
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)

// Produtos
router.get('/produtos', requireAuth, ProductController.list)
router.get('/produtos/:id', requireAuth, ProductController.get)

// Favoritos
router.get('/favoritos', requireAuth, FavoriteController.list)
router.post('/favoritos/:produtoId', requireAuth, FavoriteController.add)
router.delete('/favoritos/:produtoId', requireAuth, FavoriteController.remove)

// Pedidos
router.post('/pedidos', requireAuth, OrderController.create)
router.post('/pedidos/:id/pagar', requireAuth, OrderController.pay)
router.get('/pedidos', requireAuth, OrderController.list)
router.get('/pedidos/:id', requireAuth, OrderController.get)
