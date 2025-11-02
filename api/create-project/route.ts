import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  // 1. create project in Supabase
  const { company_name, company_url, market, product, price, buyer_role, buyer_size, budget_type } = body

  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/projects`, {
    method: 'POST',
    headers: {
      apikey: process.env.SUPABASE_SERVICE_KEY as string,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      company_name,
      company_url,
      market,
      product,
      price,
      buyer_role,
      buyer_size,
      budget_type,
      status: 'created',
    }),
  })

  const data = await res.json()
  const projectId = data[0].id

  // 2. trigger n8n
  await fetch(process.env.N8N_WEBHOOK_URL as string, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ project_id: projectId }),
  })

  return NextResponse.json({ projectId })
}
