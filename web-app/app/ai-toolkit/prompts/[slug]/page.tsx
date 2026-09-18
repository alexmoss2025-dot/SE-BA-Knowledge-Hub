import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Icon } from '@/components/hub/icon'
import { PromptBlock } from '@/components/hub/prompt-block'
import { Breadcrumb, Bullets, Rich } from '@/components/hub/ui'
import { getPrompt } from '@/lib/site'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const item = getPrompt(slug)
  return { title: item?.title ?? 'Prompt Starter' }
}

export default async function PromptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getPrompt(slug)
  if (!item) notFound()

  return (
    <>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'AI Toolkit', href: '/ai-toolkit' }, { label: item?.title ?? '' }]} />

      <section className="relative mt-4 mb-8 overflow-hidden rounded-2xl bg-white p-7 shadow-sm sm:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-moss-tint" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <p className="eyebrow text-moss-green">{item?.category}</p>
          <h1 className="mt-3 text-3xl font-bold text-moss-everglade sm:text-4xl">{item?.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-moss-muted">{item?.lede}</p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-6">
          <section className="hub-card p-6 shadow-sm sm:p-7">
            <h2 className="text-xl font-bold text-moss-everglade">How to Use This Prompt</h2>
            <ol className="mt-5 space-y-5">
              {(item?.steps ?? []).map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-moss-green text-sm font-bold text-white">{i + 1}</span>
                  <div className="min-w-0 pt-1">
                    <h3 className="text-base font-bold text-moss-everglade">{s?.title}</h3>
                    <Rich html={s?.text} className="mt-1 text-sm leading-relaxed text-moss-body [&_em]:italic" />
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="hub-card p-6 shadow-sm sm:p-7">
            <h2 className="mb-4 text-xl font-bold text-moss-everglade">The Prompt</h2>
            <PromptBlock text={item?.prompt} />
          </section>
        </div>

        <aside className="space-y-5">
          <article className="rounded-xl bg-moss-cream p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-moss-everglade">
              <Icon name="clock" size={16} className="text-moss-gold" />
              When to Use
            </h2>
            <Bullets items={item?.whenToUse} className="mt-3" />
          </article>
          <article className="hub-card p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-bold text-moss-everglade">
              <Icon name="lightbulb" size={16} className="text-moss-gold" />
              Pro Tips
            </h2>
            <Bullets items={item?.proTips} className="mt-3" />
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
