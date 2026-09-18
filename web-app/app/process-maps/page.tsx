import type { Metadata } from 'next'
import { PageIntro, PrimaryLink } from '@/components/hub/ui'
import { MapsLibrary } from '@/components/hub/maps-library'

export const metadata: Metadata = { title: 'Process Maps' }

export default function ProcessMapsPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Process Maps' }]}
        title="Process Maps"
        lede="Explore approved current-state and future-state workflows across Moss."
        action={
          <PrimaryLink
            href={`mailto:ai@moss.com?subject=${encodeURIComponent('Process Map Submission')}&body=${encodeURIComponent('Hello,\r\n\r\nI would like to submit a process map for the Visual Process Library.\r\n\r\nProcess name:\r\nDomain:\r\nState (Current / Future):\r\nOwner:\r\n\r\nSubmitted from the BA Knowledge Hub Process Maps page.')}`}
            icon="plus"
          >
            Submit a Map
          </PrimaryLink>
        }
      />
      <MapsLibrary />
    </>
  )
}
