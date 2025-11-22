'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

export default function ClayNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 248, 231, 0)', 'rgba(255, 248, 231, 0.95)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { Icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
    { Icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { Icon: HiMail, href: 'mailto:contact@example.com', label: 'Email' },
  ];

  return (
    <>
      <motion.header
        style={{ backgroundColor }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3 backdrop-blur-xl' : 'py-6'
        }`}
      >
        <nav className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              className="relative z-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="px-6 py-3 bg-gradient-to-br from-[#E5D4FF] to-[#D5BFFF] rounded-[24px] font-black text-xl text-[#6B5B4F]"
                style={{
                  boxShadow: isScrolled
                    ? '6px 6px 12px rgba(197,170,255,0.3), -4px -4px 10px rgba(255,255,255,0.9)'
                    : '8px 8px 16px rgba(197,170,255,0.3), -6px -6px 14px rgba(255,255,255,0.9)',
                }}
                whileHover={{
                  boxShadow: '10px 10px 20px rgba(197,170,255,0.4), -8px -8px 18px rgba(255,255,255,1)',
                }}
              >
                Portfolio
              </motion.div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  className="relative px-5 py-2.5 text-[#6B5B4F] font-semibold rounded-[20px] transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className="relative z-10"
                    whileHover={{ color: '#6B5B4F' }}
                  >
                    {item.label}
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#FFF1D0] to-[#FFE9B8] rounded-[20px] opacity-0"
                    style={{
                      boxShadow: '6px 6px 12px rgba(255,233,184,0.3), -4px -4px 10px rgba(255,255,255,0.9)',
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Social Links - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-gradient-to-br from-[#C8E6F5] to-[#A7D8EA] rounded-full flex items-center justify-center text-[#6B5B4F]"
                  style={{
                    boxShadow: '6px 6px 12px rgba(126,200,227,0.3), -4px -4px 10px rgba(255,255,255,0.9)',
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -3,
                    boxShadow: '8px 8px 16px rgba(126,200,227,0.4), -6px -6px 14px rgba(255,255,255,1)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 17,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative z-50 w-12 h-12 bg-gradient-to-br from-[#FFD4B8] to-[#FFC09D] rounded-full flex items-center justify-center text-[#6B5B4F]"
              style={{
                boxShadow: '6px 6px 12px rgba(255,162,110,0.3), -4px -4px 10px rgba(255,255,255,0.9)',
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '8px 8px 16px rgba(255,162,110,0.4), -6px -6px 14px rgba(255,255,255,1)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          x: isMenuOpen ? 0 : '100%',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        className="fixed inset-0 z-40 md:hidden bg-gradient-to-br from-[#FFF8E7] to-[#E0F2FE]"
        style={{ pointerEvents: isMenuOpen ? 'auto' : 'none' }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: isMenuOpen ? 1 : 0,
                x: isMenuOpen ? 0 : 50,
              }}
              transition={{
                delay: index * 0.1,
                type: 'spring',
                stiffness: 200,
              }}
              className="w-full max-w-xs"
            >
              <motion.div
                className="px-8 py-4 bg-gradient-to-br from-[#FFD4B8] to-[#FFC09D] rounded-[32px] text-center font-bold text-xl text-[#6B5B4F]"
                style={{
                  boxShadow: '12px 12px 24px rgba(255,162,110,0.3), -8px -8px 20px rgba(255,255,255,0.9)',
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: '16px 16px 32px rgba(255,162,110,0.4), -12px -12px 28px rgba(255,255,255,1)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 17,
                }}
              >
                {item.label}
              </motion.div>
            </motion.a>
          ))}

          {/* Social Links - Mobile */}
          <div className="flex items-center gap-4 mt-8">
            {socialLinks.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: isMenuOpen ? 1 : 0,
                  scale: isMenuOpen ? 1 : 0.5,
                }}
                transition={{
                  delay: 0.5,
                  type: 'spring',
                  stiffness: 300,
                }}
                className="w-14 h-14 bg-gradient-to-br from-[#E5D4FF] to-[#D5BFFF] rounded-full flex items-center justify-center text-[#6B5B4F]"
                style={{
                  boxShadow: '8px 8px 16px rgba(197,170,255,0.3), -6px -6px 14px rgba(255,255,255,0.9)',
                }}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
