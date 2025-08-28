# AI Veiligheid & Ethische Overwegingen

Een interactief leerplatform voor AI-veiligheid en prompt engineering, gebouwd met React, TypeScript en Vite.

## 🚀 Features

- **Dual Curriculum**: AI Veiligheid & Ethiek + Prompt Engineering
- **Interactive Exercises**: 5 oefeningen per niveau (Beginner, Intermediate, Advanced)
- **Embedding Support**: Volledig embeddable in LMS en externe websites
- **Auto-resize**: Intelligente iframe-hoogte aanpassing
- **Progress Tracking**: Real-time voortgang communicatie
- **Responsive Design**: Werkt op alle apparaten
- **Dutch Language**: Volledig Nederlandse interface

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm

### Setup
```bash
npm install
npm run dev
```

### Build
```bash
# Development build
npm run build

# GitHub Pages build
npm run build:gh-pages
```

## 🌐 GitHub Pages Deployment

Dit project is geconfigureerd voor automatische deployment naar GitHub Pages:

### Setup Instructions

1. **Enable GitHub Pages**:
   - Ga naar Repository Settings → Pages
   - Source: "Deploy from a branch"
   - Select: "GitHub Actions"

2. **Automatic Deployment**:
   - Push naar `main` branch triggert automatische deployment
   - GitHub Actions workflow bouwt en deployt het project
   - Live site beschikbaar op: `https://[username].github.io/Techgrounds.playgrounds2.0/`

### Manual Deployment
```bash
npm run build:gh-pages
```

## 📱 Embedding

Gebruik de ingebouwde Embed Generator op `/embed` om iframe codes te genereren voor:

- Specifieke cursussen (AI Safety OF Prompt Engineering)
- Individuele niveaus per cursus
- Configureerbare opties (auto-start, header visibility, dimensions)

### Example Embed Code
```html
<iframe 
  src="https://[username].github.io/Techgrounds.playgrounds2.0/exercises?level=beginner&hideHeader=true"
  width="100%"
  height="600px"
  frameborder="0"
  title="AI Veiligheid Oefeningen">
</iframe>
```

## 🎯 Courses

### AI Veiligheid & Ethiek
- Bias en Fairness
- Privacy en Data Protection
- Transparantie en Explainability
- Accountability en Governance
- Veiligheid en Robustheid

### Prompt Engineering
- Basis Prompt Elementen (CLEAR Framework)
- Geavanceerde Technieken (CREATE Framework)
- Professionele Frameworks (RISEN, TRACE)
- Prompt Injection Awareness
- Context Management

## 🔗 URLs

- **Live Site**: `https://[username].github.io/Techgrounds.playgrounds2.0/`
- **AI Safety**: `/exercises`
- **Prompt Engineering**: `/prompt-exercises`
- **Embed Generator**: `/embed`
- **Test Example**: `/embed/example`

## 📄 License

Educational use only.