import './globals.css'
import LayoutClient from '@/components/LayoutClient'
import { Fira_Code } from 'next/font/google'


const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-fira-code',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={firaCode.variable}>
      <body>
        <LayoutClient>
                 {children}
        </LayoutClient>
      </body>
    </html>
  )
}

