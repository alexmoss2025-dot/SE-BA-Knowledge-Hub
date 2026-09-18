import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler'
import { HubShell } from '@/components/hub/shell'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:3000'),
  title: {
    default: 'BA Knowledge Hub',
    template: '%s · BA Knowledge Hub',
  },
  description:
    'Standards, proven templates, examples, and learning paths designed to help Business Analysts deliver clear, consistent outcomes.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    title: 'BA Knowledge Hub',
    description:
      'Standards, proven templates, examples, and learning paths for Business Analysts at Moss.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body className="font-sans bg-moss-sand text-moss-body antialiased">
        <HubShell>{children}</HubShell>
        <Toaster />
        {/* IMPORTANT: Do not remove — handles chunk loading race conditions in the dev server */}
        <ChunkLoadErrorHandler />
      </body>
    </html>
  )
}
