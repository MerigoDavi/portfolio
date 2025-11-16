'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setStatus('success');
    setFormState({ name: '', email: '', message: '' });
    
    setTimeout(() => setStatus('idle'), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  } as const;

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'contact@example.com', href: 'mailto:contact@example.com' },
    { icon: Phone, label: 'Telefone', value: '+55 (11) 98765-4321', href: 'tel:+5511987654321' },
    { icon: MapPin, label: 'Localização', value: 'São Paulo, Brasil', href: null },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-slate-900 py-24 md:py-32"
    >
      <div className="container-padding mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Entre em <span className="text-gradient">Contato</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Tem um projeto em mente? Vamos conversar e criar algo incrível juntos!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-12 lg:grid-cols-5"
        >
          {/* Informações de contato */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 lg:col-span-2"
          >
            <div className="glass rounded-3xl p-8">
              <h3 className="mb-6 text-2xl font-bold text-white">
                Informações
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <motion.div
                    key={info.label}
                    className="group flex items-start gap-4"
                    whileHover={{ x: 5 }}
                  >
                    <div className="rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 p-3">
                      <info.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-400">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="font-medium text-white transition-colors hover:text-primary-400"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-medium text-white">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Disponibilidade */}
              <div className="mt-8 border-t border-slate-700 pt-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-green-500"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </div>
                  <p className="text-sm text-slate-300">
                    Disponível para novos projetos
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulário */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8">
              <div className="space-y-6">
                {/* Nome */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Nome
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 outline-none ring-2 ring-transparent transition-all focus:ring-primary-500"
                    placeholder="Seu nome"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Email
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 outline-none ring-2 ring-transparent transition-all focus:ring-primary-500"
                    placeholder="seu@email.com"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                {/* Mensagem */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Mensagem
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full resize-none rounded-xl bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 outline-none ring-2 ring-transparent transition-all focus:ring-primary-500"
                    placeholder="Conte-me sobre seu projeto..."
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                {/* Botão de envio */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 px-6 py-4 font-semibold text-white transition-all hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] disabled:opacity-50"
                  whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                  whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === 'sending' && 'Enviando...'}
                    {status === 'success' && 'Enviado com sucesso!'}
                    {(status === 'idle' || status === 'error') && (
                      <>
                        Enviar Mensagem
                        <Send className="h-5 w-5" />
                      </>
                    )}
                  </span>

                  {/* Animação de hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                {/* Mensagem de status */}
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm text-green-400"
                  >
                    Mensagem enviada! Entrarei em contato em breve.
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Background decorativo */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/10 blur-[120px]" />
    </section>
  );
}
