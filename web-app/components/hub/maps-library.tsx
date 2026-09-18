'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/hub/icon'

interface MapCard {
  domain: string
  title: string
  meta: string
  state: string
  href: string
  tone: 'tint' | 'cream' | 'greytint'
  accent: 'tint' | 'dark' | 'green'
}

const CARDS: MapCard[] = [
  { domain: 'Governance', title: 'Requirements Change Control', meta: 'Future State · 8 steps · 3 roles', state: 'Future State', href: '/process-maps/change-control', tone: 'tint', accent: 'dark' },
  { domain: 'Testing', title: 'UAT Planning and Signoff', meta: 'Current State · 10 steps · 4 roles', state: 'Current State', href: '/process-maps/uat', tone: 'cream', accent: 'green' },
  { domain: 'Technology', title: 'System Access Request', meta: 'Current State · 7 steps · 3 roles', state: 'Current State', href: '/process-maps/system-access', tone: 'greytint', accent: 'dark' },
  { domain: 'Enterprise Systems', title: 'Business Request Intake to Prioritization', meta: 'Current State · 8 steps · 4 roles', state: 'Current State', href: '/process-maps/request-intake', tone: 'tint', accent: 'green' },
]

const DOMAINS = ['All domains', 'Governance', 'Testing', 'Technology', 'Enterprise Systems']
const STATES = ['All states', 'Current State', 'Future State']

const TONE: Record<MapCard['tone'], string> = { tint: 'bg-moss-tint', cream: 'bg-moss-cream', greytint: 'bg-moss-greytint' }
const ACCENT: Record<MapCard['accent'], string> = { tint: 'bg-moss-tint', dark: 'bg-moss-everglade', green: 'bg-moss-green' }

export function MapsLibrary() {
  const [q, setQ] = useState('')
  const [domain, setDomain] = useState(DOMAINS[0])
  const [state, setState] = useState(STATES[0])
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const cards = useMemo(() => {
    const query = (q ?? '').trim().toLowerCase()
    return CARDS.filter((c) => (domain === 'All domains' ? true : c?.domain === domain))
      .filter((c) => (state === 'All states' ? true : c?.state === state))
      .filter((c) => (query ? `${c?.title} ${c?.domain} ${c?.meta}`.toLowerCase().includes(query) : true))
  }, [q, domain, state])

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
            placeholder="Search process, team, system, or owner"
            className="w-full bg-transparent py-1.5 text-sm text-moss-body outline-none placeholder:text-moss-meta"
            aria-label="Search process maps"
          />
          <button type="submit" className="text-sm font-bold text-moss-green">
            Search
          </button>
        </form>
        <select value={domain} onChange={(e) => setDomain(e.target.value)} className={selectCls} aria-label="Domain">
          {DOMAINS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select value={state} onChange={(e) => setState(e.target.value)} className={selectCls} aria-label="State">
          {STATES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </section>

      <FeaturedSlot />

      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-moss-everglade">Process Library</h2>
            <p className="mt-1 text-sm text-moss-muted">12 approved maps</p>
          </div>
          <div className="flex gap-1">
            <button type="button" onClick={() => setView('grid')} aria-pressed={view === 'grid'} className={`flex h-9 w-9 items-center justify-center rounded-lg ${view === 'grid' ? 'bg-moss-tint text-moss-green' : 'text-moss-muted hover:bg-moss-offwhite'}`} aria-label="Grid view">
              <Icon name="grip" size={16} />
            </button>
            <button type="button" onClick={() => setView('list')} aria-pressed={view === 'list'} className={`flex h-9 w-9 items-center justify-center rounded-lg ${view === 'list' ? 'bg-moss-tint text-moss-green' : 'text-moss-muted hover:bg-moss-offwhite'}`} aria-label="List view">
              <Icon name="list" size={16} />
            </button>
          </div>
        </div>

        {!cards.length ? (
          <p className="hub-card px-5 py-10 text-center text-sm text-moss-muted">No process maps match your search.</p>
        ) : view === 'grid' ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c) => (
              <article key={c.href} className="hub-card overflow-hidden shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className={`flex h-28 items-center justify-center ${TONE[c.tone]}`}>
                  <div className="flex items-center gap-2">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span key={i} className={`block h-3 w-8 rounded-sm ${i === 4 ? ACCENT[c.accent] : i === 2 && c.tone !== 'tint' ? 'bg-white' : 'bg-white/80'}`} />
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <p className="eyebrow text-moss-gold">{c.domain}</p>
                  <h3 className="mt-1 text-lg font-bold text-moss-everglade">{c.title}</h3>
                  <p className="mt-1 text-sm text-moss-muted">{c.meta}</p>
                  <Link href={c.href} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-moss-green hover:underline">
                    View map <Icon name="arrow-right" size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="hub-card divide-y divide-moss-border shadow-sm">
            {cards.map((c) => (
              <Link key={c.href} href={c.href} className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-moss-offwhite">
                <div>
                  <p className="eyebrow text-moss-gold">{c.domain}</p>
                  <p className="font-bold text-moss-everglade">{c.title}</p>
                  <p className="text-xs text-moss-muted">{c.meta}</p>
                </div>
                <Icon name="arrow-right" size={16} className="shrink-0 text-moss-green" />
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}

function FeaturedSlot() {
  const steps: { icon: string; label: string; tone: string }[] = [
    { icon: 'inbox', label: 'Request Submitted', tone: 'bg-moss-tint text-moss-green' },
    { icon: 'magnifying-glass', label: 'Initial Review', tone: 'bg-moss-cream text-moss-gold' },
    { icon: 'scale-balanced', label: 'Score and Prioritize', tone: 'bg-moss-greytint text-moss-olive' },
    { icon: 'check', label: 'Decision', tone: 'bg-moss-everglade text-white' },
  ]
  return (
    <section className="hub-card mb-10 overflow-hidden shadow-sm">
      <div className="grid lg:grid-cols-[1.7fr_1fr]">
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="eyebrow text-moss-gold">Featured Process</p>
              <h2 className="mt-2 text-2xl font-bold text-moss-everglade">Business Request Intake to Prioritization</h2>
              <p className="mt-1 text-sm text-moss-muted">Enterprise Systems · Current State · Owner: Product Operations</p>
            </div>
            <span className="rounded-full bg-moss-tint px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-moss-green">Approved</span>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-center">
            {steps.map((s, i) => (
              <div key={s.label} className="contents">
                <div className={`flex flex-col items-center gap-2 rounded-xl px-3 py-5 text-center ${s.tone}`}>
                  <Icon name={s.icon} size={20} />
                  <p className="text-sm font-bold">{s.label}</p>
                </div>
                {i < steps.length - 1 ? <Icon name="arrow-right" size={16} className="hidden text-moss-meta sm:block" /> : null}
              </div>
            ))}
          </div>
        </div>
        <aside className="flex flex-col bg-moss-offwhite p-6 sm:p-8">
          <h3 className="text-lg font-bold text-moss-everglade">Map Details</h3>
          <dl className="mt-4 flex-1 space-y-4">
            <div>
              <dt className="text-xs text-moss-muted">Last reviewed</dt>
              <dd className="text-sm font-bold text-moss-everglade">July 30, 2026</dd>
            </div>
            <div>
              <dt className="text-xs text-moss-muted">Systems</dt>
              <dd className="text-sm font-bold text-moss-everglade">Work Management, Teams</dd>
            </div>
            <div>
              <dt className="text-xs text-moss-muted">Related SOP</dt>
              <dd>
                <Link href="/sop-library/project-discovery" className="text-sm font-bold text-moss-green hover:underline">
                  BA-001 Project Discovery
                </Link>
              </dd>
            </div>
          </dl>
          <Link href="/process-maps/request-intake" className="mt-6 inline-flex items-center justify-center rounded-lg bg-moss-green px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-moss-everglade">
            Open Full Process Map
          </Link>
        </aside>
      </div>
    </section>
  )
}
