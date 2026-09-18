import type { ReactNode } from 'react'
import Link from 'next/link'
import { Icon } from './icon'
import { IconTile } from './ui'

/* ---------- Dark hero used on all onboarding pages ---------- */
export function OnboardHero({
  eyebrow,
  title,
  text,
  aside,
}: {
  eyebrow: string
  title: string
  text: string
  aside?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-moss-everglade text-white shadow-md">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-moss-green/40 blur-3xl"
      />
      <div className="relative grid gap-8 p-8 md:grid-cols-[1.4fr_1fr] md:p-10">
        <div>
          <p className="eyebrow text-moss-palegold">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/85">{text}</p>
        </div>
        {aside ? <div className="rounded-xl bg-white/10 p-6">{aside}</div> : null}
      </div>
    </section>
  )
}

/* ---------- Section with icon tile heading ---------- */
export function OnbSection({
  icon,
  title,
  sub,
  children,
  className = '',
}: {
  icon: string
  title: string
  sub?: string
  children?: ReactNode
  className?: string
}) {
  return (
    <section className={`hub-card rounded-xl p-6 ${className}`}>
      <div className="flex items-start gap-4">
        <IconTile icon={icon} tone="tint" />
        <div>
          <h2 className="text-xl font-bold text-moss-everglade">{title}</h2>
          {sub ? <p className="mt-1 text-sm text-moss-muted">{sub}</p> : null}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

/* ---------- Table ---------- */
export interface HubCell {
  content: ReactNode
  className?: string
}

export function HubTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-moss-border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-moss-offwhite text-[11px] font-bold uppercase tracking-wider text-moss-olive">
            {(head ?? []).map((h, i) => (
              <th key={i} className="px-4 py-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(rows ?? []).map((r, ri) => (
            <tr key={ri} className="border-t border-moss-border bg-white align-top transition-colors hover:bg-moss-offwhite">
              {(r ?? []).map((c, ci) => (
                <td key={ci} className="px-4 py-3 text-moss-body">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function IconLabel({ icon, children, green = false }: { icon?: string; children: ReactNode; green?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 font-bold ${green ? 'text-moss-green' : 'text-moss-everglade'}`}>
      {icon ? <Icon name={icon} size={14} className={green ? 'text-moss-green' : 'text-moss-gold'} /> : null}
      {children}
    </span>
  )
}

export function Chip({ tone, children }: { tone: 'tint' | 'cream' | 'dark'; children: ReactNode }) {
  const cls =
    tone === 'tint'
      ? 'bg-moss-tint text-moss-green'
      : tone === 'cream'
        ? 'bg-moss-cream text-moss-gold'
        : 'bg-moss-everglade text-white'
  return <span className={`inline-block rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${cls}`}>{children}</span>
}

/* ---------- Cream call-to-action band ---------- */
export function CreamCta({ icon, title, text, href, cta }: { icon: string; title: string; text: string; href: string; cta: string }) {
  return (
    <section className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-moss-cream p-6 shadow-sm">
      <div>
        <h2 className="flex items-center gap-2 text-lg font-bold text-moss-everglade">
          <Icon name={icon} size={18} className="text-moss-gold" />
          {title}
        </h2>
        <p className="mt-1 text-sm text-moss-muted">{text}</p>
      </div>
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-lg bg-moss-green px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-moss-everglade"
      >
        {cta}
        <Icon name="arrow-right" size={14} />
      </Link>
    </section>
  )
}
