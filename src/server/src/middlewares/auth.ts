import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function requireAuth(req:Request,res:Response,next:NextFunction){
  const h = req.headers.authorization||''
  const token = h.startsWith('Bearer ') ? h.slice(7) : null
  if(!token) return res.status(401).json({ error:'Token ausente' })
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET||'dev-secret') as any
    ;(req as any).auth = { userId: payload.sub, email: payload.email }
    next()
  }catch{
    return res.status(401).json({ error:'Token inválido ou expirado' })
  }
}
