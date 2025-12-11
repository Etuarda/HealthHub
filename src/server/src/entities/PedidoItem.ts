import { EntitySchema } from 'typeorm'

export interface IPedidoItem {
  id:number; pedido:any; produto:any; qtd:number; preco:number
}

export default new EntitySchema<IPedidoItem>({
  name: 'PedidoItem',
  tableName: 'pedido_itens',
  columns: {
    id: { type:Number, primary:true, generated:true },
    qtd: { type:Number },
    preco: { type:Number }
  },
  relations: {
    pedido: { type:'many-to-one', target:'Pedido', joinColumn:true, nullable:false, onDelete:'CASCADE' },
    produto: { type:'many-to-one', target:'Produto', joinColumn:true, nullable:false }
  }
})
