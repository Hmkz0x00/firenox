'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  Droplet,
  Leaf,
  FlaskConical,
  Sparkles,
  Users,
  Play,
  X,
  ClipboardCheck,
  Ruler,
  ShieldAlert,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'

const CHIPS = [
  { icon: Droplet, label: 'Water Based Formula' },
  { icon: Leaf, label: 'Eco Friendly' },
  { icon: FlaskConical, label: 'No Harmful Residue' },
  { icon: Sparkles, label: 'Easy Clean Up' },
  { icon: Users, label: 'Made For Everyone' },
]

const PROOF = [
  {
    icon: ClipboardCheck,
    title: 'Documentation pack',
    copy: 'Datasheet, MSDS, compliance references, and product handling notes for buyer review.',
  },
  {
    icon: Ruler,
    title: 'Placement guidance',
    copy: 'Recommended locations for homes, cars, kitchens, offices, and industrial support areas.',
  },
  {
    icon: ShieldAlert,
    title: 'First-response scope',
    copy: 'Clear positioning for early-stage incidents, with guidance to call emergency services for uncontrolled fires.',
  },
]

export function About() {
  const [open, setOpen] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeButtonRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    if (!open) triggerRef.current?.focus()
  }, [open])

  return (
    <section id="product" className="scroll-mt-24 px-4 py-16 md:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* Left: copy */}
        <Reveal>
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide md:text-4xl">
            About <span className="text-primary">FIRENOX</span>
          </h2>
          <div className="mt-3 section-rule" />
          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            Choosing the wrong extinguisher can create a dangerous pause. FIRENOX
            is an advanced, ready-to-use fire spray built to make first response
            feel clear when every second matters.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Its water-based formula is positioned for broad fire-class coverage
            in a compact format, giving homes, vehicles, workplaces, and outdoor
            teams one practical option to keep close.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
            {CHIPS.map((chip) => (
              <li key={chip.label} className="flex flex-col items-center text-center">
                <span className="grid size-12 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                  <chip.icon aria-hidden="true" className="size-5" />
                </span>
                <span className="mt-2 text-[10px] font-semibold uppercase leading-tight tracking-wide text-muted-foreground">
                  {chip.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Right: video */}
        <Reveal delay={120}>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            className="control-ring group relative block aspect-video w-full overflow-hidden rounded-lg border border-white/10"
            aria-label="Play FIRENOX in action video"
          >
            <Image
              src="/firenox-action-new.png"
              alt="A hand spraying FIRENOX onto flames"
              fill
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-black/20" />
            <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary/90 fire-glow transition-transform group-hover:scale-110">
              <Play aria-hidden="true" className="size-7 text-primary-foreground" fill="currentColor" />
            </span>
          </button>
          <p className="mt-4 text-center font-display text-lg font-semibold uppercase tracking-wide">
            See <span className="text-primary">FIRENOX</span> In Action
          </p>
        </Reveal>
      </div>

      <div id="proof" className="mx-auto mt-16 max-w-7xl scroll-mt-24">
        <Reveal>
          <div className="grid gap-6 border-y border-white/10 py-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Proof stack
              </p>
              <h3 className="mt-3 text-balance font-display text-3xl font-bold uppercase leading-tight md:text-4xl">
                Built To Answer The Questions Buyers Ask First
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {PROOF.map((item) => (
                <article key={item.title} className="rounded-lg border border-white/10 bg-card/60 p-5">
                  <item.icon aria-hidden="true" className="size-6 text-primary" />
                  <h4 className="mt-4 font-display text-base font-semibold uppercase tracking-wide">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-title"
        >
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="control-ring absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-white/20 text-foreground"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-lg border border-white/10 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="demo-title" className="sr-only">
              FIRENOX product demonstration
            </h2>
            <video
              className="aspect-video w-full"
              src="/firenox-hero-new.mp4"
              controls
              autoPlay
              muted
              playsInline
              poster="/firenox-action-new.png"
            />
          </div>
        </div>
      )}
    </section>
  )
}
