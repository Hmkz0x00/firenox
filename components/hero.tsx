'use client'

import type { CSSProperties } from 'react'
import {
  Flame,
  SprayCan,
  Leaf,
  Feather,
  ShieldCheck,
  ChevronRight,
  Play,
  Gauge,
} from 'lucide-react'
import FireCan3D from '@/components/fire-can-3d'

const MINI_FEATURES = [
  { icon: Flame, label: 'Multi-class coverage' },
  { icon: SprayCan, label: 'No training needed' },
  { icon: Leaf, label: 'Water based formula' },
  { icon: Feather, label: 'Compact carry size' },
  { icon: ShieldCheck, label: 'Documentation ready' },
]

const STATS = [
  { value: 'A • B • C • D • F/K', label: 'Fire classes presented for first response' },
  { value: '0', label: 'Powder clouds or corrosive foam residue' },
  { value: '24/7', label: 'Ready in cars, kitchens, offices, and workshops' },
]

const FIRE_CLASSES = [
  {
    letter: 'A',
    color: '#2f9e44',
    title: 'Class A',
    sub: 'Ordinary Combustibles',
    detail: '(Wood, Paper, Cloth)',
  },
  {
    letter: 'B',
    color: '#e03131',
    title: 'Class B',
    sub: 'Flammable Liquids',
    detail: '(Petrol, Oil, Paints)',
  },
  {
    letter: 'C',
    color: '#1971c2',
    title: 'Class C',
    sub: 'Flammable Gases',
    detail: '(LPG, Propane, Butane)',
  },
  {
    letter: 'D',
    color: '#f2b705',
    title: 'Class D',
    sub: 'Combustible Metals',
    detail: '(Magnesium, Titanium)',
  },
  {
    letter: 'K',
    color: '#111111',
    title: 'Class K',
    sub: 'Cooking Oils & Fats',
    detail: '(Kitchen Fires)',
  },
  {
    letter: 'E',
    color: '#7c3aed',
    title: 'Electrical',
    sub: 'Electrical Hazards',
    detail: '(Up to 1000V)',
  },
  {
    letter: 'Li',
    color: '#475569',
    title: 'Lithium-Ion',
    sub: 'Battery Fires',
    detail: '(Phones, Laptops, Scooters)',
  },
]

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-24 pb-12 md:pt-28 md:pb-18"
    >
      {/* Ember backdrop */}
      <div
        aria-hidden
        className="hero-atmosphere pointer-events-none absolute inset-0 -z-10"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 md:grid-cols-[minmax(0,0.92fr)_minmax(280px,1.08fr)] md:gap-4 md:px-8 lg:min-h-[700px] lg:grid-cols-[minmax(0,0.86fr)_minmax(360px,1.14fr)] lg:gap-4">
        {/* Left: copy */}
        <div className="relative z-10 max-w-xl lg:pb-10">
          <p className="hero-kicker inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            <Gauge aria-hidden="true" className="size-4" />
            First-response fire safety spray
          </p>
          <h1 className="mt-5 text-balance font-display text-5xl font-bold leading-[0.86] tracking-tight sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl">
            FIRE<span className="text-primary">NOX</span>
            <span className="mt-2 block text-3xl font-medium text-foreground/90 md:text-4xl lg:text-5xl">
              FIRE SPRAY
            </span>
          </h1>

          <div className="mt-4 section-rule" />
          <p className="mt-4 font-display text-lg font-medium tracking-wide text-foreground">
            ONE SPRAY. ALL FIRES. TOTAL PROTECTION.
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            A compact, water-based spray built for the first critical moments:
            keep one close, act fast, and reduce panic before a small flame grows.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="control-ring hero-primary-cta group flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold tracking-wide text-primary-foreground hover:brightness-110"
            >
              GET A QUOTE
              <ChevronRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#product"
              className="control-ring flex items-center gap-2.5 rounded-md border border-white/15 px-6 py-3 text-sm font-semibold tracking-wide text-foreground"
            >
              SEE PRODUCT
              <span className="grid size-6 place-items-center rounded-full bg-primary">
                <Play aria-hidden="true" className="size-3 text-primary-foreground" fill="currentColor" />
              </span>
            </a>
          </div>
        </div>

        {/* Center: product showcase */}
        <div className="hero-product-stage relative min-h-[360px] overflow-hidden sm:min-h-[420px] md:min-h-[520px] lg:min-h-[650px]">
          <div className="mx-auto h-[380px] w-full max-w-xl sm:h-[440px] md:h-[520px] lg:h-[680px] lg:max-w-none xl:h-[700px]">
            <FireCan3D />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 md:px-8">
        <div className="hero-assurance-strip grid grid-cols-2 gap-x-3 gap-y-1 border-y border-white/10 bg-card/20 px-1 py-3 sm:grid-cols-5 sm:gap-0 sm:py-2">
          {MINI_FEATURES.map((f, i) => (
            <div key={f.label} className="hero-assurance-item group relative flex items-center gap-3 px-3 py-3 sm:flex-col sm:justify-center sm:gap-2 sm:py-4 sm:text-center">
              <span className="hero-assurance-index" aria-hidden="true">0{i + 1}</span>
              <span className="hero-assurance-icon grid size-10 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                <f.icon aria-hidden="true" className="size-5" />
              </span>
              <span className="text-[10px] font-semibold uppercase leading-tight tracking-wide text-muted-foreground">
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div id="fire-classes" className="mx-auto mt-5 max-w-7xl scroll-mt-24 px-4 md:px-8">
        <div className="fire-class-band rounded-xl border border-white/10 bg-background/70 p-5 md:p-8">
          <div className="grid gap-8">
            <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <div>
                <p className="fire-class-eyebrow">Coverage map / first response</p>
                <h2 className="mt-3 font-display text-2xl font-semibold uppercase leading-tight tracking-wide md:text-3xl">
                  Effective Against
                  <span className="block text-primary">All Classes of Fires</span>
                </h2>
                <div className="mt-3 section-rule" />
                <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="fire-class-live-dot" aria-hidden="true" />
                  <span>One compact response across everyday risk zones</span>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {STATS.map((stat, i) => (
                  <div key={stat.label} className="fire-stat group rounded-md border border-white/10 bg-card/55 p-4 lg:min-h-[132px]" style={{ '--stat-delay': `${i * 120}ms` } as CSSProperties}>
                    <span className="fire-stat-index" aria-hidden="true">0{i + 1}</span>
                    <p className="font-display text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {FIRE_CLASSES.map((c, i) => (
                <li key={c.letter} className="fire-class-card group relative flex min-h-[156px] items-center gap-3 overflow-hidden rounded-md border border-white/10 bg-card/60 p-4 xl:min-h-[184px] xl:flex-col xl:items-start xl:gap-4" style={{ '--class-color': c.color, '--class-delay': `${i * 70}ms` } as CSSProperties}>
                  <span className="fire-class-card__shine" aria-hidden="true" />
                  <span className="fire-class-card__signal" aria-hidden="true" />
                  <span
                    className="fire-class-letter grid size-12 shrink-0 place-items-center rounded-md font-display text-2xl font-bold text-white"
                    style={{ backgroundColor: c.color }}
                  >
                    {c.letter}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{c.title}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {c.sub} {c.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
