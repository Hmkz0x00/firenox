import { Flame, Timer, Leaf, Package, BadgeCheck } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const ITEMS = [
  {
    icon: Flame,
    title: 'Total Coverage',
    desc: 'Designed around the fire classes people need to recognize first: combustibles, liquids, gases, metals, lithium-ion batteries, and cooking oils.',
  },
  {
    icon: Timer,
    title: 'Fast Response',
    desc: 'A familiar spray format helps people act quickly, with simple aim-and-spray handling in the first critical moments.',
  },
  {
    icon: Leaf,
    title: 'Cleaner Control',
    desc: 'Water-based formulation designed to reduce harsh residue, protect visibility, and simplify clean-up after use.',
  },
  {
    icon: Package,
    title: 'Safe Placement',
    desc: 'Compact enough for homes, cars, kitchens, offices, boats, camping kits, and workshops where access matters.',
  },
  {
    icon: BadgeCheck,
    title: 'Proof Ready',
    desc: 'Built around the questions buyers ask: specifications, safety sheets, test references, and distributor support.',
  },
]

export function WhyChoose() {
  return (
    <section id="features" className="px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl rounded-lg border border-white/10 bg-card/60 p-6 sm:p-8 md:p-12">
        <Reveal>
          <p className="text-center font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">Why it works</p>
          <h2 className="mt-3 text-center font-display text-3xl font-bold uppercase tracking-wide md:text-5xl">
            Why Choose <span className="text-primary">FIRENOX?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
            The product story is simple: accessible placement, fast use, less mess,
            and enough proof for households and procurement teams to take it seriously.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-y-7 sm:mt-10 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-5 lg:divide-x lg:divide-white/10">
          {ITEMS.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 90}
              className="flex items-start gap-4 text-left sm:flex-col sm:items-center sm:gap-0 sm:px-4 sm:text-center"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary sm:size-14">
                <item.icon aria-hidden="true" className="size-6 sm:size-7" />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-base font-semibold uppercase tracking-wide sm:mt-5">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:mt-3">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
