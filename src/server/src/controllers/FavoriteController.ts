import { Request, Response } from 'express'
import { AppDataSource } from '../config/data-source.js'
import { IFavorito } from '../entities/Favorito.js'

export class FavoriteController {
  static async list(req:Request,res:Response){
    const userId = (req as any).auth.userId
    const repo = AppDataSource.getRepository<IFavorito>('Favorito')
    const favs = await repo.find({ where:{ user:{ id:userId } }, relations:['produto'] })
    return res.json(favs.map(f=>f.produto))
  }

  static async add(req:Request,res:Response){
    const userId = (req as any).auth.userId
    const produtoId = Number(req.params.produtoId)
    const repo = AppDataSource.getRepository<IFavorito>('Favorito')
    try{
      await repo.save(repo.create({ user:{ id:userId }, produto:{ id:produtoId } }))
    }catch{}
    return res.status(201).end()
  }

  static async remove(req:Request,res:Response){
    const userId = (req as any).auth.userId
    const produtoId = Number(req.params.produtoId)
    const repo = AppDataSource.getRepository<IFavorito>('Favorito')
    await repo.delete({ user:{ id:userId }, produto:{ id:produtoId } } as any)
    return res.status(204).end()
  }
}
