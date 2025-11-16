'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef<HTMLElement>(null);

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section with more accurate offset
      const sections = navLinks.map((link) => link.href.replace('#', ''));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Consider section active when it's in the top third of viewport
          return rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);
    
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed nav height
      
      gsap.to(window, {
        scrollTo: { y: offsetTop, autoKill: false },
        duration: 1,
        ease: 'power3.inOut',
      });
      
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
      >
        Skip to main content
      </a>

      <motion.nav
        ref={navRef}
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-neutral-950/80 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        {/* Scroll Progress Bar */}
        <motion.div
          role="progressbar"
          aria-label="Page scroll progress"
          aria-valuenow={Math.round(scrollYProgress.get() * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 origin-left"
          style={{ width: progressWidth }}
        >
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary-400 shadow-lg shadow-primary-500/50"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        <div className="container-padding mx-auto">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="text-2xl font-bold text-gradient relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-magnetic
            >
              <span className="relative z-10">Portfolio</span>
              
              {/* Logo glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 blur-xl opacity-0 group-hover:opacity-50 transition-opacity -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.replace('#', '');
                
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className={`relative text-sm font-medium transition-colors group ${
                      isActive
                        ? 'text-primary-400'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                    whileHover={{ y: -2 }}
                    data-magnetic
                  >
                    {link.name}
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    
                    {/* Hover underline */}
                    {!isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500/50 to-accent-500/50 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block relative overflow-hidden px-6 py-2.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-shadow group"
              data-magnetic
            >
              <span className="relative z-10">Let's Talk</span>
              
              {/* Button hover effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-white transition-colors relative z-50 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-neutral-950/95 backdrop-blur-2xl z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              id="mobile-menu"
              role="menu"
              aria-label="Mobile navigation menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-20 right-0 bottom-0 w-full max-w-sm bg-neutral-900/95 backdrop-blur-2xl border-l border-white/10 z-40 md:hidden overflow-y-auto"
            >
              <div className="flex flex-col gap-2 p-6">
                {/* Navigation Links */}
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.05 * index }}
                      className={`relative px-6 py-4 rounded-xl text-lg font-medium transition-all overflow-hidden group ${
                        isActive
                          ? 'bg-primary-500/20 text-primary-400'
                          : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 flex items-center justify-between">
                        {link.name}
                        {isActive && (
                          <motion.div
                            className="w-2 h-2 rounded-full bg-primary-400"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />
                        )}
                      </span>
                      
                      {/* Hover gradient */}
                      {!isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      )}
                    </motion.a>
                  );
                })}
                
                {/* CTA Button */}
                <motion.a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * navLinks.length }}
                  whileTap={{ scale: 0.95 }}
                  className="relative mt-4 px-6 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white text-center font-medium shadow-lg shadow-primary-500/30 overflow-hidden group"
                >
                  <span className="relative z-10">Let's Talk</span>
                  
                  {/* Button animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>

                {/* Decorative Elements */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-sm text-neutral-500 text-center">
                    Made with ❤️ using Next.js
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
