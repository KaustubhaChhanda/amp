import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-t-2 border-t-amp-accent-lime bg-white shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13 md:h-15">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center hover:opacity-90 transition-opacity" id="nav-logo">
            <img
              src="/images/logo/logo.png"
              alt="Anand Motor Products Logo"
              className="h-9 md:h-11.5 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" id="desktop-nav">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  id={`nav-${link.name.toLowerCase()}`}
                  className={cn(
                    'px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-200 relative pb-3 mt-1.5',
                    isActive ? 'text-amp-primary font-bold' : 'text-slate-600 hover:text-amp-primary'
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute bottom-0 left-4 right-4 h-0.75 bg-amp-primary"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </Link>
              );
            })}
            <Link
              to="/contact"
              id="nav-cta-quote"
              className="ml-4 px-6 py-2 bg-amp-accent-lime hover:bg-amp-accent-lime-hover text-amp-dark font-bold text-xs uppercase tracking-wider rounded-full shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-1.5 group"
            >
              Request a Quote
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-amp-dark hover:text-amp-primary transition-colors"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 top-[52px] bg-white/98 backdrop-blur-md transition-all duration-300 border-t border-amp-border/20 shadow-xl',
          isMobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <nav className="flex flex-col p-6 gap-2" id="mobile-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                'px-4 py-3 text-lg font-medium tracking-wide uppercase border-b border-amp-border/30 transition-colors',
                location.pathname === link.path
                  ? 'text-amp-primary font-bold'
                  : 'text-slate-600 hover:text-amp-primary'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsMobileOpen(false)}
            className="mt-4 px-6 py-3 bg-amp-accent-lime hover:bg-amp-accent-lime-hover text-amp-dark text-center font-bold uppercase tracking-wider shadow-sm rounded-full transition-all"
          >
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
