'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Icon } from '@/components/hub/icon'

interface TemplateRow {
  name: string
  meta: string
  category: string
  owner: string
  href?: string
}

const ROWS: TemplateRow[] = [
  { name: 'Functional Requirements Document (FRD)', meta: 'DOCX · SharePoint', category: 'Requirements', owner: 'BA Practice', href: 'https://mosscm.sharepoint.com/:w:/s/SolutionsEngineering/IQBNJ1f90Tr8R4GkNDMJIBOlAd14NibEgbjiNTdZj0zAxLY?e=Z5MZtP' },
  { name: 'User Stories Document', meta: 'XLSX · SharePoint', category: 'Requirements', owner: 'BA Practice', href: 'https://mosscm.sharepoint.com/:x:/s/SolutionsEngineering/IQDHMgmR5KOpR6YgSgRjra9-AQHuE0WUbi2JbE33PJkQklw?e=m7KCQf' },
  { name: 'Process Flow/Workflow Diagrams', meta: 'Visual Process Library', category: 'Discovery', owner: 'BA Practice', href: '/process-maps' },
  { name: 'Stakeholder Collaboration', meta: 'XLSX · SharePoint', category: 'Discovery', owner: 'BA Practice', href: 'https://mosscm.sharepoint.com/:x:/s/SolutionsEngineering/IQBwAP6ZttZXSrzkbSul7JYpARtDyht-HNUPfUZT7hVCcac?e=0K8bNW' },
  { name: 'Change Request Template', meta: 'DOCX', category: 'Governance', owner: 'PMO' },
  { name: 'Fit-Gap Analysis', meta: 'XLSX', category: 'Analysis', owner: 'BA Practice' },
  { name: 'Vendor Assessment Process', meta: 'XLSX', category: 'Analysis', owner: 'BA Practice' },
  { name: 'Work Breakdown Structure (WBS)', meta: 'XLSX', category: 'Planning', owner: 'PMO' },
  { name: 'Lessons Learned Deck', meta: 'PPTX · SharePoint', category: 'Planning', owner: 'BA Practice', href: 'https://mosscm.sharepoint.com/:p:/s/SolutionsEngineering/IQBWRQ6l7S3MQaIIht2HUgRQAYn46dVCZoGwaytEE0EH7AI?e=adH1tH' },
  { name: 'Onboarding Process for New BAs', meta: 'DOCX', category: 'Onboarding', owner: 'BA Practice' },
  { name: 'Project Glossary', meta: 'Shared Vocabulary', category: 'Reference', owner: 'BA Practice', href: '/glossary' },
  { name: 'Meeting Minutes Template', meta: 'DOCX · SharePoint', category: 'Meetings', owner: 'BA Practice', href: 'https://mosscm.sharepoint.com/:w:/s/SolutionsEngineering/IQDv-7QI7d35QJKAF1hzHitEARTv-lUqHuC0A0P8UtZMzoA?e=1hqAZu' },
]

const ext = (href: string) => (href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})

const CATEGORIES = ['All categories', 'Discovery', 'Requirements', 'Analysis', 'Governance', 'Planning', 'Onboarding', 'Meetings', 'Reference']
const SORTS = ['Recently updated', 'A–Z']

export function TemplatesBrowser() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState(CATEGORIES[0])
  const [sort, setSort] = useState(SORTS[0])
  const [view, setView] = useState<'list' | 'grid'>('list')

  const rows = useMemo(() => {
    const query = (q ?? '').trim().toLowerCase()
    let list = ROWS.filter((r) => (cat === 'All categories' ? true : r?.category === cat)).filter((r) =>
      query ? `${r?.name} ${r?.category} ${r?.owner}`.toLowerCase().includes(query) : true,
    )
    if (sort === 'A–Z') list = list.slice().sort((a, b) => (a?.name ?? '').localeCompare(b?.name ?? '', 'en-US'))
    return list
  }, [q, cat, sort])

  const requestFile = (name: string) => {
    toast(`${name} is available on request from its owner. Opening your email client…`)
    window.location.assign(`mailto:ai@moss.com?subject=${encodeURIComponent(`Template Request: ${name}`)}&body=${encodeURIComponent(
      `Hello,\r\n\r\nPlease share the latest version of "${name}".\r\n\r\nSubmitted from the BA Knowledge Hub Templates page.`,
    )}`)
  }

  const selectCls = 'rounded-lg border border-moss-grey bg-white px-4 py-3 text-sm font-medium text-moss-everglade outline-none focus:border-moss-green'

  return (
    <>
      <section className="mb-8 flex flex-col gap-3 md:flex-row md:items-center">
        <form
          className="flex flex-1 items-center gap-3 rounded-xl border border-moss-border bg-moss-offwhite px-4 py-2 focus-within:border-moss-green"
          onSubmit={(e) => e.preventDefault()}
          role="search"
        >
          <Icon name="magnifying-glass" size={16} className="shrink-0 text-moss-meta" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value ?? '')}
            placeholder="Search templates by name or use case"
            className="w-full bg-transparent py-1.5 text-sm text-moss-body outline-none placeholder:text-moss-meta"
            aria-label="Search templates"
          />
          <button type="submit" className="text-sm font-bold text-moss-green">
            Search
          </button>
        </form>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className={selectCls} aria-label="Sort">
          {SORTS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </section>

      <section className="hub-card overflow-hidden shadow-sm">
        <div className="flex items-center justify-between gap-3 px-5 py-4">
          <div>
            <h2 className="text-xl font-bold text-moss-everglade">All Templates</h2>
            <p className="text-sm text-moss-muted">
              {rows.length === ROWS.length ? `${ROWS.length} approved resources` : `Showing ${rows.length} of ${ROWS.length} approved resources`}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-moss-olive">
              Category
              <select value={cat} onChange={(e) => setCat(e.target.value)} className={selectCls} aria-label="Filter by category">
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setView('list')}
              aria-pressed={view === 'list'}
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${view === 'list' ? 'bg-moss-tint text-moss-green' : 'text-moss-muted hover:bg-moss-offwhite'}`}
              aria-label="List view"
            >
              <Icon name="list" size={16} />
            </button>
            <button
              type="button"
              onClick={() => setView('grid')}
              aria-pressed={view === 'grid'}
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${view === 'grid' ? 'bg-moss-tint text-moss-green' : 'text-moss-muted hover:bg-moss-offwhite'}`}
              aria-label="Grid view"
            >
              <Icon name="grip" size={16} />
            </button>
          </div>
          </div>
        </div>

        {view === 'list' ? (
          <>
            <div className="hidden grid-cols-[2fr_1fr_1fr_auto] gap-4 bg-moss-offwhite px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-moss-olive md:grid">
              <span>Template</span>
              <span>Category</span>
              <span>Owner</span>
              <span className="w-24 text-right">Action</span>
            </div>
            {rows.length ? (
              rows.map((r) => (
                <div key={r.name} className="grid gap-2 border-t border-moss-border px-5 py-4 text-sm md:grid-cols-[2fr_1fr_1fr_auto] md:items-center md:gap-4">
                  <div>
                    {r.href ? (
                      <Link href={r.href} {...ext(r.href)} className="font-bold text-moss-everglade hover:text-moss-green hover:underline">
                        {r.name}
                      </Link>
                    ) : (
                      <p className="font-bold text-moss-everglade">{r.name}</p>
                    )}
                    <p className="text-xs text-moss-muted">{r.meta}</p>
                  </div>
                  <span className="text-moss-body">{r.category}</span>
                  <span className="text-moss-body">{r.owner}</span>
                  {r.href ? (
                    <Link href={r.href} {...ext(r.href)} className="w-24 text-left font-bold text-moss-green hover:underline md:text-right">
                      Open
                    </Link>
                  ) : (
                    <button type="button" onClick={() => requestFile(r.name)} className="w-24 text-left font-bold text-moss-green hover:underline md:text-right">
                      Download
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="border-t border-moss-border px-5 py-10 text-center text-sm text-moss-muted">No templates match your search.</p>
            )}
          </>
        ) : (
          <div className="grid gap-4 border-t border-moss-border p-5 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((r) => (
              <article key={r.name} className="rounded-lg bg-moss-offwhite p-4">
                <p className="eyebrow text-moss-gold">{r.category}</p>
                <p className="mt-2 font-bold text-moss-everglade">{r.name}</p>
                <p className="text-xs text-moss-muted">
                  {r.meta} · {r.owner}
                </p>
                {r.href ? (
                  <Link href={r.href} {...ext(r.href)} className="mt-3 inline-block text-sm font-bold text-moss-green hover:underline">
                    Open
                  </Link>
                ) : (
                  <button type="button" onClick={() => requestFile(r.name)} className="mt-3 text-sm font-bold text-moss-green hover:underline">
                    Download
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
