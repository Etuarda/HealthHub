import { Request, Response } from 'express'
import { AppDataSource } from '../config/data-source.js'
import { IUser } from '../entities/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET||'dev-secret'
const JWT_EXPIRES = process.env.JWT_EXPIRES||'2h'

export class AuthController {
  static async register(req:Request,res:Response){
    const { nome, email, senha } = req.body||{}
    if(!nome || !email || !senha) return res.status(400).json({ error:'Campos obrigatórios' })
    const repo = AppDataSource.getRepository<IUser>('User')
    const exists = await repo.findOne({ where: { email } })
    if(exists) return res.status(400).json({ error:'Email já cadastrado' })
    const senhaHash = await bcrypt.hash(senha, 10)
    const user = await repo.save(repo.create({ nome, email, senhaHash }))
    return res.json({ id:user.id, nome:user.nome, email:user.email })
  }

  static async login(req:Request,res:Response){
    const { email, senha } = req.body||{}
    const repo = AppDataSource.getRepository<IUser>('User')
    const user = await repo.findOne({ where: { email } })
    if(!user) return res.status(400).json({ error:'Credenciais inválidas' })
    const ok = await bcrypt.compare(senha, user.senhaHash)
    if(!ok) return res.status(400).json({ error:'Credenciais inválidas' })
    const token = jwt.sign({ sub:user.id, email:user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES })
    return res.json({ token, user:{ id:user.id, nome:user.nome, email:user.email } })
  }

  static async logout(_req:Request,res:Response){
    return res.status(204).end()
  }
}
