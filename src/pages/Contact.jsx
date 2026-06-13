import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
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

const contactCards = [
  {
    icon: Phone,
    title: 'Phone Line',
    value: '+91 87429 55535',
    href: 'tel:+918742955535',
    desc: 'Mon-Sat, 9:30 AM - 6:30 PM IST',
  },
  {
    icon: Mail,
    title: 'Email RFQ',
    value: 'marketing@amp-india.com',
    href: 'mailto:marketing@amp-india.com',
    desc: 'B2B inquiries reviewed in 24 hours',
  },
  {
    icon: MapPin,
    title: 'HQ Location',
    value: '38, Km Stone, NH-8, Khandsa Rd, Gurugram, Haryana 122004, India',
    href: 'https://maps.google.com/?q=Anand+Motor+Products+Pvt+Ltd+Gurugram',
    desc: 'Anand Motor Products Pvt. Ltd.',
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const subject = encodeURIComponent(`Inquiry: ${data.subject}`);
    const body = encodeURIComponent(
      `Name: ${data.fullName}\nCompany: ${data.company}\nPhone: ${data.phone}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`
    );
    window.location.assign(`mailto:marketing@amp-india.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 3000);
  };

  return (
    <>
      {/* Hero */}
      <section 
        className="relative pt-32 pb-20 bg-white text-slate-900 bg-grid-minimal border-b border-slate-200/60" 
        id="contact-hero"
      >
        <div className="absolute inset-0 bg-[url('/images/facility/7hbanner_banner2.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-10 w-96 h-40 bg-slate-900/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold tracking-widest uppercase rounded border border-slate-200 mb-4">
            B2B Communication Desk
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 font-sans tracking-tight"
          >
            Contact Sales Engineering
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 text-base text-slate-650 font-medium max-w-xl mx-auto leading-relaxed"
          >
            Connect with our engineering office to discuss compound specifications and prototyping.
          </motion.p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="relative -mt-8 z-10 pb-8" id="contact-cards">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactCards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.08} className="flex flex-col h-full">
                <a
                  href={card.href}
                  target={card.title === 'HQ Location' ? '_blank' : undefined}
                  rel={card.title === 'HQ Location' ? 'noopener noreferrer' : undefined}
                  className="flex flex-col justify-between flex-1 satin-card border border-slate-200/80 p-6 text-center shadow-lg transition-all rounded-2xl group bg-white hover:border-slate-400"
                >
                  <div>
                    <div className="w-8 h-8 rounded bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center mx-auto mb-4">
                      <card.icon size={16} />
                    </div>
                    <h3 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-1.5 font-sans">{card.title}</h3>
                    <p className="text-xs md:text-sm text-slate-900 font-extrabold leading-snug">{card.value}</p>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-4 border-t border-slate-100 pt-3">{card.desc}</p>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="py-16 bg-slate-50 bg-grid-minimal relative border-b border-slate-200/60" id="contact-form-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch">
            
            {/* Form */}
            <FadeIn className="lg:col-span-3 flex flex-col justify-between">
              <div className="satin-card p-6 md:p-8 rounded-3xl border border-slate-200/80 bg-white flex-1 flex flex-col justify-center shadow-sm">
                <SectionHeading
                  title="Submit B2B Inquiry"
                  subtitle="Provide your specifications below and a sales engineer will review your blueprint requirements."
                  className="!text-left !mb-6 [&>div:last-child]:!mx-0"
                />

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 p-8 text-center rounded-2xl"
                  >
                    <CheckCircle2 size={40} className="mx-auto text-green-600 mb-4" />
                    <h3 className="text-base font-extrabold text-green-800 font-sans">Enquiry Transmitting</h3>
                    <p className="text-xs text-green-700 mt-2">
                      Your local mail client is opening with pre-filled RFQ parameters.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="contact-form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-sans">
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          {...register('fullName', { required: 'Full name is required' })}
                          className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:border-slate-450 focus:bg-white rounded-xl transition-all font-medium text-slate-800 placeholder-slate-400"
                          placeholder="Your name"
                        />
                        {errors.fullName && <span className="text-xs text-amp-accent mt-1 block">{errors.fullName.message}</span>}
                      </div>
                      <div>
                        <label htmlFor="contact-company" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-sans">
                          Company Name
                        </label>
                        <input
                          id="contact-company"
                          {...register('company')}
                          className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:border-slate-450 focus:bg-white rounded-xl transition-all font-medium text-slate-800 placeholder-slate-400"
                          placeholder="OEM company"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-sans">
                          Phone Number *
                        </label>
                        <input
                          id="contact-phone"
                          {...register('phone', { required: 'Phone number is required' })}
                          className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:border-slate-450 focus:bg-white rounded-xl transition-all font-medium text-slate-800 placeholder-slate-400"
                          placeholder="+XX XXXXX XXXXX"
                        />
                        {errors.phone && <span className="text-xs text-amp-accent mt-1 block">{errors.phone.message}</span>}
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-sans">
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email' },
                          })}
                          className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:border-slate-450 focus:bg-white rounded-xl transition-all font-medium text-slate-800 placeholder-slate-400"
                          placeholder="your@corporate.com"
                        />
                        {errors.email && <span className="text-xs text-amp-accent mt-1 block">{errors.email.message}</span>}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-sans">
                        Subject *
                      </label>
                      <input
                        id="contact-subject"
                        {...register('subject', { required: 'Subject is required' })}
                        className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:border-slate-450 focus:bg-white rounded-xl transition-all font-medium text-slate-800 placeholder-slate-400"
                        placeholder="RFQ inquiry, custom mold dimensions..."
                      />
                      {errors.subject && <span className="text-xs text-amp-accent mt-1 block">{errors.subject.message}</span>}
                    </div>
                    
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-sans">
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        {...register('message', { required: 'Message is required' })}
                        className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:border-slate-450 focus:bg-white rounded-xl transition-all font-medium text-slate-800 resize-none placeholder-slate-400"
                        placeholder="Please include material type, volume requirements, or dynamic limits..."
                      />
                      {errors.message && <span className="text-xs text-amp-accent mt-1 block">{errors.message.message}</span>}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      id="contact-submit"
                      className="px-6 py-3 bg-slate-900 text-white font-extrabold uppercase tracking-widest text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50 cursor-pointer w-full sm:w-auto font-sans btn-hover"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send size={12} className="text-slate-200" />
                          Transmit RFQ
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* Map Bento Block */}
            <FadeIn delay={0.2} className="lg:col-span-2 flex flex-col">
              <div className="flex-1 min-h-[450px] lg:min-h-full border border-slate-200/80 rounded-3xl overflow-hidden relative bg-white satin-card shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14035.021638610533!2d77.0009861!3d28.4266363!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d17fb1204ba69%3A0xc34b7dd41b22bb6!2sAnand%20Motor%20Products%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1574168382616!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '100%', filter: 'grayscale(0.65)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Anand Motor Products Location Map"
                  id="google-map"
                />
              </div>
            </FadeIn>
            
          </div>
        </div>
      </section>
    </>
  );
}
