import { useState, cloneElement } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'
import { profile } from '../data/profile.js'
import './Contact.css'

const INFO = [
  { icon: 'phone', label: 'Phone', value: profile.phoneDisplay, href: `tel:${profile.phone}` },
  { icon: 'envelope', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: 'location', label: 'Location', value: profile.address },
  { icon: 'linkedin', label: 'LinkedIn', value: 'arun-prinyanca', href: profile.linkedin },
  { icon: 'github', label: 'GitHub', value: 'priyancarun03-svg', href: profile.github },
]

const emptyForm = { fname: '', lname: '', email: '', phone: '', subject: '', message: '' }
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRe = /^[0-9]{10}$/

export default function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.fname.trim()) e.fname = 'Please enter your first name.'
    if (!form.lname.trim()) e.lname = 'Please enter your last name.'
    if (!emailRe.test(form.email.trim())) e.email = 'Please enter a valid email address.'
    if (form.phone.trim() && !phoneRe.test(form.phone.replace(/[\s-+]/g, ''))) {
      e.phone = 'Please enter a valid 10-digit phone number.'
    }
    if (!form.subject.trim()) e.subject = 'Please enter a subject.'
    if (form.message.trim().length < 20) e.message = 'Please enter a message (at least 20 characters).'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length === 0) {
      setSent(true)
      setForm(emptyForm)
      setTimeout(() => setSent(false), 5000)
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal className="contact__head">
          <div className="eyebrow" style={{ display: 'inline-flex' }}><Icon name="send" /> Contact</div>
          <h2 className="section-title">Get in touch</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Have a project in mind or want to connect? Drop me a message!
          </p>
        </Reveal>

        <div className="contact__grid">
          <div>
            {INFO.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.07} className="contact-info card">
                <div className="fact__icon"><Icon name={item.icon} /></div>
                <div>
                  <div className="fact__label">{item.label}</div>
                  <div className="contact-info__value">
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                        {item.value}
                      </a>
                    ) : item.value}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="card contact-form">
            <h3 className="contact-form__title">Send a message</h3>

            <AnimatePresence>
              {sent && (
                <motion.div
                  className="form-success"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Icon name="check" /> Message sent! I'll get back to you soon.
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <Field label="First name *" error={errors.fname}>
                  <input value={form.fname} onChange={update('fname')} placeholder="Your first name" />
                </Field>
                <Field label="Last name *" error={errors.lname}>
                  <input value={form.lname} onChange={update('lname')} placeholder="Your last name" />
                </Field>
              </div>
              <Field label="Email address *" error={errors.email}>
                <input type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" />
              </Field>
              <Field label="Phone number" error={errors.phone}>
                <input value={form.phone} onChange={update('phone')} placeholder="+91 XXXXXXXXXX" />
              </Field>
              <Field label="Subject *" error={errors.subject}>
                <input value={form.subject} onChange={update('subject')} placeholder="What's this about?" />
              </Field>
              <Field label="Message *" error={errors.message}>
                <textarea
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Tell me about your project or query..."
                />
              </Field>

              <motion.button type="submit" className="btn btn-primary submit-btn" whileTap={{ scale: 0.97 }}>
                <Icon name="send" /> Send message
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({ label, error, children }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {cloneElement(children, {
        className: `${children.props.className || ''} ${error ? 'error' : ''}`.trim(),
      })}
      <AnimatePresence>
        {error && (
          <motion.span
            className="form-error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}