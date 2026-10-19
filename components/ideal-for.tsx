import Image from 'next/image'
import { Home, Briefcase, Car, ChefHat, Tent, Factory, Anchor } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const CASES = [
  { icon: Home, label: 'Home', img: '/use-cases/home-v2.webp', alt: 'Contemporary family home with warmly lit windows at dusk', position: '50% 48%' },
  { icon: Briefcase, label: 'Office', img: '/use-cases/office-v2.webp', alt: 'Bright modern office with desks and glass meeting rooms', position: '50% 50%' },
  { icon: Car, label: 'Car', img: '/use-cases/car-v2.webp', alt: 'Graphite sedan parked beside a sunny coastal road', position: '50% 65%' },
  { icon: ChefHat, label: 'Kitchen', img: '/use-cases/kitchen-v2.webp', alt: 'Woman preparing dinner in a bright home kitchen', position: '50% 10%' },
  { icon: Tent, label: 'Camping', img: '/use-cases/outdoor-v2.webp', alt: 'View through an orange tent toward an alpine lake and forest', position: '50% 45%' },
  { icon: Anchor, label: 'Marine', img: '/use-cases/marine-v2.webp', alt: 'White motor yacht moored in clear turquoise coastal water', position: '50% 62%' },
  { icon: Factory, label: 'Industrial', img: '/use-cases/industrial-v2.webp', alt: 'Clean manufacturing workshop with production machines and marked aisles', position: '50% 50%' },
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

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
          {CASES.map((c, i) => (
            <Reveal key={c.label} delay={i * 70}>
              <div className="use-case-photo group relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 sm:aspect-square">
                <Image
                  src={c.img}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 767px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 14vw, 174px"
                  style={{ objectPosition: c.position }}
                  className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3">
                  <c.icon aria-hidden="true" className="size-5 shrink-0 text-primary" />
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
