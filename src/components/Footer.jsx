import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  'Corporate': [
    { name: 'About Us', path: '/about' },
    { name: 'Mission & Vision', path: '/about' },
    { name: 'History & Achievements', path: '/about' },
  ],
  'Products': [
    { name: 'Rubber & Rubber-to-Metal', path: '/products' },
    { name: 'Sheet Metal Stampings', path: '/products' },
    { name: 'Microcellular PU (MCU)', path: '/products' },
  ],
  'Quick Links': [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Contact Us', path: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-amp-border text-amp-slate/85" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 text-xs md:text-sm">
          {/* Brand Column */}
          <div className="flex flex-col justify-between gap-4">
            <div>
              <Link to="/" className="inline-block mb-3 hover:opacity-90 transition-opacity">
                <img
                  src="/images/logo/logo.png"
                  alt="AMP Logo"
                  className="h-10.5 w-auto object-contain"
                />
              </Link>
              <p className="text-xs leading-relaxed max-w-xs text-amp-slate font-medium">
                India's leading supplier of Antivibration Rubber-to-Metal Bonded components. Trusted by OEMs worldwide since 1978.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/AnandMotorProducts"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center border border-amp-border text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2]/10 rounded-full transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-amp-dark font-bold text-xs uppercase tracking-wider mb-3.5">
                {title}
              </h4>
              <ul className="space-y-2 text-xs">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-amp-slate hover:text-amp-primary font-medium transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight
                        size={10}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column (Merged) */}
          <div className="text-xs">
            <h4 className="text-amp-dark font-bold text-xs uppercase tracking-wider mb-3.5">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+918742955535"
                  className="flex items-center gap-2 text-amp-slate hover:text-amp-primary font-medium transition-colors"
                >
                  <Phone size={13} className="text-amp-accent flex-shrink-0" />
                  <span>+91 87429 55535</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:marketing@amp-india.com"
                  className="flex items-center gap-2 text-amp-slate hover:text-amp-primary font-medium transition-colors"
                >
                  <Mail size={13} className="text-amp-accent flex-shrink-0" />
                  <span>marketing@amp-india.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-amp-slate font-medium">
                <MapPin size={13} className="text-amp-accent flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">38, Km Stone, NH-8, Khandsa Rd, Gurugram, Haryana 122004, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amp-border/60 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] md:text-xs text-amp-muted font-medium">
            &copy; 2025 Anand Motor Products. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] md:text-xs text-amp-muted font-medium">A Division of</span>
            <img
              src="/images/logo/footer-logo.png"
              alt="AMP Group Logo"
              className="h-4 w-auto object-contain opacity-75"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
