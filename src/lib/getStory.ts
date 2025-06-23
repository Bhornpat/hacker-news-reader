import db from '@/lib/db'

export async function getStory(id: string): Promise<Story> {
  const existing = db.prepare('SELECT * FROM stories WHERE id = ?').get(id)
  if (existing) return existing as Story

  try {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    if (!res.ok) throw new Error('Failed to fetch story')

    const story = await res.json()

    if (story && story.id && story.title) {
      db.prepare(
        'INSERT INTO stories (id, title, by, score, url) VALUES (?, ?, ?, ?, ?)'
      ).run(story.id, story.title, story.by, story.score, story.url ?? '')
    }

    return story
  } catch (err) {
    console.error('[ERROR] fetching story:', err)

    return {
      id: Number(id),
      title: 'Story not available',
      by: 'N/A',
      score: 0,
      descendants: 0,
      url: ''
    }
  }
}

