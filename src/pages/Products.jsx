import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
            className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl shadow-xl border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-amp-dark">Product Inquiry</h3>
                <p className="text-sm text-amp-primary font-bold mt-0.5">{productName}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 transition-colors rounded-full" aria-label="Close modal">
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inq-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Name *</label>
                  <input id="inq-name" {...register('name', { required: 'Name is required' })} className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-amp-primary focus:bg-white focus:ring-2 focus:ring-amp-primary/20 rounded-xl transition-all font-medium text-slate-800" placeholder="Your name" />
                  {errors.name && <span className="text-xs text-amp-accent mt-1 block">{errors.name.message}</span>}
                </div>
                <div>
                  <label htmlFor="inq-company" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Company</label>
                  <input id="inq-company" {...register('company')} className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-amp-primary focus:bg-white focus:ring-2 focus:ring-amp-primary/20 rounded-xl transition-all font-medium text-slate-800" placeholder="Your company" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inq-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Phone *</label>
                  <input id="inq-phone" {...register('phone', { required: 'Phone is required' })} className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-amp-primary focus:bg-white focus:ring-2 focus:ring-amp-primary/20 rounded-xl transition-all font-medium text-slate-800" placeholder="+91 XXXXX XXXXX" />
                  {errors.phone && <span className="text-xs text-amp-accent mt-1 block">{errors.phone.message}</span>}
                </div>
                <div>
                  <label htmlFor="inq-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email *</label>
                  <input id="inq-email" type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-amp-primary focus:bg-white focus:ring-2 focus:ring-amp-primary/20 rounded-xl transition-all font-medium text-slate-800" placeholder="your@email.com" />
                  {errors.email && <span className="text-xs text-amp-accent mt-1 block">{errors.email.message}</span>}
                </div>
              </div>
              <div>
                <label htmlFor="inq-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Message</label>
                <textarea id="inq-message" rows={3} {...register('message')} className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-amp-primary focus:bg-white focus:ring-2 focus:ring-amp-primary/20 rounded-xl transition-all font-medium text-slate-800 resize-none" placeholder="Your requirements..." />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-amp-accent-lime hover:bg-amp-accent-lime-hover text-amp-dark font-extrabold uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 rounded-xl shadow-md cursor-pointer"
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
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get('category') || 'All';
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (filter === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: filter });
    }
  };

  const filteredProducts = activeFilter === 'All'
    ? allProducts
    : allProducts.filter((p) => p.category === activeFilter);

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
        id="products-hero"
      >
        <div className="absolute inset-0 bg-[url('/images/facility/5hbanner_banner-04.jpg')] bg-cover bg-center opacity-15 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-white"
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
          <div className="mt-6 flex items-center justify-center gap-1.5">
            <div className="w-8 h-1 rounded-full bg-amp-accent-lime" />
            <div className="w-2 h-1 rounded-full bg-white/40" />
          </div>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-16 bg-white" id="products-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center" id="product-filters">
            {categoryFilters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className="px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all duration-200 border border-slate-200 rounded-full relative overflow-hidden cursor-pointer"
                >
                  <span className={`relative z-10 transition-colors duration-200 ${
                    isActive ? 'text-white font-bold' : 'text-slate-700 hover:text-amp-primary'
                  }`}>
                    {filter === 'Microcellular Polyurethane (MCU)' ? 'MCU' : filter}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryTab"
                      className="absolute inset-0 bg-amp-primary"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              );
            })}
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
                  className="group border border-slate-100 transition-all duration-300 bg-white hover:-translate-y-2 hover:shadow-xl rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-amp-primary/20"
                >
                  <div>
                    <div className="aspect-square overflow-hidden bg-slate-50 flex items-center justify-center p-8 border-b border-slate-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-110 group-hover:rotate-2 transition-all duration-500 ease-out"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold text-amp-primary uppercase tracking-wider">
                        {product.category === 'Microcellular Polyurethane (MCU)' ? 'MCU' : product.category.split(' &')[0]}
                      </span>
                      <h3 className="text-lg font-bold text-amp-dark mt-1 leading-snug">{product.name}</h3>
                      <p className="mt-2 text-sm text-amp-slate font-medium leading-relaxed">{product.desc}</p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-0">
                    <button
                      onClick={() => { setSelectedProduct(product.name); setModalOpen(true); }}
                      className="inline-flex items-center gap-1 px-5 py-2.5 bg-amp-accent-lime hover:bg-amp-accent-lime-hover text-amp-dark font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
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
