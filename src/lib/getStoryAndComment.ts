import db from '@/lib/db'

xport async function getStory(id: string): Promise<Story> {
  const existing = db.prepare('SELECT * FROM stories WHERE id = ?').get(id)
  if (existing) return existing as Story

  try {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    if (!res.ok) throw new Error('Failed to fetch story')

    const story = await res.json()

    if (story && story.id && story.title) {
      //  Insert the story
      db.prepare(
        'INSERT INTO stories (id, title, by, score, url) VALUES (?, ?, ?, ?, ?)'
      ).run(story.id, story.title, story.by, story.score, story.url ?? '')

      //  Fetch & insert top 5 comments
      if (Array.isArray(story.kids)) {
        const commentIds = story.kids.slice(0, 5)
        for (const commentId of commentIds) {
          try {
            const commentRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
            if (!commentRes.ok) continue

            const comment = await commentRes.json()
            if (comment && comment.id && comment.text) {
              db.prepare(`
                INSERT INTO comments (id, story_id, text, by, time)
                VALUES (?, ?, ?, ?, ?)
              `).run(
                comment.id,
                story.id,
                comment.text,
                comment.by ?? 'Unknown',
                comment.time ?? 0
              )
            }
          } catch (commentErr) {
            console.error(`[ERROR] fetching comment ${commentId}:`, commentErr)
          }
        }
      }
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
