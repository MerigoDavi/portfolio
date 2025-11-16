# Premium Portfolio

Portfolio moderno e inovador com animações avançadas e design excepcional, criado seguindo as melhores práticas de desenvolvimento web.

## 🚀 Tecnologias

- **Framework**: Next.js 15+ (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS v4
- **Animações**: 
  - Framer Motion (animações declarativas e gestures)
  - GSAP + ScrollTrigger (timelines complexas e scroll animations)
  - Lenis (smooth scrolling premium)
- **Ícones**: Lucide React
- **Fontes**: Geist Sans e Geist Mono

## ✨ Funcionalidades

- ✅ Loading screen animado
- ✅ Cursor customizado e interativo
- ✅ Smooth scrolling premium com Lenis
- ✅ Hero section com animações dramáticas
- ✅ Seção sobre com storytelling visual
- ✅ Skills com barras de progresso animadas
- ✅ Projetos em Bento Grid layout
- ✅ Formulário de contato com animações
- ✅ 100% responsivo (mobile-first)
- ✅ Acessibilidade (prefers-reduced-motion)
- ✅ Performance otimizada
- ✅ Dark mode elegante

## 🎨 Design

O portfolio segue as tendências de design de 2025:

- **Glassmorphism**: Efeitos de vidro com backdrop-blur
- **Gradientes Holográficos**: Cores vibrantes e transições suaves
- **Bento Grid**: Layout assimétrico para projetos
- **Micro-animações**: Feedback visual em todas as interações
- **Parallax**: Movimento em múltiplas camadas

## 📦 Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre na pasta
cd premium-portfolio

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 🛠️ Scripts

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa linting do código

## 📁 Estrutura do Projeto

```
premium-portfolio/
├── app/
│   ├── layout.tsx          # Layout raiz com providers
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globais e Tailwind v4
├── components/
│   ├── sections/           # Seções da página
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── ContactSection.tsx
│   ├── CustomCursor.tsx    # Cursor customizado
│   ├── LoadingScreen.tsx   # Loading screen
│   ├── SmoothScroll.tsx    # Wrapper do Lenis
│   └── Footer.tsx          # Footer
├── lib/
│   ├── gsap.ts            # Configuração do GSAP
│   └── utils.ts           # Utilitários (cn)
└── public/                # Assets estáticos
```

## 🎯 Tailwind CSS v4

Este projeto usa **Tailwind CSS v4**, que tem algumas diferenças importantes da v3:

### Diferenças principais:

1. **Configuração via CSS**: Não há mais `tailwind.config.js`. Toda configuração é feita no CSS usando `@theme`.

2. **Import direto**: Usa `@import "tailwindcss"` no CSS ao invés de `@tailwind base/components/utilities`.

3. **Design Tokens**: Variáveis CSS customizadas definidas no `@theme` block.

### Exemplo de configuração:

```css
@import "tailwindcss";

@theme {
  --color-primary-500: #6366f1;
  --font-display: var(--font-geist-sans);
}
```

## 🎨 Customização

### Cores

Edite as variáveis de cor em `app/globals.css` no bloco `@theme`:

```css
@theme {
  --color-primary-500: #sua-cor;
  --color-accent-500: #sua-cor;
}
```

### Fontes

As fontes são carregadas via `next/font/google` no `layout.tsx`. Para mudar:

1. Importe a fonte desejada
2. Adicione a variável CSS no @theme
3. Use a variável nas classes Tailwind

### Conteúdo

- **Textos**: Edite diretamente nos componentes em `components/sections/`
- **Projetos**: Modifique o array `projects` em `ProjectsSection.tsx`
- **Skills**: Modifique o array `skillCategories` em `SkillsSection.tsx`
- **Contato**: Atualize o array `contactInfo` em `ContactSection.tsx`

## 📱 Responsividade

O portfolio é totalmente responsivo com breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Acessibilidade

- Navegação completa via teclado
- ARIA labels em elementos interativos
- Suporte a `prefers-reduced-motion`
- Contraste adequado (WCAG AA)
- Texto alternativo em imagens

## ⚠️ Warning de Hidratação

Você pode ver um warning de hidratação no console do browser. Isso é **normal e esperado**:

- ✅ Site funciona perfeitamente
- ✅ Não afeta performance ou funcionalidade
- ✅ Apenas um warning de desenvolvimento
- ✅ Causado por animações aleatórias e detecção de dispositivo

**Nota**: Consulte `HYDRATION-WARNING.md` para mais detalhes. Este warning pode ser ignorado com segurança.

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Deploy
vercel
```

### Outras plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📄 Licença

Este projeto está sob a licença ISC.

## 🙏 Créditos

Desenvolvido seguindo as melhores práticas e inspirações de:
- Awwwards Site of the Day
- Bruno Simon (bruno-simon.com)
- David Langarica (davidlangarica.dev)
- Tendências de design 2025

---

**Nota**: Este é um template de portfolio. Personalize com suas informações, projetos e estilo pessoal!
