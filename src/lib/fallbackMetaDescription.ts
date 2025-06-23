import axios from 'axios'
import * as cheerio from 'cheerio'

export async function fallbackMetaDescription(url: string): Promise<string> {
  try {
    const res = await axios.get(url)
    const $ = cheerio.load(res.data)
    const metaDesc = $('meta[name="description"]').attr('content')
console.log('[DEBUG] metaDesc:', metaDesc)

    return metaDesc || ''
  } catch (e) {
    console.error('fallbackMetaDescription error:', e)
    return ''
  }
}

