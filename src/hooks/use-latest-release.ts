import { useState, useEffect } from 'react'

const GITHUB_API_URL = 'https://api.github.com/repos/edynt/termoras-page/releases/latest'
const CACHE_KEY = 'termoras-latest-release'
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes

// Hardcoded fallback — always shows working links even if API fails
const FALLBACK = {
  version: '0.1.0',
  tagName: 'v0.1.0',
  aarch64DmgUrl: 'https://github.com/edynt/termoras-page/releases/download/v0.1.0/Termoras_0.1.0_aarch64.dmg',
  x64DmgUrl: 'https://github.com/edynt/termoras-page/releases/download/v0.1.0/Termoras_0.1.0_x64.dmg',
}

interface ReleaseInfo {
  version: string
  tagName: string
  aarch64DmgUrl: string
  x64DmgUrl: string
}

interface CachedRelease {
  data: ReleaseInfo
  timestamp: number
}

/** Parse GitHub API response into ReleaseInfo, matching assets by suffix */
function parseRelease(data: { tag_name?: string; assets?: { name: string; browser_download_url: string }[] }): ReleaseInfo | null {
  if (!data?.tag_name || !Array.isArray(data?.assets)) return null

  const tagName = data.tag_name
  const version = tagName.startsWith('v') ? tagName.slice(1) : tagName

  const aarch64Asset = data.assets.find(a => a.name.endsWith('aarch64.dmg'))
  const x64Asset = data.assets.find(a => a.name.endsWith('x64.dmg'))

  return {
    version,
    tagName,
    aarch64DmgUrl: aarch64Asset?.browser_download_url ?? FALLBACK.aarch64DmgUrl,
    x64DmgUrl: x64Asset?.browser_download_url ?? FALLBACK.x64DmgUrl,
  }
}

/** Try reading cached release from sessionStorage */
function getCached(): ReleaseInfo | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const cached: CachedRelease = JSON.parse(raw)
    if (Date.now() - cached.timestamp > CACHE_TTL_MS) return null
    return cached.data
  } catch {
    return null
  }
}

/** Cache release info in sessionStorage */
function setCache(data: ReleaseInfo) {
  try {
    const entry: CachedRelease = { data, timestamp: Date.now() }
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry))
  } catch {
    // sessionStorage unavailable — silently ignore
  }
}

// Module-level in-flight promise to deduplicate concurrent fetches from multiple components
let inflightPromise: Promise<ReleaseInfo | null> | null = null

function fetchLatestRelease(signal: AbortSignal): Promise<ReleaseInfo | null> {
  if (!inflightPromise) {
    inflightPromise = fetch(GITHUB_API_URL, { signal })
      .then(res => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`)
        return res.json()
      })
      .then(data => {
        const info = parseRelease(data)
        if (info) setCache(info)
        return info
      })
      .catch(() => null)
      .finally(() => { inflightPromise = null })
  }
  return inflightPromise
}

/** Fetches latest GitHub release info with sessionStorage caching and hardcoded fallback */
export function useLatestRelease(): ReleaseInfo {
  const [release, setRelease] = useState<ReleaseInfo>(() => getCached() ?? FALLBACK)

  useEffect(() => {
    // Skip fetch if cache is still valid
    if (getCached()) return

    const controller = new AbortController()

    fetchLatestRelease(controller.signal).then(info => {
      if (info) setRelease(info)
    })

    return () => controller.abort()
  }, [])

  return release
}
