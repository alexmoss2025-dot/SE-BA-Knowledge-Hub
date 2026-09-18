'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Icon } from '@/components/hub/icon'

export function PromptBlock({ text, label = 'Prompt', compact = false }: { text?: string; label?: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false)
  const value = text ?? ''

  const copy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(value)
      } else {
        const ta = document.createElement('textarea')
        ta.value = value
        document.body.appendChild(ta)
        ta.select()
        document.execCommand?.('copy')
        document.body.removeChild(ta)
      }
      setCopied(true)
      toast.success('Copied')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed', err)
      toast.error('Could not copy. Please select the text manually.')
    }
  }

  return (
    <div className="overflow-hidden rounded-xl bg-moss-everglade text-white shadow-md">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="eyebrow text-moss-palegold">{label}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-white/20"
          aria-label="Copy prompt to clipboard"
        >
          <Icon name={copied ? 'check' : 'copy'} size={13} />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className={`whitespace-pre-wrap break-words px-5 font-sans leading-relaxed text-white/90 ${compact ? 'py-4 text-[13px]' : 'py-5 text-sm'}`}>
        {value}
      </pre>
    </div>
  )
}
