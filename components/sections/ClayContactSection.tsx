'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, MapPin, Mail, Phone, CheckCircle } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import ClayButton from '@/components/ClayButton';

export default function ClayContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@example.com',
      href: 'mailto:hello@example.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+55 (11) 99999-9999',
      href: 'tel:+5511999999999',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'São Paulo, Brazil',
      href: '#',
    },
  ];

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com', label: 'GitHub', color: 'from-[#FFD4B8] to-[#FFC09D]' },
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'from-[#C8E6F5] to-[#A7D8EA]' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter', color: 'from-[#E5D4FF] to-[#D5BFFF]' },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 md:py-32 bg-gradient-to-br from-[#F0F9FF] via-[#FFF8F3] to-[#FAF7FF] overflow-hidden"
    >
      {/* Floating Background Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 right-[20%] w-96 h-96 bg-gradient-to-br from-[#E5D4FF] to-[#D5BFFF] rounded-[120px] opacity-25 blur-3xl"
          animate={{
            y: [0, -40, 0],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-32 left-[15%] w-80 h-80 bg-gradient-to-br from-[#B3F5CC] to-[#8DE9B3] rounded-[100px] opacity-20 blur-3xl"
          animate={{
            y: [0, 50, 0],
            rotate: [0, -60, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            type: 'spring',
            stiffness: 80,
          }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black text-[#6B5B4F] mb-6">
            Get In <span className="bg-gradient-to-r from-[#FFAC82] via-[#C5AAFF] to-[#7EC8E3] bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-xl md:text-2xl text-[#8B7B6F] max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? Let's create something amazing together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              type: 'spring',
              stiffness: 80,
            }}
          >
            <motion.div
              className="bg-gradient-to-br from-[#FFF1D0] to-[#FFE9B8] rounded-[48px] p-8 md:p-12"
              style={{
                boxShadow: '16px 16px 32px rgba(255,233,184,0.3), -12px -12px 28px rgba(255,255,255,0.9), inset 2px 2px 4px rgba(255,255,255,0.6)',
              }}
            >
              <h3 className="text-3xl font-bold text-[#6B5B4F] mb-8">Send a Message</h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    <CheckCircle className="w-20 h-20 text-[#66DD9A] mb-6" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-[#6B5B4F] mb-2">Message Sent!</h4>
                  <p className="text-[#8B7B6F]">I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-[#6B5B4F] mb-2">
                      Your Name
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 bg-white/40 rounded-[24px] text-[#6B5B4F] font-medium placeholder-[#A89B8F] focus:outline-none"
                      style={{
                        boxShadow: 'inset 4px 4px 8px rgba(255,233,184,0.3), inset -2px -2px 6px rgba(255,255,255,0.8)',
                      }}
                      placeholder="John Doe"
                      whileFocus={{
                        scale: 1.02,
                        boxShadow: 'inset 6px 6px 12px rgba(255,233,184,0.4), inset -3px -3px 8px rgba(255,255,255,0.9)',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                      }}
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#6B5B4F] mb-2">
                      Your Email
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-6 py-4 bg-white/40 rounded-[24px] text-[#6B5B4F] font-medium placeholder-[#A89B8F] focus:outline-none"
                      style={{
                        boxShadow: 'inset 4px 4px 8px rgba(255,233,184,0.3), inset -2px -2px 6px rgba(255,255,255,0.8)',
                      }}
                      placeholder="john@example.com"
                      whileFocus={{
                        scale: 1.02,
                        boxShadow: 'inset 6px 6px 12px rgba(255,233,184,0.4), inset -3px -3px 8px rgba(255,255,255,0.9)',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                      }}
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#6B5B4F] mb-2">
                      Your Message
                    </label>
                    <motion.textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-6 py-4 bg-white/40 rounded-[24px] text-[#6B5B4F] font-medium placeholder-[#A89B8F] focus:outline-none resize-none"
                      style={{
                        boxShadow: 'inset 4px 4px 8px rgba(255,233,184,0.3), inset -2px -2px 6px rgba(255,255,255,0.8)',
                      }}
                      placeholder="Tell me about your project..."
                      whileFocus={{
                        scale: 1.02,
                        boxShadow: 'inset 6px 6px 12px rgba(255,233,184,0.4), inset -3px -3px 8px rgba(255,255,255,0.9)',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <ClayButton variant="mint" size="lg" className="w-full">
                    <span className="flex items-center justify-center gap-3">
                      <span>Send Message</span>
                      <Send className="w-5 h-5" />
                    </span>
                  </ClayButton>
                </form>
              )}
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              type: 'spring',
              stiffness: 80,
            }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1,
                      type: 'spring',
                      stiffness: 100,
                    }}
                  >
                    <motion.div
                      className="bg-gradient-to-br from-[#C8E6F5] to-[#A7D8EA] rounded-[32px] p-6 flex items-center gap-4"
                      style={{
                        boxShadow: '10px 10px 20px rgba(126,200,227,0.3), -8px -8px 18px rgba(255,255,255,0.9)',
                      }}
                      whileHover={{
                        y: -6,
                        scale: 1.02,
                        boxShadow: '12px 12px 24px rgba(126,200,227,0.4), -10px -10px 22px rgba(255,255,255,1)',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <motion.div
                        className="w-14 h-14 bg-white/40 rounded-[18px] flex items-center justify-center flex-shrink-0"
                        style={{
                          boxShadow: '4px 4px 8px rgba(126,200,227,0.2), -3px -3px 6px rgba(255,255,255,0.9)',
                        }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-6 h-6 text-[#6B5B4F]" />
                      </motion.div>
                      <div>
                        <p className="text-sm font-semibold text-[#8B7B6F]">{info.label}</p>
                        <p className="text-lg font-bold text-[#6B5B4F]">{info.value}</p>
                      </div>
                    </motion.div>
                  </motion.a>
                );
              })}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.4,
                type: 'spring',
                stiffness: 80,
              }}
            >
              <h4 className="text-2xl font-bold text-[#6B5B4F] mb-6">Connect With Me</h4>
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.5 + index * 0.1,
                        type: 'spring',
                        stiffness: 300,
                      }}
                    >
                      <motion.div
                        className={`aspect-square bg-gradient-to-br ${social.color} rounded-[28px] flex flex-col items-center justify-center gap-2`}
                        style={{
                          boxShadow: '8px 8px 16px rgba(0,0,0,0.1), -6px -6px 14px rgba(255,255,255,0.9)',
                        }}
                        whileHover={{
                          y: -8,
                          scale: 1.05,
                          boxShadow: '12px 12px 24px rgba(0,0,0,0.15), -8px -8px 18px rgba(255,255,255,1)',
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        <Icon className="w-8 h-8 text-[#6B5B4F]" />
                        <span className="text-xs font-bold text-[#6B5B4F]">{social.label}</span>
                      </motion.div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.6,
                type: 'spring',
                stiffness: 80,
              }}
              className="bg-gradient-to-br from-[#E5D4FF] to-[#D5BFFF] rounded-[40px] p-8"
              style={{
                boxShadow: '12px 12px 24px rgba(197,170,255,0.3), -8px -8px 20px rgba(255,255,255,0.9)',
              }}
            >
              <h4 className="text-2xl font-bold text-[#6B5B4F] mb-3">Let's Work Together!</h4>
              <p className="text-[#8B7B6F] leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(107,91,79,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>
    </section>
  );
}
