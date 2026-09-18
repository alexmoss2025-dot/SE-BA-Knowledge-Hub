'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Icon } from '@/components/hub/icon'
import { NAV_ITEMS, getPageMeta } from '@/lib/site'

export function HubShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? '/'
  const [open, setOpen] = useState(false)
  const meta = getPageMeta(pathname)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div className="flex min-h-screen w-full">
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[248px] shrink-0 flex-col bg-moss-everglade text-white transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Primary navigation"
      >
        <div className="flex h-[102px] items-center justify-between border-b border-white/15 px-7">
          <Link href="/" className="relative block h-[54px] w-[132px]" aria-label="BA Knowledge Hub home">
            <Image src="/moss-white-logo.png" alt="Moss" fill className="object-contain object-left" priority sizes="132px" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg p-1 text-white/80 hover:bg-white/10 lg:hidden"
            aria-label="Close navigation"
          >
            <Icon name="xmark" size={18} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-7">
          <p className="eyebrow mb-3 px-3 text-[11px] text-moss-palegold">Knowledge Hub</p>
          <ul className="space-y-1">
            {NAV_ITEMS?.map?.((item) => {
              const active = item?.href === '/' ? pathname === '/' : pathname?.startsWith?.(item?.href ?? '') ?? false
              return (
                <li key={item?.href}>
                  <Link
                    href={item?.href ?? '/'}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      active ? 'bg-white/10 font-bold text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon name={item?.icon} size={16} className={active ? 'text-moss-suncoast' : 'text-white/70'} />
                    <span>{item?.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="border-t border-white/15 p-5">
          <p className="text-[11px] text-white/60">MossAIc Internal Resource</p>
          <p className="mt-1 text-sm font-bold text-white">Empower to create the exceptional.</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-moss-border bg-white/95 px-5 backdrop-blur sm:px-10">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-moss-grey text-moss-everglade hover:bg-moss-offwhite lg:hidden"
              aria-label="Open navigation"
            >
              <Icon name="menu" size={18} />
            </button>
            <div className="min-w-0">
              <p className="eyebrow truncate text-moss-gold">{meta?.eyebrow}</p>
              <p className="truncate text-sm text-moss-muted">{meta?.subtitle}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {meta?.badge ? (
              <span className="hidden rounded-full bg-moss-tint px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-moss-green sm:inline-flex">
                {meta.badge}
              </span>
            ) : null}
            {meta?.headerAction === 'ai-guidance' ? (
              <Link
                href="/ai-toolkit"
                className="hidden items-center gap-2 rounded-lg border border-moss-grey bg-white px-4 py-2.5 text-sm font-bold text-moss-everglade hover:border-moss-green sm:inline-flex"
              >
                <Icon name="shield-halved" size={14} className="text-moss-green" />
                AI Guidance
              </Link>
            ) : null}
            {meta?.headerAction === 'search' ? (
              <Link
                href="/#hub-search"
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-moss-grey text-moss-everglade hover:bg-moss-offwhite sm:flex"
                aria-label="Search the hub"
              >
                <Icon name="magnifying-glass" size={16} />
              </Link>
            ) : null}
            <Link
              href={meta?.headerAction === 'bell' ? '/sop-library' : '/onboarding/resources'}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-moss-grey text-moss-everglade hover:bg-moss-offwhite"
              aria-label={meta?.headerAction === 'bell' ? 'SOP updates' : 'Help and contacts'}
            >
              <Icon name={meta?.headerAction === 'bell' ? 'bell' : 'circle-question'} size={16} />
            </Link>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full bg-moss-green text-sm font-bold text-white"
              aria-label="Business Analyst"
            >
              BA
            </div>
          </div>
        </header>

        <main className="flex-1 px-5 pb-12 pt-7 sm:px-10 sm:pt-9">
          <div className="mx-auto w-full max-w-[1200px]">{children}</div>
        </main>

        <footer className="flex flex-col gap-2 border-t border-moss-border bg-white px-5 py-5 text-xs text-moss-meta sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <span>{meta?.footerLeft ?? 'BA Knowledge Hub · Powered by MossAIc'}</span>
          <span className={meta?.footerBold ? 'font-bold text-moss-gold' : ''}>{meta?.footerRight}</span>
        </footer>
      </div>
    </div>
  )
}
