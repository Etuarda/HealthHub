import { Request, Response } from 'express'
import { AppDataSource } from '../config/data-source.js'
import { IProduto } from '../entities/Produto.js'

export class ProductController {
  static async list(req:Request,res:Response){
    const repo = AppDataSource.getRepository<IProduto>('Produto')
    const q = String(req.query.q||'').trim().toLowerCase()
    const page = Math.max(1, Number(req.query.page||1))
    const limit = Math.min(24, Math.max(1, Number(req.query.limit||12)))
    const skip = (page-1)*limit

    const qb = repo.createQueryBuilder('p')
      .leftJoinAndSelect('p.categoria','c')
      .where('p.disponivel = :d', { d:true })

    if(q){
      qb.andWhere('(lower(p.nome) like :q OR lower(p.descricao) like :q)', { q: '%'+q+'%' })
    }

    const [items,total] = await qb.orderBy('p.id','DESC').skip(skip).take(limit).getManyAndCount()
    return res.json({ items, page, limit, total, pages: Math.ceil(total/limit) })
  }

  static async get(req:Request,res:Response){
    const repo = AppDataSource.getRepository<IProduto>('Produto')
    const item = await repo.findOne({ where:{ id:Number(req.params.id) }, relations:['categoria'] })
    if(!item) return res.status(404).json({ error:'Produto não encontrado' })
    return res.json(item)
  }
}
