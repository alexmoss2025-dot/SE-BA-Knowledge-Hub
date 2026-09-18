'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href: '/onboarding', label: 'Overview · Welcome to Moss' },
  { href: '/onboarding/roadmap', label: '30/60/90 Roadmap' },
  { href: '/onboarding/toolkit', label: 'Toolkit & Guidelines' },
  { href: '/onboarding/resources', label: 'Resources & Contacts' },
]

export function OnboardingTabs() {
  const pathname = usePathname() ?? ''
  return (
    <nav aria-label="Onboarding sections" className="flex flex-wrap gap-2">
      {TABS.map((t) => {
        const active = pathname === t.href
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? 'page' : undefined}
            className={`rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${
              active
                ? 'bg-moss-tint text-moss-green shadow-sm'
                : 'bg-moss-greytint text-moss-everglade hover:bg-moss-tint hover:text-moss-green'
            }`}
          >
            {t.label}
          </Link>
        )
      })}
    </nav>
  )
}
