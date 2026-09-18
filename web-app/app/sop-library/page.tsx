import type { Metadata } from 'next'
import { Callout, PageIntro, PrimaryLink, StatCard } from '@/components/hub/ui'
import { SopTable } from '@/components/hub/sop-table'

export const metadata: Metadata = { title: 'SOP Library' }

export default function SopLibraryPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: 'Home', href: '/' }, { label: 'SOP Library' }]}
        title="SOP Library"
        lede="Follow clear, approved procedures and know who to contact when questions arise."
        action={
          <PrimaryLink
            href={`mailto:ai@moss.com?subject=${encodeURIComponent('SOP Update Request')}&body=${encodeURIComponent('Hello,\r\n\r\nI would like to submit an update to an SOP.\r\n\r\nSOP ID / Title:\r\nProposed change:\r\n\r\nSubmitted from the BA Knowledge Hub SOP Library.')}`}
            icon="plus"
          >
            Submit an Update
          </PrimaryLink>
        }
      />

      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Current SOPs" value="18" />
        <StatCard label="In Review" value="3" />
        <StatCard label="Updated This Month" value="5" />
        <StatCard label="Practice Owners" value="6" dark />
      </section>

      <SopTable />

      <div className="mt-8">
        <Callout
          icon="shield-halved"
          title="Use the current published version"
          text="If a procedure appears outdated or incomplete, contact the listed owner or submit an update."
        />
      </div>
    </>
  )
}
