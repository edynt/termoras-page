import { useState, useEffect } from 'react'

// Uses Vercel Edge proxy (api/latest-release.ts) to avoid GitHub API rate limits (60 req/hr).
// CDN caches response for 5 min → only ~12 GitHub API calls/hr regardless of traffic.
const RELEASE_API_URL = '/api/latest-release'

// Hardcoded fallback — always shows working links even if API fails
const FALLBACK = {
  version: '0.1.1',
  tagName: 'v0.1.1',
  aarch64DmgUrl: 'https://github.com/edynt/termoras/releases/download/v0.1.1/Termoras_0.1.1_aarch64.dmg',
  x64DmgUrl: 'https://github.com/edynt/termoras/releases/download/v0.1.1/Termoras_0.1.1_x64.dmg',
  amd64DebUrl: 'https://github.com/edynt/termoras/releases/download/v0.1.1/Termoras_0.1.1_amd64.deb',
  windowsX64Url: 'https://github.com/edynt/termoras/releases/download/v0.1.1/Termoras_0.1.1_x64-setup.exe',
}

interface ReleaseInfo {
  version: string
  tagName: string
  aarch64DmgUrl: string
  x64DmgUrl: string
  amd64DebUrl: string
  windowsX64Url: string
}

/** Parse GitHub API response into ReleaseInfo, matching assets by suffix */
function parseRelease(data: { tag_name?: string; assets?: { name: string; browser_download_url: string }[] }): ReleaseInfo | null {
  if (!data?.tag_name || !Array.isArray(data?.assets)) return null

  const tagName = data.tag_name
  const version = tagName.startsWith('v') ? tagName.slice(1) : tagName

  const aarch64Asset = data.assets.find(a => a.name.endsWith('aarch64.dmg'))
  const x64Asset = data.assets.find(a => a.name.endsWith('x64.dmg'))
  const debAsset = data.assets.find(a => a.name.endsWith('amd64.deb'))
  const windowsAsset = data.assets.find(a => a.name.endsWith('x64-setup.exe') || a.name.endsWith('x64_en-US.msi'))

  return {
    version,
    tagName,
    aarch64DmgUrl: aarch64Asset?.browser_download_url ?? FALLBACK.aarch64DmgUrl,
    x64DmgUrl: x64Asset?.browser_download_url ?? FALLBACK.x64DmgUrl,
    amd64DebUrl: debAsset?.browser_download_url ?? FALLBACK.amd64DebUrl,
    windowsX64Url: windowsAsset?.browser_download_url ?? FALLBACK.windowsX64Url,
  }
}

// Module-level in-flight promise to deduplicate concurrent fetches from multiple components
let inflightPromise: Promise<ReleaseInfo | null> | null = null

function fetchLatestRelease(signal: AbortSignal): Promise<ReleaseInfo | null> {
  if (!inflightPromise) {
    inflightPromise = fetch(RELEASE_API_URL, { signal })
      .then(res => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`)
        return res.json()
      })
      .then(data => parseRelease(data))
      .catch(() => null)
      .finally(() => { inflightPromise = null })
  }
  return inflightPromise
}

/** Fetches latest GitHub release info with hardcoded fallback. Caching handled by Vercel Edge CDN. */
export function useLatestRelease(): ReleaseInfo {
  const [release, setRelease] = useState<ReleaseInfo>(FALLBACK)

  useEffect(() => {
    const controller = new AbortController()

    fetchLatestRelease(controller.signal).then(info => {
      if (info) setRelease(info)
    })

    return () => controller.abort()
  }, [])

  return release
}
