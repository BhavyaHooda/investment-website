import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react'
import './App.css'

const SITUATIONS = [
  {
    title: 'Ready for a simpler sale',
    copy: 'No listings, no open houses, no waiting around for the right buyer.',
  },
  {
    title: 'An inherited home',
    copy: 'When a house comes with memories — and decisions you’re not ready to rush.',
  },
  {
    title: 'Moving on to something new',
    copy: 'Relocating for work, family, or a fresh start. We’ll help you leave gently.',
  },
  {
    title: 'Behind on payments',
    copy: 'If foreclosure feels close, talk with us early. There may still be options.',
  },
  {
    title: 'A tired rental',
    copy: 'Tenants, repairs, and late nights adding up. You don’t have to keep managing it.',
  },
  {
    title: 'More repairs than energy',
    copy: 'Sell as-is. Broken floors, old roofs, cluttered rooms — we still want to hear from you.',
  },
]

const STEPS = [
  {
    title: 'Share a little',
    copy: 'A few details about your home is enough. No lengthy paperwork to begin.',
  },
  {
    title: 'We listen closely',
    copy: 'A real conversation about your timing, your hopes, and what would feel fair.',
  },
  {
    title: 'A clear cash offer',
    copy: 'You’ll see the number plainly — accept it, decline it, or keep talking. Your call.',
  },
  {
    title: 'Close with ease',
    copy: 'We cover typical closing costs and work around your move-out date.',
  },
]

const PROMISES = [
  {
    title: 'No fees eating your sale',
    copy: 'No agent commissions. The offer you accept is what you take home.',
  },
  {
    title: 'Come as the house is',
    copy: 'Repairs, clutter, years of life lived in the walls — none of that stops an offer.',
  },
  {
    title: 'Your timeline, not ours',
    copy: 'Need two weeks or two months? We bend the closing date around your life.',
  },
  {
    title: 'Neighbors before buyers',
    copy: 'Clear answers, honest numbers, and the respect you’d want for your own family.',
  },
]

const AREAS =
  'Dallas, Fort Worth, Arlington, Plano, Irving, Garland, Grand Prairie, Mesquite, Richardson, Carrollton, Frisco, McKinney, and nearby neighborhoods across North Texas.'

const HERO_IMG = '/images/hero.jpg'
const WELCOME_IMG = '/images/welcome.jpg'
const NOTE_IMG = '/images/note.jpg'

function useReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return ref
}

function Reveal({
  as: Tag = 'div',
  className = '',
  children,
}: {
  as?: 'div' | 'section' | 'ul' | 'li' | 'blockquote'
  className?: string
  children: ReactNode
}) {
  const ref = useReveal()
  return (
    <Tag ref={ref as never} className={`reveal ${className}`.trim()}>
      {children}
    </Tag>
  )
}

function OfferForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="form-success" role="status">
        <p className="eyebrow">Message received</p>
        <h3>Thank you — we’re glad you reached out.</h3>
        <p>
          Someone from Hooda Investments will be in touch soon with a warm hello
          and clear next steps. No pressure. Just a conversation.
        </p>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            placeholder="Jordan"
            autoComplete="given-name"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            placeholder="Lee"
            autoComplete="family-name"
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(214) 555-0132"
            autoComplete="tel"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@email.com"
            autoComplete="email"
            required
          />
        </div>
      </div>
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
        <label htmlFor="message">Anything you’d like us to know?</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Timing, condition of the home, questions — whatever feels helpful."
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Request my fair cash offer
      </button>
      <p className="form-note">
        No obligation. We never sell or share your information.
      </p>
    </form>
  )
}

export default function App() {
  const [navScrolled, setNavScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="site">
      <header className={`nav${navScrolled ? ' is-scrolled' : ''}`}>
        <div className="wrap nav-inner">
          <a className="brand" href="#top">
            Hooda Investments
          </a>
          <nav className="nav-links" aria-label="Primary">
            <a href="#about">About</a>
            <a href="#how">How it works</a>
            <a href="#offer" className="nav-cta">
              Get an offer
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-label="Welcome">
          <div className="hero-media" aria-hidden="true">
            <img
              src={HERO_IMG}
              alt=""
              width={2000}
              height={1333}
              fetchPriority="high"
            />
          </div>
          <div className="hero-shade" aria-hidden="true" />
          <div className="wrap hero-content">
            <h1 className="hero-brand">Hooda Investments</h1>
            <p className="hero-line">We buy houses — with care, not pressure.</p>
            <p className="hero-copy">
              When you’re ready to sell, we’re here with a fair cash offer, a
              simple process, and a welcome that feels like home.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#offer">
                Start with a conversation
              </a>
              <a className="btn btn-ghost" href="#how">
                See how it works
              </a>
            </div>
          </div>
          <a className="hero-scroll" href="#about" aria-label="Continue to about section">
            <span>Scroll</span>
          </a>
        </section>

        <section className="section welcome" id="about">
          <div className="wrap welcome-grid">
            <Reveal className="welcome-visual">
              <img
                src={WELCOME_IMG}
                alt="Sunlit home kitchen with warm wood and natural light"
                width={1400}
                height={933}
                loading="lazy"
              />
            </Reveal>
            <Reveal className="welcome-copy">
              <p className="eyebrow">A warmer way to sell</p>
              <h2>Come as you are. Leave with clarity.</h2>
              <p>
                Hooda Investments helps homeowners sell without the stress of
                listings, showings, or surprise repair lists. Whether life is
                changing quickly or you’re simply ready for something new, we
                meet you where you are.
              </p>
              <p>
                Think of us as a trusted neighbor who happens to buy houses —
                honest offers, kind conversations, and a process built around
                your comfort.
              </p>
              <p className="welcome-pull">
                “Selling a home is personal. We treat it that way.”
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section note" id="note">
          <div className="wrap note-grid">
            <Reveal className="note-copy">
              <p className="eyebrow">From our kitchen table</p>
              <h2>Houses hold stories. We honor that.</h2>
              <p>
                Behind every address is a chapter — raising kids, starting over,
                saying goodbye, starting again. We don’t treat your home like a
                transaction on a spreadsheet.
              </p>
              <p>
                Our job is simple: listen carefully, offer fairly, and make the
                path forward feel lighter than you expected.
              </p>
            </Reveal>
            <Reveal className="note-visual">
              <img
                src={NOTE_IMG}
                alt="Cozy living room corner with soft natural light"
                width={1200}
                height={900}
                loading="lazy"
              />
            </Reveal>
          </div>
        </section>

        <section className="section situations" id="situations">
          <div className="wrap">
            <Reveal className="section-head center">
              <p className="eyebrow">You’re not alone</p>
              <h2>We’re here for life’s in-between moments</h2>
              <p>
                Every home has a story. If any of these sound familiar, we’d love
                to help you take the next step gently.
              </p>
            </Reveal>
            <div className="situation-list">
              {SITUATIONS.map((item) => (
                <Reveal key={item.title} className="situation-item">
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="how">
          <div className="wrap">
            <Reveal className="section-head center">
              <p className="eyebrow">Simple & human</p>
              <h2>How we work together</h2>
              <p>Four clear steps. No jargon. No rush — unless you need one.</p>
            </Reveal>
            <Reveal className="process-steps">
              {STEPS.map((step) => (
                <article className="process-step" key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="section voice" aria-label="Homeowner voice">
          <div className="wrap">
            <Reveal as="blockquote" className="voice-quote">
              <p>
                “I didn’t need a sales pitch. I needed someone who would listen,
                tell me the truth, and help me move on without the stress. That’s
                exactly what I found.”
              </p>
              <footer>— A DFW homeowner we worked with</footer>
            </Reveal>
          </div>
        </section>

        <section className="section promise" id="promise">
          <div className="wrap">
            <Reveal className="section-head">
              <p className="eyebrow">Our promise</p>
              <h2>What you can count on</h2>
              <p>
                Selling shouldn’t feel cold or transactional. Here’s how we keep
                things warm, clear, and fair.
              </p>
            </Reveal>
            <Reveal className="promise-grid">
              {PROMISES.map((item) => (
                <article className="promise-item" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="section offer" id="offer">
          <div className="wrap">
            <Reveal className="offer-panel">
              <div className="offer-intro">
                <p className="eyebrow">Let’s talk</p>
                <h2>Ready when you are</h2>
                <p>
                  Tell us a little about your property. We’ll follow up with a
                  personal touch — not a hard sell.
                </p>
                <ul className="offer-points">
                  <li>Cash offer, no commissions</li>
                  <li>We cover standard closing costs</li>
                  <li>Sell as-is, on your timeline</li>
                </ul>
                <p className="offer-aside">
                  Prefer to talk first?{' '}
                  <a href="tel:+12145550132">(214) 555-0132</a>
                </p>
              </div>
              <OfferForm />
            </Reveal>
          </div>
        </section>

        <section className="section areas" id="areas">
          <div className="wrap">
            <Reveal className="section-head center">
              <p className="eyebrow">Local roots</p>
              <h2>Proudly serving DFW & beyond</h2>
              <p className="areas-copy">{AREAS}</p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <div className="footer-brand-block">
            <p className="footer-brand">Hooda Investments</p>
            <p>Buying houses with heart across North Texas.</p>
          </div>
          <div className="footer-contact">
            <a href="tel:+12145550132">(214) 555-0132</a>
            <a href="mailto:hello@hoodainvestments.com">hello@hoodainvestments.com</a>
          </div>
          <p className="footer-legal">
            © {new Date().getFullYear()} Hooda Investments. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
