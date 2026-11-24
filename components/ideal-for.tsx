import Image from 'next/image'
import { Home, Briefcase, Car, ChefHat, Tent, Factory, Anchor } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'
import homeImage from '@/public/use-cases/home-firenox.webp'
import officeImage from '@/public/use-cases/office-firenox.webp'
import carImage from '@/public/use-cases/car-firenox.webp'
import kitchenImage from '@/public/use-cases/kitchen-firenox.webp'
import outdoorImage from '@/public/use-cases/outdoor-firenox.webp'
import marineImage from '@/public/use-cases/marine-firenox.webp'
import industrialImage from '@/public/use-cases/industrial-firenox.webp'

/*
 * Bento layout (lg, 4 columns):   [ Home  Home ][Office][ Car ]
 *                                 [ Home  Home ][Kitchen][Camp]
 *                                 [ Marine Mar ][ Industrial  ]
 * Tablet/mobile: Home is a full-width banner, the rest pair up 2-by-2.
 */
const CASES = [
  {
    icon: Home,
    label: 'Home',
    caption: 'By the front door, where everyone can find it',
    img: homeImage,
    alt: 'FIRENOX fire spray standing on an oak console table in a warmly lit family hallway',
    position: '50% 58%',
    span: 'col-span-2 lg:row-span-2',
    frame: 'aspect-[2/1] lg:aspect-auto lg:h-full',
    sizes: '(max-width: 1023px) 100vw, 600px',
  },
  {
    icon: Briefcase,
    label: 'Office',
    caption: 'On the desk, not locked in a cupboard',
    img: officeImage,
    alt: 'FIRENOX fire spray on a white office desk beside a laptop and coffee cup',
    position: '60% 60%',
    span: '',
    frame: 'aspect-square',
    sizes: '(max-width: 1023px) 50vw, 300px',
  },
  {
    icon: Car,
    label: 'Car',
    caption: 'Secured in the boot for the road',
    img: carImage,
    alt: 'FIRENOX fire spray in the open boot of an SUV parked on a coastal road',
    position: '55% 62%',
    span: '',
    frame: 'aspect-square',
    sizes: '(max-width: 1023px) 50vw, 300px',
  },
  {
    icon: ChefHat,
    label: 'Kitchen',
    caption: 'Within reach of the hob',
    img: kitchenImage,
    alt: 'FIRENOX fire spray on a stone kitchen worktop beside a gas hob',
    position: '62% 70%',
    span: '',
    frame: 'aspect-square',
    sizes: '(max-width: 1023px) 50vw, 300px',
  },
  {
    icon: Tent,
    label: 'Camping',
    caption: 'Next to the lantern at camp',
    img: outdoorImage,
    alt: 'FIRENOX fire spray on a wooden camp table beside a lantern at dusk, tent and campfire behind',
    position: '62% 65%',
    span: '',
    frame: 'aspect-square',
    sizes: '(max-width: 1023px) 50vw, 300px',
  },
  {
    icon: Anchor,
    label: 'Marine',
    caption: 'At the helm, on every trip',
    img: marineImage,
    alt: 'FIRENOX fire spray on the console of a motor yacht with turquoise sea beyond',
    position: '60% 55%',
    span: 'lg:col-span-2',
    frame: 'aspect-square lg:aspect-[2/1]',
    sizes: '(max-width: 1023px) 50vw, 600px',
  },
  {
    icon: Factory,
    label: 'Industrial',
    caption: 'On the bench, at every workstation',
    img: industrialImage,
    alt: 'FIRENOX fire spray on a steel workbench in a clean manufacturing workshop',
    position: '70% 52%',
    span: 'lg:col-span-2',
    frame: 'aspect-square lg:aspect-[2/1]',
    sizes: '(max-width: 1023px) 50vw, 600px',
  },
]

export function IdealFor() {
  return (
    <section id="use-cases" aria-labelledby="use-cases-title" className="scroll-mt-24 px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">Where to keep it</p>
              <h2 id="use-cases-title" className="mt-3 text-balance font-display text-3xl font-bold uppercase leading-tight md:text-5xl">
                Built for the places fires <span className="text-primary">actually start</span>
              </h2>
              <div className="mt-4 section-rule" />
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              FIRENOX only helps if it is within reach. Keep one wherever a small flame can start,
              so the first response takes seconds, not a search.
            </p>
          </div>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {CASES.map((c, i) => (
            <Reveal key={c.label} as="li" delay={i * 60} className={cn('min-w-0', c.span)}>
              <figure className={cn('use-case-tile group relative overflow-hidden rounded-xl border border-white/10 bg-card', c.frame)}>
                <Image
                  src={c.img}
                  alt={c.alt}
                  fill
                  placeholder="blur"
                  quality={75}
                  sizes={c.sizes}
                  style={{ objectPosition: c.position }}
                  className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                  <span className="flex items-center gap-2">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-black/45 ring-1 ring-white/15 backdrop-blur-sm">
                      <c.icon aria-hidden="true" className="size-4 text-primary" />
                    </span>
                    <span className="font-display text-base font-semibold uppercase tracking-wide sm:text-lg">{c.label}</span>
                  </span>
                  <span className={cn('mt-1.5 block text-xs leading-snug text-white/80 sm:text-sm', i === 0 ? 'block' : 'hidden sm:block')}>
                    {c.caption}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
