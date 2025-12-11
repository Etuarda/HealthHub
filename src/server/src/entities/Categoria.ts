import { EntitySchema } from 'typeorm'

export interface ICategoria { id:number; nome:string; descricao?:string }

export default new EntitySchema<ICategoria>({
  name: 'Categoria',
  tableName: 'categorias',
  columns: {
    id: { type:Number, primary:true, generated:true },
    nome: { type:String, nullable:false },
    descricao: { type:String, nullable:true }
  }
})
