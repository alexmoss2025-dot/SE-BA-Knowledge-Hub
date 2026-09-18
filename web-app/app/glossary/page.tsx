import type { Metadata } from 'next'
import { Suspense } from 'react'
import { GlossaryExplorer } from '@/components/hub/glossary-explorer'

export const metadata: Metadata = { title: 'Project Glossary' }

export default function GlossaryPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-moss-muted">Loading glossary…</div>}>
      <GlossaryExplorer />
    </Suspense>
  )
}
