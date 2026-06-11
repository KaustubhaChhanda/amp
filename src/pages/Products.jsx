import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';

/* ── Data ── */
const allProducts = [
  // Rubber & Rubber-to-Metal
  { name: 'Strut Mounts', category: 'Rubber & Rubber-to-Metal', image: '/images/products/SM1.jpg', desc: 'High-performance strut mounts engineered for optimal NVH isolation in passenger and commercial vehicles.' },
  { name: 'Engine & Transmission Mounts', category: 'Rubber & Rubber-to-Metal', image: '/images/products/EM1.jpg', desc: 'Precision-engineered engine and transmission mounts for superior vibration damping and durability.' },
  { name: 'Bushings', category: 'Rubber & Rubber-to-Metal', image: '/images/products/BS1.jpg', desc: 'Anti-vibration bushings designed for suspension, steering, and drivetrain applications.' },
  { name: 'Isolators', category: 'Rubber & Rubber-to-Metal', image: '/images/products/IS1.jpg', desc: 'Rubber-to-metal bonded isolators for effective noise and vibration isolation across platforms.' },
  { name: 'Torque Rods', category: 'Rubber & Rubber-to-Metal', image: '/images/products/TR1.jpg', desc: 'Heavy-duty torque rods for commercial vehicles ensuring axle stability and alignment.' },
  { name: 'Heavy Duty Components', category: 'Rubber & Rubber-to-Metal', image: '/images/products/HD1.jpg', desc: 'Robust rubber-to-metal components designed for trucks, trailers, and off-highway vehicles.' },
  // Sheet Metal
  { name: 'Spring Seats', category: 'Sheet Metal Stampings & Assemblies', image: '/images/products/SS1.jpg', desc: 'Precision stamped spring seats for coil spring retention in suspension systems.' },
  { name: 'Brackets', category: 'Sheet Metal Stampings & Assemblies', image: '/images/products/B1.jpg', desc: 'Custom sheet metal brackets and mounting assemblies for automotive OEM applications.' },
  // MCU
  { name: 'Jounce Bumpers', category: 'Microcellular Polyurethane (MCU)', image: '/images/products/JB1.jpg', desc: 'Microcellular polyurethane jounce bumpers for progressive energy absorption in suspension.' },
  { name: 'MCU Strut Mounts', category: 'Microcellular Polyurethane (MCU)', image: '/images/products/PSM1.jpg', desc: 'Advanced MCU strut mounts offering superior NVH performance and long service life.' },
  { name: 'MCU Isolators', category: 'Microcellular Polyurethane (MCU)', image: '/images/products/PS1.jpg', desc: 'Polyurethane isolators with excellent load-bearing and vibration damping characteristics.' },
];

const categoryFilters = ['All', 'Rubber & Rubber-to-Metal', 'Sheet Metal Stampings & Assemblies', 'Microcellular Polyurethane (MCU)'];

/* ── Inquiry Modal ── */
function InquiryModal({ isOpen, onClose, productName }) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = (data) => {
    const subject = encodeURIComponent(`Product Inquiry: ${productName}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nCompany: ${data.company}\nPhone: ${data.phone}\nEmail: ${data.email}\nProduct: ${productName}\n\nMessage:\n${data.message}`
    );
    window.location.assign(`mailto:marketing@amp-india.com?subject=${subject}&body=${body}`);
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-amp-border">
              <div>
                <h3 className="text-lg font-bold text-amp-dark">Product Inquiry</h3>
                <p className="text-sm text-amp-muted mt-0.5">{productName}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-amp-light transition-colors" aria-label="Close modal">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inq-name" className="block text-sm font-medium text-amp-dark mb-1">Name *</label>
                  <input id="inq-name" {...register('name', { required: 'Name is required' })} className="w-full px-3 py-2.5 border border-amp-border text-sm focus:outline-none focus:border-amp-primary" />
                  {errors.name && <span className="text-xs text-amp-accent mt-1">{errors.name.message}</span>}
                </div>
                <div>
                  <label htmlFor="inq-company" className="block text-sm font-medium text-amp-dark mb-1">Company</label>
                  <input id="inq-company" {...register('company')} className="w-full px-3 py-2.5 border border-amp-border text-sm focus:outline-none focus:border-amp-primary" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inq-phone" className="block text-sm font-medium text-amp-dark mb-1">Phone *</label>
                  <input id="inq-phone" {...register('phone', { required: 'Phone is required' })} className="w-full px-3 py-2.5 border border-amp-border text-sm focus:outline-none focus:border-amp-primary" />
                  {errors.phone && <span className="text-xs text-amp-accent mt-1">{errors.phone.message}</span>}
                </div>
                <div>
                  <label htmlFor="inq-email" className="block text-sm font-medium text-amp-dark mb-1">Email *</label>
                  <input id="inq-email" type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} className="w-full px-3 py-2.5 border border-amp-border text-sm focus:outline-none focus:border-amp-primary" />
                  {errors.email && <span className="text-xs text-amp-accent mt-1">{errors.email.message}</span>}
                </div>
              </div>
              <div>
                <label htmlFor="inq-message" className="block text-sm font-medium text-amp-dark mb-1">Message</label>
                <textarea id="inq-message" rows={3} {...register('message')} className="w-full px-3 py-2.5 border border-amp-border text-sm focus:outline-none focus:border-amp-primary resize-none" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-amp-accent hover:bg-amp-accent-dark text-white font-semibold uppercase tracking-wider text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send size={16} />
                Send Inquiry
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════════════ */

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  const filteredProducts = activeFilter === 'All'
    ? allProducts
    : allProducts.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-amp-dark" id="products-hero">
        <div className="absolute inset-0 bg-[url('/images/facility/5hbanner_banner-04.jpg')] bg-cover bg-center opacity-15" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-white/90 font-medium max-w-2xl mx-auto"
          >
            A comprehensive range of OEM-grade automotive components
            engineered for performance, reliability, and NVH excellence.
          </motion.p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-white/30" />
            <div className="w-2 h-2 rotate-45 bg-white" />
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-white/30" />
          </div>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-16 bg-white" id="products-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center" id="product-filters">
            {categoryFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 text-sm font-medium uppercase tracking-wider transition-all duration-200 border ${
                  activeFilter === filter
                    ? 'bg-amp-primary text-white border-amp-primary'
                    : 'bg-white text-amp-slate border-amp-border hover:border-amp-primary/40'
                }`}
              >
                {filter === 'Microcellular Polyurethane (MCU)' ? 'MCU' : filter}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group border border-amp-border hover:border-amp-primary/40 transition-all duration-300 bg-white hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-square overflow-hidden bg-amp-light flex items-center justify-center p-8">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-amp-primary uppercase tracking-wider">
                      {product.category === 'Microcellular Polyurethane (MCU)' ? 'MCU' : product.category.split(' &')[0]}
                    </span>
                    <h3 className="text-lg font-bold text-amp-dark mt-1">{product.name}</h3>
                    <p className="mt-2 text-sm text-amp-slate font-medium leading-relaxed">{product.desc}</p>
                    <button
                      onClick={() => { setSelectedProduct(product.name); setModalOpen(true); }}
                      className="inline-flex items-center gap-1 mt-4 px-5 py-2.5 bg-amp-dark hover:bg-amp-charcoal text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Enquire Now
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={selectedProduct}
      />
    </>
  );
}
