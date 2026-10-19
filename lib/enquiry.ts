export const INTERESTS = [
  'Home / vehicle use',
  'Office / retail use',
  'Industrial supply',
  'Distribution enquiry',
] as const

export type Enquiry = {
  name: string
  email: string
  phone: string
  interest: string
  message: string
}

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>

export function validateEnquiry(values: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {}

  if (values.name.trim().length < 2 || values.name.length > 100) {
    errors.name = 'Enter your name (2 to 100 characters).'
  }
  if (values.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  const digits = values.phone.replace(/\D/g, '')
  if (values.phone.length > 40 || digits.length < 7 || digits.length > 20) {
    errors.phone = 'Enter a reachable phone number.'
  }
  if (!INTERESTS.some((interest) => interest === values.interest)) {
    errors.interest = 'Choose an enquiry type.'
  }
  if (values.message.trim().length < 12 || values.message.length > 2000) {
    errors.message = 'Add a message between 12 and 2000 characters.'
  }

  return errors
}
