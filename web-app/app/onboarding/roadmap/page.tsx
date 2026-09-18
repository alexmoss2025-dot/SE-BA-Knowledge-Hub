import type { Metadata } from 'next'
import { OnboardingTabs } from '@/components/hub/onboarding-tabs'
import { OnboardHero, OnbSection, HubTable, Chip, CreamCta } from '@/components/hub/onboarding-ui'
import { Icon } from '@/components/hub/icon'

export const metadata: Metadata = {
  title: '30/60/90 Roadmap · BA Knowledge Hub',
  description: 'A summary of your first 90 days at Moss: learn first, then contribute, then own.',
}

const PHASES = [
  {
    n: 1,
    days: 'Days 1 to 30',
    title: 'Learn',
    icon: 'book-open',
    text: "Focus on understanding Moss culture, your team, our systems, and the processes you'll support. Start building the relationships that will make your later work possible.",
    items: [
      'Complete required orientation and safety training',
      'Meet your key stakeholders',
      'Begin shadowing experienced team members',
      "Learn the systems and processes you'll support",
    ],
    outcome: 'Understand culture, systems, and stakeholders; complete onboarding and safety training.',
  },
  {
    n: 2,
    days: 'Days 31 to 60',
    title: 'Contribute',
    icon: 'hands-helping',
    text: "Take on your first assignments with support. Validate what you're learning with stakeholders and refine your understanding of how Moss really works.",
    items: [
      'Begin conducting process discovery interviews',
      'Document current-state workflows',
      'Start delivering small, useful outputs',
      'Validate findings with stakeholders',
    ],
    outcome: 'Deliver first assignments and conduct process discovery with support.',
  },
  {
    n: 3,
    days: 'Days 61 to 90',
    title: 'Own',
    icon: 'flag-checkered',
    text: 'Lead initiatives with growing independence. By day 90 you should be a trusted, contributing member of the team.',
    items: [
      'Present findings and recommendations',
      'Help refine processes',
      'Take ownership of deliverables end to end',
      'Operate as a trusted member of the team',
    ],
    outcome: 'Lead initiatives, present findings, and own deliverables end to end.',
  },
]

function GoldNum({ n }: { n: number }) {
  return (
    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-moss-suncoast text-sm font-bold text-moss-everglade">
      {n}
    </span>
  )
}

export default function RoadmapPage() {
  return (
    <div className="space-y-6">
      <OnboardHero
        eyebrow="Your First 90 Days"
        title="Your 30/60/90 Day Roadmap."
        text="This roadmap is a summary of your first 90 days. Your detailed, day-by-day tasks live in the companion onboarding checklist. Use this overview to keep sight of the bigger picture: learn first, then contribute, then own."
        aside={
          <div className="space-y-4">
            {PHASES.map((p) => (
              <div key={p.n} className="flex items-center gap-3">
                <GoldNum n={p.n} />
                <p className="text-sm text-white/90">
                  <strong className="text-white">{p.title}</strong> · {p.days.replace(' to ', '–')}
                </p>
              </div>
            ))}
          </div>
        }
      />

      <OnboardingTabs />

      <section className="grid gap-6 lg:grid-cols-3">
        {PHASES.map((p) => (
          <article key={p.n} className="hub-card flex flex-col overflow-hidden rounded-xl">
            <div className="flex items-center justify-between bg-moss-everglade p-5 text-white">
              <div className="flex items-center gap-3">
                <GoldNum n={p.n} />
                <div>
                  <p className="eyebrow text-moss-palegold">{p.days}</p>
                  <h2 className="text-xl font-bold">{p.title}</h2>
                </div>
              </div>
              <Icon name={p.icon} size={26} className="text-white/70" />
            </div>
            <div className="flex-1 p-5">
              <p className="text-sm leading-relaxed text-moss-body">{p.text}</p>
              <ul className="mt-4 space-y-2.5">
                {p.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-sm text-moss-body">
                    <Icon name="check" size={15} className="mt-0.5 shrink-0 text-moss-green" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-moss-offwhite p-5">
              <p className="eyebrow text-moss-gold">Primary Outcome</p>
              <p className="mt-1.5 text-sm font-bold text-moss-everglade">{p.outcome}</p>
            </div>
          </article>
        ))}
      </section>

      <OnbSection icon="table-list" title="Roadmap at a Glance" sub="The full arc of your first 90 days">
        <HubTable
          head={['Phase', 'Focus', 'Primary Outcome']}
          rows={[
            [<span key="a" className="font-bold text-moss-everglade">Days 1 to 30</span>, <Chip key="b" tone="tint">Learn</Chip>, PHASES[0]?.outcome ?? ''],
            [<span key="a" className="font-bold text-moss-everglade">Days 31 to 60</span>, <Chip key="b" tone="cream">Contribute</Chip>, PHASES[1]?.outcome ?? ''],
            [<span key="a" className="font-bold text-moss-everglade">Days 61 to 90</span>, <Chip key="b" tone="dark">Own</Chip>, PHASES[2]?.outcome ?? ''],
          ]}
        />
      </OnbSection>

      <CreamCta
        icon="list-check"
        title="Day-by-day detail"
        text="Your detailed daily tasks live in the companion onboarding checklist — ask your team lead for access during week one."
        href="/onboarding/toolkit"
        cta="Next: Toolkit & Guidelines"
      />
    </div>
  )
}
