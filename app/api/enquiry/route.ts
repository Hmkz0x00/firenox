import nodemailer from 'nodemailer'
import { INTERESTS, validateEnquiry, type Enquiry } from '@/lib/enquiry'

export const runtime = 'nodejs'
export const maxDuration = 15

const MAILBOX = 'info@firenoxglobal.com'
const MAX_BODY_LENGTH = 8_000

function readField(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  if (origin && (!URL.canParse(origin) || !host || new URL(origin).host !== host)) {
    return Response.json({ error: 'Invalid request origin.' }, { status: 403 })
  }
  if (!request.headers.get('content-type')?.startsWith('application/json')) {
    return Response.json({ error: 'Invalid request format.' }, { status: 415 })
  }
  if (Number(request.headers.get('content-length')) > MAX_BODY_LENGTH) {
    return Response.json({ error: 'Message is too long.' }, { status: 413 })
  }

  let input: Record<string, unknown>
  try {
    const raw = await request.text()
    if (raw.length > MAX_BODY_LENGTH) {
      return Response.json({ error: 'Message is too long.' }, { status: 413 })
    }
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('Invalid request body')
    }
    input = parsed as Record<string, unknown>
  } catch {
    return Response.json({ error: 'Invalid request format.' }, { status: 400 })
  }

  if (readField(input.website)) {
    return Response.json({ ok: true })
  }

  const values: Enquiry = {
    name: readField(input.name),
    email: readField(input.email),
    phone: readField(input.phone),
    interest: readField(input.interest),
    message: readField(input.message),
  }
  const errors = validateEnquiry(values)
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: 'Please check your details and try again.', fields: errors }, { status: 400 })
  }

  const user = process.env.SMTP_USER
  const password = process.env.SMTP_PASSWORD
  if (!user || !password) {
    return Response.json({ error: 'Email is temporarily unavailable. Please email us directly.' }, { status: 503 })
  }

  const transport = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: { user, pass: password },
    connectionTimeout: 7_000,
    greetingTimeout: 7_000,
    socketTimeout: 10_000,
  })

  try {
    await transport.sendMail({
      from: { name: 'FIRENOX Website', address: user },
      to: MAILBOX,
      replyTo: { name: values.name, address: values.email },
      subject: `FIRENOX enquiry: ${INTERESTS.find((interest) => interest === values.interest)}`,
      text: [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Phone: ${values.phone}`,
        `Interest: ${values.interest}`,
        '',
        values.message,
      ].join('\n'),
    })
    return Response.json({ ok: true })
  } catch (error) {
    console.error('Enquiry email could not be sent', error instanceof Error ? error.name : 'Unknown error')
    return Response.json({ error: 'We could not send your enquiry. Please try again or email us directly.' }, { status: 502 })
  } finally {
    transport.close()
  }
}
