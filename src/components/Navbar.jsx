import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <header 
      className={cn(
        "fixed left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl rounded-2xl glass-dock transition-all duration-300 shadow-lg",
        scrolled 
          ? "top-3 py-1.5 px-4 md:px-6 bg-white/90 border-slate-200 shadow-slate-200/50" 
          : "top-5 py-2.5 px-6 bg-white/70 border-slate-100"
      )}
      id="main-navbar"
    >
      <div className="mx-auto">
        <div className="flex items-center justify-between h-13 md:h-15">
          
          {/* Badged Logo Area for perfect visibility */}
          <Link to="/" className="flex-shrink-0 flex items-center hover:scale-[1.01] transition-transform duration-300" id="nav-logo">
            <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200/50 shadow-md flex items-center">
              <img
                src="/images/logo/logo.png"
                alt="Anand Motor Products Logo"
                className="h-7.5 md:h-9.5 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1.5 relative z-10" id="desktop-nav">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  id={`nav-${link.name.toLowerCase()}`}
                  className={cn(
                    'px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors duration-200 relative rounded-lg',
                    isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-amp-primary rounded-lg -z-0"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </Link>
              );
            })}
            
            <Link
              to="/contact"
              id="nav-cta-quote"
              className="ml-4 px-4.5 py-2 bg-slate-900 text-white font-extrabold text-xs uppercase tracking-widest rounded-lg shadow-sm flex items-center gap-1 cursor-pointer btn-hover"
            >
              Request a Quote
              <ChevronRight size={11} className="text-white" />
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
            className="lg:hidden fixed inset-x-0 top-[76px] mx-4 bg-white/98 backdrop-blur-md border border-slate-250 shadow-2xl rounded-2xl p-4 overflow-hidden z-40"
          >
            <nav className="flex flex-col gap-1.5" id="mobile-nav">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'px-4 py-2.5 text-xs font-bold tracking-wider uppercase border-b border-slate-100 last:border-0 transition-colors rounded-lg',
                    location.pathname === link.path
                      ? 'text-white bg-amp-primary font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMobileOpen(false)}
                className="mt-3 px-5 py-3 bg-slate-900 text-white text-center font-extrabold text-xs uppercase tracking-widest shadow-sm rounded-xl btn-hover"
              >
                Request a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
