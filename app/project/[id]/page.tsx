'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function ProjectPage({ params }: { params: { id: string } }) {
  const projectId = params.id
  const [loading, setLoading] = useState(true)
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    const timer = setInterval(async () => {
      const res = await fetch(`/api/get-snapshot?project_id=${projectId}`)
      const data = await res.json()
      if (data.output_markdown) {
        setMarkdown(data.output_markdown)
        setLoading(false)
        clearInterval(timer)
      }
    }, 3000)

    return () => clearInterval(timer)
  }, [projectId])

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', padding: 24 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', background: 'white', padding: 24, borderRadius: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Company Snapshot</h1>
        {loading ? <p>Generating your snapshot…</p> : <ReactMarkdown>{markdown}</ReactMarkdown>}
      </div>
    </main>
  )
}
