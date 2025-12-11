export async function api(path:string, body?:any, method:'GET'|'POST'|'PUT'|'DELETE'='GET'){
  const url = path.startsWith('/api') ? path : '/api'+path
  const token = localStorage.getItem('hh_token')
  const headers:Record<string,string> = { 'Content-Type':'application/json' }
  if(token) headers.Authorization = 'Bearer '+token

  const res = await fetch(url, { method, headers, body: body && method!=='GET' ? JSON.stringify(body) : undefined })
  if(res.status===401){
    localStorage.removeItem('hh_token'); localStorage.removeItem('hh_auth')
    throw new Error('Token inválido ou expirado — faça login novamente')
  }
  const data = await res.json().catch(()=>({}))
  if(!res.ok) throw new Error(data?.error || `HTTP ${res.status}`)
  return data
}
