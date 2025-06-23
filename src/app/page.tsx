'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Story {
  id: number
  title: string
  by: string
  score: number
  descendants: number
}

export default function Home() {
  const [stories, setStories] = useState<Story[]>([])


  useEffect(() => {
    const fetchTopStories = async () => {
      const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      const ids: number[] = await res.json()
      const top10 = ids.slice(0, 10)

      const storyPromises = top10.map(async (id) => {
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        return await res.json()
      })

      const stories = await Promise.all(storyPromises)
      setStories(stories)
    }

    fetchTopStories()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">The top 10 stories from Hacker News</h1>
      <ul className="space-y-4">
        {stories.map((story) => (
          <li key={story.id} className="border-b pb-2">
            <Link href={`/story/${story.id}`} className="text-blue-600 font-semibold hover:underline">
              {story.title}
            </Link>
            <div className="text-sm text-gray-500">
              by <span className="font-medium">{story.by}</span> | Score: {story.score} | Comments: {story.descendants}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

