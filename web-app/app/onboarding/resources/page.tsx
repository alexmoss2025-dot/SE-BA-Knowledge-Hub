import type { Metadata } from 'next'
import Link from 'next/link'
import { OnboardingTabs } from '@/components/hub/onboarding-tabs'
import { OnboardHero, OnbSection, HubTable, IconLabel, Chip } from '@/components/hub/onboarding-ui'
import { Icon } from '@/components/hub/icon'

export const metadata: Metadata = {
  title: 'Resources & Contacts · BA Knowledge Hub',
  description: 'Key resources, contacts, systems access, and the process discovery interview guide.',
}

const QUICK_LINKS = [
  { href: '/ba-templates', icon: 'file-lines', label: 'BA Templates' },
  { href: '/sop-library', icon: 'book', label: 'SOP Library' },
  { href: '/glossary', icon: 'spell-check', label: 'Project Glossary' },
  { href: '/ai-toolkit', icon: 'wand-magic-sparkles', label: 'AI Toolkit' },
]

const CONTACTS = [
  { icon: 'user-tie', role: 'Team lead / manager' },
  { icon: 'user-group', role: 'Onboarding buddy' },
  { icon: 'user-shield', role: 'HR contact' },
  { icon: 'user-gear', role: 'IT / systems access' },
]

const GUIDE: { icon: string; title: string; questions: string[] }[] = [
  {
    icon: 'door-open',
    title: 'Opening Questions',
    questions: [
      'Tell me about your role and how this process fits into your work.',
      'At a high level, what is this process meant to accomplish?',
      'Who else is involved, and where do they sit?',
    ],
  },
  {
    icon: 'arrow-right-arrow-left',
    title: 'Process Flow Questions',
    questions: [
      'Walk me through the process step by step, from start to finish.',
      "What triggers the process to begin, and how do you know it's complete?",
      'Which systems, tools, or documents do you use at each step?',
      'Where do handoffs happen between people or teams?',
    ],
  },
  {
    icon: 'triangle-exclamation',
    title: 'Pain Point Questions',
    questions: [
      'Where does this process most often slow down or break down?',
      'What workarounds have you or your team developed?',
      'If you could change one thing about this process, what would it be?',
    ],
  },
  {
    icon: 'gauge-high',
    title: 'Volume and Frequency Questions',
    questions: [
      'How often does this process run, and how many people or items does it involve?',
      'Are there busy periods or peaks that strain the process?',
      'How long does the process typically take end to end?',
    ],
  },
  {
    icon: 'flag-checkered',
    title: 'Wrap-Up Questions',
    questions: [
      'Who else should I talk to for a fuller picture?',
      "Is there anything I didn't ask about that I should know?",
      'What would a clearly better version of this process look like to you?',
    ],
  },
]

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <OnboardHero
        eyebrow="Key Resources and Contacts"
        title="Your home base and your people."
        text="The BA Knowledge Hub is your home base for templates, standards, and reference material. Your team lead will confirm links and access during your first week. Use the tables below to record your key contacts and systems as you get set up."
        aside={
          <div>
            <p className="eyebrow text-moss-palegold">Quick Links</p>
            <ul className="mt-3 space-y-1">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-white/10"
                  >
                    <Icon name={l.icon} size={15} className="text-moss-palegold" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <OnboardingTabs />

      <div className="grid gap-6 lg:grid-cols-2">
        <OnbSection icon="address-book" title="Key Contacts" sub="Record these during your first week">
          <HubTable
            head={['Role', 'Name & Contact']}
            rows={CONTACTS.map((c) => [
              <IconLabel key={c.role} icon={c.icon}>
                {c.role}
              </IconLabel>,
              <span key="v" className="text-moss-meta">To be completed</span>,
            ])}
          />
        </OnbSection>
        <OnbSection icon="key" title="Key Systems and Access" sub="Track your access requests">
          <HubTable
            head={['System & Purpose', 'Access']}
            rows={[
              [
                <div key="a">
                  <span className="font-bold text-moss-everglade">BA Knowledge Hub (SharePoint)</span>
                  <p className="mt-0.5 text-xs text-moss-meta">Templates, standards, and reference material</p>
                </div>,
                <Chip key="b" tone="cream">Pending</Chip>,
              ],
              ...[0, 1, 2].map((i) => [
                <span key={`t${i}`} className="text-moss-meta">To be completed</span>,
                <Chip key={`c${i}`} tone="cream">Pending</Chip>,
              ]),
            ]}
          />
        </OnbSection>
      </div>

      <OnbSection
        icon="clipboard-question"
        title="Appendix: Process Discovery Interview Guide"
        sub="Use this when interviewing stakeholders to map a current-state process — adapt to your context and leave room to follow the conversation"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {GUIDE.map((g) => (
            <article key={g.title} className="rounded-lg bg-moss-offwhite p-5">
              <h3 className="flex items-center gap-2 text-base font-bold text-moss-everglade">
                <Icon name={g.icon} size={16} className="text-moss-gold" />
                {g.title}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {g.questions.map((q) => (
                  <li key={q} className="flex items-start gap-2.5 text-sm leading-relaxed text-moss-body">
                    <Icon name="circle-question" size={15} className="mt-0.5 shrink-0 text-moss-green" />
                    {q}
                  </li>
                ))}
              </ul>
            </article>
          ))}
          <article className="rounded-lg bg-moss-tint p-5">
            <p className="eyebrow text-moss-green">Pair With the AI Toolkit</p>
            <h3 className="mt-2 text-base font-bold text-moss-everglade">Run discovery faster with MossAIc</h3>
            <p className="mt-2 text-sm leading-relaxed text-moss-body">
              The AI Toolkit includes a prompt starter for building interview guides and a guided workflow for process discovery synthesis.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/ai-toolkit/prompts/interview-guide" className="inline-flex items-center gap-2 text-sm font-bold text-moss-green hover:underline">
                Interview Guide Prompt Starter <Icon name="arrow-right" size={14} />
              </Link>
              <Link href="/ai-toolkit/workflows/process-discovery" className="inline-flex items-center gap-2 text-sm font-bold text-moss-green hover:underline">
                Process Discovery Workflow <Icon name="arrow-right" size={14} />
              </Link>
            </div>
          </article>
        </div>
      </OnbSection>
    </div>
  )
}
