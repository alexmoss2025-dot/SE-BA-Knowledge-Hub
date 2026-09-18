import Link from 'next/link'
import { Icon } from '@/components/hub/icon'
import { HubSearch } from '@/components/hub/hub-search'
import { IconTile, type Tone } from '@/components/hub/ui'

const CARDS: { icon: string; tone: Tone; badge: string; badgeGreen?: boolean; title: string; desc: string; cta: string; href: string }[] = [
  {
    icon: 'file-lines',
    tone: 'tint',
    badge: '24 FILES',
    title: 'BA Templates',
    desc: 'Ready-to-use documents for requirements, analysis, testing, and stakeholder alignment.',
    cta: 'Browse templates',
    href: '/ba-templates',
  },
  {
    icon: 'book',
    tone: 'cream',
    badge: '18 SOPs',
    title: 'SOP Library',
    desc: 'Current operating procedures with owners, review dates, and clear step-by-step guidance.',
    cta: 'Open library',
    href: '/sop-library',
  },
  {
    icon: 'compass',
    tone: 'greytint',
    badge: '4 WEEKS',
    title: 'Onboarding Center',
    desc: 'A guided start for new BAs, with checklists, team introductions, and first-month milestones.',
    cta: 'Start onboarding',
    href: '/onboarding',
  },
  {
    icon: 'diagram-project',
    tone: 'offwhite',
    badge: '12 MAPS',
    title: 'Process Maps',
    desc: 'Visualize current and future-state workflows, handoffs, systems, and decision points.',
    cta: 'View process maps',
    href: '/process-maps',
  },
  {
    icon: 'wand-magic-sparkles',
    tone: 'tint',
    badge: 'NEW',
    title: 'AI Toolkit',
    desc: 'Practical MossAIc prompts, responsible-use guidance, and workflows for everyday BA tasks.',
    cta: 'Explore AI resources',
    href: '/ai-toolkit',
  },
  {
    icon: 'spell-check',
    tone: 'tint',
    badge: '76 TERMS',
    badgeGreen: true,
    title: 'Project Glossary',
    desc: 'Searchable terms and definitions every analyst should know — filterable by Business Analyst or Company-Specific.',
    cta: 'Browse glossary',
    href: '/glossary',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section id="hub-search" className="relative mb-10 overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-moss-tint" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-28 right-32 h-56 w-56 rounded-full bg-moss-cream" aria-hidden="true" />
        <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow text-moss-green">BA Knowledge Hub</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-moss-everglade sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
              Find the right resource. Move the work forward.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-moss-muted">
              Access trusted Moss standards, proven templates, examples, and learning paths designed to help Business Analysts deliver clear, consistent outcomes.
            </p>
          </div>
          <div className="rounded-xl bg-moss-sand p-5 shadow-inner">
            <HubSearch />
          </div>
        </div>
      </section>

      {/* Explore */}
      <section className="mb-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-moss-everglade">Explore the Hub</h2>
            <p className="mt-1 text-sm text-moss-muted">Start with the resource that fits your work today.</p>
          </div>
          <Link href="/ba-templates" className="inline-flex items-center gap-2 text-sm font-bold text-moss-green hover:underline">
            View all resources <Icon name="arrow-right" size={14} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c) => (
            <article
              key={c.href}
              className="hub-card group flex flex-col p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <IconTile icon={c.icon} tone={c.tone} />
                <span className={`text-[11px] font-bold tracking-wider ${c.badgeGreen ? 'text-moss-green' : 'text-moss-gold'}`}>{c.badge}</span>
              </div>
              <h3 className="text-lg font-bold">
                <Link href={c.href} className="text-moss-everglade transition-colors group-hover:text-moss-green">
                  {c.title}
                </Link>
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-moss-muted">{c.desc}</p>
              <Link href={c.href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-moss-green hover:underline">
                {c.cta} <Icon name="arrow-right" size={14} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Recently updated + How we work */}
      <section className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <article className="hub-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-moss-everglade">Recently Updated</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Link href="/ba-templates" className="rounded-lg bg-moss-offwhite p-4 transition-colors hover:bg-moss-tint">
              <p className="text-sm font-bold text-moss-everglade">Requirements Traceability Matrix</p>
              <p className="mt-1 text-xs text-moss-muted">Template · Updated Aug. 7</p>
            </Link>
            <Link href="/sop-library/uat-planning" className="rounded-lg bg-moss-offwhite p-4 transition-colors hover:bg-moss-tint">
              <p className="text-sm font-bold text-moss-everglade">UAT Planning and Execution</p>
              <p className="mt-1 text-xs text-moss-muted">SOP · Updated Aug. 4</p>
            </Link>
          </div>
        </article>
        <article className="rounded-xl bg-moss-everglade p-6 text-white shadow-sm">
          <p className="eyebrow text-moss-palegold">How we work</p>
          <p className="mt-3 text-2xl font-bold">Clear is kind.</p>
          <p className="mt-2 text-sm leading-relaxed text-white/80">Share what works, document decisions, and help the next person move faster.</p>
        </article>
      </section>
    </>
  )
}
