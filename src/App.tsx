import { type FormEvent, useEffect, useState } from 'react'
import './App.css'

const HERO_IMG = '/images/hero.jpg'
const PHONE_DISPLAY = '(214) 555-0132'
const PHONE_HREF = 'tel:+12145550132'

const POINTS = [
  {
    title: 'Any condition',
    copy: 'Repairs, clutter, tenants, old roof — we take the house as it is.',
  },
  {
    title: 'No fees',
    copy: 'No commissions, no listing costs. We cover standard closing costs.',
  },
  {
    title: 'Your timeline',
    copy: 'Close in as few as 14 days, or later if you need more time.',
  },
]

const STEPS = [
  {
    title: 'Tell us about the house',
    copy: 'The address, rough condition, and when you’d like to move.',
  },
  {
    title: 'We take a look',
    copy: 'A quick call, then a walkthrough whenever you’re comfortable.',
  },
  {
    title: 'You get a cash offer',
    copy: 'Usually within 24–48 hours. No obligation to accept it.',
  },
]

function OfferForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="offer-card offer-card--done" role="status">
        <h2>Thanks — we’ve got it.</h2>
        <p>
          We’ll call you shortly with a cash offer for the house. No pressure,
          no obligation.
        </p>
        <p className="offer-note">
          Need us sooner? Call <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.
        </p>
      </div>
    )
  }

  return (
    <div className="offer-card" id="offer">
      <h2>Get your cash offer</h2>
      <p className="offer-sub">
        Three quick details. We’ll do the rest.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="address">Property address</label>
          <input
            id="address"
            name="address"
            placeholder="123 Maple Street, Dallas, TX"
            autoComplete="street-address"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            name="name"
            placeholder="Jordan Lee"
            autoComplete="name"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={PHONE_DISPLAY}
            autoComplete="tel"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Get my cash offer
        </button>
        <p className="offer-note">
          Free, with no obligation. Or call <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.
        </p>
      </form>
    </div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container nav-inner">
          <a className="brand" href="#top">
            <span className="brand-mark" aria-hidden="true">
              H
            </span>
            Hooda Investments
          </a>
          <div className="nav-actions">
            <a className="nav-phone" href={PHONE_HREF}>
              {PHONE_DISPLAY}
            </a>
            <a className="btn btn-primary nav-cta" href="#offer">
              Get an offer
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-media" aria-hidden="true">
            <img src={HERO_IMG} alt="" fetchPriority="high" />
          </div>
          <div className="container hero-grid">
            <div className="hero-copy">
              <h1>
                We’ll buy your house.
                <br />
                Any condition.
              </h1>
              <p>
                A fair cash offer, no fees, and you pick the closing date. Tell
                us about the place and we’ll take it from there.
              </p>
              <ul className="hero-points">
                <li>Any condition</li>
                <li>No fees</li>
                <li>Close on your timeline</li>
              </ul>
            </div>
            <OfferForm />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <ul className="points">
              {POINTS.map((point) => (
                <li key={point.title}>
                  <h3>{point.title}</h3>
                  <p>{point.copy}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section--tint">
          <div className="container">
            <h2 className="section-title">How it works</h2>
            <ol className="steps">
              {STEPS.map((step, index) => (
                <li key={step.title}>
                  <span className="step-num">{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section--dark">
          <div className="container cta">
            <h2>Ready when you are.</h2>
            <p>
              Tell us about the house and we’ll get you a cash offer — no
              obligation.
            </p>
            <div className="cta-actions">
              <a className="btn btn-primary" href="#offer">
                Get my cash offer
              </a>
              <a className="btn btn-glass" href={PHONE_HREF}>
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p className="footer-brand">Hooda Investments</p>
          <p>Buying houses across North Texas, any condition.</p>
          <p className="footer-legal">
            © {new Date().getFullYear()} Hooda Investments · Dallas–Fort Worth,
            Texas
          </p>
        </div>
      </footer>
    </>
  )
}
