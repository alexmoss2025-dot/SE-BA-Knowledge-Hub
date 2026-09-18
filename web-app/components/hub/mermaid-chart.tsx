'use client'

import dynamic from 'next/dynamic'

const MermaidInner = dynamic(() => import('@/components/hub/mermaid-inner').then((m) => m.MermaidInner), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 items-center justify-center text-sm text-moss-muted">Loading diagram…</div>
  ),
})

export function MermaidChart({ code, id }: { code?: string; id: string }) {
  return <MermaidInner code={code ?? ''} id={id} />
}
