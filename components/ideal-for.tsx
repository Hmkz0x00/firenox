import Image from 'next/image'
import { Home, Briefcase, Car, ChefHat, Tent, Factory, Anchor } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const CASES = [
  { icon: Home, label: 'Home', img: '/use-cases/home.png' },
  { icon: Briefcase, label: 'Office', img: '/use-cases/office.png' },
  { icon: Car, label: 'Car', img: '/use-cases/car.png' },
  { icon: ChefHat, label: 'Kitchen', img: '/use-cases/kitchen.png' },
  { icon: Tent, label: 'Camping', img: '/use-cases/outdoor.png' },
  { icon: Anchor, label: 'Marine', img: '/use-cases/marine.png' },
  { icon: Factory, label: 'Industrial', img: '/use-cases/industrial.png' },
]

export function IdealFor() {
  return (
    <section id="use-cases" className="scroll-mt-24 px-4 py-14 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide md:text-3xl">
            Built For The Places Fires Actually Start
          </h2>
          <div className="mt-3 section-rule" />
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            FIRENOX is useful only if it is nearby. These are the everyday
            locations where a compact first-response spray earns its place.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-7">
          {CASES.map((c, i) => (
            <Reveal key={c.label} delay={i * 70}>
              <div className="group relative aspect-square overflow-hidden rounded-lg border border-white/10">
                <Image
                  src={c.img || '/placeholder.svg'}
                  alt={`FIRENOX for ${c.label}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3">
                  <c.icon aria-hidden="true" className="size-5 text-primary" />
                  <span className="font-display text-sm font-semibold uppercase tracking-wide">
                    {c.label}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
