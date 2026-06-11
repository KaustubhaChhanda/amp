import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SectionHeading({ title, subtitle, light = false, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`text-center mb-12 md:mb-16 ${className}`}
    >
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${
          light ? 'text-white' : 'text-amp-dark'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${
            light ? 'text-white/90 font-medium' : 'text-amp-slate font-medium'
          }`}
        >
          {subtitle}
        </p>
      )}
      <div className="mt-6 flex items-center justify-center gap-2">
        <div className={`w-12 h-0.5 bg-gradient-to-r from-transparent ${light ? 'to-white/30' : 'to-amp-accent/30'}`} />
        <div className={`w-2 h-2 rotate-45 ${light ? 'bg-white' : 'bg-amp-accent'}`} />
        <div className={`w-12 h-0.5 bg-gradient-to-l from-transparent ${light ? 'to-white/30' : 'to-amp-accent/30'}`} />
      </div>
    </motion.div>
  );
}
