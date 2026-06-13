import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  'Corporate': [
    { name: 'About Us', path: '/about' },
    { name: 'Mission & Vision', path: '/about#vision-mission' },
    { name: 'Capabilities', path: '/about#expertise' },
  ],
  'Products': [
    { name: 'Rubber & Rubber-to-Metal', path: '/products?category=Rubber%20%26%20Rubber-to-Metal' },
    { name: 'Sheet Metal Stampings', path: '/products?category=Sheet%20Metal%20Stampings%20%26%20Assemblies' },
    { name: 'Microcellular PU (MCU)', path: '/products?category=Microcellular%20Polyurethane%20(MCU)' },
  ],
  'Quick Links': [
    { name: 'Home', path: '/' },
    { name: 'Products Catalog', path: '/products' },
    { name: 'Contact Us', path: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-400 border-t border-slate-900 bg-grid-minimal-dark overflow-hidden" id="footer">
      {/* Subtle Bottom Ambient Glow */}
      <div className="absolute bottom-0 right-10 w-96 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer (Compact) */}
        <div className="py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 text-xs md:text-sm">
          
          {/* Brand Column */}
          <div className="flex flex-col justify-between gap-2 lg:col-span-2">
            <div>
              <Link to="/" className="inline-block mb-1.5 hover:opacity-95 transition-opacity">
                <div className="bg-white px-3 py-1 rounded-2xl border border-slate-200/50 shadow-md flex items-center w-fit">
                  <img
                    src="/images/logo/logo.png"
                    alt="AMP Logo"
                    className="h-7.5 md:h-9.5 w-auto object-contain"
                  />
                </div>
              </Link>
              <p className="text-xs leading-relaxed max-w-xs text-slate-400 font-semibold">
                India's premier supplier of Antivibration Rubber-to-Metal Bonded and Microcellular PU components. Certified supplier to global automotive OEMs since 1949.
              </p>
            </div>
            
            {/* Social Link with official Facebook brand blue icon */}
            <div className="flex items-center gap-2 mt-0.5">
              <a
                href="https://www.facebook.com/AnandMotorProducts"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center text-[#1877F2] bg-white hover:bg-slate-100 rounded-full transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="pt-1.5 md:pt-3">
              <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-1.5 font-mono">
                {title}
              </h4>
              <ul className="space-y-0.5 text-xs">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-slate-400 hover:text-white font-semibold transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight
                        size={9}
                        className="opacity-0 group-hover:opacity-100 transition-all text-white -translate-y-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="text-xs pt-1.5 md:pt-3">
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-1.5 font-mono">
              Contact Us
            </h4>
            <ul className="space-y-1">
              <li>
                <a
                  href="tel:+918742955535"
                  className="flex items-center gap-2 text-slate-400 hover:text-white font-semibold transition-colors"
                >
                  <Phone size={11} className="text-white flex-shrink-0" />
                  <span>+91 87429 55535</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:marketing@amp-india.com"
                  className="flex items-center gap-2 text-slate-400 hover:text-white font-semibold transition-colors"
                >
                  <Mail size={11} className="text-white flex-shrink-0" />
                  <span>marketing@amp-india.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-400 font-semibold">
                <MapPin size={11} className="text-white flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">38, Km Stone, Gurugram, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 py-1.5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs md:text-xs text-slate-500 font-semibold">
            &copy; {new Date().getFullYear()} Anand Motor Products. All rights reserved.
          </p>
          <div className="flex items-center gap-2 bg-slate-800/35 px-3 py-0.5 rounded-lg border border-slate-800">
            <span className="text-xs md:text-xs text-slate-400 font-semibold">A Division of</span>
            <img
              src="/images/logo/footer-logo.png"
              alt="AMP Group Logo"
              className="h-4 w-auto object-contain opacity-95"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
