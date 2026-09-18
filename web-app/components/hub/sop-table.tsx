'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/hub/icon'
import { StatusPill } from '@/components/hub/ui'

interface SopRow {
  id: string
  title: string
  desc: string
  category: string
  owner: string
  status: string
  review: string
  href: string
}

const ROWS: SopRow[] = [
  {
    id: 'BA-001',
    title: 'Project Discovery and Intake',
    desc: 'How to assess requests, define the problem, and establish sponsorship.',
    category: 'Discovery',
    owner: 'BA Practice Lead',
    status: 'Current',
    review: 'Oct. 2026',
    href: '/sop-library/project-discovery',
  },
  {
    id: 'BA-004',
    title: 'Requirements Elicitation and Approval',
    desc: 'Plan, document, validate, and secure decisions on business requirements.',
    category: 'Requirements',
    owner: 'Product Operations',
    status: 'Current',
    review: 'Nov. 2026',
    href: '/sop-library/requirements-elicitation',
  },
  {
    id: 'BA-007',
    title: 'Requirements Change Control',
    desc: 'Evaluate scope, impact, ownership, and approval of requested changes.',
    category: 'Governance',
    owner: 'PMO',
    status: 'In Review',
    review: 'Aug. 2026',
    href: '/sop-library/requirements-change-control',
  },
  {
    id: 'BA-011',
    title: 'UAT Planning and Execution',
    desc: 'Prepare test coverage, coordinate users, capture defects, and obtain signoff.',
    category: 'Testing',
    owner: 'Quality Team',
    status: 'Current',
    review: 'Jan. 2027',
    href: '/sop-library/uat-planning',
  },
]

const CATEGORIES = ['Category', 'Discovery', 'Requirements', 'Governance', 'Testing']
const STATUSES = ['Status', 'Current', 'In Review']

export function SopTable() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState(CATEGORIES[0])
  const [status, setStatus] = useState(STATUSES[0])

  const rows = useMemo(() => {
    const query = (q ?? '').trim().toLowerCase()
    return ROWS.filter((r) => (cat === 'Category' ? true : r?.category === cat))
      .filter((r) => (status === 'Status' ? true : r?.status === status))
      .filter((r) => (query ? `${r?.id} ${r?.title} ${r?.desc} ${r?.owner} ${r?.category}`.toLowerCase().includes(query) : true))
  }, [q, cat, status])

  const selectCls = 'rounded-lg border border-moss-grey bg-white px-4 py-3 text-sm font-medium text-moss-everglade outline-none focus:border-moss-green'

  return (
    <section className="hub-card overflow-hidden shadow-sm">
      <div className="flex flex-col gap-3 p-5 md:flex-row md:items-center">
        <form
          className="flex flex-1 items-center gap-3 rounded-xl border border-moss-border bg-moss-offwhite px-4 py-2 focus-within:border-moss-green"
          onSubmit={(e) => e.preventDefault()}
          role="search"
        >
          <Icon name="magnifying-glass" size={16} className="shrink-0 text-moss-meta" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value ?? '')}
            placeholder="Search SOP title, keyword, or owner"
            className="w-full bg-transparent py-1.5 text-sm text-moss-body outline-none placeholder:text-moss-meta"
            aria-label="Search SOPs"
          />
          <button type="submit" className="text-sm font-bold text-moss-green">
            Search
          </button>
        </form>
        <select value={cat} onChange={(e) => setCat(e.target.value)} className={selectCls} aria-label="Category">
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectCls} aria-label="Status">
          {STATUSES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="hidden grid-cols-[80px_2.2fr_1fr_1fr_120px] gap-4 bg-moss-offwhite px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-moss-olive md:grid">
        <span>ID</span>
        <span>Procedure</span>
        <span>Category</span>
        <span>Owner</span>
        <span>Review</span>
      </div>

      {rows.length ? (
        rows.map((r) => (
          <Link
            key={r.id}
            href={r.href}
            className="grid gap-2 border-t border-moss-border px-5 py-4 text-sm transition-colors hover:bg-moss-offwhite md:grid-cols-[80px_2.2fr_1fr_1fr_120px] md:items-center md:gap-4"
          >
            <span className="font-bold text-moss-gold">{r.id}</span>
            <div>
              <p className="font-bold text-moss-everglade">{r.title}</p>
              <p className="text-xs text-moss-muted">{r.desc}</p>
            </div>
            <span className="text-moss-body">{r.category}</span>
            <span className="text-moss-body">{r.owner}</span>
            <span className="flex flex-col items-start gap-1">
              <StatusPill status={r.status} />
              <span className="text-xs text-moss-muted">{r.review}</span>
            </span>
          </Link>
        ))
      ) : (
        <p className="border-t border-moss-border px-5 py-10 text-center text-sm text-moss-muted">No procedures match your search.</p>
      )}

      <div className="flex items-center justify-between border-t border-moss-border px-5 py-4 text-xs text-moss-muted">
        <span>
          Showing {rows.length} of 18 procedures
        </span>
        <div className="flex gap-2">
          <button type="button" disabled className="flex h-8 w-8 items-center justify-center rounded-lg border border-moss-grey text-moss-meta disabled:opacity-50" aria-label="Previous page">
            <Icon name="chevron-left" size={14} />
          </button>
          <button type="button" disabled className="flex h-8 w-8 items-center justify-center rounded-lg bg-moss-green text-white disabled:opacity-60" aria-label="Next page (more procedures coming soon)">
            <Icon name="chevron-right" size={14} />
          </button>
        </div>
      </div>
    </section>
  )
}
