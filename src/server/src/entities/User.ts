import { EntitySchema } from 'typeorm'

export interface IUser {
  id: number
  nome: string
  email: string
  senhaHash: string
  favoritos?: any[]
  pedidos?: any[]
}

export default new EntitySchema<IUser>({
  name: 'User',
  tableName: 'users',
  columns: {
    id: { type: Number, primary: true, generated: true },
    nome: { type: String },
    email: { type: String, unique: true },
    senhaHash: { type: String }
  },
  relations: {
    favoritos: { type: 'one-to-many', target: 'Favorito', inverseSide: 'user' },
    pedidos: { type: 'one-to-many', target: 'Pedido', inverseSide: 'user' }
  }
})
