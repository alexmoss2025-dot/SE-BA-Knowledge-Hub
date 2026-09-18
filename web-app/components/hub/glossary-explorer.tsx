'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Icon } from '@/components/hub/icon'
import { GLOSSARY, type GlossaryTerm } from '@/lib/site'

type Filter = 'all' | 'ba' | 'company'

function CategoryPill({ category }: { category?: string }) {
  const company = category === 'company'
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-bold ${
        company ? 'bg-moss-cream text-moss-gold' : 'bg-moss-tint text-moss-green'
      }`}
    >
      {company ? 'Company-Specific' : 'Business Analyst'}
    </span>
  )
}

export function GlossaryExplorer() {
  const params = useSearchParams()
  const router = useRouter()
  const initialQ = params?.get?.('q') ?? ''
  const [q, setQ] = useState(initialQ)
  const [filter, setFilter] = useState<Filter>('all')
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    setQ(params?.get?.('q') ?? '')
  }, [params])

  const query = (q ?? '').trim().toLowerCase()
  const visible: GlossaryTerm[] = useMemo(
    () =>
      (GLOSSARY ?? []).filter((t) => {
        if (filter !== 'all' && t?.category !== filter) return false
        if (!query) return true
        return `${t?.term ?? ''} ${t?.definition ?? ''}`.toLowerCase().includes(query)
      }),
    [query, filter],
  )

  const total = GLOSSARY?.length ?? 0
  const baCount = (GLOSSARY ?? []).filter((t) => t?.category === 'ba').length
  const companyCount = (GLOSSARY ?? []).filter((t) => t?.category === 'company').length

  const updateQuery = (val: string) => {
    setQ(val)
    const v = (val ?? '').trim()
    router.replace(v ? `/glossary?q=${encodeURIComponent(v)}` : '/glossary', { scroll: false })
  }

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'ba', label: 'Business Analyst' },
    { key: 'company', label: 'Company-Specific' },
  ]

  return (
    <>
      {/* Intro */}
      <section className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-moss-green hover:underline">
              Home
            </Link>
            <Icon name="chevron-right" size={12} className="text-moss-meta" />
            <span className="font-bold text-moss-green">Project Glossary</span>
          </nav>
          <h1 className="mt-3 text-3xl font-bold text-moss-everglade sm:text-4xl">Project Glossary</h1>
          <p className="mt-2 text-base text-moss-muted">Terms and definitions every analyst should know — searchable and filterable.</p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-moss-green px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-moss-everglade"
          >
            <Icon name="circle-plus" size={14} />
            Suggest New Term
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { v: total, l: 'Total Terms', gold: false },
            { v: baCount, l: 'Business Analyst', gold: false },
            { v: companyCount, l: 'Company-Specific', gold: true },
          ].map((s) => (
            <div key={s.l} className="hub-card min-w-[110px] p-4 text-center shadow-sm">
              <p className={`text-3xl font-bold ${s.gold ? 'text-moss-gold' : 'text-moss-green'}`}>{s.v}</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-moss-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Search & filter */}
      <section className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-xl border border-moss-border bg-moss-offwhite px-4 py-3 focus-within:border-moss-green">
          <Icon name="magnifying-glass" size={16} className="shrink-0 text-moss-meta" />
          <input
            id="glossary-search"
            type="text"
            value={q}
            onChange={(e) => updateQuery(e.target.value ?? '')}
            placeholder="Search terms or definitions"
            className="w-full bg-transparent text-sm text-moss-body outline-none placeholder:text-moss-meta"
            aria-label="Search terms or definitions"
          />
          {q ? (
            <button type="button" onClick={() => updateQuery('')} className="text-moss-meta hover:text-moss-everglade" aria-label="Clear search">
              <Icon name="xmark" size={14} />
            </button>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={`rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${
                filter === f.key ? 'bg-moss-green text-white' : 'border border-moss-grey bg-white text-moss-everglade hover:border-moss-green'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Table */}
      <section className="hub-card overflow-hidden shadow-sm">
        <div className="flex items-center justify-between gap-3 px-5 py-4">
          <div>
            <h2 className="text-xl font-bold text-moss-everglade">Terms &amp; Definitions</h2>
            <p className="text-sm text-moss-muted">
              <span>{visible.length}</span> of <span>{total}</span> terms shown
            </p>
          </div>
          <span className="eyebrow text-moss-gold">A–Z</span>
        </div>
        {visible.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-moss-offwhite text-[11px] font-bold uppercase tracking-wider text-moss-olive">
                  <th className="px-5 py-3">Term</th>
                  <th className="px-5 py-3">Definition</th>
                  <th className="px-5 py-3">Category</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((t) => (
                  <tr key={t?.term} className="border-t border-moss-border align-top transition-colors hover:bg-moss-offwhite">
                    <td className="min-w-[160px] px-5 py-3.5 font-bold text-moss-everglade">{t?.term}</td>
                    <td className="px-5 py-3.5 leading-relaxed text-moss-body">{t?.definition}</td>
                    <td className="px-5 py-3.5">
                      <CategoryPill category={t?.category} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center px-5 py-14 text-center">
            <Icon name="magnifying-glass" size={28} className="text-moss-meta" />
            <p className="mt-3 text-base font-bold text-moss-everglade">No matching terms</p>
            <p className="mt-1 text-sm text-moss-muted">Try a different search or filter.</p>
          </div>
        )}
      </section>

      {/* Missing a term */}
      <section className="mt-8 flex flex-col gap-4 rounded-xl bg-moss-cream p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-moss-everglade">
            <Icon name="circle-plus" size={18} className="text-moss-gold" />
            Missing a term?
          </h2>
          <p className="mt-1 text-sm text-moss-muted">Suggest additions or corrections so the glossary stays current for everyone.</p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-moss-green px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-moss-everglade"
        >
          Suggest a Term
        </button>
      </section>

      {modalOpen ? <SuggestModal onClose={() => setModalOpen(false)} /> : null}
    </>
  )
}

function SuggestModal({ onClose }: { onClose: () => void }) {
  const [term, setTerm] = useState('')
  const [definition, setDefinition] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const submit = () => {
    const t = (term ?? '').trim()
    const d = (definition ?? '').trim()
    if (!t || !d || !category) {
      setError(true)
      return
    }
    const body =
      'New glossary term suggestion:\r\n\r\n' +
      'Term: ' + t + '\r\n\r\n' +
      'Definition: ' + d + '\r\n\r\n' +
      'Category: ' + category + '\r\n\r\n' +
      'Submitted from the BA Knowledge Hub Project Glossary.'
    const mailto = 'mailto:adiamant@moss.com?subject=' + encodeURIComponent('Glossary Request') + '&body=' + encodeURIComponent(body)
    window.location.href = mailto
    setTerm('')
    setDefinition('')
    setCategory('')
    setError(false)
    onClose?.()
  }

  const inputCls =
    'w-full rounded-lg border border-moss-border bg-moss-offwhite px-4 py-3 text-sm text-moss-body outline-none placeholder:text-moss-meta focus:border-moss-green'

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="suggest-modal-title">
      <div className="absolute inset-0 bg-moss-everglade/70" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-moss-border px-6 py-4">
          <h2 id="suggest-modal-title" className="flex items-center gap-2 text-lg font-bold text-moss-everglade">
            <Icon name="circle-plus" size={18} className="text-moss-green" />
            Suggest New Term
          </h2>
          <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-moss-offwhite text-moss-muted hover:text-moss-everglade" aria-label="Close">
            <Icon name="xmark" size={16} />
          </button>
        </div>
        <div className="space-y-4 px-6 py-5">
          <div>
            <label htmlFor="suggest-term" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-moss-everglade">
              Term <span className="text-moss-gold">*</span>
            </label>
            <input id="suggest-term" type="text" value={term} onChange={(e) => setTerm(e.target.value ?? '')} placeholder="e.g., Change Order" className={inputCls} />
          </div>
          <div>
            <label htmlFor="suggest-definition" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-moss-everglade">
              Definition <span className="text-moss-gold">*</span>
            </label>
            <textarea
              id="suggest-definition"
              rows={4}
              value={definition}
              onChange={(e) => setDefinition(e.target.value ?? '')}
              placeholder="A clear, concise definition of the term..."
              className={`${inputCls} resize-y`}
            />
          </div>
          <div>
            <label htmlFor="suggest-category" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-moss-everglade">
              Category <span className="text-moss-gold">*</span>
            </label>
            <select id="suggest-category" value={category} onChange={(e) => setCategory(e.target.value ?? '')} className={inputCls}>
              <option value="">Select a category...</option>
              <option value="Business Analyst">Business Analyst</option>
              <option value="Company-Specific">Company-Specific</option>
            </select>
          </div>
          {error ? (
            <p className="flex items-center gap-2 text-sm font-bold text-red-700">
              <Icon name="triangle-exclamation" size={14} />
              Please complete all three fields before submitting.
            </p>
          ) : null}
          <p className="text-xs text-moss-meta">
            Submitting opens your email client with a pre-filled message to the glossary owner (
            <span suppressHydrationWarning>adiamant@moss.com</span>).
          </p>
        </div>
        <div className="flex justify-end gap-3 bg-moss-offwhite px-6 py-4">
          <button type="button" onClick={onClose} className="rounded-lg border border-moss-grey bg-white px-5 py-2.5 text-sm font-bold text-moss-everglade hover:border-moss-green">
            Cancel
          </button>
          <button type="button" onClick={submit} className="rounded-lg bg-moss-green px-5 py-2.5 text-sm font-bold text-white hover:bg-moss-everglade">
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
