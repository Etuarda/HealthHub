import * as React from 'react'
import '../styles/products.css'

type Props = {
  item: { id: number; nome: string; descricao?: string; preco: number; imagem?: string }
  onAdd: (p: any) => void
  fav?: boolean
  onToggleFav?: (id: number) => void
}

export default function ProductCard({ item, onAdd, fav, onToggleFav }: Props) {
  const imageUrl = item.imagem?.startsWith('http')
    ? item.imagem
    : `http://localhost:3000${item.imagem}`

  return (
    <div className="prod-card">
      <div className="prod-thumb">
        <img
          src={imageUrl}
          alt={item.nome}
          className="product-img"
          onError={(e) => {
            e.currentTarget.src = '/fallback.png'
            e.currentTarget.onerror = null
          }}
        />
      </div>

      <div className="prod-title">{item.nome}</div>
      <div className="prod-desc">{item.descricao}</div>
      <div className="prod-foot">
        <span className="price">R$ {Number(item.preco).toFixed(2)}</span>
        <div className="row">
          <button className="btn" onClick={() => onAdd(item)}>Adicionar</button>
          {onToggleFav && (
            <button
              className={'btn-outline ' + (fav ? 'fav' : '')}
              aria-label="Favoritar"
              onClick={() => onToggleFav(item.id)}
            >
              {fav ? '❤️' : '♡'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
