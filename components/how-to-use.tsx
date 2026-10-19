import Image from 'next/image'
import { ArrowUpRight, ShieldAlert } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const STEPS = [
  {
    title: 'Pull',
    copy: 'Remove the safety pin.',
    image: '/how-to-use/pull.webp',
    alt: 'Close-up of a hand lifting the yellow safety pin from the FIRENOX spray head',
  },
  {
    title: 'Aim',
    copy: 'Point the nozzle at the base of the fire from a safe distance.',
    image: '/how-to-use/aim.webp',
    alt: 'FIRENOX bottle directed toward the base of a small fire in a training tray',
  },
  {
    title: 'Press',
    copy: 'Press and hold the lever to release the spray.',
    image: '/how-to-use/press.webp',
    alt: 'Close-up of the FIRENOX spray head being operated with spray leaving the nozzle',
  },
  {
    title: 'Sweep',
    copy: 'Sweep from side to side across the base of the fire.',
    image: '/how-to-use/sweep.webp',
    alt: 'FIRENOX spray directed across the base of a small contained training fire',
  },
]

export function HowToUse() {
  return (
    <section id="how-to-use" aria-labelledby="how-to-use-title" className="scroll-mt-24 px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display text-sm font-semibold uppercase text-primary">Pull. Aim. Press. Sweep.</p>
              <h2 id="how-to-use-title" className="mt-3 font-display text-3xl font-bold uppercase leading-tight md:text-5xl">
                How To Use <span className="text-primary">FIRENOX</span>
              </h2>
              <div className="section-rule mt-4" />
            </div>
            <a href="#contact" className="control-ring group inline-flex min-h-11 w-fit items-center gap-2 rounded-md border border-white/20 px-4 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">
              Ask A Specialist
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </Reveal>

        <ol className="mt-9 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="min-w-0">
              <Reveal delay={index * 80}>
                <div className="group">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-[#e9eaeb]">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) 50vw, 305px"
                      className="object-contain transition-transform duration-700 motion-safe:group-hover:scale-[1.025]"
                    />
                    <span aria-hidden="true" className="absolute left-3 top-3 grid size-10 place-items-center rounded-md bg-primary font-display text-xl font-bold text-primary-foreground shadow-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-5 flex items-baseline gap-3 font-display text-2xl font-bold uppercase">
                    <span className="text-sm text-primary">0{index + 1}<span className="sr-only">. </span></span>
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{step.copy}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal>
          <div className="mt-9 flex items-start gap-3 border-t border-white/15 pt-5 text-xs leading-relaxed text-muted-foreground">
            <ShieldAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
            <p className="max-w-4xl">
              Always follow the instructions on your bottle. Only attempt a small, contained fire with a clear escape route.
              If you are unsure or the fire grows, leave immediately and call emergency services.{' '}
              <a className="control-ring rounded-sm underline underline-offset-4 hover:text-foreground" href="https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/fire-extinguishers/index.html" target="_blank" rel="noopener noreferrer">Fire safety guidance</a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
