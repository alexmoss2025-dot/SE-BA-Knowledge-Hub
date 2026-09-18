'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/hub/icon'
import { GLOSSARY, SEARCH_PAGES, type GlossaryTerm, type SearchPage } from '@/lib/site'

export function HubSearch() {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const query = (q ?? '').trim().toLowerCase()
  const active = query.length >= 2

  const pages: SearchPage[] = useMemo(() => {
    if (!active) return []
    return (SEARCH_PAGES ?? [])
      .filter((p) => `${p?.title ?? ''} ${p?.desc ?? ''} ${p?.kw ?? ''} ${p?.section ?? ''}`.toLowerCase().includes(query))
      .slice(0, 6)
  }, [query, active])

  const terms: GlossaryTerm[] = useMemo(() => {
    if (!active) return []
    return (GLOSSARY ?? [])
      .filter((t) => `${t?.term ?? ''} ${t?.definition ?? ''}`.toLowerCase().includes(query))
      .slice(0, 5)
  }, [query, active])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const submit = () => {
    if (!active) return
    const first = pages?.[0]
    if (first?.href) {
      router.push(first.href)
    } else {
      router.push(`/glossary?q=${encodeURIComponent(q.trim())}`)
    }
  }

  const showResults = open && active

  return (
    <form
      className="relative"
      ref={wrapRef as never}
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
    >
      <label htmlFor="hub-search-input" className="mb-2 block text-sm font-bold text-moss-everglade">
        Search the hub
      </label>
      <div className="flex overflow-hidden rounded-xl border border-moss-border bg-moss-offwhite shadow-sm focus-within:border-moss-green">
        <input
          id="hub-search-input"
          value={q}
          onChange={(e) => {
            setQ(e.target.value ?? '')
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search SOPs, templates, or guides"
          autoComplete="off"
          className="w-full bg-transparent px-4 py-3.5 text-sm text-moss-body outline-none placeholder:text-moss-meta"
          aria-expanded={showResults}
          aria-controls="hub-search-results"
        />
        <button
          type="submit"
          className="flex w-14 shrink-0 items-center justify-center bg-moss-green text-white transition-colors hover:bg-moss-everglade"
          aria-label="Search"
        >
          <Icon name="magnifying-glass" size={16} />
        </button>
      </div>
      <p className="mt-3 text-xs text-moss-meta">Popular: requirements, UAT, process mapping</p>

      {showResults ? (
        <div
          id="hub-search-results"
          className="absolute left-0 right-0 top-[86px] z-20 max-h-[420px] overflow-y-auto rounded-xl border border-moss-border bg-white shadow-xl"
        >
          {!pages.length && !terms.length ? (
            <p className="px-5 py-6 text-sm text-moss-muted">No results for “{q.trim()}”</p>
          ) : null}
          {pages.length ? (
            <div className="border-b border-moss-border last:border-0">
              <p className="eyebrow bg-moss-offwhite px-5 py-2 text-moss-olive">Pages</p>
              <ul>
                {pages.map((p) => (
                  <li key={p?.href}>
                    <Link
                      href={p?.href ?? '/'}
                      onClick={() => setOpen(false)}
                      className="flex items-start justify-between gap-3 px-5 py-3 transition-colors hover:bg-moss-tint"
                    >
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-moss-everglade">{p?.title}</span>
                        <span className="block truncate text-xs text-moss-muted">{p?.desc}</span>
                      </span>
                      <span className="shrink-0 rounded-full bg-moss-tint px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-moss-green">
                        {p?.section}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {terms.length ? (
            <div>
              <p className="eyebrow bg-moss-offwhite px-5 py-2 text-moss-olive">Glossary Terms</p>
              <ul>
                {terms.map((t) => (
                  <li key={t?.term}>
                    <Link
                      href={`/glossary?q=${encodeURIComponent(t?.term ?? '')}`}
                      onClick={() => setOpen(false)}
                      className="flex items-start justify-between gap-3 px-5 py-3 transition-colors hover:bg-moss-cream"
                    >
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-moss-everglade">{t?.term}</span>
                        <span className="block truncate text-xs text-moss-muted">{t?.definition}</span>
                      </span>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          t?.category === 'company' ? 'bg-moss-cream text-moss-gold' : 'bg-moss-tint text-moss-green'
                        }`}
                      >
                        {t?.category === 'company' ? 'Company-Specific' : 'Business Analyst'}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  )
}
