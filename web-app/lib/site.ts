import sopsData from '@/data/sops.json'
import mapsData from '@/data/maps.json'
import promptsData from '@/data/prompts.json'
import workflowsData from '@/data/workflows.json'
import glossaryData from '@/data/glossary.json'
import pagesData from '@/data/pages.json'

export interface NavItem {
  icon: string
  label: string
  href: string
}

export const NAV_ITEMS: NavItem[] = [
  { icon: 'house', label: 'Home', href: '/' },
  { icon: 'file-lines', label: 'BA Templates', href: '/ba-templates' },
  { icon: 'book', label: 'SOP Library', href: '/sop-library' },
  { icon: 'compass', label: 'Onboarding Center', href: '/onboarding' },
  { icon: 'diagram-project', label: 'Process Maps', href: '/process-maps' },
  { icon: 'wand-magic-sparkles', label: 'AI Toolkit', href: '/ai-toolkit' },
  { icon: 'spell-check', label: 'Project Glossary', href: '/glossary' },
]

export interface PageMeta {
  eyebrow: string
  subtitle: string
  headerAction?: 'search' | 'bell' | 'ai-guidance' | 'help'
  badge?: string
  footerLeft?: string
  footerRight: string
  footerBold: boolean
}

/* ---------- Old static URL -> new route mapping ---------- */
const ROUTE_MAP: Record<string, string> = {
  'home.html': '/',
  'ba-templates.html': '/ba-templates',
  'sop-library.html': '/sop-library',
  'sop-project-discovery.html': '/sop-library/project-discovery',
  'sop-requirements-elicitation.html': '/sop-library/requirements-elicitation',
  'sop-requirements-change-control.html': '/sop-library/requirements-change-control',
  'sop-uat-planning.html': '/sop-library/uat-planning',
  'onboarding-center.html': '/onboarding',
  'onboarding-roadmap.html': '/onboarding/roadmap',
  'onboarding-toolkit.html': '/onboarding/toolkit',
  'onboarding-resources.html': '/onboarding/resources',
  'process-maps.html': '/process-maps',
  'process-map-request-intake.html': '/process-maps/request-intake',
  'process-map-change-control.html': '/process-maps/change-control',
  'process-map-uat.html': '/process-maps/uat',
  'process-map-system-access.html': '/process-maps/system-access',
  'ai-toolkit.html': '/ai-toolkit',
  'ai-prompt-interview-guide.html': '/ai-toolkit/prompts/interview-guide',
  'ai-prompt-requirement-quality.html': '/ai-toolkit/prompts/requirement-quality',
  'ai-prompt-decisions-actions.html': '/ai-toolkit/prompts/decisions-actions',
  'ai-workflow-stakeholder.html': '/ai-toolkit/workflows/stakeholder',
  'ai-workflow-process-discovery.html': '/ai-toolkit/workflows/process-discovery',
  'ai-workflow-uat.html': '/ai-toolkit/workflows/uat',
  'project-glossary.html': '/glossary',
}

export function mapHref(href?: string | null): string {
  const h = href ?? ''
  if (!h) return '/'
  if (h.startsWith('/') || h.startsWith('http') || h.startsWith('mailto:') || h.startsWith('#')) return h
  const [file, hash] = h.split('#')
  const mapped = ROUTE_MAP[file ?? ''] ?? '/'
  return hash ? `${mapped}#${hash}` : mapped
}

/* ---------- Data types ---------- */
export interface RelatedLink {
  href: string
  icon: string
  title: string
  sub: string
}

export interface Sop {
  slug: string
  header: { eyebrow: string; subtitle: string }
  id: string
  status: string
  title: string
  summary: string
  purpose: string[]
  scope: { text: string; outOfScope: string[] }
  roles: { role: string; responsibility: string }[]
  trigger: { intro: string; items: string[] }
  steps: { title: string; bullets?: string[]; text?: string }[]
  inputs: string[]
  outputs: string[]
  related: RelatedLink[]
  history: { version: string; date: string; summary: string; author: string }[]
  glance: { label: string; value: string }[]
  questions: string
}

export interface ProcessMap {
  slug: string
  header: { eyebrow: string; subtitle: string }
  crumb: string
  status: string
  title: string
  summary: string
  overview: string[]
  mermaid: string
  roles: { role: string; description: string }[]
  related: RelatedLink[]
  details: { label: string; value: string }[]
  note: string
}

export interface PromptStarter {
  slug: string
  header: { eyebrow: string; subtitle: string }
  category: string
  title: string
  lede: string
  steps: { title: string; text: string }[]
  prompt: string
  whenToUse: string[]
  proTips: string[]
  remember: string
}

export interface Workflow {
  slug: string
  header: { eyebrow: string; subtitle: string }
  eyebrow: string
  title: string
  lede: string
  duration: string
  stages: { title: string; time: string; description: string; prompt: string }[]
  whatYouNeed: string[]
  expectedOutput: string
  remember: string
}

export interface GlossaryTerm {
  term: string
  definition: string
  category: 'ba' | 'company'
}

export interface SearchPage {
  url: string
  href: string
  title: string
  section: string
  desc: string
  kw: string
}

export const SOPS = (sopsData as Sop[]) ?? []
export const MAPS = (mapsData as ProcessMap[]) ?? []
export const PROMPTS = (promptsData as PromptStarter[]) ?? []
export const WORKFLOWS = (workflowsData as Workflow[]) ?? []
export const GLOSSARY = ((glossaryData as GlossaryTerm[]) ?? []).slice().sort((a, b) =>
  (a?.term ?? '').localeCompare(b?.term ?? '', 'en-US', { sensitivity: 'base' }),
)
export const SEARCH_PAGES: SearchPage[] = ((pagesData as Omit<SearchPage, 'href'>[]) ?? []).map((p) => ({
  ...(p ?? {}),
  href: mapHref(p?.url),
})) as SearchPage[]

export const getSop = (slug?: string) => SOPS.find((s) => s?.slug === slug)
export const getMap = (slug?: string) => MAPS.find((m) => m?.slug === slug)
export const getPrompt = (slug?: string) => PROMPTS.find((p) => p?.slug === slug)
export const getWorkflow = (slug?: string) => WORKFLOWS.find((w) => w?.slug === slug)

/* ---------- Header / footer meta per route ---------- */
const DEFAULT_LEFT = 'BA Knowledge Hub · Powered by MossAIc'
const ONBOARDING_LEFT = 'BA Knowledge Hub · Powered by MossAIc · Source: BADOC-014 BA Onboarding Handbook'

export function getPageMeta(pathname?: string): PageMeta {
  const p = pathname ?? '/'
  const base = (m: Partial<PageMeta>): PageMeta => ({
    eyebrow: '',
    subtitle: '',
    footerLeft: DEFAULT_LEFT,
    footerRight: '',
    footerBold: true,
    ...(m ?? {}),
  })

  if (p === '/') {
    return base({
      eyebrow: 'Business Analysis',
      subtitle: 'One place for standards, tools, and shared learning',
      headerAction: 'search',
      footerRight: 'Honor Relationships · Entrepreneurial Spirit · Contagious Energy',
      footerBold: false,
    })
  }
  if (p.startsWith('/ba-templates')) {
    return base({
      eyebrow: 'Resource Library',
      subtitle: 'Standardized files for consistent analysis delivery',
      footerRight: 'Clear resources. Consistent outcomes.',
    })
  }
  if (p.startsWith('/sop-library/')) {
    const sop = getSop(p.split('/')[2])
    return base({
      eyebrow: sop?.header?.eyebrow ?? 'Standard Operating Procedure',
      subtitle: sop?.header?.subtitle ?? '',
      headerAction: 'bell',
      footerRight: 'Standards create clarity.',
    })
  }
  if (p.startsWith('/sop-library')) {
    return base({
      eyebrow: 'Standards and Procedures',
      subtitle: 'Current guidance, accountable owners, and visible review dates',
      headerAction: 'bell',
      footerRight: 'Standards create clarity.',
    })
  }
  if (p.startsWith('/onboarding')) {
    const sub = p.split('/')[2]
    const variants: Record<string, { eyebrow: string; subtitle: string }> = {
      roadmap: { eyebrow: 'Onboarding Center · 30/60/90 Roadmap', subtitle: 'Learn first, then contribute, then own' },
      toolkit: {
        eyebrow: 'Onboarding Center · Toolkit & Guidelines',
        subtitle: 'How we apply BA methods at Moss — and the guidelines that keep work credible',
      },
      resources: {
        eyebrow: 'Onboarding Center · Resources & Contacts',
        subtitle: 'Your home base for templates, standards, and the people who can help',
      },
    }
    const v = variants[sub ?? ''] ?? {
      eyebrow: 'Onboarding Center',
      subtitle: 'Your orientation to Moss culture, people, and the BA function',
    }
    return base({
      ...v,
      badge: 'BADOC-014',
      footerLeft: ONBOARDING_LEFT,
      footerRight: 'Moss-first, people always.',
    })
  }
  if (p.startsWith('/process-maps/')) {
    const map = getMap(p.split('/')[2])
    return base({
      eyebrow: map?.header?.eyebrow ?? 'Visual Process Map',
      subtitle: map?.header?.subtitle ?? '',
      footerRight: 'See the work. Improve the work.',
    })
  }
  if (p.startsWith('/process-maps')) {
    return base({
      eyebrow: 'Visual Process Library',
      subtitle: 'See the work, handoffs, systems, and decisions in context',
      footerRight: 'See the work. Improve the work.',
    })
  }
  if (p.startsWith('/ai-toolkit/prompts/')) {
    const item = getPrompt(p.split('/')[3])
    return base({
      eyebrow: item?.header?.eyebrow ?? 'AI Toolkit',
      subtitle: item?.header?.subtitle ?? '',
      footerRight: 'Human judgment stays in the loop.',
    })
  }
  if (p.startsWith('/ai-toolkit/workflows/')) {
    const item = getWorkflow(p.split('/')[3])
    return base({
      eyebrow: item?.header?.eyebrow ?? 'AI Toolkit',
      subtitle: item?.header?.subtitle ?? '',
      footerRight: 'Human judgment stays in the loop.',
    })
  }
  if (p.startsWith('/ai-toolkit')) {
    return base({
      eyebrow: 'Responsible AI for Business Analysis',
      subtitle: 'Practical MossAIc resources for clearer, faster BA work',
      headerAction: 'ai-guidance',
      footerRight: 'Human judgment stays in the loop.',
    })
  }
  if (p.startsWith('/glossary')) {
    return base({
      eyebrow: 'Shared Vocabulary',
      subtitle: 'Common terms for consistent communication across projects',
      footerRight: 'Shared language. Shared understanding.',
    })
  }
  return base({ eyebrow: 'BA Knowledge Hub', subtitle: '', footerRight: '' })
}
