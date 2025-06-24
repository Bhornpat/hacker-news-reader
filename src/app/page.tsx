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
    <div className="flex flex-col justify-center items-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
      <h1 className="text-xl  md:text-3xl lg:text-3xl font-extrabold text-white pt-2  text-center">The top 10 stories from Hacker News</h1><br />
      <ul className="space-y-4 px-2">
        {stories.map((story) => (
          <li key={story.id} className="block w-full max-w-2xl mx-auto rounded-lg bg-gray-900 p-4 hover:bg-gray-800 transition border border-gray-700 shadow hover:shadow-lg">
          
         <Link
  href={`/story/${story.id}`}>
  <h2 className="text-blue-500 hover:underline decoration-blue-500 font-semibold text-md sm:text-xl mb-2">
    {story.title}
  </h2>            </Link>
            <div className="text-sm text-gray-500">
              by <span className="font-medium">{story.by}</span> | Score: {story.score} | Comments: {story.descendants}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

