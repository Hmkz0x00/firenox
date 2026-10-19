import { Reveal } from '@/components/reveal'

const BADGES = [
  { label: 'CE' },
  { label: 'ISO' },
  { label: 'Saber' },
  { label: 'SASO' },
]

export function Certifications() {
  return (
    <section id="certifications" aria-labelledby="certifications-title" className="scroll-mt-20 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-[1520px] gap-8 px-4 py-10 md:px-8 xl:min-h-44 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] xl:items-center xl:gap-12">
        <Reveal>
          <h2 id="certifications-title" className="font-display text-2xl font-bold uppercase leading-tight md:text-3xl">
            Certified. Tested. Trusted.
          </h2>
          <p className="mt-1 text-sm text-primary-foreground/85">
            Certification documents and product test reports available on request.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <ul className="grid grid-cols-2 items-center gap-x-5 gap-y-5 sm:grid-cols-4 xl:flex xl:justify-between xl:gap-5">
            {BADGES.map((b) => (
              <li
                key={b.label}
                className="flex min-w-0 flex-col items-start gap-2 font-display font-bold uppercase sm:flex-row sm:flex-wrap sm:items-center"
              >
                <span className="inline-flex min-h-12 items-center rounded border border-primary-foreground/40 px-3 py-2 text-xl leading-none">
                  {b.label}
                </span>
                <span className="text-[10px] font-semibold leading-tight text-primary-foreground">
                  Compliant
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
