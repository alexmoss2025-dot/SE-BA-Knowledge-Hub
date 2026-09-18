import type { Metadata } from 'next'
import { Icon } from '@/components/hub/icon'
import { IconTile, PageIntro, PrimaryLink, type Tone } from '@/components/hub/ui'
import { TemplatesBrowser } from '@/components/hub/templates-browser'

export const metadata: Metadata = { title: 'BA Templates' }

const FEATURED: { icon: string; tone: Tone; type: string; title: string; desc: string; updated: string; href: string }[] = [
  {
    icon: 'file-excel',
    tone: 'tint',
    type: 'Excel',
    title: 'Requirements Traceability Matrix',
    desc: 'Track business requirements from discovery through testing and final approval.',
    updated: 'Updated Aug. 7',
    href: 'https://mosscm.sharepoint.com/:x:/s/SolutionsEngineering/IQCcj1oITHetSqoIN5WfD2njAXBxmt5epxkg4O89hmwDU64?e=kHCLxg',
  },
  {
    icon: 'file-word',
    tone: 'cream',
    type: 'Word',
    title: 'Business Requirements Document',
    desc: 'Define objectives, scope, stakeholders, assumptions, and measurable requirements.',
    updated: 'Updated July 28',
    href: 'https://mosscm.sharepoint.com/:w:/s/SolutionsEngineering/IQDOVySvvIJNQrgjCee109EqARKauMnRZ3_nY69sMBWS25A?e=nklTMG',
  },
  {
    icon: 'file-excel',
    tone: 'tint',
    type: 'Excel',
    title: 'Master Requirements Trackers',
    desc: '“Source of truth” of the requirements for any given project or initiative.',
    updated: 'Updated Aug. 19',
    href: 'https://mosscm.sharepoint.com/:x:/s/SolutionsEngineering/IQBUK_EVyzStTLprxKrrl2grARWydsS90Xx0L1SrRwatNFg?e=6VmcpD',
  },
]

export default function TemplatesPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: 'Home', href: '/' }, { label: 'BA Templates' }]}
        title="BA Templates"
        lede="Start with a trusted Moss format and adapt it to the work."
        action={
          <PrimaryLink
            href={`mailto:ai@moss.com?subject=${encodeURIComponent('Template Request')}&body=${encodeURIComponent('Hello,\r\n\r\nI would like to request a new BA template.\r\n\r\nTemplate name:\r\nUse case:\r\n\r\nSubmitted from the BA Knowledge Hub.')}`}
            icon="plus"
          >
            Request a Template
          </PrimaryLink>
        }
      />

      <section className="mb-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-moss-everglade">Featured Templates</h2>
          <span className="eyebrow text-moss-gold">Most Used</span>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {FEATURED.map((t) => (
            <article key={t.title} className="hub-card flex flex-col p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <IconTile icon={t.icon} tone={t.tone} />
                <span className="rounded-full bg-moss-cream px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-moss-gold">{t.type}</span>
              </div>
              <h3 className="text-lg font-bold text-moss-everglade">{t.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-moss-muted">{t.desc}</p>
              <div className="mt-5 flex items-center justify-between border-t border-moss-border pt-4 text-xs text-moss-meta">
                <span>{t.updated}</span>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-moss-green hover:underline"
                >
                  <Icon name="download" size={14} />
                  Download
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <TemplatesBrowser />
    </>
  )
}
