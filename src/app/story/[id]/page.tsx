import { fetchOpenGraphMeta } from '@/lib/fetchOGMeta'
import { fallbackMetaDescription } from '@/lib/fallbackMetaDescription'

interface Story {
  id: number
  title: string
  by: string
  score: number
  url?: string
  kids?: number[]
 }

interface Comment {
  id: number
  text: string
  by: string
  }


async function getStory(id: string): Promise<Story> {
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
  return await res.json()
}

async function getComments(ids: number[] = []): Promise<Comment[]> {
  const commentPromises = ids.map(async (id) => {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    return await res.json()
  })



  const comments = await Promise.all(commentPromises)
  return comments.filter((c) => c && c.text)
}

export const dynamicParams = true

export default async function StoryPage({ params }: { params: { id: string } }) {
 const id = Number(params.id)
  const story = await getStory(id)
  const comments = (await getComments(story.kids)).slice(0, 6)
  const ogMeta = story.url ? await fetchOpenGraphMeta(story.url) : null

  const metaDesc = ogMeta?.description?.trim() || 'No description available'

  console.log('[DEBUG] ogMeta.description:', ogMeta?.description)

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 leading-relaxed">
      <h1 className="text-3xl md:text-4xl mt-4 font-bold text-white">{story.title}</h1>
      <p className="text-sm text-gray-400 mt-1">By: {story.by} | Score: {story.score}</p>


      <div className="bg-gray-900 p-4 rounded mt-2 mb-4">
   <p className="text-gray-500 italic text-gray-500 text-lg">{metaDesc}</p>  

     </div>


        {story.url && (
        <a
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 px-3 py-1 border border-blue-500 text-blue-500 rounded-md text-lg font-semibold hover:bg-blue-500 hover:text-black transition-colors"
        >
           Read the full story here
        </a>
      )}



      <hr className="my-4" />

      <h2 className="text-lg font-semibold mb-2">Top Comments</h2>
      <ul className="space-y-2">
        {comments.map((c) => (
          <li key={c.id} className="bg-gray-200 p-2 rounded">
          <div
  className="text-sm text-gray-700"
  suppressHydrationWarning
  dangerouslySetInnerHTML={{ __html: c.text }}
/>
<span className="text-xs text-gray-500">by {c.by}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

