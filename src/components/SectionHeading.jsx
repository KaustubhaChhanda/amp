import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SectionHeading({ title, subtitle, light = false, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const isLeft = className.includes('text-left') || className.includes('!text-left');

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
          className={`mt-4 text-base md:text-lg max-w-2xl leading-relaxed ${
            isLeft ? 'mx-0' : 'mx-auto'
          } ${
            light ? 'text-white/90 font-medium' : 'text-amp-slate font-medium'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
