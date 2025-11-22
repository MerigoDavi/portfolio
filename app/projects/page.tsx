'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Users, ExternalLink, Github, Zap, TrendingUp, Heart, Gamepad2, Brain, Target, Code2, Layers, Cpu } from 'lucide-react';
import Link from 'next/link';
import ClayButton from '@/components/ClayButton';
import ClayNavigation from '@/components/ClayNavigation';
import Footer from '@/components/Footer';
import { useState } from 'react';

// Dados dos projetos com informações mais detalhadas
const projects = [
  {
    id: 1,
    title: 'Sistema de Análise de Patologias Estruturais',
    subtitle: 'IA para Inspeção de Edificações',
    company: 'Instituto de Pesquisas Tecnológicas (IPT)',
    period: 'Abril 2025 – Junho 2025',
    duration: '3 meses',
    tagline: 'Transformando inspeção estrutural com inteligência artificial',
    impact: 'Redução de 70% no tempo de diagnóstico',
    description: 'Aplicação desktop que revoluciona a identificação de fissuras em edificações usando IA avançada',
    highlights: [
      {
        icon: Brain,
        title: 'IA Avançada',
        text: 'Algoritmos de visão computacional para detecção automática de anomalias estruturais'
      },
      {
        icon: Zap,
        title: 'Alto Desempenho',
        text: 'Construído em Rust e Python para processamento offline em campo'
      },
      {
        icon: TrendingUp,
        title: 'Automação Completa',
        text: 'Geração automática de relatórios técnicos e galeria visual interativa'
      }
    ],
    technologies: ['Rust', 'Python', 'IA', 'Visão Computacional', 'Desktop'],
    category: 'IA & Machine Learning',
    gradient: 'from-[#E5D4FF] via-[#D5BFFF] to-[#C5AAFF]',
    accentColor: '#C5AAFF',
    images: ['/projects/ipt-1.jpg', '/projects/ipt-2.jpg', '/projects/ipt-3.jpg', '/projects/ipt-4.jpg'],
    metricsSection1: {
      title: 'Performance',
      metrics: {
        'Precisão': '95%',
        'Processamento': '< 2s',
        'Linguagens': '2',
        'Relatórios': 'Auto',
      }
    },
    metricsSection2: {
      title: 'Tecnologia',
      metrics: {
        'Plataforma': 'Desktop',
        'Offline': 'Sim',
        'IA Model': 'CNN',
        'Deploy': 'Local',
      }
    },
    github: '',
    demo: '',
  },
  {
    id: 2,
    title: 'Hígia: Dispensação Farmacêutica Inteligente',
    subtitle: 'Robótica Aplicada à Saúde',
    company: 'Hospital das Clínicas da Unicamp',
    period: 'Fevereiro 2025 – Abril 2025',
    duration: '2 meses',
    tagline: 'Automatizando a farmácia hospitalar com precisão robótica',
    impact: 'Zero erros na dispensação de medicamentos',
    description: 'Sistema robótico completo que transforma a segurança e eficiência na dispensação de medicamentos',
    highlights: [
      {
        icon: Brain,
        title: 'Visão Computacional',
        text: 'Reconhecimento automático de medicamentos com alta precisão'
      },
      {
        icon: Zap,
        title: 'Interface Intuitiva',
        text: 'UI/UX focada em facilitar operação por profissionais de saúde'
      },
      {
        icon: TrendingUp,
        title: 'Comunicação Robusta',
        text: 'Sistema de comunicação em tempo real entre interface e braço robótico'
      }
    ],
    technologies: ['Python', 'Visão Computacional', 'Robótica', 'UI/UX', 'IoT'],
    category: 'IoT & Robótica',
    gradient: 'from-[#C8E6F5] via-[#A7D8EA] to-[#7EC8E3]',
    accentColor: '#7EC8E3',
    images: ['/projects/higia-1.jpg', '/projects/higia-2.jpg', '/projects/higia-3.jpg', '/projects/higia-4.jpg'],
    metricsSection1: {
      title: 'Resultados',
      metrics: {
        'Precisão': '100%',
        'Velocidade': '3x',
        'Segurança': '+200%',
        'Erros': '0',
      }
    },
    metricsSection2: {
      title: 'Sistema',
      metrics: {
        'Hardware': 'Robô',
        'Sensores': 'Câmera',
        'Interface': 'Web',
        'Real-time': 'Sim',
      }
    },
    github: '',
    demo: '',
  },
  {
    id: 3,
    title: 'Sense: Monitoramento Florestal Inteligente',
    subtitle: 'IoT para Sustentabilidade',
    company: 'Startup Abundance',
    period: 'Outubro 2024 – Dezembro 2024',
    duration: '3 meses',
    tagline: 'Protegendo florestas com tecnologia IoT sustentável',
    impact: 'Monitoramento 24/7 de áreas remotas',
    description: 'Sistema IoT completo alimentado por energia solar para vigilância ambiental em tempo real',
    highlights: [
      {
        icon: TrendingUp,
        title: 'Energia Solar',
        text: 'Módulos autossustentáveis com otimização energética avançada'
      },
      {
        icon: Zap,
        title: 'MQTT Privado',
        text: 'Broker customizado para comunicação ultra-eficiente entre dispositivos'
      },
      {
        icon: Brain,
        title: 'Dashboard Real-Time',
        text: 'Interface web responsiva com visualização de dados ambientais ao vivo'
      }
    ],
    technologies: ['IoT', 'MQTT', 'React', 'Python', 'Energia Solar', 'Dashboard'],
    category: 'IoT & Sustentabilidade',
    gradient: 'from-[#B3F5CC] via-[#8DE9B3] to-[#6FD99A]',
    accentColor: '#6FD99A',
    images: ['/projects/sense-1.jpg', '/projects/sense-2.jpg', '/projects/sense-3.jpg', '/projects/sense-4.jpg'],
    metricsSection1: {
      title: 'Infraestrutura',
      metrics: {
        'Uptime': '99.9%',
        'Dispositivos': '2',
        'Alcance': '10km',
        'Energia': 'Solar',
      }
    },
    metricsSection2: {
      title: 'Comunicação',
      metrics: {
        'Protocolo': 'MQTT',
        'Latência': '< 1s',
        'Dashboard': 'React',
        'Alertas': '24/7',
      }
    },
    github: '',
    demo: '',
  },
  {
    id: 4,
    title: 'GPS: Previsão de Vazamentos de Gás',
    subtitle: 'Machine Learning para Segurança',
    company: 'Startup Compass',
    period: 'Junho 2024 – Outubro 2024',
    duration: '4 meses',
    tagline: 'Salvando vidas com detecção precoce de anomalias',
    impact: '82% de precisão na detecção',
    description: 'Modelo preditivo robusto que identifica vazamentos e fraudes antes que se tornem desastres',
    highlights: [
      {
        icon: Brain,
        title: 'Ensemble Learning',
        text: 'Combinação de múltiplos modelos para máxima precisão preditiva'
      },
      {
        icon: TrendingUp,
        title: '82% Precisão',
        text: 'Detecção precoce de anomalias em operações críticas de gás'
      },
      {
        icon: Zap,
        title: 'Feature Engineering',
        text: 'Engenharia de características complexas otimizada para o domínio'
      }
    ],
    technologies: ['Python', 'Machine Learning', 'Ensemble Learning', 'Data Science', 'Predição'],
    category: 'Machine Learning',
    gradient: 'from-[#FFD4B8] via-[#FFC09D] to-[#FFAC82]',
    accentColor: '#FFAC82',
    images: ['/projects/gps-1.jpg', '/projects/gps-2.jpg', '/projects/gps-3.jpg', '/projects/gps-4.jpg'],
    metricsSection1: {
      title: 'Modelo ML',
      metrics: {
        'Precisão': '82%',
        'Modelos': '5+',
        'Features': '50+',
        'Training': '10k',
      }
    },
    metricsSection2: {
      title: 'Produção',
      metrics: {
        'Detecção': 'Real-time',
        'Alertas': 'Auto',
        'API': 'REST',
        'Deploy': 'Cloud',
      }
    },
    github: '',
    demo: '',
  },
  {
    id: 5,
    title: 'Borbulha: Conectando Voluntários',
    subtitle: 'Plataforma de Impacto Social',
    company: 'ONG Parceiros Voluntários',
    period: 'Abril 2024 – Junho 2024',
    duration: '2 meses',
    tagline: 'Facilitando o bem através da tecnologia',
    impact: 'Conectando ONGs, empresas e voluntários',
    description: 'Rede social dedicada a amplificar o impacto de ações voluntárias e causas sociais',
    highlights: [
      {
        icon: Heart,
        title: 'Design System',
        text: 'Guia de estilos completo garantindo identidade visual consistente'
      },
      {
        icon: TrendingUp,
        title: 'Multi-plataforma',
        text: 'Design responsivo de alta qualidade para desktop, tablet e mobile'
      },
      {
        icon: Zap,
        title: 'Impacto Social',
        text: 'Plataforma que facilita conexões significativas para o bem'
      }
    ],
    technologies: ['React', 'Typescript', 'Tailwind', 'UI/UX', 'Figma', 'Design System'],
    category: 'Web & Social',
    gradient: 'from-[#FFF1D0] via-[#FFE9B8] to-[#FFE0A0]',
    accentColor: '#FFD700',
    images: ['/projects/borbulha-1.jpg', '/projects/borbulha-2.jpg', '/projects/borbulha-3.jpg', '/projects/borbulha-4.jpg'],
    metricsSection1: {
      title: 'Plataforma',
      metrics: {
        'Dispositivos': '3',
        'Componentes': '50+',
        'Usuários': 'Milhares',
        'Conexões': '∞',
      }
    },
    metricsSection2: {
      title: 'Design',
      metrics: {
        'Framework': 'React',
        'Styling': 'Tailwind',
        'Design': 'Figma',
        'Responsivo': 'Sim',
      }
    },
    github: '',
    demo: '',
  },
  {
    id: 6,
    title: 'Educators Tech Track',
    subtitle: 'Gamificação para Educação',
    company: 'Oracle',
    period: 'Fevereiro 2024 – Abril 2024',
    duration: '2 meses',
    tagline: 'Transformando aprendizagem em uma aventura',
    impact: 'Engajamento aumentado em 200%',
    description: 'Jogo educacional de 5 fases que ensina tecnologia através de gamificação envolvente',
    highlights: [
      {
        icon: Gamepad2,
        title: 'Gamificação',
        text: 'Mecânicas de jogo que aumentam motivação e retenção de conhecimento'
      },
      {
        icon: TrendingUp,
        title: 'Design Visual',
        text: 'Personagens e cenários criados para máximo engajamento pedagógico'
      },
      {
        icon: Brain,
        title: 'Progressão',
        text: 'Sistema de níveis com dificuldade crescente e recompensas'
      }
    ],
    technologies: ['Javascript', 'Game Design', 'UI/UX', 'Gamificação', 'Educação'],
    category: 'Games & Educação',
    gradient: 'from-[#FFE0F0] via-[#FFD0E8] to-[#FFC0E0]',
    accentColor: '#FF94D0',
    images: ['/projects/oracle-1.jpg', '/projects/oracle-2.jpg', '/projects/oracle-3.jpg', '/projects/oracle-4.jpg'],
    metricsSection1: {
      title: 'Jogo',
      metrics: {
        'Níveis': '5',
        'Engajamento': '+200%',
        'Conclusão': '87%',
        'Retenção': '92%',
      }
    },
    metricsSection2: {
      title: 'Educação',
      metrics: {
        'Educadores': '100+',
        'Conteúdo': 'Oracle',
        'Plataforma': 'Web',
        'Certificado': 'Sim',
      }
    },
    github: '',
    demo: '',
  },
];

export default function ProjectsPage() {
  return (
    <>
      <ClayNavigation isProjectsPage={true} />
      
      <main className="min-h-screen bg-gradient-to-br from-[#FFF8E7] via-[#FFE8D8] to-[#E0F2FE]" id="projects-top">
        {/* Fixed Back Button - Top Left in Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-5 left-5 md:left-12 z-[110]"
        >
          <Link href="/">
            <ClayButton variant="lavender" size="sm">
              <span className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </span>
            </ClayButton>
          </Link>
        </motion.div>

        {/* Hero Header */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-32 pb-16">
          {/* Subtle Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-[10%] w-96 h-96 bg-gradient-to-br from-[#C5AAFF] to-[#E5D4FF] rounded-full opacity-10 blur-3xl" />
            <div className="absolute bottom-20 right-[10%] w-[32rem] h-[32rem] bg-gradient-to-br from-[#7EC8E3] to-[#C8E6F5] rounded-full opacity-10 blur-3xl" />
          </div>

          <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center space-y-6"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-[#6B5B4F] leading-none">
                Todos os
                <br />
                <span className="bg-gradient-to-r from-[#FFAC82] via-[#C5AAFF] to-[#7EC8E3] bg-clip-text text-transparent">
                  Projetos
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-[#8B7B6F] max-w-3xl mx-auto leading-relaxed">
                Uma jornada através de soluções inovadoras desenvolvidas com parceiros da indústria
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Bento-Box Showcase */}
        <section className="pb-20">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl space-y-20">
            {projects.map((project, index) => (
              <ProjectBentoBox key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>
      </main>

      <Footer isProjectsPage={true} />
    </>
  );
}

// Componente Bento-Box do Projeto
function ProjectBentoBox({ project, index }: { project: typeof projects[0]; index: number }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
      className="relative"
    >
      {/* Project Number Badge */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="inline-flex items-center gap-3">
          <span className="text-6xl md:text-7xl font-black bg-gradient-to-r from-[#6B5B4F]/60 to-[#6B5B4F]/20 bg-clip-text text-transparent">
            0{index + 1}
          </span>
          <span
            className={`px-4 py-2 rounded-[16px] text-sm font-bold text-[#6B5B4F] bg-gradient-to-br ${project.gradient}`}
            style={{
              boxShadow: '6px 6px 12px rgba(0,0,0,0.1), -4px -4px 10px rgba(255,255,255,0.9)',
            }}
          >
            {project.category}
          </span>
        </div>
      </motion.div>

      {/* Bento Grid Layout */}
      <div
        className="rounded-[48px] p-8 md:p-10 bg-gradient-to-br from-white/80 to-white/60"
        style={{
          boxShadow: '24px 24px 48px rgba(0,0,0,0.12), -20px -20px 40px rgba(255,255,255,0.9)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN - Images & Metrics (8 cols) */}
          <motion.div
            className="lg:col-span-8 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Main Image */}
            <div
              className="relative aspect-[16/9] rounded-[32px] overflow-hidden group"
              style={{
                boxShadow: '16px 16px 32px rgba(0,0,0,0.1), -12px -12px 28px rgba(255,255,255,0.9)',
              }}
            >
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl opacity-30">📸</span>
                </div>
              </motion.div>

              {/* Navigation Controls */}
              {project.images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={prevImage}
                    className="w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform text-[#6B5B4F] font-bold text-lg"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform text-[#6B5B4F] font-bold text-lg"
                  >
                    →
                  </button>
                </div>
              )}
            </div>

            {/* 4 Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {project.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`aspect-video rounded-[20px] overflow-hidden transition-all duration-300 ${
                    idx === currentImage
                      ? 'ring-3 ring-[#6B5B4F] scale-105'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                  style={{
                    boxShadow: idx === currentImage 
                      ? '8px 8px 16px rgba(0,0,0,0.12), -6px -6px 14px rgba(255,255,255,0.9)'
                      : '6px 6px 12px rgba(0,0,0,0.08), -4px -4px 10px rgba(255,255,255,0.9)',
                  }}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                    <span className="text-2xl opacity-40">📸</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Metrics - Two Sections */}
            <div className="grid grid-cols-2 gap-4">
              {/* Metrics Section 1 */}
              <div
                className="rounded-[24px] p-5 bg-gradient-to-br from-white/70 to-white/50"
                style={{
                  boxShadow: '10px 10px 20px rgba(0,0,0,0.08), -8px -8px 16px rgba(255,255,255,0.9)',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Cpu className="w-4 h-4" style={{ color: project.accentColor }} />
                  <h4 className="font-black text-sm text-[#6B5B4F] uppercase tracking-wider">
                    {project.metricsSection1.title}
                  </h4>
                </div>
                <div className="space-y-2">
                  {Object.entries(project.metricsSection1.metrics).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-xs text-[#8B7B6F] font-semibold">{key}</span>
                      <span className="text-sm font-black text-[#6B5B4F]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics Section 2 */}
              <div
                className="rounded-[24px] p-5 bg-gradient-to-br from-white/70 to-white/50"
                style={{
                  boxShadow: '10px 10px 20px rgba(0,0,0,0.08), -8px -8px 16px rgba(255,255,255,0.9)',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4" style={{ color: project.accentColor }} />
                  <h4 className="font-black text-sm text-[#6B5B4F] uppercase tracking-wider">
                    {project.metricsSection2.title}
                  </h4>
                </div>
                <div className="space-y-2">
                  {Object.entries(project.metricsSection2.metrics).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-xs text-[#8B7B6F] font-semibold">{key}</span>
                      <span className="text-sm font-black text-[#6B5B4F]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Content (4 cols) */}
          <motion.div
            className="lg:col-span-4 space-y-5"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Title */}
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-black text-[#6B5B4F] leading-tight">
                {project.title}
              </h2>
              <p className="text-lg font-bold bg-gradient-to-r from-[#FFAC82] via-[#C5AAFF] to-[#7EC8E3] bg-clip-text text-transparent">
                {project.subtitle}
              </p>
            </div>

            {/* Tagline */}
            <p className="text-base text-[#6B5B4F] leading-relaxed italic">
              "{project.tagline}"
            </p>

            {/* Company, Period & Duration in a card */}
            <div
              className="rounded-[20px] p-4 bg-gradient-to-br from-white/60 to-white/40 space-y-3"
              style={{
                boxShadow: '8px 8px 16px rgba(0,0,0,0.08), -6px -6px 14px rgba(255,255,255,0.9)',
              }}
            >
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: project.accentColor }} />
                <div className="flex-1">
                  <div className="text-xs text-[#8B7B6F] font-semibold">Empresa</div>
                  <div className="text-sm font-bold text-[#6B5B4F]">{project.company}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: project.accentColor }} />
                <div className="flex-1">
                  <div className="text-xs text-[#8B7B6F] font-semibold">Período</div>
                  <div className="text-sm font-bold text-[#6B5B4F]">{project.period}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: project.accentColor }} />
                <div className="flex-1">
                  <div className="text-xs text-[#8B7B6F] font-semibold">Duração</div>
                  <div className="text-sm font-bold text-[#6B5B4F]">{project.duration}</div>
                </div>
              </div>
            </div>

            {/* Impact */}
            <div
              className="rounded-[20px] p-4 bg-gradient-to-br from-white/70 to-white/50"
              style={{
                boxShadow: '10px 10px 20px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.9)',
              }}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 flex-shrink-0" style={{ color: project.accentColor }} />
                <div>
                  <div className="text-xs text-[#8B7B6F] font-semibold uppercase">Impacto</div>
                  <div className="text-lg font-black text-[#6B5B4F]">{project.impact}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#6B5B4F] leading-relaxed">
              {project.description}
            </p>

            {/* Technologies - Compact */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-gradient-to-br from-white/80 to-white/60 text-[#6B5B4F] text-xs font-bold rounded-[12px]"
                  style={{
                    boxShadow: '3px 3px 6px rgba(0,0,0,0.08), -2px -2px 5px rgba(255,255,255,0.9)',
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span
                  className="px-3 py-1.5 bg-gradient-to-br from-white/80 to-white/60 text-[#8B7B6F] text-xs font-bold rounded-[12px]"
                  style={{
                    boxShadow: '3px 3px 6px rgba(0,0,0,0.08), -2px -2px 5px rgba(255,255,255,0.9)',
                  }}
                >
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            {(project.github || project.demo) && (
              <div className="flex flex-wrap gap-2 pt-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <ClayButton variant="peach" size="sm" className="w-full">
                      <span className="flex items-center justify-center gap-2">
                        <Github className="w-4 h-4" />
                        <span className="text-sm">Código</span>
                      </span>
                    </ClayButton>
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <ClayButton variant="blue" size="sm" className="w-full">
                      <span className="flex items-center justify-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">Demo</span>
                      </span>
                    </ClayButton>
                  </a>
                )}
              </div>
            )}
          </motion.div>

          {/* BOTTOM ROW - Highlights (Full Width - 12 cols) */}
          <motion.div
            className="lg:col-span-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {project.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-[20px] bg-gradient-to-br from-white/50 to-white/30 hover:from-white/70 hover:to-white/50 transition-all"
                  style={{
                    boxShadow: '6px 6px 12px rgba(0,0,0,0.06), -4px -4px 10px rgba(255,255,255,0.9)',
                  }}
                >
                  <div className={`p-2.5 rounded-[12px] bg-gradient-to-br ${project.gradient} flex-shrink-0`}>
                    <highlight.icon className="w-5 h-5 text-[#6B5B4F]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#6B5B4F] text-sm mb-1">{highlight.title}</h4>
                    <p className="text-xs text-[#8B7B6F] leading-relaxed">{highlight.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      {index < projects.length - 1 && (
        <motion.div
          className="mt-20 h-px bg-gradient-to-r from-transparent via-[#6B5B4F]/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
      )}
    </motion.article>
  );
}
