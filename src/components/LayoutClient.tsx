'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 400) // simulate loading
    return () => clearTimeout(timeout)
  }, [pathname])

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center ">
          <div className="animate-spin w-10 h-10 border-t-4 border-blue-500 rounded-full"></div>
        </div>
      )}
      {children}
    </>
  )
}

