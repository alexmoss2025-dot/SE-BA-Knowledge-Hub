import type { Metadata } from 'next'
import Link from 'next/link'
import { OnboardingTabs } from '@/components/hub/onboarding-tabs'
import { OnboardHero, OnbSection, HubTable, IconLabel, CreamCta } from '@/components/hub/onboarding-ui'
import { Icon } from '@/components/hub/icon'
import { IconTile, Rich } from '@/components/hub/ui'

export const metadata: Metadata = {
  title: 'Toolkit & Guidelines · BA Knowledge Hub',
  description: 'How familiar BA methods land at Moss, plus the Moss-specific guidelines every analyst is expected to follow.',
}

const TERMS: [string, string][] = [
  ['Jobsite', 'Job site, Job-Site'],
  ['Trade Partner', 'Subcontractor'],
  ['Preconstruction', 'Pre-Construction'],
  ['Onsite', 'On-site'],
  ['Design-build', 'Design/build'],
  ['Moss’', 'Moss’s'],
]

const NON_NEGOTIABLES: { icon: string; text: string }[] = [
  { icon: 'scale-balanced', text: "We won't take bad jobs for volume or fee." },
  { icon: 'heart', text: "We won't sacrifice our core values or team benefits." },
  { icon: 'box-open', text: 'We deliver exactly what we sell.' },
  { icon: 'shield-halved', text: 'We always do the right thing.' },
]

const PLACEHOLDER_ROWS = [0, 1, 2, 3].map((i) => [
  <span key={`s${i}`} className="text-moss-meta">To be completed by team lead</span>,
  <span key={`p${i}`} className="text-moss-meta">Purpose</span>,
  <span key={`a${i}`} className="text-moss-meta">Access owner</span>,
  <span key={`n${i}`} className="text-moss-meta">Notes</span>,
])

export default function ToolkitPage() {
  return (
    <div className="space-y-6">
      <OnboardHero
        eyebrow="Core BA Toolkit at Moss"
        title="You know the methods. Here's how they land at Moss."
        text="This section highlights how we apply familiar BA methods at Moss so your first efforts land well with our teams — plus the Moss-specific guidelines every analyst is expected to follow."
        aside={
          <div className="space-y-3">
            <p className="eyebrow text-moss-palegold">Safety Is a Promise, Not a Priority</p>
            <p className="text-sm leading-relaxed text-white/85">
              Every person at Moss is empowered to stop work for safety. Never recommend a change that trades safety for speed or cost.
            </p>
          </div>
        }
      />

      <OnboardingTabs />

      <OnbSection icon="toolbox" title="Methods We Rely On" sub="Familiar methods, applied the Moss way">
        <HubTable
          head={['Method', 'How to Apply It at Moss']}
          rows={[
            [
              <IconLabel key="a" icon="magnifying-glass-chart">Process discovery</IconLabel>,
              <span key="b">
                Start in the field. Observe and interview the people doing the work before proposing changes. Use the{' '}
                <Link href="/onboarding/resources" className="font-bold text-moss-green underline-offset-2 hover:underline">
                  interview guide
                </Link>
                .
              </span>,
            ],
            [<IconLabel key="a" icon="list-check">Requirements gathering</IconLabel>, 'Write clear, testable requirements. Confirm understanding with stakeholders, and keep language plain.'],
            [<IconLabel key="a" icon="diagram-project">Stakeholder mapping</IconLabel>, 'Identify decision layers early: field, project, business unit, and enterprise. Match your engagement to the right level.'],
            [<IconLabel key="a" icon="chart-line">Data analysis</IconLabel>, 'Ground recommendations in operational data. Tie findings to cost control, schedule, safety, or quality.'],
          ]}
        />
      </OnbSection>

      <OnbSection icon="layer-group" title="Decision Layers" sub="Match your questions and recommendations to the right layer">
        <HubTable
          head={['Level', 'Who', 'What They Decide']}
          rows={[
            [<IconLabel key="a">Field</IconLabel>, 'Superintendents, PMs, APMs', 'Trade coordination, daily sequencing, safety adjustments.'],
            [<IconLabel key="a">Project</IconLabel>, 'PMs, Regional VPs, Precon, Schedulers', 'Budgets, schedules, change orders, client engagement.'],
            [<IconLabel key="a">Business Unit</IconLabel>, 'Presidents, regional leaders', 'Talent, margin strategies, partnerships.'],
            [<IconLabel key="a">Enterprise</IconLabel>, 'CEO, VLT, Shared Services', 'Systems, compensation, scaling.'],
          ]}
        />
      </OnbSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <OnbSection icon="spell-check" title="Approved Terminology" sub="Language matters at Moss">
          <HubTable
            head={['Use This', 'Not This']}
            rows={TERMS.map(([use, not]) => [
              <IconLabel key={use} icon="check" green>
                {use}
              </IconLabel>,
              <span key={not} className="text-moss-muted line-through decoration-moss-meta/60">{not}</span>,
            ])}
          />
        </OnbSection>
        <OnbSection icon="ban" title="Non-Negotiables" sub="Some things we simply won't do">
          <div className="space-y-3">
            {NON_NEGOTIABLES.map((n) => (
              <div key={n.text} className="flex items-center gap-4 rounded-lg bg-moss-offwhite p-3.5">
                <IconTile icon={n.icon} tone="cream" size={40} />
                <p className="text-sm font-bold text-moss-everglade">{n.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-moss-muted">Keep these in mind when you frame recommendations.</p>
        </OnbSection>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-xl bg-moss-everglade p-7 text-white shadow-md">
          <Icon name="helmet-safety" size={28} className="text-moss-palegold" />
          <h2 className="mt-4 text-xl font-bold">Safety Is a Promise, Not a Priority</h2>
          <Rich
            className="mt-3 text-sm leading-relaxed text-white/85 [&_strong]:text-white"
            html={`Safety is not one priority among many; it is a promise we keep. Every person at Moss is empowered to stop work for safety, and psychological safety is part of total safety. As a BA, respect this in everything you analyze: <strong>never recommend a change that trades safety for speed or cost.</strong>`}
          />
        </article>
        <article className="rounded-xl bg-moss-tint p-7 shadow-sm">
          <Icon name="comments" size={28} className="text-moss-green" />
          <h2 className="mt-4 text-xl font-bold text-moss-everglade">Communication Expectations</h2>
          <Rich
            className="mt-3 text-sm leading-relaxed text-moss-body"
            html={`Share early, speak plainly, and answer honestly. <strong class="text-moss-green">Clear is kind.</strong> Escalate issues early, close loops, and document decisions. Aim to finish every engagement better friends than when you started.`}
          />
        </article>
      </section>

      <OnbSection
        icon="desktop"
        title="Moss-Specific Systems and Tools"
        sub="Your team lead will complete this during your first week — ask early so you can request access right away"
      >
        <HubTable head={['System or Tool', 'Purpose', 'Access Owner', 'Notes']} rows={PLACEHOLDER_ROWS} />
      </OnbSection>

      <CreamCta
        icon="address-book"
        title="Get set up"
        text="Record your key contacts and system access, and grab the process discovery interview guide."
        href="/onboarding/resources"
        cta="Next: Resources & Contacts"
      />
    </div>
  )
}
