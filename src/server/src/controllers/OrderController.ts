import { Request, Response } from 'express'
import { AppDataSource } from '../config/data-source.js'
import { IPedido } from '../entities/Pedido.js'
import { IPedidoItem } from '../entities/PedidoItem.js'
import { IProduto } from '../entities/Produto.js'

export class OrderController {
  static async create(req:Request,res:Response){
    const userId = (req as any).auth.userId
    const { itens, endereco } = req.body||{}
    if(!Array.isArray(itens) || itens.length===0) return res.status(400).json({ error:'Itens obrigatórios' })
    if(!endereco) return res.status(400).json({ error:'Endereço obrigatório' })
    const repoPedido = AppDataSource.getRepository<IPedido>('Pedido')
    const repoItem = AppDataSource.getRepository<IPedidoItem>('PedidoItem')
    const repoProd = AppDataSource.getRepository<IProduto>('Produto')

    let total = 0
    const pedido = repoPedido.create({ user:{ id:userId }, endereco, status:'payment_pending', total:0, tracking: ['payment_pending'] })
    await repoPedido.save(pedido)

    for(const it of itens){
      const prod = await repoProd.findOneBy({ id: Number(it.produtoId) })
      if(!prod) continue
      const qtd = Number(it.qtd||1)
      const preco = Number(prod.preco)
      total += qtd * preco
      await repoItem.save(repoItem.create({ pedido:{ id:pedido.id }, produto:{ id:prod.id }, qtd, preco }))
    }
    pedido.total = total
    await repoPedido.save(pedido)
    return res.json({ id: pedido.id, status: pedido.status })
  }

  static async pay(req:Request,res:Response){
    const userId = (req as any).auth.userId
    const id = Number(req.params.id)
    const repo = AppDataSource.getRepository<IPedido>('Pedido')
    const pedido = await repo.findOne({ where:{ id, user:{ id:userId } } })
    if(!pedido) return res.status(404).json({ error:'Pedido não encontrado' })
    pedido.status = 'paid'
    const t = Array.isArray(pedido.tracking) ? pedido.tracking : []
    t.push('paid')
    pedido.tracking = t
    await repo.save(pedido)
    return res.json({ id: pedido.id, status: pedido.status })
  }

  static async list(req:Request,res:Response){
    const userId = (req as any).auth.userId
    const repo = AppDataSource.getRepository<IPedido>('Pedido')
    const itens = await repo.find({ where:{ user:{ id:userId } }, order:{ id:'DESC' } })
    return res.json({ items: itens, total: itens.length, page:1, pages:1 })
  }

  static async get(req:Request,res:Response){
    const userId = (req as any).auth.userId
    const id = Number(req.params.id)
    const repo = AppDataSource.getRepository<IPedido>('Pedido')
    const item = await repo.findOne({ where:{ id, user:{ id:userId } }, relations:['itens','itens.produto'] })
    if(!item) return res.status(404).json({ error:'Pedido não encontrado' })
    return res.json(item)
  }
}
