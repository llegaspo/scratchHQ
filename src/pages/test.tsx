import React, { useState, useRef, useEffect } from "react";
import {
  Phone,
  Star,
  CheckCircle,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  PaintBucket,
  Wrench,
  ShieldCheck,
  MapPin,
  Award,
  ThumbsUp,
  Clock,
} from "lucide-react";

// --- COMPONENT: Before & After Slider ---
const BeforeAfterSlider = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (event) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in event ? event.touches[0].clientX : event.clientX;
    const position = ((x - rect.left) / rect.width) * 100;

    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl border-4 border-white"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* Background (After Image) */}
      <img
        src={afterImage}
        alt="After repair"
        className="absolute inset-0 w-full h-full object-cover"
        draggable="false"
      />

      {/* Foreground (Before Image) - Clipped */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before repair"
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          // max-w-none ensures the image doesn't squash, it just gets revealed
          style={{ width: containerRef.current?.offsetWidth || "100%" }}
          draggable="false"
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-3 bg-slate-400"></div>
            <div className="w-0.5 h-3 bg-slate-400"></div>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider backdrop-blur-sm z-10">
        Before
      </div>
      <div className="absolute bottom-4 right-4 bg-blue-600/80 text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider backdrop-blur-sm z-10">
        After
      </div>
    </div>
  );
};

const ScratchHQ = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const specialisations = [
    {
      id: "01",
      title: "PPG Paint System",
      desc: "We use the highest quality professional paint systems for factory-grade durability.",
      icon: <PaintBucket className="w-8 h-8 text-blue-600" />,
    },
    {
      id: "02",
      title: "Colour Matching",
      desc: "Investment in advanced spectrophotometer technology ensures a perfect blend, every time.",
      icon: <Wrench className="w-8 h-8 text-blue-600" />,
    },
    {
      id: "03",
      title: "Licensed Painters",
      desc: "Real qualified spray painters, not just technicians. We know the chemistry of your car's coat.",
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
    },
  ];

  const services = [
    {
      title: "Bumper Bar & Trim",
      desc: "Scrapes, cracks, and dents on your bumper fixed quickly without replacing parts.",
      image:
        "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Scratch Removal",
      desc: "From deep key scratches to surface marks, we restore your clear coat to showroom shine.",
      image:
        "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Alloy Rim Restoration",
      desc: "Curb rash repair for your rims. We fix gouges and repaint them to look brand new.",
      image:
        "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const partners = [
    { name: "3M", logo: "3M" },
    { name: "PPG", logo: "PPG" },
    { name: "Anest Iwata", logo: "ANEST IWATA" },
    { name: "Sia Abrasives", logo: "sia" },
    { name: "ProXL", logo: "proXL" },
  ];

  const serviceAreas = [
    "Parramatta & Western Suburbs",
    "The Hills District",
    "North Shore & Ryde",
    "Inner West",
    "Blacktown & Penrith",
    "Liverpool & South West",
  ];

  return (
    <div className="font-sans text-slate-800 bg-white antialiased selection:bg-blue-100">
      {/* --- NAVIGATION --- */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10 text-white transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-3">
              {/* Logo Placeholder - You can replace with your IMG tag */}
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
                <PaintBucket className="w-6 h-6 text-white" />
              </div>
              <div className="font-extrabold text-2xl tracking-tighter uppercase leading-none">
                Scratch<span className="text-blue-500">HQ</span>
                <span className="block text-[10px] text-slate-400 font-normal tracking-wide">
                  Mobile Paint Specialist
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#about"
                className="hover:text-blue-400 transition-colors text-sm font-medium"
              >
                About
              </a>
              <a
                href="#work"
                className="hover:text-blue-400 transition-colors text-sm font-medium"
              >
                Our Work
              </a>
              <a
                href="#services"
                className="hover:text-blue-400 transition-colors text-sm font-medium"
              >
                Services
              </a>
              <a
                href="#reviews"
                className="hover:text-blue-400 transition-colors text-sm font-medium"
              >
                Reviews
              </a>
              <a
                href="tel:0461461461"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-900/50"
              >
                <Phone className="w-4 h-4" /> 0461 461 461
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-blue-400 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="w-8 h-8" />
                ) : (
                  <Menu className="w-8 h-8" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-t border-zinc-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#about"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-zinc-800 hover:text-blue-400"
              >
                About
              </a>
              <a
                href="#work"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-zinc-800 hover:text-blue-400"
              >
                Our Work
              </a>
              <a
                href="#services"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-zinc-800 hover:text-blue-400"
              >
                Services
              </a>
              <a
                href="tel:0461461461"
                className="block px-3 py-2 mt-4 text-center rounded-md font-bold bg-blue-600 text-white"
              >
                Call Now
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Car Detail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center pt-20">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              We Come To You
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Mobile Car <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                Paint Specialist
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-lg font-light leading-relaxed">
              Professional bumper, scratch, and dent repairs at your home or
              workplace.
              <span className="block mt-2 text-white font-medium">
                Licensed. Insured. Guaranteed.
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg shadow-blue-600/30 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                Get a Free Quote <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Hero Floating Card / Form Preview */}
          <div className="hidden md:block bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl">
            <div className="grid grid-cols-2 gap-4 text-white">
              <div className="text-center p-4 rounded-2xl bg-black/40 border border-white/10">
                <Clock className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <div className="font-bold">Same Day</div>
                <div className="text-xs text-slate-400">Turnaround</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-black/40 border border-white/10">
                <ShieldCheck className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <div className="font-bold">Lifetime</div>
                <div className="text-xs text-slate-400">Guarantee</div>
              </div>
              <div className="col-span-2 text-center p-4 rounded-2xl bg-blue-600/80 border border-blue-400/30">
                <div className="font-bold text-2xl">100%</div>
                <div className="text-sm">Colour Match Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- TRUST BADGES (MODERN) --- */}
      <section className="bg-white border-b border-slate-100 relative z-20 -mt-8 mx-4 md:mx-auto max-w-5xl rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center gap-4 p-2">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h4 className="font-black text-lg text-slate-900">
              Fully Licensed
            </h4>
            <p className="text-sm text-slate-500">Lic No. MVTC189156</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-2 border-t md:border-t-0 md:border-l border-slate-100">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Award className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h4 className="font-black text-lg text-slate-900">Fully Insured</h4>
            <p className="text-sm text-slate-500">Comprehensive Coverage</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-2 border-t md:border-t-0 md:border-l border-slate-100">
          <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
            <ThumbsUp className="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <h4 className="font-black text-lg text-slate-900">Pro Quality</h4>
            <p className="text-sm text-slate-500">100% Satisfaction</p>
          </div>
        </div>
      </section>

      {/* --- BEFORE & AFTER SECTION --- */}
      <section id="work" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
              See The Difference
            </h2>
            <p className="text-lg text-slate-600">
              Drag the slider to see how we restore cars to showroom condition.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Comparison 1 */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold text-xl">Bumper Scuff Repair</h3>
                <div className="flex text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
              <BeforeAfterSlider
                // Placeholder images - Replace these with your actual Before/After photos
                beforeImage="https://images.unsplash.com/photo-1632823471565-1ec2a1ad4015?auto=format&fit=crop&w=800&q=80"
                afterImage="https://images.unsplash.com/photo-1635783856364-7740cb1f7d43?auto=format&fit=crop&w=800&q=80"
              />
            </div>

            {/* Comparison 2 */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold text-xl">Deep Scratch Restoration</h3>
                <div className="flex text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1575033116832-680c611440d0?auto=format&fit=crop&w=800&q=80"
                afterImage="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- PARTNERS & BRANDS --- */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 font-semibold uppercase tracking-widest text-sm mb-8">
            We use only professional grade products
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Replace these text spans with actual <img> tags of the logos if you have them */}
            {partners.map((partner) => (
              <span
                key={partner.name}
                className="text-2xl md:text-3xl font-black text-slate-800 font-serif"
              >
                {partner.logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6">
                Our Services
              </h2>
              <p className="text-lg text-slate-600">
                Premium repairs without the premium price tag. Using{" "}
                <span className="font-bold text-blue-600">
                  PPG Paint Systems
                </span>{" "}
                for factory matching.
              </p>
            </div>
            <button className="hidden md:flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors">
              View All Services <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10"></div>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-6 line-clamp-2">
                    {service.desc}
                  </p>
                  <span className="inline-flex items-center font-bold text-sm text-slate-900 border-b-2 border-blue-600 pb-0.5">
                    Read More
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SPECIALISATION (PROCESS) --- */}
      <section className="py-24 bg-zinc-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-8">
                Our Specialisation
              </h2>
              <div className="space-y-8">
                {specialisations.map((item) => (
                  <div key={item.id} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-xl">
                      {item.id}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=800&q=80"
                className="rounded-2xl shadow-2xl border border-white/10"
                alt="Specialist working"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-6 rounded-xl shadow-xl max-w-xs hidden md:block">
                <p className="font-serif italic text-lg">
                  "Ahmed was very professional and did an amazing job, he uses
                  the best of the best tools."
                </p>
                <div className="mt-4 font-bold text-sm">— Jonathan Lai</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICE AREAS --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-blue-50 rounded-3xl p-8 md:p-16 text-center">
            <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8">
              Service Areas
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-10">
              We are fully mobile and come to you. We service a wide range of
              areas across Sydney including:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="px-6 py-3 bg-white rounded-full font-bold text-slate-700 shadow-sm border border-slate-100 hover:border-blue-400 hover:text-blue-600 transition-colors cursor-default"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black text-slate-400 py-16 border-t border-slate-900 mb-20 md:mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-extrabold text-white uppercase tracking-tighter mb-6">
              Scratch<span className="text-blue-600">HQ</span>
            </div>
            <p className="max-w-sm mb-6">
              Professional mobile car scratch & dent repairs across Sydney. We
              bring the workshop to your driveway.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600" /> 0461 461 461
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-600 font-bold">@</span>{" "}
                ahmedhadid1990@hotmail.com
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Hours</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Mon - Sat:</span>{" "}
                <span className="text-white">7 AM - 8 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>{" "}
                <span className="text-red-500">Closed</span>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* --- MOBILE STICKY CALL BUTTON --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-lg border-t border-slate-200 z-50">
        <a
          href="tel:0461461461"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
        >
          <Phone className="w-5 h-5 fill-current" /> Call for Instant Quote
        </a>
      </div>
    </div>
  );
};

export default ScratchHQ;
