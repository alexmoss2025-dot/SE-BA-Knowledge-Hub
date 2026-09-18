import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Icon } from '@/components/hub/icon'
import { DetailSection } from '@/components/hub/detail-section'
import { Breadcrumb, Bullets, DetailList, NoteCard, OnThisPage, RelatedCard, Rich, StatusPill } from '@/components/hub/ui'
import { getSop } from '@/lib/site'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const sop = getSop(slug)
  return { title: sop?.title ?? 'SOP' }
}

const TOC = [
  { id: 'purpose', label: 'Purpose' },
  { id: 'scope', label: 'Scope' },
  { id: 'roles', label: 'Roles & Responsibilities' },
  { id: 'trigger', label: 'Trigger / When to Use' },
  { id: 'procedure', label: 'Step-by-Step Procedure' },
  { id: 'io', label: 'Inputs & Outputs' },
  { id: 'related', label: 'Related Templates & Tools' },
  { id: 'history', label: 'Revision History' },
]

export default async function SopDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sop = getSop(slug)
  if (!sop) notFound()

  const glance = (sop?.glance ?? []).map((g) => ({ label: g?.label ?? '', value: g?.value ?? '' }))

  return (
    <>
      <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'SOP Library', href: '/sop-library' }, { label: sop?.title ?? '' }]} />
          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm font-bold text-moss-gold">{sop?.id}</span>
            <StatusPill status={sop?.status} />
          </div>
          <h1 className="mt-2 text-3xl font-bold text-moss-everglade sm:text-4xl">{sop?.title}</h1>
          <p className="mt-2 max-w-3xl text-base text-moss-muted">{sop?.summary}</p>
        </div>
        <Link
          href="/sop-library"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-moss-grey bg-white px-4 py-2.5 text-sm font-bold text-moss-everglade transition-colors hover:border-moss-green"
        >
          <Icon name="arrow-left" size={14} />
          Back to Library
        </Link>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0 space-y-6">
          <DetailSection id="purpose" icon="bullseye" title="Purpose">
            <div className="space-y-3">
              {(sop?.purpose ?? []).map((p, i) => (
                <Rich key={i} html={p} className="text-sm leading-relaxed text-moss-body" />
              ))}
            </div>
          </DetailSection>

          <DetailSection id="scope" icon="object-group" title="Scope">
            <Rich html={sop?.scope?.text} className="text-sm leading-relaxed text-moss-body" />
            <p className="mt-4 text-sm font-bold text-moss-everglade">Out of scope:</p>
            <Bullets items={sop?.scope?.outOfScope} rich className="mt-2" />
          </DetailSection>

          <DetailSection id="roles" icon="users-gear" title="Roles & Responsibilities">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wider text-moss-olive">
                    <th className="pb-2 pr-4 font-bold">Role</th>
                    <th className="pb-2 font-bold">Responsibility</th>
                  </tr>
                </thead>
                <tbody>
                  {(sop?.roles ?? []).map((r, i) => (
                    <tr key={i} className="border-t border-moss-border align-top">
                      <td className="py-3 pr-4 font-bold text-moss-everglade">{r?.role}</td>
                      <td className="py-3 leading-relaxed text-moss-body">{r?.responsibility}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DetailSection>

          <DetailSection id="trigger" icon="bell" title="Trigger / When to Use">
            <p className="text-sm leading-relaxed text-moss-body">{sop?.trigger?.intro}</p>
            <Bullets items={sop?.trigger?.items} className="mt-3" />
          </DetailSection>

          <DetailSection id="procedure" icon="list-ol" title="Step-by-Step Procedure">
            <ol className="space-y-6">
              {(sop?.steps ?? []).map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-moss-everglade text-sm font-bold text-white">{i + 1}</span>
                  <div className="min-w-0 flex-1 pt-1.5">
                    <p className="text-base font-bold text-moss-everglade">{s?.title}</p>
                    {s?.text ? <Rich html={s.text} className="mt-2 text-sm leading-relaxed text-moss-body" /> : null}
                    {s?.bullets?.length ? <Bullets items={s.bullets} rich className="mt-2" /> : null}
                  </div>
                </li>
              ))}
            </ol>
          </DetailSection>

          <DetailSection id="io" icon="right-left" title="Inputs & Outputs">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-moss-offwhite p-5">
                <p className="eyebrow flex items-center gap-2 text-moss-gold">
                  <Icon name="arrow-right-to-bracket" size={14} />
                  Inputs
                </p>
                <Bullets items={sop?.inputs} className="mt-3" />
              </div>
              <div className="rounded-lg bg-moss-offwhite p-5">
                <p className="eyebrow flex items-center gap-2 text-moss-gold">
                  <Icon name="arrow-right-from-bracket" size={14} />
                  Outputs
                </p>
                <Bullets items={sop?.outputs} className="mt-3" />
              </div>
            </div>
          </DetailSection>

          <DetailSection id="related" icon="link" title="Related Templates & Tools">
            <div className="grid gap-3 md:grid-cols-2">
              {(sop?.related ?? []).map((r, i) => (
                <RelatedCard key={i} href={r?.href ?? '/'} icon={r?.icon ?? 'link'} title={r?.title ?? ''} sub={r?.sub ?? ''} />
              ))}
            </div>
          </DetailSection>

          <DetailSection id="history" icon="clock-rotate-left" title="Revision History">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wider text-moss-olive">
                    <th className="pb-2 pr-4 font-bold">Version</th>
                    <th className="pb-2 pr-4 font-bold">Date</th>
                    <th className="pb-2 pr-4 font-bold">Summary of Change</th>
                    <th className="pb-2 font-bold">Author</th>
                  </tr>
                </thead>
                <tbody>
                  {(sop?.history ?? []).map((h, i) => (
                    <tr key={i} className="border-t border-moss-border align-top">
                      <td className="py-3 pr-4 font-bold text-moss-everglade">{h?.version}</td>
                      <td className="py-3 pr-4 text-moss-body">{h?.date}</td>
                      <td className="py-3 pr-4 text-moss-body">{h?.summary}</td>
                      <td className="py-3 text-moss-body">{h?.author}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DetailSection>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-[100px] lg:self-start">
          <DetailList title="At a Glance" items={glance} />
          <OnThisPage items={TOC} />
          <NoteCard title="Questions?" html={sop?.questions} />
        </aside>
      </div>
    </>
  )
}
