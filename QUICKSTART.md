# 🚀 Quick Start Guide

## Comandos Essenciais

```bash
# Navegar para o projeto
cd /home/baptela/Projects/premium-portfolio

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
# Acesse: http://localhost:3000

# Build de produção
npm run build

# Iniciar servidor de produção
npm run start

# Linting
npm run lint
```

## Arquivos Principais para Editar

### 1. Suas Informações

**Hero Section**: `components/sections/HeroSection.tsx`
```typescript
// Linha ~87
<h1>Seu Nome ou Título</h1>

// Linha ~94
<p>Sua descrição/proposta de valor</p>

// Linhas ~163-165 - Links sociais
{ icon: Github, href: 'https://github.com/SEU_USUARIO' },
{ icon: Linkedin, href: 'https://linkedin.com/in/SEU_USUARIO' },
{ icon: Mail, href: 'mailto:SEU_EMAIL' },
```

**Sobre**: `components/sections/AboutSection.tsx`
```typescript
// Linhas ~88-100 - Seus textos
<motion.p>Seu texto sobre você</motion.p>

// Linhas ~107-111 - Seus stats
{ value: '5+', label: 'Anos' },
{ value: '50+', label: 'Projetos' },
{ value: '30+', label: 'Clientes' },
```

**Contato**: `components/sections/ContactSection.tsx`
```typescript
// Linhas ~60-62 - Suas informações
{ label: 'Email', value: 'seu@email.com', href: 'mailto:seu@email.com' },
{ label: 'Telefone', value: '+55 (11) 12345-6789' },
{ label: 'Localização', value: 'Sua Cidade, País' },
```

### 2. Projetos

**Projetos**: `components/sections/ProjectsSection.tsx`
```typescript
// Linha ~9 - Array de projetos
const projects = [
  {
    id: 1,
    title: 'Nome do Projeto',
    description: 'Descrição do projeto',
    tags: ['React', 'Next.js', 'TypeScript'],
    image: '/projects/project1.jpg',
    github: 'https://github.com/usuario/repo',
    live: 'https://projeto-demo.com',
    featured: true, // true para destacar
    span: 'lg:col-span-2 lg:row-span-2', // Tamanho no grid
  },
  // Adicione mais projetos...
];
```

### 3. Skills

**Skills**: `components/sections/SkillsSection.tsx`
```typescript
// Linha ~9 - Categorias e skills
const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 95 }, // level = percentual (0-100)
      // Adicione mais skills...
    ],
  },
  // Adicione mais categorias...
];
```

### 4. Cores e Design

**Cores**: `app/globals.css`
```css
@theme {
  /* Linha ~6 - Cor primária */
  --color-primary-500: #6366f1;
  
  /* Linha ~23 - Cor de acento */
  --color-accent-500: #a855f7;
  
  /* Modifique todas as variantes (50-900) se quiser */
}
```

## Adicionar Imagens

1. Coloque suas imagens em `public/`
2. Estrutura recomendada:
```
public/
├── projects/
│   ├── project1.jpg
│   ├── project2.jpg
│   └── ...
├── logo.png
└── avatar.jpg
```

3. Use no código:
```typescript
<Image src="/projects/project1.jpg" alt="Projeto" width={800} height={600} />
```

## Personalizar Animações

### Velocidade das animações

**globals.css**:
```css
@theme {
  --duration-fast: 200ms;    /* Animações rápidas */
  --duration-normal: 300ms;  /* Animações normais */
  --duration-slow: 500ms;    /* Animações lentas */
}
```

### Desabilitar animações específicas

Comente ou remova o componente:
```typescript
// components/CustomCursor.tsx - para remover cursor customizado
// components/LoadingScreen.tsx - para remover loading screen
// components/SmoothScroll.tsx - para remover smooth scroll
```

## Deploy Rápido

### Vercel (Mais Fácil)

1. Crie conta em [vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. Deploy automático! 🎉

### Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy de produção
vercel --prod
```

## Dicas Rápidas

### 1. Testar em mobile
```bash
npm run dev

# Acesse de outro dispositivo na mesma rede:
# http://SEU_IP:3000
```

### 2. Verificar erros de build antes de deploy
```bash
npm run build
```

### 3. Limpar cache se algo não funcionar
```bash
rm -rf .next
rm -rf node_modules
npm install
npm run dev
```

### 4. Ver tamanho do bundle
```bash
npm run build
# Veja "First Load JS" na saída
```

## Checklist Antes do Deploy

- [ ] Atualizei todas as informações pessoais
- [ ] Adicionei meus projetos reais
- [ ] Atualizei links sociais (GitHub, LinkedIn, Email)
- [ ] Adicionei minhas imagens de projetos
- [ ] Testei em mobile
- [ ] Testei o formulário de contato
- [ ] Verifiquei todos os links
- [ ] Build sem erros (`npm run build`)
- [ ] Metadata atualizada em `app/layout.tsx`

## Problemas Comuns

### "Module not found"
```bash
npm install
```

### "Port 3000 already in use"
```bash
# Use outra porta
PORT=3001 npm run dev
```

### Animações lentas
- Reduza número de partículas no LoadingScreen
- Simplifique animações em mobile
- Use `will-change` CSS

### Imagens não aparecem
- Verifique caminho (começa com `/`)
- Confirme que está em `public/`
- Use next/image quando possível

## Recursos Úteis

- **Cores**: [coolors.co](https://coolors.co) - Paletas de cores
- **Ícones**: [lucide.dev](https://lucide.dev) - Ícones React
- **Fontes**: [fonts.google.com](https://fonts.google.com)
- **Gradientes**: [cssgradient.io](https://cssgradient.io)
- **Imagens**: [unsplash.com](https://unsplash.com) - Fotos gratuitas

---

**Pronto para começar? Execute:**
```bash
cd /home/baptela/Projects/premium-portfolio
npm run dev
```

**Boa sorte! 🚀**

## ⚠️ Warning de Hidratação

Se você ver um warning de hidratação no console:
- Isso é normal e esperado
- Não afeta a funcionalidade
- Site funciona perfeitamente
- Consulte HYDRATION-WARNING.md para detalhes

**Pode ignorar com segurança!**
