'use client';

import { motion } from 'framer-motion';
import { Code2, Palette, Zap, Users } from 'lucide-react';

export default function ClayAboutSection() {
  const skills = [
    {
      icon: Code2,
      title: 'Full-Stack Development',
      description: 'Building robust applications with modern technologies',
      color: 'from-[#C8E6F5] to-[#A7D8EA]',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Creating beautiful and intuitive user experiences',
      color: 'from-[#E5D4FF] to-[#D5BFFF]',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing for speed and efficiency',
      color: 'from-[#B3F5CC] to-[#8DE9B3]',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working effectively in team environments',
      color: 'from-[#FFD4B8] to-[#FFC09D]',
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen py-24 md:py-32 bg-gradient-to-br from-[#F0F9FF] via-[#FAF7FF] to-[#FFF8F3] overflow-hidden"
    >
      {/* Floating Background Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <motion.div
          className="absolute top-40 right-[20%] w-72 h-72 bg-gradient-to-br from-[#FFD4B8] to-[#FFC09D] rounded-[90px] blur-3xl"
          animate={{
            y: [0, -40, 0],
            rotate: [0, 60, 0],
          }}
          transition={{
            duration: 22,
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
            About <span className="bg-gradient-to-r from-[#C5AAFF] to-[#7EC8E3] bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl md:text-2xl text-[#8B7B6F] max-w-3xl mx-auto leading-relaxed">
            A passionate developer crafting digital experiences with care and precision
          </p>
        </motion.div>

        {/* Main About Card - Floating */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            type: 'spring',
            stiffness: 60,
          }}
          className="mb-20"
        >
          <motion.div
            className="bg-gradient-to-br from-[#FFF1D0] to-[#FFE9B8] rounded-[48px] p-8 md:p-16"
            style={{
              boxShadow: '16px 16px 32px rgba(255,233,184,0.3), -12px -12px 28px rgba(255,255,255,0.9), inset 2px 2px 4px rgba(255,255,255,0.6)',
            }}
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <p className="text-2xl md:text-3xl text-[#6B5B4F] leading-relaxed font-medium">
              I'm a creative developer who loves building things that live on the internet. 
              My focus is on creating <span className="font-bold">exceptional digital experiences</span> that 
              are not only functional but also <span className="font-bold">beautiful and memorable</span>.
            </p>
          </motion.div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 80,
                }}
              >
                <motion.div
                  className={`bg-gradient-to-br ${skill.color} rounded-[40px] p-8 h-full`}
                  style={{
                    boxShadow: '12px 12px 24px rgba(0,0,0,0.1), -8px -8px 20px rgba(255,255,255,0.9), inset 2px 2px 4px rgba(255,255,255,0.5)',
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: '16px 16px 32px rgba(0,0,0,0.15), -12px -12px 28px rgba(255,255,255,1), inset 3px 3px 6px rgba(255,255,255,0.6)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <motion.div
                    className="w-16 h-16 bg-white/40 rounded-[20px] flex items-center justify-center mb-6"
                    style={{
                      boxShadow: '6px 6px 12px rgba(0,0,0,0.1), -4px -4px 10px rgba(255,255,255,0.9)',
                    }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-8 h-8 text-[#6B5B4F]" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#6B5B4F] mb-3">
                    {skill.title}
                  </h3>
                  <p className="text-lg text-[#8B7B6F] leading-relaxed">
                    {skill.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
