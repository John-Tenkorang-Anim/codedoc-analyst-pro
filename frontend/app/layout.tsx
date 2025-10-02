import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CodeDoc Analyst - AI-Powered Code Documentation',
  description: 'Generate professional documentation and deep explanations for your code using AI',
  keywords: ['code documentation', 'AI', 'code analysis', 'developer tools'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}