import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Target,
  Eye,
  Cog,
  Award,
  FlaskConical,
  Ruler,
  CheckCircle2,
  Factory,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

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

const capabilities = [
  { icon: Factory, title: 'Manufacturing', desc: 'Fully computerized molding processes featuring an advanced eleven-tank chemical phosphating plant.' },
  { icon: Cog, title: 'CAD Engineering', desc: 'Autodesk suite integration enabling custom 3D modeling of molds, fixtures, and jigs.' },
  { icon: FlaskConical, title: 'R&D Laboratory', desc: 'In-house testing facility focused on compound fatigue limits and shear stress evaluation.' },
  { icon: Ruler, title: 'CNC Tooling', desc: 'Advanced CNC machine center supporting custom mold prototyping within a 14-day cycle.' },
  { icon: CheckCircle2, title: 'Quality Audits', desc: 'Compliance checking at all material supply stages to maintain zero-defect standards.' },
  { icon: Award, title: 'Material Testing', desc: 'Dynamic load machines simulating high-stress environments for suspension components.' },
];

const certifications = [
  { name: 'IATF 16949:2016', image: '/images/misc/certifiacate4.jpg', desc: 'International quality compliance standard for automotive supply lists.' },
  { name: 'ISO 14001:2004', image: '/images/misc/certifiacate3.jpg', desc: 'Environmental safety management certificate.' },
  { name: 'OHSAS 18001:2007', image: '/images/misc/certifiacate1.jpg', desc: 'Occupational health and employee safety standard.' },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section 
        className="relative pt-32 pb-20 bg-white text-slate-900 bg-grid-minimal border-b border-slate-200/60" 
        id="about-hero"
      >
        <div className="absolute inset-0 bg-[url('/images/facility/8hbanner_anand_banner.png')] bg-cover bg-center opacity-5 pointer-events-none" />
        
        {/* Ambient Top Glow (Subtle) */}
        <div className="absolute top-0 right-10 w-96 h-40 bg-slate-900/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold tracking-widest uppercase rounded border border-slate-200 mb-4">
            TIER-1 CORE PRINCIPLES
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 font-sans tracking-tight"
          >
            About Our Company
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 text-base text-slate-600 font-medium max-w-xl mx-auto leading-relaxed"
          >
            A legacy of precision anti-vibration component manufacturing since 1949.
          </motion.p>
        </div>
      </section>

      {/* Company Introduction (20% Dark Contrast Section) */}
      <section className="py-20 bg-slate-950 bg-grid-minimal-dark relative text-white" id="company-intro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column Image with Tech frame */}
            <FadeIn>
              <div className="overflow-hidden rounded-3xl border border-white/5 p-2 bg-slate-900/40 shadow-xl">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="/images/facility/eng.jpg"
                    alt="AMP Engineering Facility"
                    className="w-full h-auto object-cover opacity-90"
                    loading="lazy"
                  />
                </div>
              </div>
            </FadeIn>

            {/* Right Column Text + Metrics */}
            <FadeIn delay={0.15}>
              <div>
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest bg-white/5 text-slate-300 border border-white/5 px-3 py-1 rounded mb-4">
                  COMPANY PROFILE
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight font-sans">
                  India's Premier Antivibration Supplier
                </h2>
                <p className="mt-4 text-slate-300 font-medium leading-relaxed text-xs md:text-sm">
                  Anand Motor Products (AMP) is India's leading designer and exporter of high-end anti-vibration components. Our custom suspension bushings, powertrain mountings, and MCU jounce bumpers are fitted inside heavy commercial trucks, trailers, and passenger cars worldwide.
                </p>
                <p className="mt-3 text-slate-400 font-medium leading-relaxed text-xs md:text-sm">
                  Employing over 700 technical professionals across 3 state-of-the-art manufacturing plants, we support leading Tier-1 vehicle manufacturers with complete compound configuration and custom tooling design.
                </p>

                {/* Dashboard Metrics */}
                <div className="mt-8 grid grid-cols-3 gap-3">
                  <div className="satin-card-dark p-4 text-center border border-white/5 bg-white/5">
                    <span className="text-xs text-slate-300 block uppercase font-semibold">Legacy</span>
                    <div className="text-2xl font-extrabold text-white mt-1">
                      <AnimatedCounter value="75+" />
                    </div>
                    <span className="text-xs text-slate-350 font-bold uppercase tracking-wider block mt-1">Years</span>
                  </div>
                  <div className="satin-card-dark p-4 text-center border border-white/5 bg-white/5">
                    <span className="text-xs text-slate-300 block uppercase font-semibold">Facilities</span>
                    <div className="text-2xl font-extrabold text-white mt-1">
                      <AnimatedCounter value="3" />
                    </div>
                    <span className="text-xs text-slate-350 font-bold uppercase tracking-wider block mt-1">Plants</span>
                  </div>
                  <div className="satin-card-dark p-4 text-center border border-white/5 bg-white/5">
                    <span className="text-xs text-slate-300 block uppercase font-semibold">Professionals</span>
                    <div className="text-2xl font-extrabold text-white mt-1">
                      <AnimatedCounter value="700+" />
                    </div>
                    <span className="text-xs text-slate-350 font-bold uppercase tracking-wider block mt-1">Staff</span>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white bg-grid-minimal relative border-b border-slate-200/60" id="vision-mission">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Operational Directives" subtitle="Our target vision and mission guidelines." />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {/* Vision: Translucent Glass Bento (Light) */}
            <FadeIn className="flex flex-col h-full">
              <div className="satin-card p-8 md:p-10 flex-1 flex flex-col justify-between rounded-3xl border border-slate-200/80 relative overflow-hidden bg-white">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center mb-5">
                    <Eye size={20} />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-3 font-sans">Our Vision</h3>
                  <p className="text-slate-600 font-medium leading-relaxed text-xs md:text-sm">
                    To be the preferred global supply source for NVH and rubber-to-metal components, maintaining absolute standards in elastomer life, engineering compliance, and client satisfaction.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Mission: Translucent Dark Tech Glass Bento (Dark Accent) */}
            <FadeIn delay={0.15} className="flex flex-col h-full">
              <div className="satin-card-dark p-8 md:p-10 flex-1 flex flex-col justify-between rounded-3xl border border-white/5 text-white relative overflow-hidden">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-white/10 text-amp-secondary border border-white/10 flex items-center justify-center mb-5">
                    <Target size={20} />
                  </div>
                  <h3 className="text-xl font-extrabold mb-3 font-sans text-white">Our Mission</h3>
                  <p className="text-slate-300 font-medium leading-relaxed text-xs md:text-sm">
                    To respond promptly to changing customer requirements, complete rapid tooling designs inside a 14-day cycle, and ensure zero-defect shipment quality records.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Manufacturing Expertise */}
      <section className="py-20 bg-slate-50 bg-grid-minimal relative border-b border-slate-200/60" id="expertise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Operational Competences"
            subtitle="Providing custom tooling, advanced engineering research, and dynamic fatigue tests."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {capabilities.map((cap, i) => (
              <FadeIn key={cap.title} delay={i * 0.08} className="flex flex-col h-full">
                <div className="flex flex-col justify-between flex-1 satin-card p-6 md:p-8 rounded-2xl border border-slate-200/80 bg-white relative overflow-hidden">
                  <div>
                    <div className="w-8 h-8 rounded bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center mb-4">
                      <cap.icon size={16} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2 font-sans">{cap.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mt-2">{cap.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Quality & Certifications */}
      <section className="py-20 bg-white bg-grid-minimal relative" id="certifications">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="International Accreditations"
            subtitle="Every component passes strict testing to comply with international automotive benchmarks."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {certifications.map((cert, i) => (
              <FadeIn key={cert.name} delay={i * 0.1} className="flex flex-col h-full">
                <div className="flex-1 flex flex-col justify-between border border-slate-200/80 p-6 text-center rounded-2xl relative overflow-hidden satin-card bg-white shadow-sm">
                  <div>
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-xl p-2 shadow-inner">
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1 font-sans">{cert.name}</h3>
                  </div>
                  <p className="text-xs text-slate-650 font-medium mt-2 leading-relaxed">{cert.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          
          <FadeIn delay={0.25}>
            <div className="mt-12 text-center bg-slate-50 p-6 rounded-2xl border border-slate-200 max-w-xs mx-auto">
              <div className="flex items-center justify-center">
                <img
                  src="/images/misc/certifiacate2.jpg"
                  alt="Quality Badge"
                  className="h-16 w-auto opacity-95 bg-white rounded-lg p-1 border border-slate-100"
                  loading="lazy"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
