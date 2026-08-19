import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import './App.css'

const IMG = {
  hero: '/images/hero.jpg',
  livingWarm: '/images/welcome.jpg',
  kitchen: '/images/warm-kitchen.jpg',
  porchHome: '/images/living.jpg',
  sunlitRoom: '/images/porch.jpg',
  eveningHome: '/images/home-a.jpg',
  street: '/images/home-c.jpg',
  kitchenBright: '/images/cozy-kitchen.jpg',
  detail: '/images/detail.jpg',
}

const HERO_STRIP = [
  { value: 'No fees', label: 'No commissions or closing costs' },
  { value: 'Any condition', label: 'Repairs and clutter welcome' },
  { value: 'Your timeline', label: 'Close in 14 days or 4 months' },
  { value: 'Local to DFW', label: 'Neighbors, not a call center' },
]

const VALUES = [
  {
    title: 'A real conversation first',
    copy: 'We start by listening. No scripts, no countdown clocks, no pressure to decide on the spot.',
    icon: (
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    ),
  },
  {
    title: 'Honest numbers, explained',
    copy: 'We show you how we arrived at our offer — comparable homes, repair costs, and all.',
    icon: (
      <>
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </>
    ),
  },
  {
    title: 'We handle the hard parts',
    copy: 'Paperwork, title work, cleanout, and coordination. You keep what matters and leave the rest.',
    icon: (
      <>
        <path d="M20 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" />
        <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </>
    ),
  },
  {
    title: 'Care for the neighborhood',
    copy: 'Every home we buy gets restored with real craftsmanship — good for you, good for the block.',
    icon: (
      <>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9.5 21v-6h5v6" />
      </>
    ),
  },
]

const SITUATIONS = [
  {
    title: 'Ready for a simpler sale',
    copy: 'No listings, no open houses, no strangers walking through on a Sunday afternoon.',
  },
  {
    title: 'An inherited home',
    copy: 'When a house comes with memories — and decisions no one feels ready to rush.',
  },
  {
    title: 'Moving on to something new',
    copy: 'Relocating for work, family, or a fresh start somewhere that fits better.',
  },
  {
    title: 'Behind on payments',
    copy: 'If foreclosure feels close, reach out early. There are usually more options than you think.',
  },
  {
    title: 'A tired rental',
    copy: 'Tenants, turnovers, and late-night repair calls adding up. You can hand it off.',
  },
  {
    title: 'More repairs than energy',
    copy: 'Old roofs, worn floors, a kitchen from another decade. We still want to hear from you.',
  },
]

const STEPS = [
  {
    title: 'Share a little',
    copy: 'Tell us about the home and your timing. A few details is plenty to start.',
  },
  {
    title: 'We listen closely',
    copy: 'A friendly call, then a walkthrough when you’re comfortable. We look, we never lecture.',
  },
  {
    title: 'A clear cash offer',
    copy: 'Usually within 24–48 hours, with the math laid out so nothing feels hidden.',
  },
  {
    title: 'Close with ease',
    copy: 'We cover standard closing costs and work around your move-out date, not ours.',
  },
]

const COMPARE = {
  ours: [
    'Zero commissions or listing fees',
    'We pay standard closing costs',
    'Sell exactly as-is — no repairs, no cleaning',
    'One walkthrough, no public showings',
    'Choose your own closing date',
    'Cash offer, no financing to fall through',
  ],
  agent: [
    'Typically 5–6% in agent commissions',
    'Seller often pays part of closing costs',
    'Repairs and staging usually expected',
    'Weeks of showings and open houses',
    'Closing tied to the buyer’s lender',
    'Deals can fall apart at the last minute',
  ],
}

const PROMISES = [
  {
    title: 'No fees eating your sale',
    copy: 'No agent commissions, no junk fees. The number you accept is the number you take home.',
  },
  {
    title: 'Come as the house is',
    copy: 'Repairs, clutter, years of life lived in the walls — none of that changes our welcome.',
  },
  {
    title: 'Your timeline, not ours',
    copy: 'Need two weeks or two months? Need to stay a bit after closing? We can usually work with it.',
  },
  {
    title: 'Neighbors before buyers',
    copy: 'Straight answers, honest numbers, and the same respect we’d want for our own family.',
  },
]

const GALLERY = [
  {
    src: IMG.porchHome,
    alt: 'Craftsman home with a wide wraparound porch',
    caption: 'Porches worth sitting on again',
  },
  {
    src: IMG.sunlitRoom,
    alt: 'Sunlit living room with wood floors and soft furniture',
    caption: 'Sunlit rooms, ready to live in',
  },
  {
    src: IMG.kitchenBright,
    alt: 'Bright kitchen with white cabinets and warm wood floors',
    caption: 'Kitchens brought back to life',
  },
  {
    src: IMG.eveningHome,
    alt: 'Home glowing with warm light at dusk',
    caption: 'Warm lights at the end of the day',
  },
  {
    src: IMG.detail,
    alt: 'Reading corner with a chair, lamp, and framed art',
    caption: 'Details that make it home',
  },
]

const FAQS = [
  {
    q: 'How do you decide what to offer?',
    a: 'We look at recent sales nearby, the current condition of the home, and what it will cost to bring it back. Then we walk you through that math so the number makes sense instead of feeling arbitrary.',
  },
  {
    q: 'Do I need to clean or repair anything?',
    a: 'No. Sell it exactly as it stands. Leave behind furniture, boxes, or anything you don’t want to move — we’ll handle the cleanout as part of the process.',
  },
  {
    q: 'How quickly can we close?',
    a: 'As fast as about two weeks once we have a signed agreement and clear title. If you need longer to find your next place, we can stretch the timeline to fit.',
  },
  {
    q: 'Are there any fees or commissions?',
    a: 'None. There are no listing fees, no agent commissions, and we cover standard closing costs. What you accept is what you walk away with.',
  },
  {
    q: 'What if I’m behind on my mortgage?',
    a: 'Reach out sooner rather than later. Depending on where things stand, there may be several paths forward — and a conversation costs you nothing.',
  },
  {
    q: 'Am I obligated once I request an offer?',
    a: 'Not at all. Getting an offer is free and there’s no obligation to accept. Plenty of people talk with us, think it over, and decide later.',
  },
]

const AREAS = [
  'Dallas',
  'Fort Worth',
  'Arlington',
  'Plano',
  'Irving',
  'Garland',
  'Grand Prairie',
  'Mesquite',
  'Richardson',
  'Carrollton',
  'Frisco',
  'McKinney',
  'Duncanville',
  'Allen',
]

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function Reveal({
  as: Tag = 'div',
  className = '',
  children,
}: {
  as?: 'div' | 'section' | 'ul' | 'blockquote' | 'figure'
  className?: string
  children: ReactNode
}) {
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
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

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
          and clear next steps. No pressure, just a conversation.
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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
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
          <nav className="nav-links" aria-label="Primary">
            <a href="#about">About</a>
            <a href="#how">How it works</a>
            <a href="#compare">Compare</a>
            <a href="#faq">Questions</a>
            <a className="btn btn-primary nav-cta" href="#offer">
              Get an offer
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* ——— Hero ——— */}
        <section className="hero" aria-label="Welcome">
          <div className="hero-media" aria-hidden="true">
            <img src={IMG.hero} alt="" width={2000} height={1333} />
          </div>
          <div className="container">
            <div className="hero-content">
              <p className="hero-tag">Family-run in North Texas</p>
              <h1>Hooda Investments</h1>
              <p className="hero-line">
                We buy houses — with care, not pressure.
              </p>
              <p className="hero-copy">
                When you’re ready to sell, we’re here with a fair cash offer, a
                simple process, and a welcome that feels like home.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#offer">
                  Start with a conversation
                </a>
                <a className="btn btn-glass" href="#how">
                  See how it works
                </a>
              </div>
            </div>
          </div>
          <div className="hero-strip">
            <div className="container">
              <ul>
                {HERO_STRIP.map((item) => (
                  <li key={item.value}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ——— Welcome ——— */}
        <section className="section" id="about">
          <div className="container split">
            <Reveal className="split-media">
              <img
                src={IMG.livingWarm}
                alt="Sunlit living space with warm wood, leather seating, and trees outside"
                loading="lazy"
              />
            </Reveal>
            <Reveal className="split-copy">
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
              <div className="stat-inline">
                <div>
                  <strong>24–48 hrs</strong>
                  <span>Typical time to an offer</span>
                </div>
                <div>
                  <strong>14 days</strong>
                  <span>How fast we can close</span>
                </div>
                <div>
                  <strong>$0</strong>
                  <span>Fees or commissions</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ——— Values ——— */}
        <section className="section section--tint">
          <div className="container">
            <Reveal className="section-head section-head--center">
              <p className="eyebrow">What makes us different</p>
              <h2>Built around people, not transactions</h2>
              <p className="lede">
                Selling a home touches everything — money, memories, timing. We
                try to make each part feel lighter than you expected.
              </p>
            </Reveal>
            <Reveal className="grid grid--2">
              {VALUES.map((value) => (
                <article className="card" key={value.title}>
                  <span className="card-icon">
                    <Icon>{value.icon}</Icon>
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.copy}</p>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ——— Story split ——— */}
        <section className="section">
          <div className="container split split--reverse">
            <Reveal className="split-media">
              <img
                src={IMG.kitchen}
                alt="Bright farmhouse kitchen with open shelves and a window over the sink"
                loading="lazy"
              />
            </Reveal>
            <Reveal className="split-copy">
              <p className="eyebrow">From our kitchen table</p>
              <h2>Houses hold stories. We honor that.</h2>
              <p>
                Behind every address is a chapter — raising kids, starting over,
                saying goodbye, starting again. We don’t treat your home like a
                line item on a spreadsheet.
              </p>
              <p>
                Our job is simple: listen carefully, offer fairly, and leave the
                house better than we found it for whoever lives there next.
              </p>
              <p className="pull">
                “Selling a home is personal. We treat it that way.”
              </p>
            </Reveal>
          </div>
        </section>

        {/* ——— Situations ——— */}
        <section className="section section--tint" id="situations">
          <div className="container">
            <Reveal className="section-head section-head--center">
              <p className="eyebrow">You’re not alone</p>
              <h2>We’re here for life’s in-between moments</h2>
              <p className="lede">
                Every home has a story. If any of these sound familiar, we’d
                love to help you take the next step gently.
              </p>
            </Reveal>
            <Reveal className="grid grid--3">
              {SITUATIONS.map((item) => (
                <article className="card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ——— Process ——— */}
        <section className="section" id="how">
          <div className="container">
            <Reveal className="section-head section-head--center">
              <p className="eyebrow">Simple & human</p>
              <h2>How we work together</h2>
              <p className="lede">
                Four clear steps. No jargon, no rush — unless you need one.
              </p>
            </Reveal>
            <Reveal className="steps">
              {STEPS.map((step, index) => (
                <article className="step" key={step.title}>
                  <span className="step-num">{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ——— Comparison ——— */}
        <section className="section section--tint" id="compare">
          <div className="container">
            <Reveal className="section-head section-head--center">
              <p className="eyebrow">A clear look</p>
              <h2>Selling to us vs. listing the traditional way</h2>
              <p className="lede">
                Both paths can be right. Here’s an honest side-by-side so you
                can decide what fits your situation.
              </p>
            </Reveal>
            <Reveal className="compare">
              <div className="compare-col compare-col--ours">
                <div className="compare-head">
                  <h3>Selling to Hooda</h3>
                  <span>Direct, as-is, on your schedule</span>
                </div>
                <ul className="compare-list">
                  {COMPARE.ours.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="compare-col">
                <div className="compare-head">
                  <h3>Listing with an agent</h3>
                  <span>Market exposure, more moving parts</span>
                </div>
                <ul className="compare-list">
                  {COMPARE.agent.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ——— Gallery ——— */}
        <section className="section">
          <div className="container">
            <Reveal className="section-head section-head--center">
              <p className="eyebrow">Homes we’ve cared for</p>
              <h2>Restored with real craftsmanship</h2>
              <p className="lede">
                We fix what we buy and keep the character that made it home in
                the first place.
              </p>
            </Reveal>
            <Reveal className="gallery">
              {GALLERY.map((item) => (
                <figure key={item.src}>
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <figcaption>{item.caption}</figcaption>
                </figure>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ——— Quote ——— */}
        <section className="section section--tint" aria-label="Homeowner voice">
          <div className="container">
            <Reveal as="blockquote" className="quote">
              <p>
                “I didn’t need a sales pitch. I needed someone who would listen,
                tell me the truth, and help me move on without the stress.
                That’s exactly what I found.”
              </p>
              <footer>— A DFW homeowner we worked with</footer>
            </Reveal>
          </div>
        </section>

        {/* ——— Promise ——— */}
        <section className="section section--dark" id="promise">
          <div className="container">
            <Reveal className="section-head">
              <p className="eyebrow">Our promise</p>
              <h2>What you can count on</h2>
              <p className="lede">
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

        {/* ——— Community ——— */}
        <section className="section">
          <div className="container split">
            <Reveal className="split-media">
              <img
                src={IMG.street}
                alt="Quiet neighborhood street of homes at golden hour"
                loading="lazy"
              />
            </Reveal>
            <Reveal className="split-copy">
              <p className="eyebrow">Rooted here</p>
              <h2>Good for you, good for the block</h2>
              <p>
                We’re not a national buyer flipping addresses on a spreadsheet.
                We live here, we shop here, and we run into our neighbors at the
                grocery store.
              </p>
              <p>
                That’s why every home we buy gets genuine repairs rather than
                cosmetic cover-ups — so the next family inherits a house that
                was cared for, not just repainted.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ——— FAQ ——— */}
        <section className="section section--tint" id="faq">
          <div className="container">
            <Reveal className="section-head section-head--center">
              <p className="eyebrow">Questions, answered</p>
              <h2>The things people ask us most</h2>
              <p className="lede">
                If something isn’t covered here, just ask. We’re happy to
                explain anything before you decide.
              </p>
            </Reveal>
            <Reveal className="faq">
              {FAQS.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ——— Offer ——— */}
        <section className="section" id="offer">
          <div className="container">
            <Reveal className="offer-panel">
              <div className="offer-intro">
                <p className="eyebrow">Let’s talk</p>
                <h2>Ready when you are</h2>
                <p>
                  Tell us a little about your property. We’ll follow up with a
                  personal touch — not a hard sell.
                </p>
                <ul className="check-list">
                  <li>Cash offer, no commissions</li>
                  <li>We cover standard closing costs</li>
                  <li>Sell as-is, on your timeline</li>
                  <li>No obligation to accept</li>
                </ul>
                <p className="offer-aside">
                  Prefer to talk first? Call{' '}
                  <a href="tel:+12145550132">(214) 555-0132</a> — a real person
                  answers.
                </p>
              </div>
              <OfferForm />
            </Reveal>
          </div>
        </section>

        {/* ——— Areas ——— */}
        <section className="section section--sand" id="areas">
          <div className="container">
            <Reveal className="section-head section-head--center">
              <p className="eyebrow">Local roots</p>
              <h2>Proudly serving DFW & beyond</h2>
              <p className="lede">
                From quiet cul-de-sacs to busy corners — if you have a home to
                sell in North Texas, we’re glad to listen.
              </p>
            </Reveal>
            <Reveal as="ul" className="areas-list">
              {AREAS.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div>
              <p className="footer-brand">Hooda Investments</p>
              <p>
                Buying houses with heart across North Texas. Fair offers, kind
                conversations, and homes restored with care.
              </p>
            </div>
            <div className="footer-col">
              <h4>Explore</h4>
              <ul>
                <li>
                  <a href="#about">About us</a>
                </li>
                <li>
                  <a href="#how">How it works</a>
                </li>
                <li>
                  <a href="#compare">Compare options</a>
                </li>
                <li>
                  <a href="#faq">Questions</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Get in touch</h4>
              <ul>
                <li>
                  <a href="tel:+12145550132">(214) 555-0132</a>
                </li>
                <li>
                  <a href="mailto:hello@hoodainvestments.com">
                    hello@hoodainvestments.com
                  </a>
                </li>
                <li>
                  <a href="#offer">Request an offer</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-legal">
            <p>© {new Date().getFullYear()} Hooda Investments.</p>
            <p>Dallas–Fort Worth, Texas</p>
          </div>
        </div>
      </footer>
    </>
  )
}
