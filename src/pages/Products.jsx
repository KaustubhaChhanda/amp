import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ChevronRight, BarChart2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

/* ── Data ── */
const allProducts = [
  // Rubber & Rubber-to-Metal
  { 
    name: 'Strut Mounts', 
    category: 'Rubber & Rubber-to-Metal', 
    image: '/images/products/SM1.jpg', 
    desc: 'High-performance strut mounts engineered for optimal NVH isolation in passenger and commercial vehicles.',
    specs: { 'Hardness': '65±5 Shore A', 'Elastomer': 'Natural Rubber', 'Fatigue Life': '> 2.0M cycles' }
  },
  { 
    name: 'Engine & Transmission Mounts', 
    category: 'Rubber & Rubber-to-Metal', 
    image: '/images/products/EM1.jpg', 
    desc: 'Precision-engineered engine and transmission mounts for superior vibration damping and durability.',
    specs: { 'Hardness': '60±5 Shore A', 'Stiffness': 'Progressive Axial', 'Bond Integrity': 'ASTM D429 Met-B' }
  },
  { 
    name: 'Bushings', 
    category: 'Rubber & Rubber-to-Metal', 
    image: '/images/products/BS1.jpg', 
    desc: 'Anti-vibration bushings designed for suspension, steering, and drivetrain applications.',
    specs: { 'Hardness': '70±5 Shore A', 'Insertion Force': '< 8.0 kN', 'Compliance': 'Radial / Torsional' }
  },
  { 
    name: 'Isolators', 
    category: 'Rubber & Rubber-to-Metal', 
    image: '/images/products/IS1.jpg', 
    desc: 'Rubber-to-metal bonded isolators for effective noise and vibration isolation across platforms.',
    specs: { 'Hardness': '55±5 Shore A', 'Static Load': 'Up to 150 kg', 'NVH Damping': '-12 dB min' }
  },
  { 
    name: 'Torque Rods', 
    category: 'Rubber & Rubber-to-Metal', 
    image: '/images/products/TR1.jpg', 
    desc: 'Heavy-duty torque rods for commercial vehicles ensuring axle stability and alignment.',
    specs: { 'Hardness': '75±5 Shore A', 'Bush Profile': 'Spherical', 'Load Capacity': '45 kN dynamic' }
  },
  { 
    name: 'Heavy Duty Components', 
    category: 'Rubber & Rubber-to-Metal', 
    image: '/images/products/HD1.jpg', 
    desc: 'Robust rubber-to-metal components designed for trucks, trailers, and off-highway vehicles.',
    specs: { 'Hardness': '80±5 Shore A', 'Working Temp': '-40 to 120°C', 'Impact Absorption': 'High-Energy' }
  },
  // Sheet Metal
  { 
    name: 'Spring Seats', 
    category: 'Sheet Metal Stampings & Assemblies', 
    image: '/images/products/SS1.jpg', 
    desc: 'Precision stamped spring seats for coil spring retention in suspension systems.',
    specs: { 'Material': 'DD11 HR Steel', 'Thickness': '3.0 mm - 4.5 mm', 'Coating': 'Cathodic E-Coat' }
  },
  { 
    name: 'Brackets', 
    category: 'Sheet Metal Stampings & Assemblies', 
    image: '/images/products/B1.jpg', 
    desc: 'Custom sheet metal brackets and mounting assemblies for automotive OEM applications.',
    specs: { 'Material': 'S235JR Steel', 'Tensile': '360-510 MPa', 'Fatigue Limit': '1.5M load-steps' }
  },
  // MCU
  { 
    name: 'Jounce Bumpers', 
    category: 'Microcellular Polyurethane (MCU)', 
    image: '/images/products/JB1.jpg', 
    desc: 'Microcellular polyurethane jounce bumpers for progressive energy absorption in suspension.',
    specs: { 'Density': '0.45 g/cm³', 'Deflection Limit': 'Up to 80%', 'Impact Resistance': 'Excellent' }
  },
  { 
    name: 'MCU Strut Mounts', 
    category: 'Microcellular Polyurethane (MCU)', 
    image: '/images/products/PSM1.jpg', 
    desc: 'Advanced MCU strut mounts offering superior NVH performance and long service life.',
    specs: { 'Density': '0.50 g/cm³', 'Stiffness Rate': 'Dual-Rate Axial', 'Temp Limits': '-40 to 110°C' }
  },
  { 
    name: 'MCU Isolators', 
    category: 'Microcellular Polyurethane (MCU)', 
    image: '/images/products/PS1.jpg', 
    desc: 'Polyurethane isolators with excellent load-bearing and vibration damping characteristics.',
    specs: { 'Density': '0.55 g/cm³', 'Compression Set': '< 4.0%', 'Chemical Res': 'ASTM D471 Oil' }
  },
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.25 }}
            className="bg-white text-slate-900 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 font-sans">B2B Specification Request</h3>
                <p className="text-xs text-slate-600 font-bold font-sans mt-0.5">{productName}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 transition-colors rounded-full" aria-label="Close modal">
                <X size={18} className="text-slate-400" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inq-name" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-sans">Name *</label>
                  <input id="inq-name" {...register('name', { required: 'Name is required' })} className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:outline-none focus:border-slate-450 focus:bg-white rounded-xl transition-all font-medium placeholder-slate-400" placeholder="Full name" />
                  {errors.name && <span className="text-xs text-slate-500 mt-1 block">{errors.name.message}</span>}
                </div>
                <div>
                  <label htmlFor="inq-company" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-sans">Company</label>
                  <input id="inq-company" {...register('company')} className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:outline-none focus:border-slate-450 focus:bg-white rounded-xl transition-all font-medium placeholder-slate-400" placeholder="OEM name" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inq-phone" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-sans">Phone *</label>
                  <input id="inq-phone" {...register('phone', { required: 'Phone is required' })} className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:outline-none focus:border-slate-450 focus:bg-white rounded-xl transition-all font-medium placeholder-slate-400" placeholder="Contact number" />
                  {errors.phone && <span className="text-xs text-slate-500 mt-1 block">{errors.phone.message}</span>}
                </div>
                <div>
                  <label htmlFor="inq-email" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-sans">Email *</label>
                  <input id="inq-email" type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:outline-none focus:border-slate-450 focus:bg-white rounded-xl transition-all font-medium placeholder-slate-400" placeholder="corporate@email.com" />
                  {errors.email && <span className="text-xs text-slate-500 mt-1 block">{errors.email.message}</span>}
                </div>
              </div>
              
              <div>
                <label htmlFor="inq-message" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-sans">Message</label>
                <textarea id="inq-message" rows={3} {...register('message')} className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:outline-none focus:border-slate-450 focus:bg-white rounded-xl transition-all font-medium placeholder-slate-400 resize-none" placeholder="Provide dimensional requirements, annual quantity forecasts..." />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-slate-900 text-white font-extrabold uppercase tracking-widest text-xs flex items-center justify-center gap-2 disabled:opacity-50 rounded-xl shadow-md cursor-pointer btn-hover"
              >
                <Send size={14} />
                Send B2B Enquiry
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Products Page Component ── */
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

  return (
    <>
      {/* Hero */}
      <section 
        className="relative pt-32 pb-20 bg-white text-slate-900 bg-grid-minimal border-b border-slate-200/60" 
        id="products-hero"
      >
        <div className="absolute inset-0 bg-[url('/images/facility/5hbanner_banner-04.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
        
        {/* Subtle glow */}
        <div className="absolute top-0 right-10 w-96 h-40 bg-slate-900/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold tracking-widest uppercase rounded border border-slate-200 mb-4">
            Component Specifications
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 font-sans tracking-tight"
          >
            Product Catalog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 text-base text-slate-600 font-medium max-w-xl mx-auto leading-relaxed"
          >
            OEM-grade antivibration rubber-to-metal and Microcellular Polyurethane (MCU) components.
          </motion.p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-16 bg-slate-50 bg-grid-minimal relative border-b border-slate-200/60" id="products-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Advanced Pill Filter Bar */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center" id="product-filters">
            {categoryFilters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className="px-4.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 border border-slate-250/60 rounded-lg relative overflow-hidden cursor-pointer bg-white shadow-sm"
                >
                  <span className={`relative z-10 transition-colors duration-200 ${
                    isActive ? 'text-white font-bold' : 'text-slate-600 hover:text-slate-905'
                  }`}>
                    {filter === 'Microcellular Polyurethane (MCU)' ? 'MCU' : filter}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryTab"
                      className="absolute inset-0 bg-amp-primary"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="wait">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="group satin-card rounded-2xl border border-slate-200/80 p-4 flex flex-col justify-between relative overflow-hidden bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <div>
                    {/* CAD image holder */}
                    <div className="aspect-square overflow-hidden bg-white flex items-center justify-center p-2 rounded-xl border border-slate-100 relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-102 transition-all duration-500 ease-out"
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        {product.category === 'Microcellular Polyurethane (MCU)' ? 'MCU' : product.category.split(' &')[0]}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1.5 leading-snug font-sans">{product.name}</h3>
                      <p className="mt-2 text-xs text-slate-600 font-medium leading-relaxed">{product.desc}</p>
                    </div>

                    {/* Specifications table inside card */}
                    <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-150 text-xs font-sans text-slate-600 space-y-1.5">
                      <div className="flex items-center justify-between border-b border-slate-200/85 pb-1 font-bold text-slate-500 text-xs uppercase tracking-wider">
                        <span>TECHNICAL_SPEC</span>
                        <BarChart2 size={10} />
                      </div>
                      {Object.entries(product.specs).map(([key, val]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-slate-500 font-medium">{key}:</span>
                          <span className="font-semibold text-slate-800">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <button
                      onClick={() => { setSelectedProduct(product.name); setModalOpen(true); }}
                      className="inline-flex items-center gap-1 px-4 py-2 bg-slate-900 text-white font-extrabold text-xs uppercase tracking-widest rounded-lg shadow-md cursor-pointer font-sans btn-hover"
                    >
                      Enquire Specs
                      <ChevronRight size={11} className="text-white" />
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
