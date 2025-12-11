import { EntitySchema } from 'typeorm'

export interface IFavorito { id:number; user:any; produto:any }

export default new EntitySchema<IFavorito>({
  name: 'Favorito',
  tableName: 'favoritos',
  columns: {
    id: { type:Number, primary:true, generated:true }
  },
  relations: {
    user: { type:'many-to-one', target:'User', joinColumn:true, nullable:false, onDelete:'CASCADE' },
    produto: { type:'many-to-one', target:'Produto', joinColumn:true, nullable:false, onDelete:'CASCADE' }
  },
  uniques: [
    { columns: ['user','produto'] }
  ]
})
