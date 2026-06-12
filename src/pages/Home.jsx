import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ShieldCheck,
  Factory,
  ChevronRight,
  Star,
  ArrowUpRight,
  ArrowRight,
  Timer,
  CheckCircle2,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

/* ── Animated wrapper ── */
function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Data structures ── */
const mainCategories = [
  {
    name: 'Rubber-to-Metal Bonded',
    desc: 'High-durability engine mounts, suspension bushings, and torque rods built for optimal NVH isolation.',
    image: '/images/products/product1.png',
    span: 'md:col-span-2 bg-white border border-slate-100 hover:shadow-xl hover:border-amp-primary/20',
    light: false
  },
  {
    name: 'Microcellular PU (MCU)',
    desc: 'Advanced progressive-energy jounce bumpers and isolators offering up to 40% better NVH damping.',
    image: '/images/products/product3.png',
    span: 'md:col-span-2 bg-amp-dark-bg text-white hover:shadow-2xl hover:border-amp-accent-lime/20',
    light: true
  },
  {
    name: 'Sheet Metal Stampings',
    desc: 'Precision brackets, spring seats, and custom automotive assemblies.',
    image: '/images/products/product2.png',
    span: 'md:col-span-1 bg-white border border-slate-100 hover:shadow-xl hover:border-amp-primary/20',
    light: false
  },
  {
    name: 'Engineering & Custom Tooling',
    desc: 'In-house tool design and rapid prototyping using CAD modeling and automated machinery.',
    image: '/images/facility/eng.jpg',
    span: 'md:col-span-2 bg-white border border-slate-100 hover:shadow-xl hover:border-amp-primary/20',
    light: false
  }
];

const highDemandParts = [
  {
    name: 'Suspension Strut Mounts',
    category: 'Rubber-to-Metal',
    image: '/images/products/SM1.jpg',
    rating: 4.9,
    reviews: 142,
    vol: '200k+ Units/Yr',
    desc: 'OEM quality strut mounts isolating suspension noise.'
  },
  {
    name: 'Engine & Transmission Mounts',
    category: 'Rubber-to-Metal',
    image: '/images/products/EM1.jpg',
    rating: 4.8,
    reviews: 98,
    vol: '150k+ Units/Yr',
    desc: 'Heavy-duty mounts isolating powertrain vibration.'
  },
  {
    name: 'Anti-Vibration Bushings',
    category: 'Suspension',
    image: '/images/products/BS1.jpg',
    rating: 4.9,
    reviews: 215,
    vol: '500k+ Units/Yr',
    desc: 'Precision-fit suspension bushings built to last.'
  },
  {
    name: 'MCU Jounce Bumpers',
    category: 'Microcellular PU',
    image: '/images/products/JB1.jpg',
    rating: 5.0,
    reviews: 86,
    vol: '350k+ Units/Yr',
    desc: 'High-performance dampers absorbing shock energy.'
  }
];

const capabilitiesStats = [
  { label: 'Annual Component Capacity', value: '60M+', desc: 'High-capacity production across automated lines.' },
  { label: 'State-of-the-Art Plants', value: '3 Plants', desc: 'Over 32,000 sq. meters of manufacturing space.' },
  { label: 'Engineering Professionals', value: '700+', desc: 'Skilled workforce driving quality standards.' },
  { label: 'Global B2B Customers', value: '18+ OEMs', desc: 'Trusted supplier to leading vehicle platforms.' }
];

const clientLogos = Array.from({ length: 18 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  const ext = [2, 4, 12, 13, 15, 16].includes(i + 1) ? 'jpg' : 'png';
  return `/images/clients/amp-client-${num}.${ext}`;
});

const blogInsights = [
  {
    title: 'Designing MCU Isolators for Heavy Vehicles',
    desc: 'How microcellular polyurethane components isolate high-amplitude shocks in heavy truck suspension assemblies.',
    image: '/images/products/product3.png',
    date: 'June 2026',
    readTime: '5 min read'
  },
  {
    title: 'Adopting Toyota Production System (TPS) in Rubber Molding',
    desc: 'How lean manufacturing principles enabled AMP to achieve 100% on-time delivery rates and eliminate waste.',
    image: '/images/products/product1.png',
    date: 'May 2026',
    readTime: '7 min read'
  },
  {
    title: 'Quality Standards: Mastering IATF 16949:2016',
    desc: 'Deep dive into standard operating procedures and laboratory testing parameters required for Tier-1 automotive compliance.',
    image: '/images/products/product2.png',
    date: 'April 2026',
    readTime: '6 min read'
  }
];

function AnimatedCounter({ value }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Extract number and suffix (e.g. "60M+" -> number: 60, suffix: "M+")
  const match = String(value).match(/^(\d+)(.*)$/);
  const targetNumber = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    if (!inView || targetNumber === 0) return;
    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      setCount(Math.floor(easeProgress * targetNumber));

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    }
    requestAnimationFrame(updateCount);
  }, [inView, targetNumber]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Home() {
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    currentTarget.style.setProperty('--mouse-x', `${x}px`);
    currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <>
      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative pt-24 pb-16 bg-slate-50 overflow-hidden" id="hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Left Main Card (60%) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onMouseMove={handleMouseMove}
              className="lg:col-span-3 bg-mesh-dark spotlight-card text-white p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[500px] shadow-xl border border-white/5"
            >
              {/* Background visual overlay */}
              <div className="absolute right-0 bottom-0 w-full md:w-2/3 h-2/3 opacity-30 md:opacity-45 pointer-events-none z-0">
                <img
                  src="/images/facility/9hbanner_banner5.jpg"
                  alt="AMP Manufacturing Visual"
                  className="w-full h-full object-cover rounded-tl-[100px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amp-dark-bg via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-amp-dark-bg via-transparent to-transparent" />
              </div>

              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-white/10 text-amp-accent-lime text-xs font-bold uppercase tracking-widest mb-6 rounded-full border border-white/10">
                  Since 1978
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight max-w-xl">
                  Reliable B2B <span className="text-amp-accent-lime">Parts</span> For OEM Success You Can <span className="text-amp-accent-lime">Trust</span>.
                </h1>
                <p className="mt-4 text-white/70 max-w-md text-sm md:text-base leading-relaxed font-medium">
                  Premium anti-vibration rubber-to-metal bonding and MCU products engineered to meet demanding Tier-1 automotive expectations.
                </p>
                <div className="mt-6">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-amp-accent-lime hover:bg-amp-accent-lime-hover text-amp-dark font-bold rounded-full text-sm uppercase tracking-wider transition-all shadow-md shadow-lime-900/10 hover:shadow-lg"
                  >
                    Request a Quote
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* B2B Capabilities Quick Panel */}
              <div className="relative z-10 mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                <div className="flex flex-col gap-1.5">
                  <div className="w-7 h-7 rounded-full bg-amp-accent-lime/10 text-amp-accent-lime flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h4 className="text-xs font-bold text-amp-accent-lime uppercase tracking-wider">TPS Lean Molding</h4>
                  <p className="text-[11px] text-white/70 leading-relaxed font-medium">Toyota production systems securing maximum B2B efficiency and low lead times.</p>
                </div>
                <div className="flex flex-col gap-1.5 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4">
                  <div className="w-7 h-7 rounded-full bg-amp-accent-lime/10 text-amp-accent-lime flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <h4 className="text-xs font-bold text-amp-accent-lime uppercase tracking-wider">14-Day Tooling</h4>
                  <p className="text-[11px] text-white/70 leading-relaxed font-medium">Rapid 3D CAD modeling & fully automated CNC toolmaking for quick production.</p>
                </div>
                <div className="flex flex-col gap-1.5 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4">
                  <div className="w-7 h-7 rounded-full bg-amp-accent-lime/10 text-amp-accent-lime flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <h4 className="text-xs font-bold text-amp-accent-lime uppercase tracking-wider">OEM Certified</h4>
                  <p className="text-[11px] text-white/70 leading-relaxed font-medium">Strict laboratory testing procedures certified to international IATF 16949 standards.</p>
                </div>
              </div>
            </motion.div>

            {/* Right Stack (2 Cards - 40%) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Top Card - MCU Damping */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                onMouseMove={handleMouseMove}
                className="bg-mesh-dark spotlight-card text-white p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between flex-1 shadow-lg border border-white/5"
              >
                <div className="absolute right-0 top-0 w-36 h-36 opacity-30 pointer-events-none">
                  <img
                    src="/images/products/product3.png"
                    alt="MCU Jounce Bumpers"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="relative z-10">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-amp-accent-lime text-amp-dark px-2 py-0.5 rounded mb-3 animate-pulse">
                    30% Big Offer
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">Modern Auto Damping</h3>
                  <p className="text-white/70 text-xs font-medium mt-2 max-w-xs leading-relaxed">
                    Advanced Microcellular Polyurethane (MCU) isolators offering up to 40% better NVH dampening.
                  </p>
                </div>
                <div className="mt-6 relative z-10">
                  <Link
                    to="/products?category=Microcellular%20Polyurethane%20(MCU)"
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/10 text-xs font-semibold rounded-lg transition-all inline-block uppercase tracking-wider"
                  >
                    View Products
                  </Link>
                </div>
              </motion.div>

              {/* Bottom Card - Quality Standard */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white p-8 rounded-3xl flex flex-col justify-between border border-slate-100 shadow-md flex-1"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 text-amp-primary flex items-center justify-center mb-4">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-amp-dark">OEM Quality Guarantee</h3>
                  <p className="text-slate-600 text-xs font-medium leading-relaxed mt-2">
                    Every part we manufacture meets or exceeds rigorous global B2B automotive specifications. Certified to IATF 16949:2016 standards.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-amp-primary font-semibold uppercase tracking-wider">
                  <CheckCircle2 size={14} className="text-amp-accent-lime" /> Certified Supplier
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. SHOP BY CATEGORY ─── */}
      <section className="py-20 bg-white" id="categories-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Shop by Category"
            subtitle="Explore our organized product portfolios engineered for durability and precision isolation."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
            {mainCategories.map((cat, i) => (
              <FadeIn
                key={cat.name}
                delay={i * 0.1}
                className={`rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 min-h-[300px] ${cat.span}`}
              >
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest mb-3 inline-block px-2 py-0.5 rounded ${
                    cat.light ? 'bg-amp-accent-lime text-amp-dark' : 'bg-slate-100 text-slate-600'
                  }`}>
                    Portfolio
                  </span>
                  <h3 className="text-xl font-bold leading-snug mt-1">{cat.name}</h3>
                  <p className={`text-xs mt-2 leading-relaxed font-medium max-w-sm ${cat.light ? 'text-white/70' : 'text-slate-500'}`}>
                    {cat.desc}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mt-8">
                  <Link
                    to={`/products?category=${encodeURIComponent(cat.name)}`}
                    className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${
                      cat.light ? 'text-amp-accent-lime hover:text-white' : 'text-amp-primary hover:text-amp-secondary'
                    }`}
                  >
                    View Details
                    <ArrowRight size={14} />
                  </Link>
                  <div className="w-24 h-16 flex items-center justify-center opacity-85">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              </FadeIn>
            ))}

            {/* Neon Accent View All Card */}
            <FadeIn
              delay={0.4}
              className="bg-amp-accent-lime text-amp-dark rounded-3xl p-8 flex flex-col justify-between min-h-[300px] hover:bg-amp-accent-lime-hover transition-colors shadow-lg cursor-pointer"
            >
              <div onClick={() => navigate('/products')}>
                <div className="w-12 h-12 rounded-full bg-amp-dark-bg text-amp-accent-lime flex items-center justify-center mb-6 shadow">
                  <ArrowUpRight size={24} />
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight max-w-[150px] leading-tight">
                  View All Products
                </h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" onClick={() => navigate('/products')}>
                Explore Range <ArrowRight size={14} />
              </span>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── 3. HIGH-DEMAND PARTS ─── */}
      <section className="py-20 bg-slate-50" id="high-demand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <SectionHeading
              title="High-Demand Parts"
              subtitle="Frequently ordered components specified by global Tier-1 automotive buyers."
              className="!text-left !mb-0 [&>div:last-child]:!mx-0"
            />
            <div className="flex gap-2 mt-4 md:mt-0">
              <button className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors shadow-sm" aria-label="Previous">
                <ChevronRight size={18} className="rotate-180" />
              </button>
              <button className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors shadow-sm" aria-label="Next">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highDemandParts.map((part, i) => (
              <FadeIn key={part.name} delay={i * 0.1} className="h-full">
                <div className="h-full bg-white rounded-2xl border border-slate-100 p-5 flex flex-col justify-between shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div>
                    <div className="aspect-square bg-slate-50 flex items-center justify-center p-6 rounded-xl overflow-hidden mb-4 border border-slate-100">
                      <img
                        src={part.image}
                        alt={part.name}
                        className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <span className="text-[10px] font-bold text-amp-primary bg-amp-primary/10 px-2 py-0.5 rounded uppercase tracking-wider">
                      {part.category}
                    </span>
                    <h3 className="text-base font-bold text-amp-dark mt-2 leading-snug">{part.name}</h3>
                    
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-amber-500">
                      <Star size={12} fill="currentColor" />
                      <span className="font-semibold text-slate-800">{part.rating}</span>
                      <span className="text-slate-400 font-medium">({part.reviews} OEM ratings)</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Capacity</div>
                      <div className="text-xs font-bold text-amp-dark">{part.vol}</div>
                    </div>
                    <Link
                      to="/contact"
                      className="px-3.5 py-2 bg-amp-accent-lime hover:bg-amp-accent-lime-hover text-amp-dark font-bold text-xs rounded-lg transition-colors uppercase tracking-wider"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. CAPABILITIES STATS SECTION ("Deals of the Week" Style) ─── */}
      <section className="py-20 bg-white" id="capabilities-deals">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            onMouseMove={handleMouseMove}
            className="bg-mesh-dark spotlight-card text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl border border-white/5"
          >
            {/* Visual background element */}
            <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none z-0">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,var(--color-amp-accent-lime)_0,transparent_70%)]" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              {/* Left Column Info */}
              <div className="lg:col-span-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-amp-accent-lime text-amp-dark px-3 py-1 rounded-full mb-4">
                  <Timer size={14} /> Production Efficiency
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                  State-of-the-Art Operations
                </h2>
                <p className="text-white/70 text-sm leading-relaxed mt-4 font-medium max-w-sm">
                  We adopt the rigorous **Toyota Production System (TPS)** to eliminate waste and secure a 100% on-time shipping record globally.
                </p>
                
                {/* Visual indicator bullets */}
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amp-accent-lime" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                  </div>
                  <span className="text-xs text-white/50 uppercase tracking-widest font-semibold">Continuous Improvement</span>
                </div>
              </div>

              {/* Right Column Grid of Stats */}
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {capabilitiesStats.map((stat) => (
                  <div
                    key={stat.label}
                    onMouseMove={handleMouseMove}
                    className="p-6 bg-white/5 spotlight-card rounded-2xl border border-white/10 hover:border-amp-accent-lime/25 hover:bg-white/10 transition-all group"
                  >
                    <div className="text-3xl font-extrabold text-amp-accent-lime group-hover:scale-105 transition-transform inline-block">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <h4 className="text-sm font-bold mt-2 text-white">{stat.label}</h4>
                    <p className="text-white/60 text-xs mt-1 leading-relaxed font-medium">
                      {stat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. TRUSTED PARTNERS ─── */}
      <section className="py-16 bg-slate-50" id="partners">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Trusted By Industry Leaders"
            subtitle="Proud Tier-1 supplier to major global OEMs and commercial platform leaders."
          />

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-10">
            {clientLogos.map((logo, i) => (
              <FadeIn key={i} delay={i * 0.02}>
                <div className="bg-white border border-slate-100 p-4 flex items-center justify-center h-20 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-amp-primary/20 transition-all duration-300 group cursor-pointer">
                  <img
                    src={logo}
                    alt={`Client logo ${i + 1}`}
                    className="max-h-full max-w-full object-contain opacity-75 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. TOOLING EXCLUSIVE BANNER ─── */}
      <section className="py-10 bg-white" id="tooling-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            onMouseMove={handleMouseMove}
            className="bg-mesh-dark spotlight-card text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl border border-white/5"
          >
            {/* background graphics */}
            <div className="absolute inset-0 bg-[url('/images/facility/eng.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
            
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amp-accent-lime text-amp-dark flex items-center justify-center shadow shrink-0">
                <Factory size={22} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amp-accent-lime uppercase tracking-widest">Tooling Innovation</span>
                <h3 className="text-xl md:text-2xl font-extrabold mt-0.5">
                  Blueprint to Finished Mold in 14 Days
                </h3>
                <p className="text-white/70 text-xs font-medium mt-1 leading-relaxed max-w-xl">
                  Leverage our automated CNC machinery and advanced 3D tooling lab for rapid manufacturing deployment.
                </p>
              </div>
            </div>

            <div className="relative z-10 shrink-0">
              <Link
                to="/contact"
                className="px-6 py-3 bg-amp-accent-lime hover:bg-amp-accent-lime-hover text-amp-dark font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-md inline-block text-center"
              >
                Inquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. LATEST BLOG INSIGHTS ─── */}
      <section className="py-20 bg-slate-50" id="insights">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Left Column Title */}
            <div className="lg:col-span-2">
              <span className="inline-block px-3 py-1 bg-amp-primary/10 text-amp-primary text-xs font-semibold uppercase tracking-widest mb-4">
                Latest Insights
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-amp-dark leading-tight">
                Engineering & R&D Blog Insights
              </h2>
              <p className="text-slate-600 text-sm font-medium leading-relaxed mt-4">
                Explore technical articles, manufacturing updates, and case studies detailing our continuous vibration-damping innovations.
              </p>
              <div className="mt-8">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amp-primary hover:text-amp-secondary group"
                >
                  Learn More About Our Team 
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column List */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              {blogInsights.map((blog, i) => (
                <FadeIn key={blog.title} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-5 group cursor-pointer">
                    <div className="w-20 h-20 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center shrink-0 border border-slate-100 p-2">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                      </div>
                      <h4 className="text-base font-bold text-amp-dark mt-1 leading-snug group-hover:text-amp-primary transition-colors">
                        {blog.title}
                      </h4>
                      <p className="text-slate-500 text-xs font-medium leading-relaxed mt-1 line-clamp-2">
                        {blog.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
