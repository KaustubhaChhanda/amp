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
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const contactCards = [
  {
    icon: Phone,
    title: 'Phone',
    value: '+91 87429 55535',
    href: 'tel:+918742955535',
    desc: 'Mon-Sat, 9:30 AM - 6:30 PM IST',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'marketing@amp-india.com',
    href: 'mailto:marketing@amp-india.com',
    desc: 'We respond within 24 hours',
  },
  {
    icon: MapPin,
    title: 'Location',
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
        id="contact-hero"
      >
        <div className="absolute inset-0 bg-[url('/images/facility/7hbanner_banner2.jpg')] bg-cover bg-center opacity-15 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-white"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-white/90 font-medium max-w-2xl mx-auto"
          >
            Ready to discuss your automotive component requirements? Our team is here to help.
          </motion.p>
          <div className="mt-6 flex items-center justify-center gap-1.5">
            <div className="w-8 h-1 rounded-full bg-amp-accent-lime" />
            <div className="w-2 h-1 rounded-full bg-white/40" />
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="relative -mt-8 z-10 pb-8" id="contact-cards">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactCards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.1} className="flex flex-col h-full">
                <a
                  href={card.href}
                  target={card.title === 'Location' ? '_blank' : undefined}
                  rel={card.title === 'Location' ? 'noopener noreferrer' : undefined}
                  onMouseMove={handleMouseMove}
                  className="flex flex-col justify-between flex-1 bg-white border border-slate-100 spotlight-card p-6 text-center shadow-md hover:shadow-lg hover:border-amp-primary/45 transition-all group rounded-3xl"
                >
                  <div>
                    <card.icon size={28} className="mx-auto text-amp-primary mb-3 group-hover:scale-110 transition-transform animate-pulse" strokeWidth={1.5} />
                    <h3 className="font-extrabold text-amp-dark text-xs uppercase tracking-wider mb-2">{card.title}</h3>
                    <p className="text-sm text-amp-primary font-bold leading-snug">{card.value}</p>
                  </div>
                  <p className="text-xs text-amp-slate font-semibold mt-4">{card.desc}</p>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="py-16 bg-white" id="contact-form-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch">
            {/* Form */}
            <FadeIn className="lg:col-span-3 flex flex-col justify-between">
              <div className="bg-slate-50/50 p-6 md:p-8 rounded-3xl border border-slate-100/80 shadow-sm flex-1 flex flex-col justify-center">
                <SectionHeading
                  title="Send Us a Message"
                  subtitle="Fill out the form below and our team will get back to you as soon as possible."
                  className="!text-left !mb-8 [&>div:last-child]:!mx-0"
                />

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 p-8 text-center rounded-2xl"
                  >
                    <CheckCircle2 size={48} className="mx-auto text-green-600 mb-4" />
                    <h3 className="text-lg font-bold text-green-800">Message Sent</h3>
                    <p className="text-sm text-green-700 mt-2">
                      Your email client will open with the inquiry details. Thank you for reaching out.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" id="contact-form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          {...register('fullName', { required: 'Full name is required' })}
                          className="w-full px-4 py-3 border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-amp-primary focus:bg-white focus:ring-2 focus:ring-amp-primary/20 rounded-xl transition-all font-medium text-slate-800"
                          placeholder="Your full name"
                        />
                        {errors.fullName && <span className="text-xs text-amp-accent mt-1 block">{errors.fullName.message}</span>}
                      </div>
                      <div>
                        <label htmlFor="contact-company" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Company Name
                        </label>
                        <input
                          id="contact-company"
                          {...register('company')}
                          className="w-full px-4 py-3 border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-amp-primary focus:bg-white focus:ring-2 focus:ring-amp-primary/20 rounded-xl transition-all font-medium text-slate-800"
                          placeholder="Your company"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Phone Number *
                        </label>
                        <input
                          id="contact-phone"
                          {...register('phone', { required: 'Phone number is required' })}
                          className="w-full px-4 py-3 border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-amp-primary focus:bg-white focus:ring-2 focus:ring-amp-primary/20 rounded-xl transition-all font-medium text-slate-800"
                          placeholder="+91 XXXXX XXXXX"
                        />
                        {errors.phone && <span className="text-xs text-amp-accent mt-1 block">{errors.phone.message}</span>}
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email' },
                          })}
                          className="w-full px-4 py-3 border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-amp-primary focus:bg-white focus:ring-2 focus:ring-amp-primary/20 rounded-xl transition-all font-medium text-slate-800"
                          placeholder="your@email.com"
                        />
                        {errors.email && <span className="text-xs text-amp-accent mt-1 block">{errors.email.message}</span>}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Subject *
                      </label>
                      <input
                        id="contact-subject"
                        {...register('subject', { required: 'Subject is required' })}
                        className="w-full px-4 py-3 border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-amp-primary focus:bg-white focus:ring-2 focus:ring-amp-primary/20 rounded-xl transition-all font-medium text-slate-800"
                        placeholder="Product inquiry, partnership, etc."
                      />
                      {errors.subject && <span className="text-xs text-amp-accent mt-1 block">{errors.subject.message}</span>}
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        {...register('message', { required: 'Message is required' })}
                        className="w-full px-4 py-3 border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-amp-primary focus:bg-white focus:ring-2 focus:ring-amp-primary/20 rounded-xl transition-all font-medium text-slate-800 resize-none"
                        placeholder="Tell us about your requirements..."
                      />
                      {errors.message && <span className="text-xs text-amp-accent mt-1 block">{errors.message.message}</span>}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      id="contact-submit"
                      className="px-8 py-3.5 bg-amp-accent-lime hover:bg-amp-accent-lime-hover text-amp-dark font-extrabold uppercase tracking-wider text-sm transition-all rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer w-full sm:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* Map */}
            <FadeIn delay={0.2} className="lg:col-span-2 flex flex-col">
              <div className="flex-1 min-h-[450px] lg:min-h-full border border-slate-100 rounded-3xl overflow-hidden bg-amp-light shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14035.021638610533!2d77.0009861!3d28.4266363!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d17fb1204ba69%3A0xc34b7dd41b22bb6!2sAnand%20Motor%20Products%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1574168382616!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '100%' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Anand Motor Products Location"
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
