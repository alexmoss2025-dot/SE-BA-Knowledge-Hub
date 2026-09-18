import type { Metadata } from 'next'
import Link from 'next/link'
import { Icon } from '@/components/hub/icon'
import { CheckList, IconTile, type Tone } from '@/components/hub/ui'
import { PROMPTS, WORKFLOWS } from '@/lib/site'

export const metadata: Metadata = { title: 'AI Toolkit' }

const PROMPT_CARDS: { slug: string; icon: string; tone: Tone; desc: string }[] = [
  { slug: 'interview-guide', icon: 'comments', tone: 'tint', desc: 'Generate focused questions around goals, pain points, decisions, and success measures.' },
  { slug: 'requirement-quality', icon: 'list-check', tone: 'cream', desc: 'Check a draft for ambiguity, testability, hidden assumptions, and missing edge cases.' },
  { slug: 'decisions-actions', icon: 'clipboard', tone: 'greytint', desc: 'Turn notes into decisions, owners, dates, risks, open questions, and follow-ups.' },
]

const WORKFLOW_ROWS: { slug: string; desc: string }[] = [
  { slug: 'stakeholder', desc: 'Map influence, needs, risks, and engagement approaches.' },
  { slug: 'process-discovery', desc: 'Organize interview notes into steps, actors, systems, and gaps.' },
  { slug: 'uat', desc: 'Draft business-focused scenarios from approved requirements.' },
]

export default function AiToolkitPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative mb-10 overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-moss-tint" aria-hidden="true" />
        <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow text-moss-green">AI Toolkit</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-moss-everglade sm:text-4xl lg:text-[42px] lg:leading-[1.1]">
              Turn good questions into useful momentum.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-moss-muted">
              Use approved prompts and workflows to prepare, summarize, organize, and challenge your analysis. Keep human judgment at the center.
            </p>
          </div>
          <div className="rounded-xl bg-moss-tint p-6">
            <p className="eyebrow text-moss-gold">Before You Prompt</p>
            <CheckList
              className="mt-4"
              items={['Remove confidential details', 'Give clear context and output needs', 'Review and verify every response']}
            />
          </div>
        </div>
      </section>

      {/* Prompt starters */}
      <section className="mb-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-moss-everglade">Prompt Starters for BAs</h2>
            <p className="mt-1 text-sm text-moss-muted">Choose a task, add your context, and refine the result.</p>
          </div>
          <Link href="/ai-toolkit/prompts/interview-guide" className="inline-flex items-center gap-2 text-sm font-bold text-moss-green hover:underline">
            Browse all prompts <Icon name="arrow-right" size={14} />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {PROMPT_CARDS.map((c) => {
            const p = PROMPTS.find((x) => x?.slug === c.slug)
            const href = `/ai-toolkit/prompts/${c.slug}`
            return (
              <article key={c.slug} className="hub-card flex flex-col p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <IconTile icon={c.icon} tone={c.tone} />
                <p className="eyebrow mt-4 text-moss-gold">{p?.category}</p>
                <h3 className="mt-1 text-lg font-bold text-moss-everglade">{p?.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-moss-muted">{c.desc}</p>
                <Link href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-moss-green hover:underline">
                  Use prompt <Icon name="arrow-right" size={14} />
                </Link>
              </article>
            )
          })}
        </div>
      </section>

      {/* Workflows + aside */}
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <section className="hub-card overflow-hidden shadow-sm">
          <div className="px-6 pt-6">
            <h2 className="text-2xl font-bold text-moss-everglade">Guided AI Workflows</h2>
            <p className="mt-1 text-sm text-moss-muted">Repeatable ways to combine MossAIc with proven BA practices.</p>
          </div>
          <div className="mt-4 divide-y divide-moss-border">
            {WORKFLOW_ROWS.map((w, i) => {
              const wf = WORKFLOWS.find((x) => x?.slug === w.slug)
              const href = `/ai-toolkit/workflows/${w.slug}`
              return (
                <article key={w.slug} className="flex items-center gap-4 px-6 py-5 transition-colors hover:bg-moss-offwhite">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                      i === 0 ? 'bg-moss-green text-white' : 'bg-moss-offwhite text-moss-everglade'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-moss-everglade">
                      <Link href={href} className="hover:text-moss-green">
                        {wf?.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-moss-muted">{w.desc}</p>
                  </div>
                  <span className="hidden shrink-0 text-xs font-bold tracking-wider text-moss-gold sm:block">{(wf?.duration ?? '').toUpperCase()}</span>
                  <Link href={href} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-moss-tint text-moss-green transition-colors hover:bg-moss-green hover:text-white" aria-label={`Open ${wf?.title}`}>
                    <Icon name="arrow-right" size={16} />
                  </Link>
                </article>
              )
            })}
          </div>
        </section>

        <aside className="space-y-5">
          <article className="rounded-xl bg-moss-everglade p-6 text-white shadow-sm">
            <p className="eyebrow text-moss-palegold">Featured Learning</p>
            <h2 className="mt-3 text-xl font-bold">Responsible AI for BAs</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80">A 30-minute foundation on privacy, verification, bias, and human accountability.</p>
            <a
              href={`mailto:ai@moss.com?subject=${encodeURIComponent('Responsible AI for BAs — Module Access')}&body=${encodeURIComponent('Hello,\r\n\r\nI would like to start the Responsible AI for BAs learning module.\r\n\r\nSubmitted from the BA Knowledge Hub AI Toolkit.')}`}
              className="mt-5 inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-moss-everglade transition-colors hover:bg-moss-palegold"
            >
              Start Module
            </a>
          </article>
          <article className="rounded-xl bg-moss-cream p-6 shadow-sm">
            <h2 className="text-xl font-bold text-moss-everglade">Need Help With a Prompt?</h2>
            <p className="mt-2 text-sm leading-relaxed text-moss-muted">
              Bring the outcome you need. The Advanced Innovations team can help you shape a safe, useful approach.
            </p>
            <a href="mailto:ai@moss.com?subject=Prompt%20Help" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-moss-green hover:underline">
              Contact <span suppressHydrationWarning>ai@moss.com</span>
            </a>
          </article>
        </aside>
      </div>
    </>
  )
}
