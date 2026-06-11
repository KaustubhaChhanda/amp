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
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-amp-dark" id="about-hero">
        <div className="absolute inset-0 bg-[url('/images/facility/8hbanner_anand_banner.png')] bg-cover bg-center opacity-15" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-white/70 max-w-2xl mx-auto"
          >
            A legacy of engineering excellence in automotive component manufacturing since 1978.
          </motion.p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-white/30" />
            <div className="w-2 h-2 rotate-45 bg-white" />
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-white/30" />
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20 bg-white" id="company-intro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="overflow-hidden">
                <img
                  src="/images/facility/eng.jpg"
                  alt="AMP Engineering Facility"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div>
                <span className="inline-block px-3 py-1 bg-amp-primary/10 text-amp-primary text-xs font-semibold uppercase tracking-widest mb-4">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-amp-dark leading-tight">
                  India's Leading NVH Component Supplier
                </h2>
                <p className="mt-4 text-amp-slate font-medium leading-relaxed">
                  AMP is India's leading supplier of Antivibration Rubber-to-Metal Bonded
                  components for the global automotive industry. Our components are used
                  across the globe on all platforms including Passenger Cars, Trucks,
                  Trailers and Off-Highway Vehicles.
                </p>
                <p className="mt-4 text-amp-slate font-medium leading-relaxed">
                  With more than 700+ professionals employed at 3 State-of-the-Art
                  manufacturing facilities, AMP exceeds the expectations of its customers.
                  Over the past decades, Anand Motor Products has grown to be the leading
                  NVH component supplier to all major OEMs in India and across the globe.
                </p>
                <p className="mt-4 text-amp-slate font-medium leading-relaxed">
                  Our commitment to innovation is reflected in every component that we
                  manufacture. We constantly incorporate cutting-edge technologies and
                  processes to deliver nothing but the best for our clientele.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-amp-light" id="vision-mission">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Vision & Mission" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn>
              <div className="bg-white border border-amp-border p-8 md:p-10 h-full">
                <Shield size={40} className="text-amp-primary mb-5" strokeWidth={1.5} />
                <h3 className="text-2xl font-bold text-amp-dark mb-4">Our Vision</h3>
                <p className="text-amp-slate font-medium leading-relaxed">
                  To be the first choice of OEMs worldwide for NVH and rubber-to-metal
                  automotive components, setting benchmarks in quality, innovation, and
                  customer satisfaction across the global automotive industry.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="bg-white border border-amp-border p-8 md:p-10 h-full">
                <Target size={40} className="text-amp-accent mb-5" strokeWidth={1.5} />
                <h3 className="text-2xl font-bold text-amp-dark mb-4">Our Mission</h3>
                <p className="text-amp-slate font-medium leading-relaxed">
                  To respond promptly to the changing needs of customers, develop new
                  products with minimum lead time, and establish ourselves as a reliable
                  supplier through continuous improvement, advanced manufacturing processes,
                  and unwavering commitment to quality.
                </p>
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
              <FadeIn key={cap.title} delay={i * 0.1} className="h-full">
                <div className="flex flex-col justify-between h-full border border-amp-border p-6 md:p-8 hover:border-amp-primary/40 transition-all duration-300 group rounded bg-white shadow-sm hover:shadow-md">
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
      <section className="py-20 bg-amp-light" id="certifications">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Quality Commitment"
            subtitle="Our commitment to quality is backed by internationally recognized certifications, ensuring every component meets the highest standards."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <FadeIn key={cert.name} delay={i * 0.15} className="h-full">
                <div className="h-full flex flex-col justify-between bg-white border border-amp-border hover:border-amp-accent/40 p-8 text-center transition-all shadow-sm hover:shadow-md rounded">
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
