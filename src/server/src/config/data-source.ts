import 'reflect-metadata'
import { DataSource } from 'typeorm'

import User from '../entities/User.js'
import Categoria from '../entities/Categoria.js'
import Produto from '../entities/Produto.js'
import Favorito from '../entities/Favorito.js'
import Pedido from '../entities/Pedido.js'
import PedidoItem from '../entities/PedidoItem.js'

const dbFile = process.env.DB_FILE || 'healthhub.sqlite'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: dbFile,
  synchronize: true,
  logging: false,
  entities: [User, Categoria, Produto, Favorito, Pedido, PedidoItem],
})
