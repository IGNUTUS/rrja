import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { AlertTriangle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { shipmentTypes, services } from '../data/services'
import { company } from '../data/company'

type FormValues = {
  fullName: string
  company: string
  email: string
  phone: string
  shipmentType: string
  message: string
  website: string // honeypot
}

/**
 * Inquiry form.
 * - With VITE_FORM_ENDPOINT set, the form POSTs JSON to that endpoint (Formspree-compatible) and only reports
 *   success on a 2xx response.
 * - Without it, the form validates but tells the visitor plainly that it is NOT connected and gives the
 *   direct contact options. It never pretends a message was sent.
 */
const endpoint = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined)?.trim()

type Status = { kind: 'idle' } | { kind: 'success' } | { kind: 'error'; message: string } | { kind: 'not-connected' }

export default function ContactForm() {
  const [params] = useSearchParams()
  const fromService = services.find((s) => s.slug === params.get('service'))
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues: {
      shipmentType: fromService?.inquiryType ?? '',
      message: fromService ? `I would like to inquire about ${fromService.title}.\n\n` : '',
    },
  })

  const onSubmit = async (values: FormValues) => {
    if (values.website) return // bot
    if (!endpoint) {
      setStatus({ kind: 'not-connected' })
      return
    }
    try {
      const { website: _hp, ...payload } = values
      void _hp
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...payload, _subject: `Website inquiry: ${values.shipmentType}` }),
      })
      if (!res.ok) throw new Error(`Server responded with ${res.status}`)
      setStatus({ kind: 'success' })
      reset()
    } catch {
      setStatus({
        kind: 'error',
        message: 'Your message could not be sent. Please try again, or contact us by phone or Facebook.',
      })
    }
  }

  const field = 'peer w-full border-0 border-b bg-transparent px-0 pb-3 pt-2 text-[1rem] text-ink outline-none transition-colors placeholder:text-slate-ink/40 focus:ring-0'
  const border = (err?: unknown) => (err ? 'border-red-600 focus:border-red-600' : 'border-line focus:border-royal')
  const label = 'block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-navy'
  const errText = 'mt-2 text-sm text-red-700'

  if (status.kind === 'success') {
    return (
      <div role="status" className="border border-line bg-mist p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-royal" aria-hidden />
        <h3 className="mt-5 font-display text-2xl font-bold text-navy">Thank you, your inquiry has been sent.</h3>
        <p className="mt-3 text-slate-ink">Our team will get back to you as soon as possible.</p>
        <button onClick={() => setStatus({ kind: 'idle' })} className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-royal underline-offset-4 hover:underline">
          Send another inquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-x-8 gap-y-9 sm:grid-cols-2" aria-describedby="form-note">
      <div>
        <label htmlFor="fullName" className={label}>
          Full name <span className="text-gold-700">*</span>
        </label>
        <input
          id="fullName"
          autoComplete="name"
          className={`${field} ${border(errors.fullName)}`}
          placeholder="Juan Dela Cruz"
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? 'fullName-err' : undefined}
          {...register('fullName', { required: 'Please enter your full name.', minLength: { value: 2, message: 'Please enter your full name.' } })}
        />
        {errors.fullName && <p id="fullName-err" className={errText}>{errors.fullName.message}</p>}
      </div>

      <div>
        <label htmlFor="company" className={label}>
          Company name
        </label>
        <input id="company" autoComplete="organization" className={`${field} ${border()}`} placeholder="Your company (optional)" {...register('company')} />
      </div>

      <div>
        <label htmlFor="email" className={label}>
          Email address <span className="text-gold-700">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={`${field} ${border(errors.email)}`}
          placeholder="name@company.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-err' : undefined}
          {...register('email', {
            required: 'Please enter your email address.',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: 'Please enter a valid email address.' },
          })}
        />
        {errors.email && <p id="email-err" className={errText}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className={label}>
          Contact number <span className="text-gold-700">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          className={`${field} ${border(errors.phone)}`}
          placeholder="+63 9XX XXX XXXX"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-err' : undefined}
          {...register('phone', {
            required: 'Please enter a contact number.',
            validate: (v) => (v.replace(/[^\d]/g, '').length >= 7 && /^[+\d\s()-]+$/.test(v)) || 'Please enter a valid phone number.',
          })}
        />
        {errors.phone && <p id="phone-err" className={errText}>{errors.phone.message}</p>}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="shipmentType" className={label}>
          Shipment type <span className="text-gold-700">*</span>
        </label>
        <select
          id="shipmentType"
          className={`${field} ${border(errors.shipmentType)} cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%23164B83' stroke-width='1.6'%3E%3Cpath d='M1 1l5 5 5-5'/%3E%3C/svg%3E")] bg-[length:12px] bg-[right_4px_center] bg-no-repeat`}
          aria-invalid={!!errors.shipmentType}
          aria-describedby={errors.shipmentType ? 'type-err' : undefined}
          {...register('shipmentType', { required: 'Please select a shipment type.' })}
        >
          <option value="">Select a shipment type</option>
          {shipmentTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.shipmentType && <p id="type-err" className={errText}>{errors.shipmentType.message}</p>}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>
          Message <span className="text-gold-700">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className={`${field} ${border(errors.message)} resize-y`}
          placeholder="Tell us about your shipment: cargo type, origin or destination, and timing."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-err' : undefined}
          {...register('message', { required: 'Please enter a message.', minLength: { value: 10, message: 'Please add a little more detail (at least 10 characters).' } })}
        />
        {errors.message && <p id="message-err" className={errText}>{errors.message.message}</p>}
      </div>

      {/* Honeypot: hidden from people, often filled by bots */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="flex flex-col gap-6 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="max-w-md text-sm text-slate-ink">
          Fields marked <span className="text-gold-700">*</span> are required. We only use your details to respond to your inquiry.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative inline-flex shrink-0 items-center justify-center gap-3 overflow-hidden whitespace-nowrap bg-navy px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:text-navy disabled:opacity-70"
        >
          <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 group-hover:translate-x-0" aria-hidden />
          <span className="relative">{isSubmitting ? 'Sending…' : 'Send inquiry'}</span>
          {isSubmitting ? <Loader2 className="relative h-4 w-4 animate-spin" /> : <Send className="relative h-4 w-4" />}
        </button>
      </div>

      <div aria-live="polite" className="sm:col-span-2">
        {status.kind === 'error' && (
          <p role="alert" className="flex gap-3 border-l-2 border-red-600 bg-red-50 p-4 text-sm text-red-800">
            <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden /> {status.message}
          </p>
        )}
        {status.kind === 'not-connected' && (
          <div role="alert" className="border-l-2 border-gold bg-mist p-5 text-sm text-ink">
            <p className="flex items-center gap-2 font-semibold text-navy">
              <AlertTriangle className="h-5 w-5 text-gold-700" aria-hidden /> Online form not yet connected: your message has not been sent.
            </p>
            <p className="mt-2 text-slate-ink">
              Your details were checked and look good, but this form is not yet linked to an inbox. Please reach us directly:
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 font-medium">
              {company.phones.value.map((p) => (
                <li key={p.tel}>
                  <a className="text-royal underline-offset-4 hover:underline" href={`tel:${p.tel}`}>
                    {p.label}: {p.display}
                  </a>
                </li>
              ))}
              <li>
                <a className="text-royal underline-offset-4 hover:underline" href={company.facebook.value} target="_blank" rel="noopener noreferrer">
                  Message us on Facebook
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </form>
  )
}
