import Image from 'next/image'
import { Mail, MapPin, FileText, ChevronRight, ShieldCheck } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1fr_1.2fr_auto] md:items-center md:px-8">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center overflow-hidden rounded-md border border-white/10 bg-black">
            <Image
              src="/firenox-fire-logo.png"
              alt="FIRENOX fire mark"
              width={36}
              height={36}
              className="size-full object-cover"
            />
          </span>
          <span className="leading-none">
            <span className="block font-display text-xl font-bold tracking-tight">
              FIRE<span className="text-primary">NOX</span>
            </span>
            <span className="block text-[9px] font-medium tracking-[0.22em] text-muted-foreground">
              NEXT GENERATION FIRE SAFETY
            </span>
          </span>
        </div>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-primary">
            Get In Touch
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2.5">
              <ShieldCheck aria-hidden="true" className="size-4 text-primary" />
              Request current product documents before purchase.
            </li>
            <li className="flex items-center gap-2.5">
              <Mail aria-hidden="true" className="size-4 text-primary" />
              sales@firenox.example
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin aria-hidden="true" className="size-4 text-primary" />
              Regional availability depends on market and compliance review.
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href="#contact"
            className="control-ring flex items-center justify-center gap-2 rounded-md border border-white/15 px-5 py-3 text-xs font-semibold uppercase tracking-wide"
          >
            <FileText aria-hidden="true" className="size-4" />
            Brochure On Request
          </a>
          <a
            href="#contact"
            className="control-ring group flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-wide text-primary-foreground hover:brightness-110"
          >
            Enquire Now
            <ChevronRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>© 2026 FIRENOX. All Rights Reserved.</p>
          <p className="flex items-center gap-3">
            <a href="#contact" className="transition-colors hover:text-primary">
              Privacy On Request
            </a>
            <span className="text-white/20">|</span>
            <a href="#contact" className="transition-colors hover:text-primary">
              Terms On Request
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
