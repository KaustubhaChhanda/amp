import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ShieldCheck,
  Factory,
  Star,
  ArrowUpRight,
  ArrowRight,
  Timer,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

/* ── Animated wrapper ── */
function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Data structures ── */
const mainCategories = [
  {
    label: 'Portfolio Series 01',
    name: 'Rubber & Rubber-to-Metal',
    desc: 'High-durability engine mounts, suspension bushings, and torque rods built for optimal NVH isolation.',
    image: '/images/products/product1.png',
    span: 'md:col-span-2 satin-card text-slate-800',
    light: false
  },
  {
    label: 'Portfolio Series 02',
    name: 'Microcellular Polyurethane (MCU)',
    desc: 'Advanced progressive-energy jounce bumpers and isolators offering up to 40% better NVH damping.',
    image: '/images/products/product3.png',
    span: 'md:col-span-2 satin-card-dark text-white',
    light: true
  },
  {
    label: 'Portfolio Series 03',
    name: 'Sheet Metal Stampings & Assemblies',
    desc: 'Precision brackets, spring seats, and custom automotive assemblies.',
    image: '/images/products/product2.png',
    span: 'md:col-span-1 satin-card text-slate-800',
    light: false
  },
  {
    label: 'Portfolio Series 04',
    name: 'Engineering & Custom Tooling',
    desc: 'In-house tool design and rapid prototyping using CAD modeling and automated machinery.',
    image: '/images/facility/eng.jpg',
    span: 'md:col-span-2 satin-card text-slate-800',
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
    spec: 'Hardness: 60±5 Shore A'
  },
  {
    name: 'Engine & Transmission Mounts',
    category: 'Rubber-to-Metal',
    image: '/images/products/EM1.jpg',
    rating: 4.8,
    reviews: 98,
    vol: '150k+ Units/Yr',
    spec: 'Dynamic Stiffness: Custom'
  },
  {
    name: 'Anti-Vibration Bushings',
    category: 'Suspension Parts',
    image: '/images/products/BS1.jpg',
    rating: 4.9,
    reviews: 215,
    vol: '500k+ Units/Yr',
    spec: 'Compliance: High Fatigue Life'
  },
  {
    name: 'MCU Jounce Bumpers',
    category: 'Microcellular PU',
    image: '/images/products/JB1.jpg',
    rating: 5.0,
    reviews: 86,
    vol: '350k+ Units/Yr',
    spec: 'Elastomer Density: High'
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

  const match = String(value).match(/^(\d+)(.*)$/);
  const targetNumber = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    if (!inView || targetNumber === 0) return;
    const duration = 1200;
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
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

  return (
    <div className="bg-white text-slate-800">
      
      {/* ─── 1. HERO BENTO GRID SECTION (80% Light Base) ─── */}
      <section className="relative pt-28 pb-16 bg-white bg-grid-minimal overflow-hidden" id="hero">
        
        {/* Soft, Fluid Studio Ambient Lighting (Subtle) */}
        <div className="absolute top-[-10%] right-[-5%] w-[450px] h-[450px] glow-indigo rounded-full blur-[100px] pointer-events-none animate-ambient-glow" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] glow-amber rounded-full blur-[90px] pointer-events-none animate-ambient-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Left Large Bento Card: 20% Dark Structural Accent */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3 satin-card-dark text-white p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[500px] shadow-lg border border-white/5"
            >
              {/* CAD Blueprint Vector Schematic Overlay */}
              <div className="absolute right-6 bottom-6 w-52 h-52 opacity-15 pointer-events-none z-0 hidden md:block text-slate-400">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="1" />
                  <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
                  <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
                  <path d="M40 40 L60 40 L60 60" stroke="currentColor" strokeWidth="1" />
                  <path d="M160 160 L140 160 L140 140" stroke="currentColor" strokeWidth="1" />
                  <text x="110" y="35" fill="currentColor" className="text-[7.5px] font-mono tracking-wider">ALIGN_A: 90.0°</text>
                  <text x="110" y="175" fill="currentColor" className="text-[7.5px] font-mono tracking-wider">REF_VAL: ELASTOMER</text>
                </svg>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-5">
                  <span className="px-3 py-1 bg-white/5 text-slate-350 text-xs font-bold tracking-widest uppercase rounded border border-white/5">
                    Established 1949 — Tier-1 Certified
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight max-w-xl tracking-tight text-white font-sans">
                  Industrial Precision for Automotive OEMs.
                </h1>
                <p className="mt-4 text-slate-300 max-w-md text-xs md:text-sm leading-relaxed font-semibold">
                  High-durability engine mounts, suspension bushings, and custom MCU assemblies engineered to isolate powertrain vibration.
                </p>
                
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-white text-slate-900 font-extrabold rounded-lg text-xs uppercase tracking-wider shadow-md cursor-pointer btn-hover"
                  >
                    Request Quote
                    <ArrowRight size={13} className="text-slate-900" />
                  </Link>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white/10 text-white font-extrabold rounded-lg text-xs uppercase tracking-wider cursor-pointer border border-white/10 btn-hover"
                  >
                    View Catalog
                  </Link>
                </div>
              </div>

              {/* B2B Capabilities Minimal Row */}
              <div className="relative z-10 mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/40 p-4 rounded-xl border border-white/5">
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">TPS Lean Molding</h4>
                  <p className="text-xs text-slate-400 leading-normal mt-0.5 font-semibold">Toyota production workflows securing low waste and rapid delivery.</p>
                </div>
                <div className="border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">14-Day Tooling</h4>
                  <p className="text-xs text-slate-400 leading-normal mt-0.5 font-semibold">Rapid CAD modeling & CNC toolmaking for tooling speed.</p>
                </div>
                <div className="border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">IATF Compliance</h4>
                  <p className="text-xs text-slate-400 leading-normal mt-0.5 font-semibold">Rigorous elastomer testing matching international standards.</p>
                </div>
              </div>
            </motion.div>

            {/* Right Stack: White/Light cards for contrast */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Top Card: Premium Light MCU Bento */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="satin-card p-7 rounded-3xl relative overflow-hidden flex flex-col justify-between flex-1 border border-slate-200/80 shadow-md bg-white"
              >
                {/* Strain Curve Overlay Vector Graphic */}
                <div className="absolute right-4 bottom-4 w-28 h-28 opacity-15 pointer-events-none z-0 text-slate-800">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M10 90 L20 88 C 45 85, 60 70, 75 40 T 90 10" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="10" y1="10" x2="10" y2="90" stroke="currentColor" strokeWidth="0.75" />
                    <line x1="10" y1="90" x2="90" y2="90" stroke="currentColor" strokeWidth="0.75" />
                    <circle cx="75" cy="40" r="3" fill="currentColor" />
                    <text x="35" y="80" fill="currentColor" className="text-[5.5px] font-mono font-bold">STRESS / STRAIN</text>
                  </svg>
                </div>
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-slate-800 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full mb-3">
                    MCU Components
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 font-sans">Microcellular Polyurethane</h3>
                  <p className="text-slate-600 text-xs font-semibold mt-1 max-w-xs leading-relaxed">
                    Advanced MCU shock bumpers engineered for progressive energy absorption and high fatigue life.
                  </p>
                </div>
                <div className="mt-5">
                  <Link
                    to="/products?category=Microcellular%20Polyurethane%20(MCU)"
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-slate-600 transition-colors uppercase tracking-widest"
                  >
                    View Products <ArrowRight size={11} />
                  </Link>
                </div>
              </motion.div>

              {/* Bottom Card: Premium Light Quality Schematic Block */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="satin-card p-7 rounded-3xl flex flex-col justify-between shadow-md border border-slate-200/80 flex-1 relative bg-white"
              >
                <div>
                  <div className="w-8 h-8 rounded bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center mb-3">
                    <ShieldCheck size={16} />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 font-sans">OEM Standard Guarantee</h3>
                  <p className="text-slate-600 text-xs font-semibold leading-relaxed mt-1">
                    Every batch undergoes dynamic stiffness calibration and elastomer testing to meet global B2B expectations.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 tracking-wider uppercase font-semibold">
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>Tier-1 Quality</span>
                  <span>LAB APPROVED</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. SHOP BY CATEGORY (Light Mode Grid) ─── */}
      <section className="py-20 bg-slate-50 bg-grid-minimal border-y border-slate-200/60" id="categories-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Material Categories"
            subtitle="Engineered vibration control mountings classified by compound and vehicle integration."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
            {mainCategories.map((cat, i) => {
              const isDarkCard = cat.span.includes('satin-card-dark');
              return (
                <FadeIn
                  key={cat.name}
                  delay={i * 0.08}
                  className={`rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 min-h-[300px] ${cat.span}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold uppercase tracking-wider ${isDarkCard ? 'text-slate-400' : 'text-slate-500'}`}>
                        {cat.label}
                      </span>
                    </div>
                    <h3 className={`text-lg font-bold leading-snug mt-4 font-sans ${isDarkCard ? 'text-white' : 'text-slate-900'}`}>{cat.name}</h3>
                    <p className={`text-xs mt-2 leading-relaxed font-semibold max-w-sm ${isDarkCard ? 'text-slate-355' : 'text-slate-600'}`}>
                      {cat.desc}
                    </p>
                  </div>
                  
                  <div className={`flex items-center justify-between mt-6 pt-4 border-t ${isDarkCard ? 'border-white/5' : 'border-slate-100'}`}>
                    <Link
                      to={`/products?category=${encodeURIComponent(cat.name)}`}
                      className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${
                        isDarkCard ? 'text-white hover:text-slate-200' : 'text-slate-900 hover:text-slate-600'
                      }`}
                    >
                      View Products
                      <ArrowRight size={11} />
                    </Link>
                    <div className="w-16 h-12 flex items-center justify-center opacity-85">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>
                </FadeIn>
              );
            })}

            {/* View All Bento Card */}
            <FadeIn
              delay={0.35}
              className="satin-card border border-slate-200/80 text-slate-900 rounded-3xl p-7 flex flex-col justify-between min-h-[300px] hover:bg-slate-50 transition-colors cursor-pointer relative overflow-hidden"
              onClick={() => navigate('/products')}
            >
              <div>
                <div className="w-8 h-8 rounded bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center mb-6">
                  <ArrowUpRight size={16} />
                </div>
                <h3 className="text-lg font-bold tracking-tight max-w-[150px] leading-tight font-sans text-slate-900">
                  Browse Component Catalog
                </h3>
                <p className="text-slate-605 text-sm mt-1 font-semibold leading-normal">
                  Access complete dynamic specifications.
                </p>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 text-slate-900">
                Explore Range <ArrowRight size={11} />
              </span>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── 3. HIGH-DEMAND PARTS (Light Spec Sheets) ─── */}
      <section className="py-20 bg-white relative" id="high-demand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <SectionHeading
              title="Frequently Specified Parts"
              subtitle="OEM components deployed inside light commercial platforms and passenger models."
              className="!text-left !mb-0 [&>div:last-child]:!mx-0"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highDemandParts.map((part, i) => (
              <FadeIn key={part.name} delay={i * 0.08} className="h-full">
                <div className="h-full satin-card border border-slate-200/50 rounded-2xl p-5 flex flex-col justify-between shadow-sm bg-white">
                  <div>
                    {/* Image Box */}
                    <div className="aspect-square bg-white flex items-center justify-center p-4 rounded-xl overflow-hidden mb-4 border border-slate-100 relative">
                      <img
                        src={part.image}
                        alt={part.name}
                        className="max-h-full max-w-full object-contain hover:scale-102 transition-transform duration-300"
                      />
                    </div>
                    
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {part.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-1.5 leading-snug font-sans">{part.name}</h3>
                    
                    {/* Spec highlight */}
                    <div className="mt-2 text-xs font-semibold text-slate-600 font-sans">
                      {part.spec}
                    </div>
                    
                    <div className="flex items-center gap-1 mt-2.5 text-xs text-amber-500">
                      <Star size={11} fill="currentColor" />
                      <span className="font-semibold text-slate-800">{part.rating}</span>
                      <span className="text-slate-500 font-medium">({part.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Capacity</div>
                      <div className="text-xs font-extrabold text-slate-900 font-sans">{part.vol}</div>
                    </div>
                    <Link
                      to="/contact"
                      className="px-3.5 py-1.5 bg-slate-900 text-white font-extrabold text-xs rounded-lg uppercase tracking-widest font-sans btn-hover"
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

      {/* ─── 4. CAPABILITIES STATS SECTION (20% Dark HUD Accent Card) ─── */}
      <section className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-200/60" id="capabilities-deals">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="satin-card bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-md bg-grid-minimal relative overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              {/* Left Column Info */}
              <div className="lg:col-span-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest bg-slate-100 text-slate-800 border border-slate-200 px-3 py-1 rounded mb-4">
                  <Timer size={11} /> MANUFACTURING OPERATIONS
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold leading-tight font-sans text-slate-900">
                  Global Shipping & Delivery Standard
                </h2>
                <p className="text-slate-650 text-xs md:text-sm leading-relaxed mt-4 font-semibold">
                  We incorporate the Toyota Production System (TPS) guidelines across our automated presses to eliminate rubber wastage and secure on-time shipments.
                </p>
              </div>

              {/* Right Column Grid of Stats */}
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {capabilitiesStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-5 bg-slate-50 rounded-xl border border-slate-150 hover:border-slate-300 transition-all shadow-sm"
                  >
                    <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider">Metrics</span>
                    <div className="text-2xl font-extrabold text-slate-900 mt-1">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <h4 className="text-xs font-bold mt-1.5 text-slate-900 font-sans">{stat.label}</h4>
                    <p className="text-slate-600 text-xs mt-1 leading-normal font-semibold">
                      {stat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 5. TRUSTED PARTNERS (Clean Light logos grid) ─── */}
      <section className="py-16 bg-white relative border-y border-slate-100" id="partners">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Tier-1 OEM Customers"
            subtitle="AMP components are integrated into light passenger models and heavy commercial platforms worldwide."
          />

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-10">
            {clientLogos.map((logo, i) => (
              <FadeIn key={i} delay={i * 0.015}>
                <div className="bg-slate-50 border border-slate-200 p-4 flex items-center justify-center h-20 rounded-2xl shadow-sm hover:border-slate-400 transition-all duration-300 group cursor-pointer">
                  <img
                    src={logo}
                    alt={`Client logo integration ${i + 1}`}
                    className="max-h-full max-w-full object-contain opacity-95 group-hover:opacity-40 transition-opacity"
                    loading="lazy"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. TOOLING EXCLUSIVE BANNER (Light Bento Card) ─── */}
      <section className="py-10 bg-slate-50 relative" id="tooling-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="satin-card bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm">
            <div className="absolute inset-0 bg-[url('/images/facility/eng.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
            
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center shrink-0">
                <Factory size={18} />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest block font-sans">RAPID DEVELOPMENT LAB</span>
                <h3 className="text-lg font-extrabold mt-0.5 font-sans text-slate-900">
                  Concept CAD Blueprint to Finished Tool in 14 Days
                </h3>
                <p className="text-slate-605 text-xs font-semibold mt-1 max-w-xl">
                  In-house tool design featuring fully automated CNC tooling operations and compound stiffness calibration.
                </p>
              </div>
            </div>

            <div className="relative z-10 shrink-0">
              <Link
                to="/contact"
                className="px-5 py-2.5 bg-slate-900 text-white font-extrabold text-xs uppercase tracking-widest rounded-lg inline-block text-center cursor-pointer font-sans btn-hover"
              >
                Inquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. LATEST BLOG INSIGHTS ─── */}
      <section className="py-20 bg-white relative" id="insights">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Left Column Title */}
            <div className="lg:col-span-2">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold uppercase tracking-widest rounded mb-4">
                ENGINEERING DIARY
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight font-sans">
                Vibration Isolation R&D Logs
              </h2>
              <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed mt-4">
                Technical articles exploring fatigue limits, elastomer chemical compound reactions, and vehicle NVH compliance parameters.
              </p>
              <div className="mt-6">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-slate-600 group"
                >
                  Corporate Profile 
                  <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column List */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              {blogInsights.map((blog, i) => (
                <FadeIn key={blog.title} delay={i * 0.08}>
                  <div className="satin-card bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-5 group cursor-pointer">
                    <div className="w-16 h-16 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center shrink-0 border border-slate-100 p-2">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-102 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1 leading-snug group-hover:text-slate-600 transition-colors font-sans">
                        {blog.title}
                      </h4>
                      <p className="text-slate-600 text-xs font-semibold leading-relaxed mt-1 line-clamp-1">
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
    </div>
  );
}
