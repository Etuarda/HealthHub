import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import 'dotenv/config'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { AppDataSource } from './config/data-source.js'
import { router } from './routes/index.js'

// Entidades
import Categoria from './entities/Categoria.js'
import Produto from './entities/Produto.js'

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())



app.use('/api', router)


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const imagesPath = path.resolve(__dirname, 'images')

if (fs.existsSync(imagesPath)) {
  app.get('/images/:fileName', (req, res) => {
    const fileName = req.params.fileName
    const filePath = path.join(imagesPath, fileName)

    if (!fs.existsSync(filePath)) {
      return res.status(404).send('Imagem não encontrada.')
    }

    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')

    res.sendFile(filePath)
  })
}

const CLIENT_DIST = path.resolve(__dirname, '../../client/dist')

app.use(express.static(CLIENT_DIST))

app.get('*', (_req, res) => {
  res.sendFile(path.join(CLIENT_DIST, 'index.html'))
})

const PORT = Number(process.env.PORT || 3000)


AppDataSource.initialize()
  .then(async () => {
    const repoCat = AppDataSource.getRepository(Categoria)
    const repoProd = AppDataSource.getRepository(Produto)

    const produtosExistentes = await repoProd.count()
    if (produtosExistentes === 0) {
      // Categorias
      const catVits = await repoCat.save(repoCat.create({ nome: 'Vitamins & Supplements', descricao: 'Vitaminas e suplementos' }))
      const catPain = await repoCat.save(repoCat.create({ nome: 'Pain Relief', descricao: 'Analgésicos' }))
      const catCare = await repoCat.save(repoCat.create({ nome: 'Personal Care', descricao: 'Cuidados pessoais' }))
      const catFirst = await repoCat.save(repoCat.create({ nome: 'First Aid', descricao: 'Primeiros socorros' }))


      const exemplos = [

        { nome: 'Vitamina C 1000mg', descricao: '30 comprimidos', preco: 29.90, imagem: '/images/vitamina-c-1000mg.png', categoria: catVits },
        { nome: 'Ômega 3 1000mg', descricao: '60 cápsulas', preco: 59.90, imagem: '/images/omega-3-1000mg.png', categoria: catVits },
        { nome: 'Multivitamínico A-Z', descricao: '90 cápsulas', preco: 74.90, imagem: '/images/multivitaminico-az.png', categoria: catVits },
        { nome: 'Vitamina D3 2000UI', descricao: '120 cápsulas', preco: 49.90, imagem: '/images/vitamina-d3-2000ui.png', categoria: catVits },

        { nome: 'Paracetamol 750mg', descricao: '20 comprimidos', preco: 14.50, imagem: '/images/paracetamol-750mg.png', categoria: catPain },
        { nome: 'Ibuprofeno 400mg', descricao: '30 cápsulas', preco: 22.90, imagem: '/images/ibuprofeno-400mg.png', categoria: catPain },
        { nome: 'Dipirona 500mg', descricao: '10 comprimidos', preco: 8.90, imagem: '/images/dipirona-500mg.png', categoria: catPain },
        { nome: 'Adesivo Térmico', descricao: 'Alívio de dores musculares', preco: 19.90, imagem: '/images/adesivo-termico.png', categoria: catPain },


        { nome: 'Protetor Solar FPS 50', descricao: 'Oil-free 120ml', preco: 69.90, imagem: '/images/protetor-solar-fps50.png', categoria: catCare },
        { nome: 'Shampoo Anticaspa', descricao: '300ml', preco: 24.90, imagem: '/images/shampoo-anticaspa.png', categoria: catCare },
        { nome: 'Hidratante Corporal', descricao: '200ml – pele seca', preco: 27.90, imagem: '/images/hidratante-corporal.png', categoria: catCare },
        { nome: 'Escova Dental Macia', descricao: 'Cerdas ultra macias', preco: 12.90, imagem: '/images/escova-dental-macia.png', categoria: catCare },

        { nome: 'Curativo Impermeável', descricao: 'Tamanhos sortidos (20 un.)', preco: 16.90, imagem: '/images/curativo-impermeavel.png', categoria: catFirst },
        { nome: 'Álcool 70%', descricao: 'Spray 120ml', preco: 9.90, imagem: '/images/alcool-70.png', categoria: catFirst },
        { nome: 'Soro Fisiológico 0,9%', descricao: '500ml', preco: 7.90, imagem: '/images/soro-fisiologico.png', categoria: catFirst },
        { nome: 'Gaze Estéril', descricao: 'Pacote com 10', preco: 11.90, imagem: '/images/gaze-esteril.png', categoria: catFirst },
      ]

      await repoProd.save(exemplos.map((p) => repoProd.create(p)))
    }


    app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('DB error', err)
    process.exit(1)
  })