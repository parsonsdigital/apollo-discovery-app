'use client'

import { useState } from 'react'

export default function HomePage() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    company_name: '',
    company_url: '',
    market: '',
    product: '',
    price: '',
    buyer_role: '',
    buyer_size: '',
    budget_type: '',
  })

  const handleChange = (e: any) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    // 1. create project in Supabase
    const res = await fetch('/api/create-project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()

    // 2. redirect to project page
    window.location.href = `/project/${data.projectId}`
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f1f5f9' }}>
      <div style={{ background: 'white', padding: 24, borderRadius: 16, width: 'min(90vw, 540px)' }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Create a Growth Discovery</h1>
        <p style={{ color: '#64748b', marginBottom: 16 }}>Enter your company details. We’ll generate a market snapshot.</p>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
          <input required name="company_name" value={form.company_name} onChange={handleChange} placeholder="Company name" />
          <input required name="company_url" value={form.company_url} onChange={handleChange} placeholder="Company URL" />
          <input required name="market" value={form.market} onChange={handleChange} placeholder="Market (eg. Healthtech)" />
          <input required name="product" value={form.product} onChange={handleChange} placeholder="Product / Service" />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price (optional)" />
          <input name="buyer_role" value={form.buyer_role} onChange={handleChange} placeholder="Buyer Role (eg. CMO)" />
          <input name="buyer_size" value={form.buyer_size} onChange={handleChange} placeholder="Buyer Company Size (eg. 50-200)" />
          <select name="budget_type" value={form.budget_type} onChange={handleChange}>
            <option value="">Budget / OOP type (optional)</option>
            <option value="in-house">In-house</option>
            <option value="agency">Agency</option>
            <option value="media">Media</option>
            <option value="other">Other</option>
          </select>
          <button disabled={loading} style={{ background: '#0f172a', color: 'white', padding: 10, borderRadius: 8 }}>
            {loading ? 'Creating…' : 'Generate Snapshot'}
          </button>
        </form>
      </div>
    </main>
  )
}
