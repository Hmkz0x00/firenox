import { BadgeCheck } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const BADGES = [
  { label: 'CE', detail: 'European conformity' },
  { label: 'ISO', detail: 'Quality management' },
  { label: 'SABER', detail: 'Saudi product registration' },
  { label: 'SASO', detail: 'Saudi standards' },
]

export function Certifications() {
  return (
    <section id="certifications" aria-labelledby="certifications-title" className="scroll-mt-20 bg-cta text-cta-foreground">
      {/* Same max-width and gutters as every other section, so the band lines up with the page grid. */}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:items-center lg:gap-12">
        <Reveal>
          <h2 id="certifications-title" className="font-display text-2xl font-bold uppercase leading-tight md:text-3xl">
            Certified. Tested. Trusted.
          </h2>
          <p className="mt-2 text-sm text-cta-foreground">
            Certification documents and product test reports available on request.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {BADGES.map((b) => (
              <li
                key={b.label}
                className="flex min-w-0 flex-col gap-1 rounded-md border border-white/35 bg-black/10 px-4 py-3"
              >
                <span className="flex items-center gap-2 font-display text-xl font-bold uppercase leading-none">
                  <BadgeCheck aria-hidden="true" className="size-5 shrink-0" />
                  {b.label}
                </span>
                <span className="text-xs font-medium leading-snug">
                  {b.detail}
                  <span className="sr-only"> compliant</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
