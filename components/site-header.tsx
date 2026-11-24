'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import logoMark from '@/public/brand/firenox-mark.webp'

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'How To Use', href: '#how-to-use' },
  { label: 'Compare', href: '#comparison' },
  { label: 'Contact', href: '#contact' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight the nav item for the section currently under the header.
  useEffect(() => {
    const sections = NAV.map((item) => document.querySelector(item.href)).filter(Boolean) as Element[]
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(`#${hit.target.id}`)
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled || open
            ? 'border-b border-white/10 bg-background/90 backdrop-blur-md'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-8">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center overflow-hidden rounded-md border border-white/10 bg-black fire-glow">
              <Image src={logoMark} alt="" width={36} height={36} className="size-full object-cover" preload />
            </span>
            <span className="leading-none">
              <span className="block font-display text-xl font-bold tracking-tight">
                FIRE<span className="text-primary">NOX</span>
              </span>
              <span className="block text-[9px] font-medium tracking-[0.22em] text-muted-foreground">
                NEXT GENERATION FIRE SAFETY
              </span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-7">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href ? 'true' : undefined}
                className={cn(
                  'relative py-2 text-[13px] font-medium tracking-wide transition-colors hover:text-primary',
                  'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform',
                  active === item.href ? 'text-foreground after:scale-x-100' : 'text-foreground/75',
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="group hidden min-h-11 items-center gap-1.5 rounded-md bg-cta px-5 py-2.5 text-xs font-semibold tracking-wide text-cta-foreground transition-all hover:brightness-110 sm:flex"
            >
              ENQUIRE NOW
              <ChevronRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="control-ring grid size-11 place-items-center rounded-md border border-white/10 lg:hidden"
            >
              {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-menu" aria-label="Mobile" className="border-t border-white/10 bg-background/95 px-4 pb-4 backdrop-blur-md lg:hidden">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active === item.href ? 'true' : undefined}
                className={cn(
                  'flex min-h-12 items-center border-b border-white/5 text-sm font-medium',
                  active === item.href ? 'text-primary' : 'text-foreground/80',
                )}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 flex min-h-12 items-center justify-center gap-1.5 rounded-md bg-cta text-sm font-semibold tracking-wide text-cta-foreground sm:hidden"
            >
              ENQUIRE NOW
              <ChevronRight aria-hidden="true" className="size-4" />
            </a>
          </nav>
        )}
      </header>
    </>
  )
}
