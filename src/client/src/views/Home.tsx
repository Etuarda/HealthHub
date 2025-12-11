import React from 'react'
import { api } from '../utils/api'
import ProductCard from '../components/ProductCard'
import '../styles/products.css'

type Produto = { id: number; nome: string; descricao?: string; preco: number; imagem?: string }
type PageResp = { items: Produto[]; total: number; pages: number; page: number }

export default function Home() {
  const [q, setQ] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [data, setData] = React.useState<PageResp>({ items: [], total: 0, pages: 0, page: 1 })
  const [loading, setLoading] = React.useState(false)
  const [err, setErr] = React.useState('')
  const [favs, setFavs] = React.useState<number[]>([])

  React.useEffect(() => { carregar() }, [page])

  async function carregar() {
    setLoading(true)
    setErr('')
    try {
      console.log('🔍 Carregando produtos...')
      const res: PageResp = await api(`/produtos?q=${encodeURIComponent(q)}&page=${page}&limit=12`)
      console.log('✅ Produtos recebidos da API:', res)

      setData(res)

      const favResp = await api('/favoritos')
      const favIds: number[] = Array.isArray(favResp)
        ? favResp.map((f: any) => {
          if (typeof f === 'number') return f
          if (f?.produtoId) return Number(f.produtoId)
          if (f?.produto?.id) return Number(f.produto.id)
          return Number(f.id)
        }).filter((x: number) => !Number.isNaN(x))
        : []

      console.log('💖 Favoritos carregados:', favIds)
      setFavs(favIds)
    } catch (e: any) {
      console.error('❌ Erro ao carregar produtos:', e)
      setErr(e?.message || 'Erro ao carregar produtos')
    } finally {
      setLoading(false)
    }
  }

  async function toggleFav(id: number) {
    try {
      if (favs.includes(id)) {
        await api(`/favoritos/${id}`, undefined, 'DELETE')
        setFavs(prev => prev.filter(x => x !== id))
      } else {
        await api(`/favoritos/${id}`, {}, 'POST')
        setFavs(prev => [...prev, id])
      }
    } catch (e) { console.error('⚠️ Erro ao alternar favorito:', e) }
  }

  function addToCart(p: Produto) {
    const cart = JSON.parse(localStorage.getItem('hh_cart') || '[]')
    const ix = cart.findIndex((i: any) => i.produtoId === p.id)
    if (ix >= 0) cart[ix].qtd++; else cart.push({ produtoId: p.id, nome: p.nome, preco: p.preco, qtd: 1 })
    localStorage.setItem('hh_cart', JSON.stringify(cart))
    alert('Adicionado ao carrinho')
  }

  return (
    <section className="container">
      <div className="bar">
        <h2>Shop All Products</h2>
        <div className="search">
          <input
            placeholder="Pesquisar medicamentos"
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={e => e.key === 'Enter' ? (setPage(1), carregar()) : undefined}
          />
          <button className="btn" onClick={() => { setPage(1); carregar() }}>Buscar</button>
        </div>
      </div>

      {loading && <div className="muted mt-16">Carregando…</div>}
      {err && <div className="err mt-16">{err}</div>}
      {!loading && data.items.length === 0 && <div className="empty mt-24">Nenhum produto encontrado.</div>}

      <div className="grid">
        {data.items.map(p => {
          // log detalhado de cada produto recebido
          console.log(`🧾 Produto #${p.id}:`, p)
          if (!p.imagem) console.warn(`⚠️ Produto ${p.nome} sem imagem!`)
          return (
            <ProductCard
              key={p.id}
              item={p}
              onAdd={addToCart}
              fav={favs.includes(p.id)}
              onToggleFav={toggleFav}
            />
          )
        })}
      </div>

      {data.pages > 1 && (
        <div className="pager">
          <button className="btn-outline" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>‹</button>
          <span>Página {data.page} de {data.pages}</span>
          <button className="btn-outline" disabled={page >= data.pages} onClick={() => setPage(p => p + 1)}>›</button>
        </div>
      )}
    </section>
  )
}
