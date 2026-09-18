import type { Metadata } from 'next'
import { OnboardingTabs } from '@/components/hub/onboarding-tabs'
import { OnboardHero, OnbSection, HubTable, IconLabel, CreamCta } from '@/components/hub/onboarding-ui'
import { Rich } from '@/components/hub/ui'

export const metadata: Metadata = {
  title: 'Onboarding Center · BA Knowledge Hub',
  description: 'Welcome to Moss — your orientation to our culture, our people, and the way the BA function creates value here.',
}

export default function OnboardingCenterPage() {
  return (
    <div className="space-y-6">
      <OnboardHero
        eyebrow="BA Onboarding Handbook"
        title="Welcome to Moss."
        text="You are joining a construction company built on safety, quality, and relationships — and we're glad you're here. This onboarding path focuses on how we work at Moss, not the BA fundamentals you already know. Use it as your orientation to our culture, our people, and the way the BA function creates value here."
        aside={
          <div className="space-y-3">
            <p className="eyebrow text-moss-palegold">Core Purpose</p>
            <p className="text-lg font-bold">Empower to Create the Exceptional</p>
            <p className="eyebrow pt-2 text-moss-palegold">Just Cause</p>
            <p className="text-lg font-bold">Improve Lives and Build the Future</p>
            <p className="pt-2 text-sm text-white/80">Your work supports both — clearer processes, better-informed decisions, more effective teams.</p>
          </div>
        }
      />

      <OnboardingTabs />

      <OnbSection icon="people-group" title="Who We Are" sub="A people-centered model grounded in relationships">
        <div className="space-y-4 text-[15px] leading-relaxed text-moss-body">
          <Rich html={`Moss was founded in <strong>2003 by Bob, Chad, and Scott Moss</strong> on a people-centered model grounded in relationships. What began as the “Cult of Bob” has grown into the <strong>“Culture of Moss”</strong> — the same care for people supported by scaled systems, structure, and transparency. Our mantra, <strong class="text-moss-green">“Moss-first, people always,”</strong> still guides how we operate every day.`} />
          <Rich html={`Moss runs two primary businesses: <strong>Construction Management</strong> (regional) and <strong>Utility-Scale Solar EPC</strong> (national). Shared Services — Strategy, HR, Finance, IT, Legal, and Business Development — act as enablers across both, and the Vision Leadership Team drives enterprise alignment, trust, and healthy conflict. As a BA, you may support any of these groups depending on where you are assigned.`} />
        </div>
      </OnbSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <OnbSection icon="heart" title="Our Core Values" sub="What we care about most">
          <HubTable
            head={['Value', 'What It Means']}
            rows={[
              [<IconLabel key="a" icon="handshake">Honor Relationships</IconLabel>, 'Care about the safety, well-being, and success of our families and business partners.'],
              [<IconLabel key="b" icon="rocket">Entrepreneurial Spirit</IconLabel>, 'Embrace opportunities, innovate, and overcome challenges.'],
              [<IconLabel key="c" icon="bolt">Contagious Energy</IconLabel>, 'Work hard, be nice, have fun.'],
            ]}
          />
        </OnbSection>
        <OnbSection icon="compass-drafting" title="Our Cultural Principles" sub="How they show up day to day">
          <HubTable
            head={['Principle', 'How It Shows Up']}
            rows={[
              [<IconLabel key="a">Lead from the Field</IconLabel>, 'Empower those closest to the work to shape it.'],
              [<IconLabel key="b">Clear is Kind</IconLabel>, 'Transparent, direct communication builds trust.'],
              [<IconLabel key="c">Trust and Accountability Coexist</IconLabel>, 'Assume good intent, and expect follow-through.'],
              [<IconLabel key="d">Play the Infinite Game</IconLabel>, 'Build for decades, not just deadlines.'],
            ]}
          />
        </OnbSection>
      </div>

      <OnbSection icon="user-tie" title="The Business Analyst Role at Moss" sub="Connecting people, process, and data">
        <Rich
          className="mb-5 text-[15px] leading-relaxed text-moss-body"
          html={`At Moss, Business Analysts <strong>connect people, process, and data</strong>. You'll spend your time understanding how work actually gets done in the field and across shared services, then translating what you learn into clearer processes, better requirements, and decisions our teams can trust. Because we <strong class="text-moss-green">lead from the field</strong>, the best BA work here starts with listening to the people closest to the work. Clear analysis is a form of Clear is Kind: it gives leaders and field teams what they need to make good decisions quickly.`}
        />
        <HubTable
          head={['Focus Area', 'What It Looks Like at Moss']}
          rows={[
            [<IconLabel key="a" icon="magnifying-glass-chart">Process discovery</IconLabel>, 'Map how work flows across the field, projects, and shared services, and find where it breaks down.'],
            [<IconLabel key="b" icon="list-check">Requirements gathering</IconLabel>, 'Translate stakeholder needs into clear, testable requirements for systems and process changes.'],
            [<IconLabel key="c" icon="chart-line">Data and reporting</IconLabel>, 'Analyze operational data to support forecasting, cost control, and performance visibility.'],
            [<IconLabel key="d" icon="gears">Solution support</IconLabel>, 'Help evaluate, configure, and roll out tools that make teams more effective.'],
            [<IconLabel key="e" icon="bullhorn">Change enablement</IconLabel>, 'Support adoption by communicating clearly and closing the loop with stakeholders.'],
          ]}
        />
      </OnbSection>

      <OnbSection icon="sitemap" title="Key Stakeholders" sub="Who they are and why they matter to your work">
        <HubTable
          head={['Stakeholder Group', 'Why They Matter']}
          rows={[
            [<Stake key="a" name="Field leaders" sub="Superintendents, PMs, APMs" />, 'Own daily sequencing, trade coordination, and safety adjustments. They are your primary source of ground truth.'],
            [<Stake key="b" name="Project leaders" sub="PMs, Regional VPs, Precon, Schedulers" />, 'Own budgets, schedules, change orders, and client engagement.'],
            [<Stake key="c" name="Business unit leaders" sub="Presidents, regional leaders" />, 'Own talent, margin strategies, and partnerships.'],
            [<Stake key="d" name="Shared Services" sub="HR, Finance, IT, Legal, BD" />, "Provide the systems and support you'll often analyze and improve."],
          ]}
        />
      </OnbSection>

      <CreamCta
        icon="route"
        title="Ready to start?"
        text="Your first 90 days follow a simple arc: learn first, then contribute, then own."
        href="/onboarding/roadmap"
        cta="View Your 30/60/90 Roadmap"
      />
    </div>
  )
}

function Stake({ name, sub }: { name: string; sub: string }) {
  return (
    <div>
      <span className="font-bold text-moss-everglade">{name}</span>
      <p className="mt-0.5 text-xs text-moss-meta">{sub}</p>
    </div>
  )
}
