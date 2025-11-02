import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const projectId = searchParams.get('project_id')

  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/modules?project_id=eq.${projectId}&module_name=eq.company_snapshot`, {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_KEY as string,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
    },
  })

  const data = await res.json()

  if (data.length === 0) {
    return NextResponse.json({ output_markdown: null })
  }

  return NextResponse.json({ output_markdown: data[0].output_markdown })
}
