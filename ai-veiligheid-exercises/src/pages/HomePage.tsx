import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welkom bij AI Leerplatform</h1>
          <p className="hero-description">
            Ontdek hoe je AI-systemen veilig en ethisch kunt gebruiken, en leer de kunst van effectief prompten. 
            Ontwikkel je vaardigheden met interactieve oefeningen en praktische voorbeelden.
          </p>
          <div className="hero-buttons">
            <Link to="/exercises" className="btn btn-primary btn-large">
              <span>🛡️</span>
              AI Veiligheid & Ethiek
            </Link>
            <Link to="/prompt-exercises" className="btn btn-secondary btn-large">
              <span>🎯</span>
              Prompt Engineering
            </Link>
          </div>
        </div>
      </section>

      <section className="courses-section">
        <h2>Beschikbare Cursussen</h2>
        <p>Kies een cursus die bij jouw leerdoelen past</p>
        
        <div className="courses-grid">
          <div className="course-card">
            <div className="course-icon">🛡️</div>
            <h3>AI Veiligheid & Ethische Overwegingen</h3>
            <p>Leer over privacybescherming, ethische besluitvorming en verantwoorde AI-implementatie.</p>
            <ul className="course-topics">
              <li>Privacy detectie en anonimisering</li>
              <li>Ethische AI-beslissingen</li>
              <li>Bias herkenning en mitigatie</li>
              <li>AI governance en compliance</li>
            </ul>
            <Link to="/exercises" className="btn btn-primary">
              <span>📚</span>
              Start Cursus
            </Link>
          </div>
          
          <div className="course-card">
            <div className="course-icon">🎯</div>
            <h3>Prompt Engineering & AI Frameworks</h3>
            <p>Beheers de kunst van effectief prompten en leer professionele AI-frameworks te gebruiken.</p>
            <ul className="course-topics">
              <li>Basis prompt elementen (Taak, Context, Persona)</li>
              <li>Geavanceerde technieken (Few-shot, Chaining)</li>
              <li>Professionele frameworks (CLEAR, CREATE, RISEN)</li>
              <li>Optimalisatie en testing strategieën</li>
            </ul>
            <Link to="/prompt-exercises" className="btn btn-primary">
              <span>🚀</span>
              Start Cursus
            </Link>
          </div>
        </div>
      </section>

      <section className="levels-section">
        <h2>Kies je Niveau</h2>
        <p>Onze oefeningen zijn beschikbaar op verschillende niveaus:</p>
        
        <div className="levels-grid">
          <div className="level-card">
            <div className="level-icon">🌱</div>
            <h3>Beginner</h3>
            <p>Basis concepten en eenvoudige oefeningen voor wie net begint met AI-ethiek.</p>
            <ul>
              <li>Privacy fundamenten</li>
              <li>Basis ethische principes</li>
              <li>Eenvoudige scenario's</li>
            </ul>
          </div>
          
          <div className="level-card">
            <div className="level-icon">🌿</div>
            <h3>Gemiddeld</h3>
            <p>Praktijkscenario's en toepassingen voor ervaren AI-gebruikers.</p>
            <ul>
              <li>Complexe privacy-cases</li>
              <li>Bias detectie</li>
              <li>Toestemmingsbeheer</li>
            </ul>
          </div>
          
          <div className="level-card">
            <div className="level-icon">🌳</div>
            <h3>Gevorderd</h3>
            <p>Complexe situaties en expertkennis voor AI-professionals.</p>
            <ul>
              <li>Geavanceerde privacy-technieken</li>
              <li>AI governance frameworks</li>
              <li>Risicoanalyse en compliance</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Klaar om te beginnen?</h2>
          <p>Begin je reis naar verantwoorde AI en effectief prompten met onze interactieve cursussen.</p>
          <div className="cta-buttons">
            <Link to="/exercises" className="btn btn-primary btn-large">
              <span>🛡️</span>
              AI Veiligheid & Ethiek
            </Link>
            <Link to="/prompt-exercises" className="btn btn-secondary btn-large">
              <span>🎯</span>
              Prompt Engineering
            </Link>
            <Link to="/embed" className="btn btn-outline btn-large">
              <span>🔗</span>
              Embed Generator
            </Link>
          </div>
          <p className="cta-note">
            💡 <strong>Voor leraren en trainers:</strong> Gebruik de embed generator om deze cursussen in je eigen LMS of website te integreren.
          </p>
        </div>
      </section>
    </div>
  )
}

export default HomePage