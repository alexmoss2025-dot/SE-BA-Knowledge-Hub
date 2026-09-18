'use client'

import { useEffect, useRef, useState } from 'react'

export function MermaidInner({ code, id }: { code: string; id: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function render() {
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          securityLevel: 'loose',
          themeVariables: {
            primaryColor: '#EEF0EE',
            primaryTextColor: '#204227',
            primaryBorderColor: '#866D4B',
            lineColor: '#866D4B',
            secondaryColor: '#FCF8F2',
            tertiaryColor: '#F7F5F2',
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif',
          },
        })
        const safeId = `mmd-${(id ?? 'chart').replace(/[^a-zA-Z0-9_-]/g, '')}-${Math.floor(Math.random() * 1e6)}`
        const { svg } = await mermaid.render(safeId, code ?? '')
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg ?? ''
          setError(null)
        }
      } catch (err) {
        console.error('Mermaid render failed', err)
        if (!cancelled) setError('The diagram could not be rendered.')
      }
    }
    render()
    return () => {
      cancelled = true
    }
  }, [code, id])

  if (error) {
    return <p className="p-6 text-sm text-moss-muted">{error}</p>
  }
  return <div ref={ref} className="mermaid-wrap w-full overflow-x-auto p-4" />
}
