import { EntitySchema } from 'typeorm'

export interface IProduto {
  id:number; nome:string; descricao?:string; preco:number;
  disponivel:boolean; imagem?:string; categoria?: any
}

export default new EntitySchema<IProduto>({
  name: 'Produto',
  tableName: 'produtos',
  columns: {
    id: { type:Number, primary:true, generated:true },
    nome: { type:String, nullable:false },
    descricao: { type:String, nullable:true },
    preco: { type:Number, nullable:false, default:0 },
    disponivel: { type:Boolean, default:true },
    imagem: { type:String, nullable:true }
  },
  relations: {
    categoria: { type:'many-to-one', target:'Categoria', joinColumn:true, nullable:true }
  }
})
