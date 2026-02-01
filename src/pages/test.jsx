import { useMemo, useState } from "react";
import {
  Phone,
  Mail,
  Menu,
  X,
  MapPin,
  Star,
  CheckCircle2,
  BadgeCheck,
  ShieldCheck,
  Timer,
  Palette,
  Wrench,
  DollarSign,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/**
 * ScratchHQ-inspired homepage
 * - Tailwind required
 * - Swap the placeholder images in `ASSETS`
 */

const ASSETS = {
  logo: "https://via.placeholder.com/140x90?text=LOGO",
  heroBg: "https://images.unsplash.com/photo-1519642918688-7e43b19245d8?auto=format&fit=crop&w=2000&q=70",
  aboutBefore: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=70",
  aboutAfter: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=70",
  quoteBg: "https://images.unsplash.com/photo-1503377988726-2a2b2b02b5c7?auto=format&fit=crop&w=2000&q=70",
  specPhoto: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1400&q=70",
  service1: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=70",
  service2: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=70",
  service3: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=70",
  beforeAfterA1: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=70",
  beforeAfterA2: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=70",
  beforeAfterB1: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1200&q=70",
  beforeAfterB2: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=70",
};

const NAV = ["Home", "Our Services", "How It Works", "Areas We Service", "FAQs"];

const PARTNERS = [
  { name: "KTC", src: "https://via.placeholder.com/240x90?text=KTC" },
  { name: "Sundstrom", src: "https://via.placeholder.com/240x90?text=Sundstrom" },
  { name: "DeVilbiss", src: "https://via.placeholder.com/240x90?text=DeVilbiss" },
  { name: "LumaTT", src: "https://via.placeholder.com/240x90?text=LumaTT" },
  { name: "U-Pol", src: "https://via.placeholder.com/240x90?text=U-POL" },
];

const CAR_BRANDS = [
  "Toyota",
  "Hyundai",
  "Mazda",
  "Kia",
  "Ford",
  "Holden",
  "BMW",
  "Mercedes",
  "Audi",
  "Lexus",
  "Subaru",
];

const REVIEWS = [
  {
    name: "Gregory D.",
    when: "1 week ago",
    text: "Great to deal with, perfect paint match and seamless finish.",
    rating: 5,
  },
  {
    name: "Chris M.",
    when: "1 month ago",
    text: "Took off a nasty dent and scrape—came up like new.",
    rating: 5,
  },
  {
    name: "Care Support Service",
    when: "2 months ago",
    text: "Fit us in last minute and explained the whole process clearly.",
    rating: 5,
  },
  {
    name: "Jarrod",
    when: "2 months ago",
    text: "Outstanding job. Perfect paint repair and great value.",
    rating: 5,
  },
];

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function Container({ children, className }) {
  return (
    <div className={classNames("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

function PillButton({ icon: Icon, children, variant = "primary", ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-lime-300 text-slate-900 hover:bg-lime-200 focus:ring-lime-300"
      : "bg-slate-900/80 text-white hover:bg-slate-900 focus:ring-slate-400";
  return (
    <button className={classNames(base, styles)} {...props}>
      {Icon ? <Icon size={18} /> : null}
      {children}
    </button>
  );
}

function Badge({ icon: Icon, text }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
      <Icon size={16} />
      {text}
    </div>
  );
}

function SectionTitle({ kicker, title, align = "center" }) {
  return (
    <div className={classNames("mb-8", align === "center" ? "text-center" : "text-left")}>
      {kicker ? (
        <div className="mb-2 text-sm font-semibold tracking-widest text-lime-400">{kicker}</div>
      ) : null}
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-b from-slate-900 to-slate-900/90 text-white backdrop-blur">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src={ASSETS.logo} alt="Scratch HQ" className="h-12 w-auto rounded-md" />
            <div className="hidden sm:block">
              <div className="text-sm font-extrabold leading-4">SCRATCH HQ</div>
              <div className="text-xs text-white/70">Mobile Paint Specialist</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
            {NAV.map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/85 hover:text-white transition"
              >
                {item.toUpperCase()}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <PillButton icon={Phone} variant="primary" onClick={() => alert("Hook to call action")}>
              CALL US
            </PillButton>
            <PillButton icon={Mail} variant="primary" onClick={() => document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" })}>
              GET A QUOTE
            </PillButton>
          </div>

          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/15"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile nav (keeps placement, just collapses nicely) */}
        {open ? (
          <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3 lg:hidden">
            <div className="flex flex-col gap-2">
              {NAV.map((item) => (
                <a key={item} href="#" className="rounded-xl px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10">
                  {item}
                </a>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <PillButton icon={Phone} variant="primary" className="flex-1">
                Call
              </PillButton>
              <PillButton
                icon={Mail}
                variant="primary"
                className="flex-1"
                onClick={() => {
                  setOpen(false);
                  document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Quote
              </PillButton>
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.heroBg})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-slate-950/10" aria-hidden />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5" aria-hidden />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <Badge icon={BadgeCheck} text="Fully Licensed" />
            <Badge icon={ShieldCheck} text="Fully Insured" />
            <Badge icon={Star} text="5-Star Rated" />
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Mobile Car Scratch &amp; Dent Repairs Across Sydney{" "}
            <span className="text-lime-300">— We Come to You</span>
          </h1>

          <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
            Fast, affordable mobile repairs—handled by licensed qualified spray painters. We come
            to your home or workplace and get it done properly.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <PillButton
              variant="primary"
              onClick={() => document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" })}
            >
              GET A FREE QUOTE
              <ArrowRight size={18} />
            </PillButton>

            <PillButton variant="secondary" icon={Phone}>
              04 1234 5678
            </PillButton>
          </div>

          {/* small improvement: quick trust bullets under CTA, still same hero vibe */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: Timer, label: "Same Day Turnaround" },
              { icon: Palette, label: "100% Colour Match" },
              { icon: CheckCircle2, label: "Lifetime Repair Guarantee" },
            ].map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-white backdrop-blur ring-1 ring-white/10"
              >
                <b.icon />
                <div className="text-sm font-semibold">{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function About() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left: keeps “Before/After visual” placement */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-sm">
              <div className="grid grid-cols-2">
                <div className="relative">
                  <img src={ASSETS.aboutBefore} alt="Before" className="h-72 w-full object-cover sm:h-96" />
                  <div className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-extrabold text-white">
                    BEFORE
                  </div>
                </div>
                <div className="relative">
                  <img src={ASSETS.aboutAfter} alt="After" className="h-72 w-full object-cover sm:h-96" />
                  <div className="absolute bottom-3 left-3 rounded-full bg-lime-300 px-3 py-1 text-xs font-extrabold text-slate-900">
                    AFTER
                  </div>
                </div>
              </div>
            </div>

            {/* small improvement: floating rating badge like your screenshot */}
            <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-2xl bg-slate-900 px-4 py-2 text-white shadow-lg ring-1 ring-white/10">
              <div className="flex items-center gap-2 text-sm font-extrabold">
                <Star className="text-lime-300" size={18} />
                5 Star Rating
              </div>
            </div>
          </div>

          {/* Right: text block stays right */}
          <div>
            <div className="text-sm font-semibold tracking-widest text-slate-500">ABOUT US</div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Bringing professional car care right to your door
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              We believe looking after your car shouldn’t be a hassle. That’s why we come to you
              — wherever you are — to take care of scratches, dents, scuffs, and minor paint damage
              on the spot.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              We’re a small team of licensed qualified spray painters who take pride in doing the
              job properly, using quality materials and professional colour-matching.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { icon: BadgeCheck, title: "Licensed & Qualified" },
                { icon: ShieldCheck, title: "Fully Insured" },
                { icon: Timer, title: "Fast Turnaround" },
                { icon: Palette, title: "Colour Match Tech" },
              ].map((x) => (
                <div key={x.title} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <x.icon className="text-slate-900" />
                  <div className="text-sm font-semibold text-slate-900">{x.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function QuoteSection() {
  return (
    <section id="quote" className="relative overflow-hidden py-14 sm:py-16">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.quoteBg})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-slate-950/70" aria-hidden />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
          {/* Left: benefits icons (same placement as screenshot) */}
          <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
            <div className="grid grid-cols-2 gap-4">
              <Benefit icon={Timer} title="Same Day Turnaround" />
              <Benefit icon={Palette} title="100% Colour Match" />
              <Benefit icon={DollarSign} title="Fast & Affordable" />
              <Benefit icon={CheckCircle2} title="Lifetime Guarantee" />
            </div>

            <div className="mt-6 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
              <div className="text-white/90 text-sm font-semibold">What to expect</div>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li className="flex gap-2"><CheckCircle2 size={18} className="text-lime-300 mt-0.5" /> Send photos + location</li>
                <li className="flex gap-2"><CheckCircle2 size={18} className="text-lime-300 mt-0.5" /> We confirm price & timing</li>
                <li className="flex gap-2"><CheckCircle2 size={18} className="text-lime-300 mt-0.5" /> We come to you and repair</li>
              </ul>
            </div>
          </div>

          {/* Right: form card (same placement as screenshot) */}
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
            <div className="text-center">
              <div className="text-3xl font-extrabold tracking-tight text-slate-900">
                REQUEST A FREE QUOTE
              </div>
              <div className="mt-2 text-sm text-slate-600">
                Quick response — tell us what happened and where you are.
              </div>
            </div>

            <form className="mt-6 space-y-4">
              <Field label="Name" placeholder="Your name" />
              <Field label="Email" placeholder="you@example.com" type="email" />
              <Field label="Phone Number" placeholder="e.g. 04 1234 5678" />
              <Field label="Address/Suburb" placeholder="e.g. Parramatta" />
              <TextArea label="Tell us a little more about the work." placeholder="Where is the damage? Any photos? Preferred date/time?" />

              <button
                type="button"
                className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                SEND REQUEST
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <MapPin size={14} />
                Serving Sydney & nearby suburbs
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Benefit({ icon: Icon, title }) {
  return (
    <div className="rounded-3xl bg-white/5 p-5 text-center text-white ring-1 ring-white/10">
      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
        <Icon className="text-lime-300" />
      </div>
      <div className="text-sm font-extrabold">{title}</div>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-semibold text-slate-700">{label}</div>
      <input
        {...props}
        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
      />
    </label>
  );
}

function TextArea({ label, ...props }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-semibold text-slate-700">{label}</div>
      <textarea
        {...props}
        rows={6}
        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
      />
    </label>
  );
}

function Specialisation() {
  const items = [
    { n: "01", title: "Use of PPG professional paint system.", icon: Palette },
    { n: "02", title: "Investment in colour-matching technology.", icon: Wrench },
    { n: "03", title: "Licensed spray painters, not technicians.", icon: BadgeCheck },
  ];

  return (
    <section className="bg-white py-14 sm:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-sm">
            <img src={ASSETS.specPhoto} alt="Specialisation" className="h-80 w-full object-cover sm:h-[460px]" />
          </div>

          <div>
            <SectionTitle align="left" kicker="OUR SPECIALISATION" title="Done right, with the proper tools" />
            <div className="space-y-4">
              {items.map((x) => (
                <div key={x.n} className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <x.icon size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-extrabold text-lime-600">{x.n}</div>
                    <div className="text-sm font-semibold text-slate-900">{x.title}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <PillButton variant="primary" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
                VIEW SERVICES <ArrowRight size={18} />
              </PillButton>
              <PillButton variant="secondary" icon={Phone}>
                Quick Call
              </PillButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Services() {
  const cards = [
    { title: "Bumper Bar & Trim Repairs", img: ASSETS.service1 },
    { title: "Scratch & Paint Scuff Removal", img: ASSETS.service2 },
    { title: "Mag & Alloy Rim Restoration", img: ASSETS.service3 },
    { title: "Panel Touch-Ups & Blending", img: ASSETS.aboutAfter },
    { title: "Headlight Restoration", img: ASSETS.specPhoto },
  ];

  return (
    <section id="services" className="bg-gradient-to-b from-slate-900 to-slate-950 py-14 sm:py-16">
      <Container>
        <div className="text-center">
          <div className="text-sm font-semibold tracking-widest text-lime-300">OUR SERVICES</div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Repairs we do every day</h2>
          <p className="mt-3 text-white/75">Small improvements, pro finish—without the workshop hassle.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10">
              <img src={c.img} alt={c.title} className="h-44 w-full object-cover" />
              <div className="p-5">
                <div className="text-base font-extrabold text-white">{c.title}</div>
                <button className="mt-4 inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15">
                  Read More <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function BeforeAfter() {
  const sets = useMemo(
    () => [
      {
        leftLabel: "BEFORE",
        rightLabel: "AFTER",
        before: ASSETS.beforeAfterA1,
        after: ASSETS.beforeAfterA2,
      },
      {
        leftLabel: "BEFORE",
        rightLabel: "AFTER",
        before: ASSETS.beforeAfterB1,
        after: ASSETS.beforeAfterB2,
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const current = sets[index];

  return (
    <section className="bg-slate-50 py-14 sm:py-16">
      <Container>
        <SectionTitle title="Before / After" kicker="RESULTS" />

        <div className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm">
          <div className="grid gap-0 md:grid-cols-2">
            <Polaroid src={current.before} label={current.leftLabel} />
            <Polaroid src={current.after} label={current.rightLabel} />
          </div>

          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 ring-1 ring-slate-200 hover:bg-white"
            onClick={() => setIndex((i) => (i - 1 + sets.length) % sets.length)}
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 ring-1 ring-slate-200 hover:bg-white"
            onClick={() => setIndex((i) => (i + 1) % sets.length)}
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        </div>
      </Container>
    </section>
  );
}

function Polaroid({ src, label }) {
  return (
    <div className="relative p-6 sm:p-10">
      <div className="relative mx-auto w-full max-w-md rotate-[-2deg] rounded-2xl bg-white p-4 shadow-lg ring-1 ring-slate-200">
        <img src={src} alt={label} className="h-64 w-full rounded-xl object-cover sm:h-80" />
        <div className="mt-3 text-center text-sm font-extrabold text-slate-900">{label}</div>
      </div>
    </div>
  );
}

function PartnersAndBrands() {
  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-14 sm:py-16">
      <Container>
        <div className="text-center">
          <div className="text-sm font-semibold tracking-widest text-lime-300">OUR PARTNERS</div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Trusted products & brands</h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PARTNERS.map((p) => (
            <div key={p.name} className="flex items-center justify-center rounded-2xl bg-white p-3">
              <img src={p.src} alt={p.name} className="h-12 w-auto object-contain" />
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
          <div className="text-center text-3xl font-extrabold text-white">CAR BRANDS</div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {CAR_BRANDS.map((b) => (
              <span
                key={b}
                className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Reviews() {
  return (
    <section className="bg-slate-50 py-14 sm:py-16">
      <Container>
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-3 py-1.5 text-xs font-extrabold text-white">
            Get $50 off
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Our client reviews</h2>
          <p className="text-slate-600">
            Leave a Google review and follow us on Facebook or Instagram.
          </p>
        </div>

        <div className="mt-10 rounded-3xl bg-white p-8 ring-1 ring-slate-200">
          <div className="text-center">
            <div className="text-lg font-extrabold text-slate-900">EXCELLENT</div>
            <div className="mt-2 flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="text-yellow-500" size={18} />
              ))}
            </div>
            <div className="mt-2 text-sm text-slate-600">Based on 26 reviews</div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((r) => (
              <div key={r.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-extrabold text-slate-900">{r.name}</div>
                  <div className="text-xs text-slate-500">{r.when}</div>
                </div>
                <div className="mt-2 flex gap-1">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="text-yellow-500" size={14} />
                  ))}
                </div>
                <p className="mt-3 text-sm text-slate-700">{r.text}</p>
                <button className="mt-3 text-xs font-semibold text-slate-600 hover:text-slate-900">
                  Read more
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <span className="rounded-lg bg-green-700 px-3 py-2 text-xs font-semibold text-white">
              Verified by Trustindex
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

function AreasWeServe() {
  const groups = [
    {
      title: "Eastern Suburbs",
      items: ["Bondi", "Maroubra", "Vaucluse", "Coogee", "Randwick", "Double Bay"],
    },
    {
      title: "Inner West",
      items: ["Leichhardt", "Marrickville", "Ashfield", "Strathfield", "Newtown", "Burwood"],
    },
    {
      title: "Northern Suburbs",
      items: ["Ryde", "Gladesville", "Macquarie Park", "Epping", "Eastwood"],
    },
    {
      title: "Northern Beaches",
      items: ["Manly", "Brookvale", "Narrabeen", "Dee Why", "Mona Vale", "Avalon"],
    },
  ];

  return (
    <section className="bg-white py-14 sm:py-16">
      <Container>
        <SectionTitle title="Areas we serve" kicker="SERVICE MAP" />
        <p className="mx-auto max-w-3xl text-center text-slate-600">
          If your suburb isn’t listed, no worries — we likely service it too. Send your location and we’ll confirm availability right away.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {groups.map((g) => (
            <div key={g.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="rounded-xl bg-blue-800 px-4 py-2 text-center text-sm font-extrabold text-white">
                {g.title}
              </div>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-slate-800 sm:grid-cols-3">
                {g.items.map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <MapPin size={16} className="text-blue-800" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <PillButton variant="primary" onClick={() => document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" })}>
            CHECK MY SUBURB / GET QUOTE <ArrowRight size={18} />
          </PillButton>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 py-10 text-white">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src={ASSETS.logo} alt="Scratch HQ" className="h-12 w-auto rounded-md" />
            <div>
              <div className="text-sm font-extrabold">SCRATCH HQ</div>
              <div className="text-xs text-white/70">Mobile Paint Specialist</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <PillButton variant="primary" icon={Phone}>
              CALL US
            </PillButton>
            <PillButton variant="primary" icon={Mail} onClick={() => document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" })}>
              GET A QUOTE
            </PillButton>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-white/60">
          © {new Date().getFullYear()} Scratch HQ. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

export default function ScratchHQEnhanced() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <QuoteSection />
        <Specialisation />
        <Services />
        <BeforeAfter />
        <PartnersAndBrands />
        <Reviews />
        <AreasWeServe />
      </main>
      <Footer />

      {/* small improvement: floating “Contact us” button like screenshot */}
      <button
        className="fixed bottom-5 right-5 rounded-full bg-blue-700 px-4 py-3 text-sm font-extrabold text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={() => document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" })}
      >
        Contact us
      </button>
    </div>
  );
}

