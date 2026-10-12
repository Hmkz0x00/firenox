import { Droplet, Thermometer, ShieldCheck, Flame, ChevronRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const WORKFLOW = [
  {
    icon: Droplet,
    step: '01',
    title: 'Wet',
    copy: 'Spreads across the burning surface to improve coverage where the spray lands.',
  },
  {
    icon: Thermometer,
    step: '02',
    title: 'Cool',
    copy: 'Absorbs heat from the ignition source and brings the reaction under control.',
  },
  {
    icon: ShieldCheck,
    step: '03',
    title: 'Control',
    copy: 'Helps suppress the flame and reduce the chance of re-ignition while you respond.',
  },
]

const STEPS = [
  'Remove the safety cap.',
  'Aim at the base of the fire from a safe distance.',
  'Spray until the fire is fully under control.',
]

export function ProductGuide() {
  return (
    <section id="how-it-works" className="scroll-mt-24 px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-5 border-y border-white/10 py-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Simple by design
              </p>
              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-bold uppercase leading-tight md:text-5xl">
                Wet. Cool. <span className="text-primary">Control.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              No training maze and no class-code panic. Keep the first response
              sequence visible, then call emergency services when a fire is not
              safe to approach.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {WORKFLOW.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <article className="group h-full rounded-lg border border-white/10 bg-card/50 p-6 transition-colors hover:border-primary/45 hover:bg-card/80">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-md border border-primary/35 bg-primary/10 text-primary">
                    <item.icon aria-hidden="true" className="size-6" />
                  </span>
                  <span className="font-display text-sm font-bold tracking-[0.18em] text-primary/70">
                    {item.step}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-2xl font-bold uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.copy}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div id="how-to-use" className="mt-12 scroll-mt-24 rounded-lg border border-primary/25 bg-primary/10 p-6 md:p-8">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-sm">
                <div className="flex items-center gap-3 text-primary">
                  <Flame aria-hidden="true" className="size-5" />
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.2em]">
                    How to use
                  </p>
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold uppercase md:text-3xl">
                  Instant protection, in three moves.
                </h3>
              </div>
              <ol className="grid flex-1 gap-3 sm:grid-cols-3">
                {STEPS.map((step, i) => (
                  <li key={step} className="flex items-start gap-3 rounded-md border border-white/10 bg-background/55 p-4">
                    <span className="font-display text-xl font-bold text-primary">{i + 1}</span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
              <a href="#contact" className="control-ring group flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-wide text-primary-foreground hover:brightness-110">
                Ask A Specialist
                <ChevronRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
