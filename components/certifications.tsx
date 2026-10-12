import { Reveal } from '@/components/reveal'

const BADGES = [
  { label: 'ISO 9001', note: 'Quality reference' },
  { label: 'SABER', note: 'KSA market review' },
  { label: 'EN3', note: 'Fire equipment reference' },
  { label: 'NEMKO', note: 'Korea reference' },
  { label: 'MSDS', note: 'Safety sheet' },
]

export function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-20 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <Reveal>
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide md:text-3xl">
            Tested. Verified. Ready To Review.
          </h2>
          <p className="mt-1 text-sm text-primary-foreground/85">
            Ask for current test reports, market approvals, and safety documents
            for your shipment and use case before purchase.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {BADGES.map((b) => (
              <li
                key={b.label}
                className="flex items-center gap-2 font-display text-lg font-bold uppercase tracking-wide"
              >
                <span className="rounded border border-primary-foreground/40 px-3 py-1.5">
                  {b.label}
                </span>
                <span className="text-[9px] font-semibold tracking-widest text-primary-foreground/75">
                  {b.note}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
