'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMail, HiHeart } from 'react-icons/hi';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/MerigoDavi', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/davioliveiraferreira/', label: 'LinkedIn' },
    { icon: HiMail, href: 'mailto:merigodavi.dev@gmail.com', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#FFF8E7] via-[#E0F2FE] to-[#FAF7FF]">
      <div className="container-padding mx-auto max-w-7xl py-16">
        <div className="grid gap-12 md:grid-cols-3 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <motion.div
              className="inline-block px-6 py-3 bg-gradient-to-br from-[#E5D4FF] to-[#D5BFFF] rounded-[24px]"
              style={{
                boxShadow: '8px 8px 16px rgba(197,170,255,0.3), -6px -6px 14px rgba(255,255,255,0.9)',
              }}
            >
              <h3 className="text-3xl font-black text-[#6B5B4F]">Portfolio</h3>
            </motion.div>
            <p className="text-[#8B7B6F] leading-relaxed max-w-xs font-medium">
              Transformando ideias em experiências digitais memoráveis com código limpo e design excepcional.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-[#6B5B4F] font-bold text-xl mb-4">Links Rápidos</h4>
            <div className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ x: 5 }}
                  className="text-[#8B7B6F] hover:text-[#6B5B4F] transition-colors inline-flex items-center gap-2 font-semibold"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFAC82]" />
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-[#6B5B4F] font-bold text-xl mb-4">Conecte-se</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 bg-gradient-to-br from-[#C8E6F5] to-[#A7D8EA] rounded-full flex items-center justify-center text-[#6B5B4F]"
                  style={{
                    boxShadow: '6px 6px 12px rgba(126,200,227,0.3), -4px -4px 10px rgba(255,255,255,0.9)',
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
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
            <p className="text-sm text-[#8B7B6F] mt-6 font-medium">
              merigodavi.dev@gmail.com<br />
              São Paulo, Brasil
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#C5AAFF]/30 to-transparent mb-8 rounded-full"
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-sm text-[#8B7B6F] font-semibold"
          >
            <span>© {currentYear} Feito com</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <HiHeart className="w-4 h-4 text-[#FFAC82]" />
            </motion.div>
            <span>por Você</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs text-[#A89B8F] font-medium"
          >
            Next.js • React • Tailwind CSS • Framer Motion
          </motion.p>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="w-12 h-12 bg-gradient-to-br from-[#B3F5CC] to-[#8DE9B3] rounded-full flex items-center justify-center text-[#6B5B4F]"
            style={{
              boxShadow: '8px 8px 16px rgba(102,221,154,0.3), -6px -6px 14px rgba(255,255,255,0.9)',
            }}
            whileHover={{ 
              scale: 1.1, 
              y: -5,
              boxShadow: '10px 10px 20px rgba(102,221,154,0.4), -8px -8px 18px rgba(255,255,255,1)',
            }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 17,
            }}
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Static Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#FFD4B8] to-[#FFC09D] rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[#E5D4FF] to-[#D5BFFF] rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(107,91,79,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>
    </footer>
  );
}
