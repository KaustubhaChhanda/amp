import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Target,
  Shield,
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
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
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
    const duration = 1500;
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

const capabilities = [
  { icon: Factory, title: 'Manufacturing', desc: 'Fully computerized processes with eleven tank phosphating plant and advanced rubber molding.' },
  { icon: Cog, title: 'Engineering', desc: 'Pro E, Autodesk Product Design Suite with 3D modelling of parts, mold and jigs since 2014.' },
  { icon: FlaskConical, title: 'R&D', desc: 'Fully equipped lab with sophisticated testing equipment focused on enhanced customer satisfaction.' },
  { icon: Ruler, title: 'Tool Making', desc: 'State-of-the-art tool making facilities for rapid prototyping and production tooling.' },
  { icon: CheckCircle2, title: 'Quality Control', desc: 'Respond promptly to changing customer needs with new products at minimum lead time.' },
  { icon: Award, title: 'Testing', desc: 'Industry-leading testing capabilities ensuring high performance and reliability of every component.' },
];

const certifications = [
  { name: 'IATF 16949:2016', image: '/images/misc/certifiacate4.jpg', desc: 'International automotive quality management standard.' },
  { name: 'ISO 14001:2004', image: '/images/misc/certifiacate3.jpg', desc: 'Environmental management system certification.' },
  { name: 'OHSAS 18001:2007', image: '/images/misc/certifiacate1.jpg', desc: 'Occupational health and safety management.' },
];

export default function About() {
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
      {/* Hero */}
      <section 
        onMouseMove={handleMouseMove}
        className="relative pt-32 pb-20 bg-mesh-dark spotlight-card border-b border-white/5" 
        id="about-hero"
      >
        <div className="absolute inset-0 bg-[url('/images/facility/8hbanner_anand_banner.png')] bg-cover bg-center opacity-15 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-white"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-white/90 font-medium max-w-2xl mx-auto"
          >
            A legacy of engineering excellence in automotive component manufacturing since 1978.
          </motion.p>
          <div className="mt-6 flex items-center justify-center gap-1.5">
            <div className="w-8 h-1 rounded-full bg-amp-accent-lime" />
            <div className="w-2 h-1 rounded-full bg-white/40" />
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20 bg-white" id="company-intro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
                <img
                  src="/images/facility/eng.jpg"
                  alt="AMP Engineering Facility"
                  className="w-full h-auto object-cover hover:scale-102 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div>
                <span className="inline-block px-3 py-1 bg-amp-primary/10 text-amp-primary text-xs font-semibold uppercase tracking-widest mb-4 rounded-full">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-amp-dark leading-tight">
                  India's Leading NVH Component Supplier
                </h2>
                <p className="mt-4 text-amp-slate font-medium leading-relaxed text-sm">
                  AMP is India's leading supplier of Antivibration Rubber-to-Metal Bonded
                  components for the global automotive industry. Our components are used
                  across the globe on all platforms including Passenger Cars, Trucks,
                  Trailers and Off-Highway Vehicles.
                </p>
                <p className="mt-4 text-amp-slate font-medium leading-relaxed text-sm">
                  With more than 700+ professionals employed at 3 State-of-the-Art
                  manufacturing facilities, AMP exceeds the expectations of its customers.
                  Over the past decades, Anand Motor Products has grown to be the leading
                  NVH component supplier to all major OEMs in India and across the globe.
                </p>
                <p className="mt-4 text-amp-slate font-medium leading-relaxed text-sm">
                  Our commitment to innovation is reflected in every component that we
                  manufacture. We constantly incorporate cutting-edge technologies and
                  processes to deliver nothing but the best for our clientele.
                </p>

                {/* Counter row */}
                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                  <div>
                    <div className="text-3xl font-extrabold text-amp-primary">
                      <AnimatedCounter value="45+" />
                    </div>
                    <div className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider mt-1">Years Legacy</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-amp-primary">
                      <AnimatedCounter value="3" />
                    </div>
                    <div className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider mt-1">Modern Plants</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-amp-primary">
                      <AnimatedCounter value="700+" />
                    </div>
                    <div className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider mt-1">Professionals</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-slate-50" id="vision-mission">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Vision & Mission" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn className="flex flex-col h-full">
              <div className="bg-white border border-slate-100 p-8 md:p-10 flex-1 flex flex-col justify-between rounded-3xl shadow-md hover:border-amp-primary/20 transition-all duration-300">
                <div>
                  <Shield size={40} className="text-amp-primary mb-5" strokeWidth={1.5} />
                  <h3 className="text-2xl font-extrabold text-amp-dark mb-4">Our Vision</h3>
                  <p className="text-amp-slate font-medium leading-relaxed text-sm">
                    To be the first choice of OEMs worldwide for NVH and rubber-to-metal
                    automotive components, setting benchmarks in quality, innovation, and
                    customer satisfaction across the global automotive industry.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15} className="flex flex-col h-full">
              <div 
                onMouseMove={handleMouseMove}
                className="bg-mesh-dark spotlight-card border border-white/5 p-8 md:p-10 flex-1 flex flex-col justify-between rounded-3xl shadow-xl text-white"
              >
                <div>
                  <Target size={40} className="text-amp-accent-lime mb-5" strokeWidth={1.5} />
                  <h3 className="text-2xl font-extrabold mb-4">Our Mission</h3>
                  <p className="text-white/80 font-medium leading-relaxed text-sm">
                    To respond promptly to the changing needs of customers, develop new
                    products with minimum lead time, and establish ourselves as a reliable
                    supplier through continuous improvement, advanced manufacturing processes,
                    and unwavering commitment to quality.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Manufacturing Expertise */}
      <section className="py-20 bg-white" id="expertise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Manufacturing Expertise"
            subtitle="We are constantly inspired to incorporate innovation in every facet of our work, delivering nothing but the best for our valuable clientele."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <FadeIn key={cap.title} delay={i * 0.1} className="flex flex-col h-full">
                <div 
                  onMouseMove={handleMouseMove}
                  className="flex flex-col justify-between flex-1 border border-slate-100 spotlight-card p-6 md:p-8 hover:border-amp-primary/25 hover:shadow-lg transition-all duration-300 group rounded-2xl bg-white shadow-sm"
                >
                  <div>
                    <cap.icon size={32} className="text-amp-primary mb-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                    <h3 className="text-lg font-bold text-amp-dark mb-2">{cap.title}</h3>
                  </div>
                  <p className="text-sm text-amp-slate font-medium leading-relaxed mt-2">{cap.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Quality & Certifications */}
      <section className="py-20 bg-slate-50" id="certifications">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Quality Commitment"
            subtitle="Our commitment to quality is backed by internationally recognized certifications, ensuring every component meets the highest standards."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <FadeIn key={cert.name} delay={i * 0.15} className="flex flex-col h-full">
                <div 
                  onMouseMove={handleMouseMove}
                  className="flex-1 flex flex-col justify-between bg-white border border-slate-100 spotlight-card hover:border-amp-primary/25 p-8 text-center hover:shadow-lg transition-all duration-300 rounded-2xl shadow-sm"
                >
                  <div>
                    <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-amp-dark mb-2">{cert.name}</h3>
                  </div>
                  <p className="text-sm text-amp-slate font-medium mt-2">{cert.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div className="mt-12 text-center">
              <div className="inline-flex items-center justify-center">
                <img
                  src="/images/misc/certifiacate2.jpg"
                  alt="Royal Certification Seal"
                  className="h-24 w-auto opacity-95"
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
