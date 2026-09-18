import type { ReactNode } from 'react'
import { Icon } from '@/components/hub/icon'

export function DetailSection({ id, icon, title, children }: { id: string; icon: string; title: string; children: ReactNode }) {
  return (
    <div id={id}>
      <section className="hub-card p-6 shadow-sm sm:p-7">
        <h2 className="flex items-center gap-3 text-xl font-bold text-moss-everglade">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-moss-tint text-moss-green">
            <Icon name={icon} size={16} />
          </span>
          {title}
        </h2>
        <div className="mt-5">{children}</div>
      </section>
    </div>
  )
}
