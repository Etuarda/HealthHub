import { EntitySchema } from 'typeorm'

export interface IPedido {
  id:number; user:any; endereco:string; status:string; total:number;
  itens:any[]; tracking:string[]
}

export default new EntitySchema<IPedido>({
  name: 'Pedido',
  tableName: 'pedidos',
  columns: {
    id: { type:Number, primary:true, generated:true },
    endereco: { type:String },
    status: { type:String, default: 'payment_pending' },
    total: { type:Number, default: 0 },
    tracking: { type: 'simple-json', nullable: true }
  },
  relations: {
    user: { type:'many-to-one', target:'User', joinColumn:true, nullable:false },
    itens: { type:'one-to-many', target:'PedidoItem', inverseSide:'pedido', cascade: true }
  }
})
