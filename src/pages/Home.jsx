import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ShieldCheck,
  Factory,
  Clock,
  Award,
  Headphones,
  BadgeDollarSign,
  ChevronRight,
  Calendar,
  Users,
  Cog,
  Package,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

/* ── Animated wrapper ── */
function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Data ── */
const stats = [
  { icon: Calendar, value: '45+', label: 'Years of Excellence', suffix: '' },
  { icon: Factory, value: '3', label: 'Manufacturing Plants', suffix: '' },
  { icon: Users, value: '700+', label: 'Professionals', suffix: '' },
  { icon: Package, value: '2200+', label: 'OEM Components', suffix: '' },
];

const categories = [
  {
    name: 'Rubber & Rubber-to-Metal',
    desc: 'Anti-vibration rubber-to-metal bonded components including strut mounts, engine mounts, bushings, isolators, and torque rods.',
    image: '/images/products/product1.png',
  },
  {
    name: 'Sheet Metal Stampings & Assemblies',
    desc: 'Precision sheet metal stampings and assemblies including spring seats and brackets for automotive applications.',
    image: '/images/products/product2.png',
  },
  {
    name: 'Microcellular Polyurethane (MCU)',
    desc: 'Advanced MCU components including jounce bumpers, strut mounts, and isolators for superior NVH performance.',
    image: '/images/products/product3.png',
  },
];

const whyChoose = [
  { icon: ShieldCheck, title: 'Quality Assurance', desc: 'IATF 16949:2016 certified with rigorous quality control at every stage.' },
  { icon: Factory, title: 'Manufacturing Expertise', desc: 'State-of-the-art facilities with fully computerized processes and 32,000 sq. mtr spread.' },
  { icon: Clock, title: 'Timely Delivery', desc: 'Toyota Production System adopted ensuring 100% on-time deliveries.' },
  { icon: Award, title: 'Industry Experience', desc: 'Over 45 years as a trusted Tier-1 supplier to leading global OEMs.' },
  { icon: Headphones, title: 'Customer Support', desc: 'Dedicated engineering and customer support teams for rapid response.' },
  { icon: BadgeDollarSign, title: 'Competitive Pricing', desc: 'Cost-effective solutions without compromising on quality or performance.' },
];

const clientLogos = Array.from({ length: 18 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  const ext = [2, 4, 12, 13, 15, 16].includes(i + 1) ? 'jpg' : 'png';
  return `/images/clients/amp-client-${num}.${ext}`;
});

/* ══════════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      {/* ─── 1. HERO ─── */}
      <section className="relative min-h-screen flex items-center" id="hero">
        <div className="absolute inset-0">
          <img
            src="/images/facility/9hbanner_banner5.jpg"
            alt="AMP Manufacturing Facility"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#03152d]/98 via-[#0b223d]/92 to-[#03152d]/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-0">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-amp-accent-light to-amp-accent text-white text-xs font-bold uppercase tracking-widest mb-6 rounded-sm shadow-md border border-amp-accent-light/25">
                Since 1978
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Driving Quality Through{' '}
              <span className="text-amp-accent-light font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">Automotive Excellence</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-6 text-lg text-white/95 font-medium leading-relaxed max-w-xl"
            >
              Trusted automotive products and manufacturing solutions built to
              meet the evolving demands of the industry.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                to="/products"
                id="hero-cta-products"
                className="px-8 py-3.5 bg-gradient-to-r from-amp-accent-light to-amp-accent hover:from-amp-accent hover:to-amp-accent-dark text-white font-semibold uppercase tracking-wider text-sm transition-all duration-200 flex items-center gap-2 border border-amp-accent-light/35 shadow-lg shadow-red-950/20 hover:shadow-red-950/40"
              >
                Explore Products
                <ChevronRight size={18} />
              </Link>
              <Link
                to="/about"
                id="hero-cta-about"
                className="px-8 py-3.5 border-2 border-white/30 hover:border-white text-white font-semibold uppercase tracking-wider text-sm transition-colors"
              >
                About Us
              </Link>
            </motion.div>
          </div>
        </div>
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ─── 2. STATS STRIP ─── */}
      <section className="relative -mt-12 z-10 pb-20" id="stats">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1} className="h-full">
                <div className="h-full bg-[#0a182d] border border-white/10 border-t-4 border-t-amp-accent-light hover:border-t-amp-primary p-6 md:p-8 text-center shadow-xl hover:-translate-y-1 transition-all duration-300 group rounded">
                  <stat.icon size={28} className="mx-auto text-amp-accent-light mb-3 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs md:text-sm text-white/90 mt-1 uppercase tracking-wider font-semibold">
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. CORPORATE INTRODUCTION ─── */}
      <section className="py-20 bg-gradient-to-br from-[#f0f4f8] via-[#e2e8f0] to-[#f0f4f8]" id="intro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <span className="inline-block px-3 py-1 bg-amp-primary/10 text-amp-primary text-xs font-semibold uppercase tracking-widest mb-4">
                  Welcome to Anand Motor Products
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-amp-dark leading-tight">
                  Over Four Decades of Automotive Engineering Excellence
                </h2>
                <p className="mt-4 text-amp-slate font-medium leading-relaxed">
                  Established in 1978, Anand Motor Products (AMP) has grown to become India's leading manufacturer and supplier of anti-vibration rubber and rubber-to-metal bonded components. We are a trusted Tier-1 supplier to major global OEMs.
                </p>
                <p className="mt-4 text-amp-slate font-medium leading-relaxed">
                  Our components are engineered for optimal Noise, Vibration, and Harshness (NVH) isolation, used worldwide across Passenger Cars, Trucks, Trailers, and Off-Highway platforms.
                </p>
                <div className="mt-8 flex items-center gap-6">
                  <div>
                    <div className="text-2xl font-bold text-amp-primary">1978</div>
                    <div className="text-xs text-amp-slate font-semibold uppercase tracking-wider">Year Founded</div>
                  </div>
                  <div className="w-px h-10 bg-amp-border" />
                  <div>
                    <div className="text-2xl font-bold text-amp-primary">60M+</div>
                    <div className="text-xs text-amp-slate font-semibold uppercase tracking-wider">Annual Capacity</div>
                  </div>
                  <div className="w-px h-10 bg-amp-border" />
                  <div>
                    <div className="text-2xl font-bold text-amp-primary">Global</div>
                    <div className="text-xs text-amp-slate font-semibold uppercase tracking-wider">OEM Deliveries</div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="relative">
                <div className="absolute inset-0 bg-amp-accent translate-x-4 translate-y-4 -z-10 opacity-75" />
                <img
                  src="/images/facility/8hbanner_anand_banner.png"
                  alt="AMP Corporate Headquarters"
                  className="w-full h-auto object-cover border border-amp-border shadow-lg"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── 4. PRODUCT CATEGORIES ─── */}
      <section className="py-22 bg-gradient-to-b from-[#0a1a2f] to-[#122e50] text-white relative overflow-hidden" id="product-categories">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amp-accent-light/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amp-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Our Product Range"
            subtitle="Comprehensive automotive component solutions engineered for performance, reliability, and precision across all vehicle platforms."
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <FadeIn key={cat.name} delay={i * 0.15} className="h-full">
                <Link
                  to="/products"
                  className="group flex flex-col h-full bg-white border border-white/5 hover:border-amp-accent transition-all duration-300 overflow-hidden rounded shadow-xl hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-white flex items-center justify-center p-8 border-b border-amp-border/10">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-amp-dark group-hover:text-amp-primary transition-colors">
                        {cat.name}
                      </h3>
                      <p className="mt-2 text-sm text-amp-slate font-medium leading-relaxed">{cat.desc}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 mt-4 text-sm font-bold text-amp-primary uppercase tracking-wider">
                      View Products
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. WHY CHOOSE AMP ─── */}
      <section className="py-20 bg-gradient-to-br from-[#faf8f5] to-[#f3ece0]" id="why-choose">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why Partner With AMP"
            subtitle="Decades of automotive manufacturing expertise backed by world-class quality standards and unwavering commitment to customer satisfaction."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1} className="h-full">
                <div className="flex flex-col justify-between h-full bg-white border border-amp-border hover:border-amp-primary/40 p-6 md:p-8 transition-all duration-300 group rounded shadow-sm hover:shadow-md hover:-translate-y-1">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-amp-accent/10 text-amp-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                      <item.icon size={22} strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-bold text-amp-dark mb-2">{item.title}</h3>
                  </div>
                  <p className="text-sm text-amp-slate font-medium leading-relaxed mt-2 flex-grow">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. MANUFACTURING STRENGTHS ─── */}
      <section className="py-20 bg-gradient-to-br from-[#ebf1f6] to-[#d9e4ee]" id="manufacturing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="overflow-hidden">
                <img
                  src="/images/facility/manufacturing-img.jpg"
                  alt="AMP Manufacturing Facility"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div>
                <span className="inline-block px-3 py-1 bg-amp-primary/10 text-amp-primary text-xs font-semibold uppercase tracking-widest mb-4">
                  Manufacturing Excellence
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-amp-dark leading-tight">
                  State-of-the-Art Production Capabilities
                </h2>
                <p className="mt-4 text-amp-slate font-medium leading-relaxed">
                  With three advanced manufacturing plants spread across 32,000 sq. mtrs,
                  AMP produces over 60 million components annually using fully computerized
                  processes and industry-leading testing capabilities.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    'Fully computerized eleven tank phosphating plant',
                    '3D Modelling with Pro E & Autodesk Product Design Suite',
                    'Fully equipped lab with sophisticated testing equipment',
                    'Toyota Production System for lean manufacturing',
                    'Capacity of 60+ million components per annum',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-amp-dark font-medium">
                      <Cog size={16} className="text-amp-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-amp-primary hover:bg-amp-navy text-white font-semibold text-sm uppercase tracking-wider transition-colors"
                >
                  Learn More
                  <ChevronRight size={16} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── 7. QUALITY & CERTIFICATIONS ─── */}
      <section className="py-20 bg-gradient-to-b from-[#081526] to-[#0f243d]" id="home-certifications">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Uncompromising Quality Standards"
            subtitle="AMP is committed to delivering OEM-grade reliability. Our state-of-the-art facilities are certified to international automotive and environmental standards."
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'IATF 16949:2016',
                desc: 'Quality management system certification for the automotive industry.',
                image: '/images/misc/certifiacate4.jpg'
              },
              {
                name: 'ISO 14001:2004',
                desc: 'Environmental management system standard certification.',
                image: '/images/misc/certifiacate3.jpg'
              },
              {
                name: 'OHSAS 18001:2007',
                desc: 'Occupational health and safety management certification.',
                image: '/images/misc/certifiacate1.jpg'
              }
            ].map((cert, i) => (
              <FadeIn key={cert.name} delay={i * 0.15} className="h-full">
                <div className="h-full flex flex-col justify-between bg-white border border-amp-border border-t-4 border-t-amp-accent hover:border-amp-accent/40 p-8 text-center transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 rounded">
                  <div>
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-amp-dark mb-2">{cert.name}</h3>
                  </div>
                  <p className="text-sm text-amp-slate font-medium leading-relaxed mt-2">{cert.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. TRUSTED PARTNERS ─── */}
      <section className="py-20 bg-amp-light" id="clients">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Trusted By Industry Leaders"
            subtitle="We are proud to serve as a trusted Tier-1 supplier to leading OEMs and automotive companies across the globe."
          />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
            {clientLogos.map((logo, i) => (
              <FadeIn key={i} delay={i * 0.03}>
                <div className="bg-white border border-amp-border p-4 flex items-center justify-center h-20 shadow-sm hover:shadow-md hover:-translate-y-1.5 hover:scale-105 transition-all duration-300 ease-out cursor-pointer">
                  <img
                    src={logo}
                    alt={`Client ${i + 1}`}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. CTA BANNER ─── */}
      <section className="relative py-22 bg-gradient-to-r from-amp-accent via-[#a7171d] to-amp-primary overflow-hidden" id="cta-banner">
        <div className="absolute top-0 left-0 w-80 h-80 bg-amp-accent/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amp-secondary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/images/facility/7hbanner_banner2.jpg')] bg-cover bg-center opacity-15" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Discuss Your Requirements?
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
              Get in touch with our team for product inquiries, custom
              manufacturing solutions, and partnership opportunities.
            </p>
            <Link
              to="/contact"
              id="cta-contact"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-white hover:bg-amp-light text-amp-dark font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-full"
            >
              Contact Us Today
              <ChevronRight size={18} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
