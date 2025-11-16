'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Sparkles, Award, Users, Zap, Briefcase, GraduationCap, Trophy } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFadeInScroll, useStaggerScroll } from '@/lib/hooks/useScrollAnimations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useFadeInScroll('up', 60);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeTimeline, setActiveTimeline] = useState(0);

  const timeline = [
    {
      year: '2024',
      icon: Trophy,
      title: 'Award-Winning Projects',
      company: 'Freelance',
      description: 'Created multiple award-winning web experiences featured on Awwwards and CSS Design Awards. Specialized in WebGL, creative animations, and cutting-edge web technologies.',
      skills: ['Next.js 14', 'Three.js', 'GSAP', 'WebGL'],
      color: 'from-primary-500 to-accent-500',
    },
    {
      year: '2022',
      icon: Briefcase,
      title: 'Senior Frontend Developer',
      company: 'Tech Company',
      description: 'Led frontend architecture for high-traffic applications serving millions of users. Implemented micro-frontend architecture and design system used across 20+ products.',
      skills: ['React', 'TypeScript', 'GraphQL', 'Microservices'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      year: '2020',
      icon: Code2,
      title: 'Full-Stack Developer',
      company: 'Startup',
      description: 'Built and scaled MVPs from concept to production. Developed real-time collaborative tools and implemented CI/CD pipelines for rapid iteration.',
      skills: ['Node.js', 'MongoDB', 'AWS', 'Docker'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      year: '2018',
      icon: GraduationCap,
      title: 'Computer Science Degree',
      company: 'University',
      description: 'Graduated with honors focusing on algorithms, data structures, and human-computer interaction. Published research on web accessibility.',
      skills: ['Algorithms', 'UX Research', 'ML Basics'],
      color: 'from-amber-500 to-orange-500',
    },
  ];

  const expertise = [
    { 
      icon: Code2, 
      title: 'Full-Stack Development', 
      desc: 'Building scalable applications with React, Next.js, TypeScript, and Node.js',
      color: 'from-blue-500 to-cyan-500',
      percentage: 95,
    },
    { 
      icon: Palette, 
      title: 'UI/UX Design', 
      desc: 'Creating beautiful interfaces with Figma, design systems, and creative animations',
      color: 'from-purple-500 to-pink-500',
      percentage: 90,
    },
    { 
      icon: Sparkles, 
      title: '3D & Creative Coding', 
      desc: 'Crafting immersive experiences with Three.js, WebGL, and advanced GLSL shaders',
      color: 'from-amber-500 to-orange-500',
      percentage: 85,
    },
  ];

  const stats = [
    { icon: Award, value: '5+', label: 'Years Experience' },
    { icon: Zap, value: '100+', label: 'Projects Delivered' },
    { icon: Users, value: '50+', label: 'Happy Clients' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const timelineEl = timelineRef.current;
    if (!section || !timelineEl) return;

    const ctx = gsap.context(() => {
      // Timeline items scroll animation
      const items = timelineEl.querySelectorAll('.timeline-item');
      
      items.forEach((item, index) => {
        gsap.from(item, {
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            once: true,
            onEnter: () => setActiveTimeline(index),
          },
        });
      });

      // Timeline line animation
      const timelineLine = timelineEl.querySelector('.timeline-line');
      if (timelineLine) {
        gsap.from(timelineLine, {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineEl,
            start: 'top 80%',
            once: true,
          },
        });
      }

      // Parallax stats
      gsap.to('.stat-card', {
        y: (i) => -30 * (i + 1),
        ease: 'none',
        scrollTrigger: {
          trigger: '.stats-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-neutral-950 section-spacing"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 -left-48 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-[150px]"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
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
              About Me
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Crafting Digital <span className="text-gradient">Excellence</span>
          </h2>
          
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            A creative developer passionate about building exceptional web experiences 
            that blend elegant code with stunning visuals
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 mb-24">
          {/* Left: Story & Stats */}
          <div className="space-y-10">
            {/* Story */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-2xl text-neutral-300 leading-relaxed">
                I'm a <span className="text-gradient font-bold">creative developer</span> who 
                transforms complex ideas into intuitive digital experiences.
              </p>

              <p className="text-lg text-neutral-400 leading-relaxed">
                With over <span className="text-primary-400 font-semibold">5 years of experience</span>, 
                I specialize in building high-performance web applications that don't just work—they 
                captivate and inspire users at every interaction.
              </p>

              <p className="text-lg text-neutral-400 leading-relaxed">
                My approach combines technical excellence with creative problem-solving, always 
                pushing the boundaries of what's possible on the web while maintaining 
                <span className="text-accent-400 font-semibold"> accessibility</span> and 
                <span className="text-primary-400 font-semibold"> performance</span> at the core.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="stats-container grid grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-card group relative"
                  whileHover={{ scale: 1.05, y: -5 }}
                  data-magnetic
                >
                  <div className="glass-strong backdrop-blur-2xl rounded-2xl p-6 text-center border border-white/10 hover:border-primary-500/50 transition-all">
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary-400" />
                    <p className="text-gradient text-4xl font-bold mb-2">{stat.value}</p>
                    <p className="text-xs text-neutral-400 uppercase tracking-wider leading-tight">
                      {stat.label}
                    </p>
                  </div>
                  
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-primary-500/20 blur-xl -z-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Expertise Cards */}
          <div className="space-y-6">
            {expertise.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="group relative"
                data-magnetic
              >
                <div className="glass-strong backdrop-blur-2xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
                  <div className="flex items-start gap-6 mb-6">
                    <div className={`rounded-xl bg-gradient-to-br ${skill.color} p-4 shadow-lg shadow-black/50`}>
                      <skill.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gradient transition-all">
                        {skill.title}
                      </h3>
                      <p className="text-neutral-400 leading-relaxed">{skill.desc}</p>
                    </div>
                  </div>

                  {/* Skill Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">Proficiency</span>
                      <span className="text-primary-400 font-semibold">{skill.percentage}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-neutral-800/50">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 1.5, 
                          delay: index * 0.2 + 0.5,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                      >
                        {/* Animated shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{
                            x: ['-100%', '200%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Glow Effect */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${skill.color} opacity-0 blur-xl -z-10 group-hover:opacity-30 transition-opacity duration-500`}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Timeline */}
        <div ref={timelineRef} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Professional <span className="text-gradient">Journey</span>
            </h3>
            <p className="text-neutral-400 text-lg">Key milestones in my career</p>
          </motion.div>

          {/* Timeline Line */}
          <div className="absolute left-1/2 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500 timeline-line hidden md:block" />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-24">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                className={`timeline-item relative ${
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                }`}
              >
                <div className={`flex ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}>
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-20 h-20">
                    <motion.div
                      className={`w-full h-full rounded-full glass-strong border-4 ${
                        activeTimeline === index ? 'border-primary-500' : 'border-white/20'
                      } flex items-center justify-center backdrop-blur-xl`}
                      animate={{
                        scale: activeTimeline === index ? [1, 1.2, 1] : 1,
                        borderColor: activeTimeline === index ? '#6366f1' : 'rgba(255,255,255,0.2)',
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                    >
                      <item.icon className="w-8 h-8 text-primary-400" />
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    className="flex-1 max-w-lg group"
                    whileHover={{ scale: 1.02 }}
                    data-magnetic
                  >
                    <div className="glass-strong backdrop-blur-2xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all relative overflow-hidden">
                      {/* Year Badge */}
                      <div className={`absolute top-4 ${index % 2 === 0 ? 'left-4' : 'right-4'}`}>
                        <span className={`px-4 py-2 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-bold shadow-lg`}>
                          {item.year}
                        </span>
                      </div>

                      {/* Mobile icon */}
                      <div className="md:hidden mb-4 pt-16">
                        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color}`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      <div className="pt-16 md:pt-0">
                        <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-gradient transition-all">
                          {item.title}
                        </h4>
                        <p className="text-primary-400 font-semibold mb-4">{item.company}</p>
                        <p className="text-neutral-400 leading-relaxed mb-6">
                          {item.description}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 text-xs font-medium rounded-full glass border border-white/10 text-neutral-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
                    </div>

                    {/* Glow effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.color} opacity-0 blur-xl -z-10 group-hover:opacity-20 transition-opacity duration-500`}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none" />
    </section>
  );
}
