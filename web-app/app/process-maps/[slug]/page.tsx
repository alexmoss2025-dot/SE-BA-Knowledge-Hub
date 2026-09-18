import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Icon } from '@/components/hub/icon'
import { DetailSection } from '@/components/hub/detail-section'
import { MermaidChart } from '@/components/hub/mermaid-chart'
import { Breadcrumb, DetailList, OnThisPage, RelatedCard, Rich, StatusPill } from '@/components/hub/ui'
import { getMap } from '@/lib/site'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const map = getMap(slug)
  return { title: map?.title ?? 'Process Map' }
}

const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'flowchart', label: 'Process Flow' },
  { id: 'roles', label: 'Key Roles' },
  { id: 'related', label: 'Related Resources' },
]

export default async function ProcessMapDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const map = getMap(slug)
  if (!map) notFound()

  return (
    <>
      <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Process Maps', href: '/process-maps' }, { label: map?.crumb ?? map?.title ?? '' }]} />
          <div className="mt-4">
            <StatusPill status={map?.status} />
          </div>
          <h1 className="mt-2 text-3xl font-bold text-moss-everglade sm:text-4xl">{map?.title}</h1>
          <p className="mt-2 max-w-3xl text-base text-moss-muted">{map?.summary}</p>
        </div>
        <Link
          href="/process-maps"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-moss-grey bg-white px-4 py-2.5 text-sm font-bold text-moss-everglade transition-colors hover:border-moss-green"
        >
          <Icon name="arrow-left" size={14} />
          Back to Library
        </Link>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0 space-y-6">
          <DetailSection id="overview" icon="circle-info" title="Overview">
            <div className="space-y-3">
              {(map?.overview ?? []).map((p, i) => (
                <Rich key={i} html={p} className="text-sm leading-relaxed text-moss-body" />
              ))}
            </div>
          </DetailSection>

          <DetailSection id="flowchart" icon="diagram-project" title="Process Flow">
            <div className="rounded-lg bg-moss-offwhite">
              <MermaidChart code={map?.mermaid} id={map?.slug ?? 'map'} />
            </div>
          </DetailSection>

          <DetailSection id="roles" icon="users-gear" title="Key Roles">
            <div className="grid gap-4 md:grid-cols-2">
              {(map?.roles ?? []).map((r, i) => (
                <div key={i} className="rounded-lg bg-moss-offwhite p-5">
                  <p className="text-sm font-bold text-moss-everglade">{r?.role}</p>
                  <p className="mt-1 text-sm leading-relaxed text-moss-body">{r?.description}</p>
                </div>
              ))}
            </div>
          </DetailSection>

          <DetailSection id="related" icon="link" title="Related Resources">
            <div className="grid gap-3 md:grid-cols-2">
              {(map?.related ?? []).map((r, i) => (
                <RelatedCard key={i} href={r?.href ?? '/'} icon={r?.icon ?? 'link'} title={r?.title ?? ''} sub={r?.sub ?? ''} />
              ))}
            </div>
          </DetailSection>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-[100px] lg:self-start">
          <DetailList title="Map Details" items={(map?.details ?? []).map((d) => ({ label: d?.label ?? '', value: d?.value ?? '' }))} />
          <OnThisPage items={TOC} />
          <article className="rounded-xl bg-moss-cream p-5">
            <h3 className="flex items-center gap-2 text-base font-bold text-moss-everglade">
              <Icon name="lightbulb" size={16} className="text-moss-gold" />
              Process Improvement
            </h3>
            <Rich html={map?.note} className="mt-2 text-sm leading-relaxed text-moss-body" />
          </article>
        </aside>
      </div>
    </>
  )
}
