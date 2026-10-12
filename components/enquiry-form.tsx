'use client'

import { FormEvent, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { CheckCircle2, Mail, Phone, Send, UserRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

const INTERESTS = [
  'Home / vehicle use',
  'Office / retail use',
  'Industrial supply',
  'Distribution enquiry',
]

type FormState = {
  name: string
  email: string
  phone: string
  interest: string
  message: string
}

type Errors = Partial<Record<keyof FormState, string>>

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  phone: '',
  interest: INTERESTS[0],
  message: '',
}

function validate(values: FormState) {
  const errors: Errors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Enter your name so the team knows who to contact.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter an email address with an @ and a domain.'
  }

  const digits = values.phone.replace(/\D/g, '')
  if (digits.length < 7) {
    errors.phone = 'Enter a reachable phone number, including area code if needed.'
  }

  if (values.message.trim().length < 12) {
    errors.message = 'Add a short note about quantity, location, or intended use.'
  }

  return errors
}

export function EnquiryForm() {
  const [values, setValues] = useState<FormState>(INITIAL_FORM)
  const [touched, setTouched] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const errors = useMemo(() => validate(values), [values])

  const setField = (field: keyof FormState, value: string) => {
    setSubmitted(false)
    setValues((current) => ({ ...current, [field]: value }))
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setTouched({
      name: nextErrors.name ?? 'ok',
      email: nextErrors.email ?? 'ok',
      phone: nextErrors.phone ?? 'ok',
      message: nextErrors.message ?? 'ok',
    })

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = event.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]')
      firstInvalid?.focus()
      return
    }

    setSubmitting(true)
    window.setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 500)
  }

  const showError = (field: keyof FormState) => touched[field] && errors[field]

  return (
    <section id="contact" className="scroll-mt-24 px-4 py-16 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-lg border border-white/10 bg-card/70 p-6 md:grid-cols-[0.85fr_1.15fr] md:p-10">
        <Reveal>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Enquire now
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold uppercase leading-tight md:text-5xl">
            Put FIRENOX Where Small Fires Need Fast Hands
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Contact us for pricing, product documentation, bulk orders, distribution opportunities,
            or any other enquiries. Complete the form below and our team will get back to you as soon as possible.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-muted-foreground">
            <p className="flex items-center gap-3">
              <Mail aria-hidden="true" className="size-5 text-primary" />
              sales@firenox.example
            </p>
            <p className="flex items-center gap-3">
              <Phone aria-hidden="true" className="size-5 text-primary" />
              Response target: within one business day
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form noValidate onSubmit={onSubmit} className="grid gap-5" aria-describedby="form-status">
            <div id="form-status" aria-live="polite" className="min-h-6 text-sm">
              {submitted && (
                <p className="flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 p-3 font-medium text-foreground">
                  <CheckCircle2 aria-hidden="true" className="size-5 text-primary" />
                  Enquiry prepared. Connect this form to your CRM or email service
                  to send it live.
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                icon={UserRound}
                label="Name"
                id="name"
                error={showError('name') || undefined}
              >
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onBlur={() => setTouched((current) => ({ ...current, name: 'ok' }))}
                  onChange={(event) => setField('name', event.target.value)}
                  aria-invalid={Boolean(showError('name'))}
                  aria-describedby="name-error"
                  className="field-input"
                />
              </Field>

              <Field
                icon={Mail}
                label="Email"
                id="email"
                error={showError('email') || undefined}
              >
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={values.email}
                  onBlur={() => setTouched((current) => ({ ...current, email: 'ok' }))}
                  onChange={(event) => setField('email', event.target.value)}
                  aria-invalid={Boolean(showError('email'))}
                  aria-describedby="email-error"
                  className="field-input"
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                icon={Phone}
                label="Phone"
                id="phone"
                error={showError('phone') || undefined}
              >
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onBlur={() => setTouched((current) => ({ ...current, phone: 'ok' }))}
                  onChange={(event) => setField('phone', event.target.value)}
                  aria-invalid={Boolean(showError('phone'))}
                  aria-describedby="phone-error"
                  className="field-input"
                />
              </Field>

              <div className="grid gap-2">
                <label htmlFor="interest" className="text-sm font-semibold text-foreground">
                  Interest
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={values.interest}
                  onChange={(event) => setField('interest', event.target.value)}
                  className="field-input"
                >
                  {INTERESTS.map((interest) => (
                    <option key={interest}>{interest}</option>
                  ))}
                </select>
              </div>
            </div>

            <Field
              label="Message"
              id="message"
              error={showError('message') || undefined}
            >
              <textarea
                id="message"
                name="message"
                rows={5}
                value={values.message}
                onBlur={() => setTouched((current) => ({ ...current, message: 'ok' }))}
                onChange={(event) => setField('message', event.target.value)}
                aria-invalid={Boolean(showError('message'))}
                aria-describedby="message-error"
                className="field-input resize-y"
              />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              aria-busy={submitting}
              className="control-ring inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground hover:brightness-110"
            >
              <Send aria-hidden="true" className="size-4" />
              {submitting ? 'Preparing enquiry' : 'Prepare enquiry'}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Field({
  children,
  error,
  icon: Icon,
  id,
  label,
}: {
  children: ReactNode
  error?: string
  icon?: LucideIcon
  id: string
  label: string
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-semibold text-foreground">
        {Icon && <Icon aria-hidden="true" className="size-4 text-primary" />}
        {label}
      </label>
      {children}
      <p
        id={`${id}-error`}
        className={cn(
          'min-h-5 text-xs leading-relaxed',
          error ? 'text-red-200' : 'text-transparent',
        )}
      >
        {error || ''}
      </p>
    </div>
  )
}
