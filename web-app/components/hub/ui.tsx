import Link from 'next/link'
import type { ReactNode } from 'react'
import { Icon } from '@/components/hub/icon'

/* ---------- Breadcrumb ---------- */
export interface Crumb {
  label: string
  href?: string
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  const list = items ?? []
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm">
      {list.map((c, i) => {
        const last = i === list.length - 1
        return (
          <span key={`${c?.label}-${i}`} className="flex items-center gap-2">
            {c?.href && !last ? (
              <Link href={c.href} className="text-moss-green hover:underline">
                {c?.label}
              </Link>
            ) : (
              <span className={last ? 'font-bold text-moss-green' : 'text-moss-muted'}>{c?.label}</span>
            )}
            {!last ? <Icon name="chevron-right" size={12} className="text-moss-meta" /> : null}
          </span>
        )
      })}
    </nav>
  )
}

/* ---------- Page header block ---------- */
export function PageIntro({
  crumbs,
  title,
  lede,
  action,
  children,
}: {
  crumbs?: Crumb[]
  title: string
  lede?: string
  action?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {crumbs?.length ? <Breadcrumb items={crumbs} /> : null}
        <h1 className="mt-3 text-3xl font-bold text-moss-everglade sm:text-4xl">{title}</h1>
        {lede ? <p className="mt-2 max-w-2xl text-base text-moss-muted">{lede}</p> : null}
        {children}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </section>
  )
}

/* ---------- Buttons ---------- */
export function PrimaryLink({
  href,
  children,
  icon,
  external,
  className = '',
}: {
  href: string
  children: ReactNode
  icon?: string
  external?: boolean
  className?: string
}) {
  const cls = `inline-flex items-center gap-2 rounded-lg bg-moss-green px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-moss-everglade ${className}`
  if (external || href?.startsWith?.('http') || href?.startsWith?.('mailto:')) {
    return (
      <a href={href} className={cls} target={href?.startsWith?.('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {icon ? <Icon name={icon} size={14} /> : null}
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {icon ? <Icon name={icon} size={14} /> : null}
      {children}
    </Link>
  )
}

export function TextLink({
  href,
  children,
  className = '',
  external,
}: {
  href: string
  children: ReactNode
  className?: string
  external?: boolean
}) {
  const cls = `inline-flex items-center gap-2 text-sm font-bold text-moss-green hover:underline ${className}`
  if (external || href?.startsWith?.('http')) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}

/* ---------- Status pill ---------- */
export function StatusPill({ status, className = '' }: { status?: string; className?: string }) {
  const s = status ?? ''
  const lower = s.toLowerCase()
  const tone =
    lower.includes('review') || lower.includes('future')
      ? 'bg-moss-cream text-moss-gold'
      : lower.includes('draft')
        ? 'bg-moss-greytint text-moss-olive'
        : 'bg-moss-tint text-moss-green'
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${tone} ${className}`}>
      {s}
    </span>
  )
}

/* ---------- Icon tile ---------- */
export type Tone = 'tint' | 'cream' | 'greytint' | 'offwhite' | 'dark' | 'green'

const TILE: Record<Tone, string> = {
  tint: 'bg-moss-tint text-moss-green',
  cream: 'bg-moss-cream text-moss-gold',
  greytint: 'bg-moss-greytint text-moss-olive',
  offwhite: 'bg-moss-offwhite text-moss-tan',
  dark: 'bg-moss-everglade text-white',
  green: 'bg-moss-green text-white',
}

export function IconTile({ icon, tone = 'tint', size = 44, className = '' }: { icon: string; tone?: Tone; size?: number; className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-lg ${TILE[tone] ?? TILE.tint} ${className}`}
      style={{ width: size, height: size }}
    >
      <Icon name={icon} size={Math.round(size * 0.42)} />
    </span>
  )
}

/* ---------- Section heading ---------- */
export function SectionHeading({
  title,
  sub,
  right,
  id,
  as = 'h2',
}: {
  title: string
  sub?: string
  right?: ReactNode
  id?: string
  as?: 'h2' | 'h3'
}) {
  const Tag = as
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3" id={id}>
      <div>
        <Tag className={`${as === 'h2' ? 'text-2xl' : 'text-lg'} font-bold text-moss-everglade`}>{title}</Tag>
        {sub ? <p className="mt-1 text-sm text-moss-muted">{sub}</p> : null}
      </div>
      {right ? <div>{right}</div> : null}
    </div>
  )
}

/* ---------- Rich text (trusted internal HTML) ---------- */
export function Rich({ html, className = '', as = 'p' }: { html?: string; className?: string; as?: 'p' | 'div' | 'span' | 'li' }) {
  const Tag = as
  return <Tag className={`rich ${className}`} dangerouslySetInnerHTML={{ __html: html ?? '' }} />
}

/* ---------- Stat card ---------- */
export function StatCard({ label, value, dark = false }: { label: string; value: string | number; dark?: boolean }) {
  return (
    <article className={`rounded-xl p-5 shadow-sm ${dark ? 'bg-moss-everglade text-white' : 'hub-card'}`}>
      <p className={`eyebrow ${dark ? 'text-moss-palegold' : 'text-moss-gold'}`}>{label}</p>
      <p className={`mt-2 text-3xl font-bold ${dark ? 'text-white' : 'text-moss-everglade'}`}>{value}</p>
    </article>
  )
}

/* ---------- Numbered step ---------- */
export function NumberedStep({ n, title, children }: { n: number; title: string; children?: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-moss-green text-sm font-bold text-white">
        {String(n ?? 0).padStart(2, '0')}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-bold text-moss-everglade">{title}</h3>
        {children}
      </div>
    </li>
  )
}

/* ---------- Callout band ---------- */
export function Callout({
  icon,
  title,
  text,
  action,
  tone = 'cream',
}: {
  icon?: string
  title: string
  text: string | ReactNode
  action?: ReactNode
  tone?: 'cream' | 'tint' | 'dark'
}) {
  const bg = tone === 'dark' ? 'bg-moss-everglade text-white' : tone === 'tint' ? 'bg-moss-tint' : 'bg-moss-cream'
  return (
    <section className={`flex flex-col gap-4 rounded-xl p-6 sm:flex-row sm:items-center ${bg}`}>
      {icon ? (
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${tone === 'dark' ? 'bg-white/10 text-moss-palegold' : 'bg-white text-moss-gold'}`}>
          <Icon name={icon} size={18} />
        </span>
      ) : null}
      <div className="min-w-0 flex-1">
        <h2 className={`text-lg font-bold ${tone === 'dark' ? 'text-white' : 'text-moss-everglade'}`}>{title}</h2>
        <p className={`mt-1 text-sm ${tone === 'dark' ? 'text-white/80' : 'text-moss-muted'}`}>{text}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </section>
  )
}

/* ---------- Related resource card ---------- */
export function RelatedCard({ href, icon, title, sub }: { href: string; icon: string; title: string; sub: string }) {
  return (
    <Link
      href={href ?? '/'}
      className="hub-card flex items-center gap-4 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-moss-green hover:shadow-md"
    >
      <IconTile icon={icon} tone="tint" size={40} />
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-moss-everglade">{title}</p>
        <p className="truncate text-xs text-moss-muted">{sub}</p>
      </div>
      <Icon name="arrow-right" size={14} className="ml-auto shrink-0 text-moss-green" />
    </Link>
  )
}

/* ---------- Detail aside: definition list ---------- */
export function DetailList({ title, items }: { title: string; items: { label: string; value: string }[] }) {
  return (
    <article className="hub-card bg-moss-offwhite p-5">
      <h3 className="text-base font-bold text-moss-everglade">{title}</h3>
      <dl className="mt-4 space-y-3">
        {(items ?? []).map((it, i) => (
          <div key={`${it?.label}-${i}`} className="flex items-start justify-between gap-4 border-b border-moss-border pb-3 last:border-0 last:pb-0">
            <dt className="text-xs text-moss-muted">{it?.label}</dt>
            <dd className="text-right text-sm font-bold text-moss-everglade">{it?.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}

/* ---------- On this page ---------- */
export function OnThisPage({ items }: { items: { id: string; label: string }[] }) {
  return (
    <article className="rounded-xl bg-moss-everglade p-5 text-white">
      <p className="eyebrow text-moss-palegold">On this page</p>
      <ul className="mt-3 space-y-2">
        {(items ?? []).map((it) => (
          <li key={it?.id}>
            <a href={`#${it?.id}`} className="flex items-center gap-2 text-sm text-white/85 hover:text-white">
              <Icon name="chevron-right" size={12} className="text-moss-suncoast" />
              {it?.label}
            </a>
          </li>
        ))}
      </ul>
    </article>
  )
}

export function NoteCard({ title, html, children }: { title: string; html?: string; children?: ReactNode }) {
  return (
    <article className="rounded-xl bg-moss-cream p-5">
      <h3 className="flex items-center gap-2 text-base font-bold text-moss-everglade">
        <Icon name="circle-info" size={16} className="text-moss-gold" />
        {title}
      </h3>
      {html ? <Rich html={html} className="mt-2 text-sm leading-relaxed text-moss-body" /> : null}
      {children}
    </article>
  )
}

/* ---------- Bulleted list ---------- */
export function Bullets({ items, rich = false, className = '' }: { items?: string[]; rich?: boolean; className?: string }) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {(items ?? []).map((t, i) => (
        <li key={i} className="flex gap-3 text-sm leading-relaxed text-moss-body">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss-gold" />
          {rich ? <Rich as="span" html={t} /> : <span>{t}</span>}
        </li>
      ))}
    </ul>
  )
}

export function CheckList({ items, className = '' }: { items?: string[]; className?: string }) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {(items ?? []).map((t, i) => (
        <li key={i} className="flex gap-3 text-sm leading-relaxed text-moss-body">
          <Icon name="check" size={14} className="mt-1 shrink-0 text-moss-green" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  )
}
