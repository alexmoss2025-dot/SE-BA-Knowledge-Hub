import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Icon } from '@/components/hub/icon'
import { PromptBlock } from '@/components/hub/prompt-block'
import { Breadcrumb, Bullets } from '@/components/hub/ui'
import { getWorkflow } from '@/lib/site'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const item = getWorkflow(slug)
  return { title: item?.title ?? 'Guided AI Workflow' }
}

export default async function WorkflowPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getWorkflow(slug)
  if (!item) notFound()

  return (
    <>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'AI Toolkit', href: '/ai-toolkit' }, { label: item?.title ?? '' }]} />

      <section className="relative mt-4 mb-8 overflow-hidden rounded-2xl bg-moss-everglade p-7 text-white shadow-sm sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/5" aria-hidden="true" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow text-moss-palegold">{item?.eyebrow}</p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{item?.title}</h1>
            <p className="mt-4 text-base leading-relaxed text-white/85">{item?.lede}</p>
          </div>
          <div className="shrink-0 rounded-xl bg-white/10 px-6 py-4 text-center">
            <p className="text-2xl font-bold">{item?.duration}</p>
            <p className="text-xs text-white/70">estimated</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-6">
          {(item?.stages ?? []).map((s, i) => (
            <section key={i} className="hub-card overflow-hidden shadow-sm">
              <div className="flex items-center gap-4 bg-moss-offwhite px-6 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-moss-green text-sm font-bold text-white">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-bold text-moss-everglade">{s?.title}</h3>
                  <p className="text-xs text-moss-muted">{s?.time}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed text-moss-body">{s?.description}</p>
                <div className="mt-4">
                  <PromptBlock text={s?.prompt} compact />
                </div>
              </div>
            </section>
          ))}
        </div>

        <aside className="space-y-5">
          <article className="rounded-xl bg-moss-cream p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-moss-everglade">
              <Icon name="clipboard-list" size={16} className="text-moss-gold" />
              What You Need
            </h2>
            <Bullets items={item?.whatYouNeed} className="mt-3" />
          </article>
          <article className="hub-card p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-bold text-moss-everglade">
              <Icon name="bullseye" size={16} className="text-moss-gold" />
              Expected Output
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-moss-body">{item?.expectedOutput}</p>
          </article>
          <article className="rounded-xl bg-moss-everglade p-6 text-white">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Icon name="shield-halved" size={16} className="text-moss-palegold" />
              Remember
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/85">{item?.remember}</p>
          </article>
        </aside>
      </div>
    </>
  )
}
