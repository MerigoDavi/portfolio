'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Check, X, Loader2, Github, Linkedin, Twitter } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFadeInScroll } from '@/lib/hooks/useScrollAnimations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useFadeInScroll('up', 60);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Form elements stagger animation
      const formElements = section.querySelectorAll('.form-element');
      
      gsap.from(formElements, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // Contact info cards animation
      const infoCards = section.querySelectorAll('.contact-info-card');
      
      gsap.from(infoCards, {
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-info-container',
          start: 'top 80%',
          once: true,
        },
      });

      // Social links animation
      const socialLinks = section.querySelectorAll('.social-link');
      
      gsap.from(socialLinks, {
        scale: 0,
        rotation: -180,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.social-links-container',
          start: 'top 85%',
          once: true,
        },
      });

    }, section);

    return () => ctx.revert();
  }, []);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formState.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formState.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    validateForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });
    
    if (!validateForm()) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
      return;
    }

    setStatus('sending');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setStatus('success');
    setFormState({ name: '', email: '', message: '' });
    setTouched({});
    setErrors({});
    
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (touched[name] && errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const contactInfo = [
    { 
      icon: Mail, 
      label: 'Email', 
      value: 'davi.ferreira@sou.inteli.edu.br', 
      href: 'mailto:davi.ferreira@sou.inteli.edu.br',
      color: 'from-blue-500 to-cyan-500',
    },
    { 
      icon: Phone, 
      label: 'Telefone', 
      value: '+55 12 98175 7449', 
      href: 'tel:+5512981757449',
      color: 'from-green-500 to-emerald-500',
    },
    { 
      icon: MapPin, 
      label: 'Localização', 
      value: 'São Paulo, SP, Brasil', 
      href: null,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/MerigoDavi', label: 'GitHub', color: 'hover:text-[#333]' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/DaviOliveiraFerreira', label: 'LinkedIn', color: 'hover:text-[#0077B5]' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-[#1DA1F2]' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-neutral-950 section-spacing"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 -left-48 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute bottom-20 -right-48 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-[150px]"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container-padding mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 rounded-full glass text-sm font-semibold text-primary-300 border border-primary-500/20">
              Entre em Contato
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Vamos Trabalhar <span className="text-gradient">Juntos</span>
          </h2>
          
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Tem um projeto em mente? Vamos criar algo incrível juntos
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="space-y-6 lg:col-span-2 contact-info-container">
            <div className="glass-strong backdrop-blur-2xl rounded-3xl p-8 border border-white/10">
              <h3 className="mb-8 text-2xl font-bold text-white">
                Informações de Contato
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <motion.div
                    key={info.label}
                    className="contact-info-card group"
                    whileHover={{ x: 5 }}
                    data-magnetic
                  >
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className={`rounded-xl bg-gradient-to-br ${info.color} p-3 shadow-lg relative overflow-hidden`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <info.icon className="h-5 w-5 text-white relative z-10" />
                        
                        {/* Icon glow */}
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ scale: 0, opacity: 1 }}
                          whileHover={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        />
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-sm text-neutral-400 mb-1">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="font-medium text-white transition-colors hover:text-gradient"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium text-white">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Availability Status */}
              <div className="mt-8 border-t border-neutral-800 pt-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-green-500"
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [1, 0, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </div>
                  <p className="text-sm text-neutral-300">
                    Disponível para novos projetos
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 border-t border-neutral-800 pt-6 social-links-container">
                <p className="text-sm text-neutral-400 mb-4">Me siga em</p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link group relative"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      data-magnetic
                    >
                      <div className={`glass p-3 rounded-xl border border-white/10 hover:border-white/20 transition-all ${social.color}`}>
                        <social.icon className="w-5 h-5" />
                      </div>
                      
                      {/* Tooltip */}
                      <motion.div
                        className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-neutral-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                        initial={{ y: 5 }}
                        whileHover={{ y: 0 }}
                      >
                        {social.label}
                      </motion.div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form ref={formRef} onSubmit={handleSubmit} className="glass-strong backdrop-blur-2xl rounded-3xl p-8 border border-white/10">
              <div className="space-y-6">
                {/* Name Field */}
                <div className="form-element">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-neutral-300"
                  >
                    Nome <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => {
                        setFocusedField(null);
                        handleBlur('name');
                      }}
                      className={`w-full rounded-xl bg-neutral-900/50 px-4 py-3.5 text-white placeholder-neutral-500 outline-none ring-2 transition-all ${
                        errors.name && touched.name
                          ? 'ring-red-500/50 focus:ring-red-500'
                          : focusedField === 'name'
                          ? 'ring-primary-500'
                          : 'ring-transparent focus:ring-primary-500'
                      }`}
                      placeholder="Seu nome"
                      whileFocus={{ scale: 1.01 }}
                    />
                    
                    {/* Field icon */}
                    <AnimatePresence>
                      {errors.name && touched.name && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                          <X className="w-5 h-5 text-red-400" />
                        </motion.div>
                      )}
                      {formState.name && !errors.name && touched.name && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                          <Check className="w-5 h-5 text-green-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence>
                    {errors.name && touched.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-red-400"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email Field */}
                <div className="form-element">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-neutral-300"
                  >
                    Email <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => {
                        setFocusedField(null);
                        handleBlur('email');
                      }}
                      className={`w-full rounded-xl bg-neutral-900/50 px-4 py-3.5 text-white placeholder-neutral-500 outline-none ring-2 transition-all ${
                        errors.email && touched.email
                          ? 'ring-red-500/50 focus:ring-red-500'
                          : focusedField === 'email'
                          ? 'ring-primary-500'
                          : 'ring-transparent focus:ring-primary-500'
                      }`}
                      placeholder="seu@email.com"
                      whileFocus={{ scale: 1.01 }}
                    />
                    
                    <AnimatePresence>
                      {errors.email && touched.email && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                          <X className="w-5 h-5 text-red-400" />
                        </motion.div>
                      )}
                      {formState.email && !errors.email && touched.email && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                          <Check className="w-5 h-5 text-green-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence>
                    {errors.email && touched.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-red-400"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Message Field */}
                <div className="form-element">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-neutral-300"
                  >
                    Mensagem <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => {
                        setFocusedField(null);
                        handleBlur('message');
                      }}
                      rows={6}
                      className={`w-full resize-none rounded-xl bg-neutral-900/50 px-4 py-3.5 text-white placeholder-neutral-500 outline-none ring-2 transition-all ${
                        errors.message && touched.message
                          ? 'ring-red-500/50 focus:ring-red-500'
                          : focusedField === 'message'
                          ? 'ring-primary-500'
                          : 'ring-transparent focus:ring-primary-500'
                      }`}
                      placeholder="Conte-me sobre seu projeto..."
                      whileFocus={{ scale: 1.01 }}
                    />
                    
                    {/* Character count */}
                    <div className="absolute bottom-3 right-3 text-xs text-neutral-500">
                      {formState.message.length} / 500
                    </div>
                  </div>
                  <AnimatePresence>
                    {errors.message && touched.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-red-400"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit Button */}
                <div className="form-element">
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 px-6 py-4 font-semibold text-white transition-all hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={status === 'sending' ? {} : { scale: 1.02 }}
                    whileTap={status === 'sending' ? {} : { scale: 0.98 }}
                    data-magnetic
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {status === 'sending' && (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Enviando...
                        </>
                      )}
                      {status === 'success' && (
                        <>
                          <Check className="h-5 w-5" />
                          Mensagem Enviada!
                        </>
                      )}
                      {(status === 'idle' || status === 'error') && (
                        <>
                          Enviar Mensagem
                          <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>

                    {/* Hover animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-500"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </div>

                {/* Status Messages */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      className="p-4 rounded-xl bg-green-500/10 border border-green-500/20"
                    >
                      <p className="text-center text-sm text-green-400 flex items-center justify-center gap-2">
                        <Check className="w-4 h-4" />
                        Obrigado! Retornarei em breve.
                      </p>
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      className="p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                    >
                      <p className="text-center text-sm text-red-400 flex items-center justify-center gap-2">
                        <X className="w-4 h-4" />
                        Por favor, corrija os erros acima
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none" />
    </section>
  );
}
