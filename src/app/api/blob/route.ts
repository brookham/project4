import { list } from '@vercel/blob'

export async function GET() {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN
    if (!token) {
      return new Response(JSON.stringify({ error: 'Missing BLOB_READ_WRITE_TOKEN' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }

    // list all blobs (no prefix) - the returned shape depends on @vercel/blob version
    const blobs = await list({ token })

    return new Response(JSON.stringify({ blobs }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message ?? String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
