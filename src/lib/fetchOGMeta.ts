import ogs from 'open-graph-scraper'

export interface OGMeta {
  title?: string
  description?: string
  image?: string
}

export async function fetchOpenGraphMeta(url: string): Promise<OGMeta | null> {
  try {
    const { result } = await ogs({ url })
    return {
      title: result.ogTitle || '',
      description: result.ogDescription || '',
      image: result.ogImage?.url || '',
    }
  } catch (e) {
    console.error('OG fetch error:', e)
    return null
  }
}
