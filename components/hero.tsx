'use client'

import type { CSSProperties } from 'react'
import {
  ChevronRight,
  Play,
  Gauge,
} from 'lucide-react'
import { ProductBottle } from '@/components/product-bottle'

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
    <section id="home" className="photo-hero relative pb-12 md:pb-18">
      <div className="photo-hero__grid mx-auto max-w-7xl px-4 md:px-8">
        {/* Left: copy */}
        <div className="photo-hero__copy relative z-10">
          <div className="photo-hero__intro">
          <p className="hero-kicker inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            <Gauge aria-hidden="true" className="size-4" />
            First-response fire safety spray
          </p>
          <h1 className="photo-hero__title mt-5 font-display font-bold">
            FIRE<span className="text-primary">NOX</span>
            <span className="photo-hero__subtitle mt-2 block font-medium text-foreground/90">
              FIRE SPRAY
            </span>
          </h1>

          <div className="mt-4 section-rule" />
          <p className="photo-hero__tagline mt-4 font-display font-medium text-foreground">
            ONE SPRAY. ALL FIRES. TOTAL PROTECTION.
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            A compact, water-based spray built for the first critical moments:
            keep one close, act fast, and reduce panic before a small flame grows.
          </p>
          </div>

          <div className="photo-hero__actions mt-8 flex flex-wrap items-center gap-3">
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
        <div className="photo-hero__product">
          <ProductBottle />
        </div>

        <aside id="fire-classes" className="photo-hero__coverage scroll-mt-24" aria-labelledby="hero-coverage-title">
          <h2 id="hero-coverage-title" className="font-display text-xl font-semibold uppercase leading-tight">
            Effective Against<span className="block text-primary">All Classes of Fires</span>
          </h2>
          <div className="mt-3 section-rule" />
          <ul className="photo-hero__classes">
            {FIRE_CLASSES.map((c) => (
              <li key={c.letter}>
                <span className="photo-hero__class-letter font-display" style={{ '--class-color': c.color } as CSSProperties}>{c.letter === 'K' ? 'F/K' : c.letter}</span>
                <div>
                  <p className="text-sm font-semibold">{c.letter === 'K' ? 'Class F / K' : c.title}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{c.sub} <span className="photo-hero__class-detail">{c.detail}</span></p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>

    </section>
  )
}
