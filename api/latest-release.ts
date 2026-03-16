export const config = { runtime: 'edge' }

const GITHUB_API = 'https://api.github.com/repos/edynt/termoras/releases/latest'

export default async function handler() {
  try {
    const res = await fetch(GITHUB_API, {
      headers: { 'User-Agent': 'termoras-page' },
    })

    if (!res.ok) {
      return new Response(JSON.stringify({ error: `GitHub API ${res.status}` }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const data = await res.json()

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        // CDN cache 5 min, serve stale up to 10 min while revalidating
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch {
    return new Response(JSON.stringify({ error: 'fetch failed' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
