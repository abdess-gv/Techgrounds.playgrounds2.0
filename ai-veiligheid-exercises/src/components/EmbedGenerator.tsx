import { useState } from 'react'
import { Link } from 'react-router-dom'

interface EmbedConfig {
  width: string
  height: string
  course: string
  level?: string
  autoStart: boolean
  showHeader: boolean
}

const EmbedGenerator: React.FC = () => {
  const [config, setConfig] = useState<EmbedConfig>({
    width: '100%',
    height: '600px',
    course: '',
    level: '',
    autoStart: false,
    showHeader: true
  })

  const [copied, setCopied] = useState(false)

  const generateEmbedCode = () => {
    const baseUrl = window.location.origin
    const basePath = import.meta.env.DEV ? '' : '/Techgrounds.playgrounds2.0'
    let iframeSrc = `${baseUrl}${basePath}/exercises` // default fallback
    let courseTitle = 'AI Learning Platform'
    
    // Determine the correct base URL and title based on course selection
    if (config.course === 'prompt-engineering') {
      iframeSrc = `${baseUrl}${basePath}/prompt-exercises`
      courseTitle = 'Prompt Engineering Oefeningen'
    } else if (config.course === 'ai-safety') {
      iframeSrc = `${baseUrl}${basePath}/exercises`
      courseTitle = 'AI Veiligheid & Ethische Overwegingen'
    } else {
      // If no specific course selected, show a more general title
      iframeSrc = `${baseUrl}${basePath}/exercises`
      courseTitle = 'AI Learning Platform'
    }
    
    const params = new URLSearchParams()
    if (config.level) params.append('level', config.level)
    if (config.autoStart) params.append('autoStart', 'true')
    if (!config.showHeader) params.append('hideHeader', 'true')
    
    if (params.toString()) {
      iframeSrc += '?' + params.toString()
    }

    const iframeSelector = config.course === 'prompt-engineering' ? 'prompt-exercises' : 'exercises'

    return `<iframe 
  src="${iframeSrc}"
  width="${config.width}"
  height="${config.height}"
  frameborder="0"
  scrolling="no"
  title="${courseTitle}"
  allow="fullscreen"
  style="border: 1px solid #e9ecef; border-radius: 8px;">
</iframe>

<script>
  // Listen for resize messages from iframe
  window.addEventListener('message', function(event) {
    if (event.data.type === 'RESIZE_RESPONSE') {
      const iframe = document.querySelector('iframe[src*="${iframeSelector}"]');
      if (iframe) {
        iframe.style.height = event.data.height + 'px';
      }
    }
    
    // Handle progress updates
    if (event.data.type === 'EXERCISE_PROGRESS') {
      console.log('Exercise progress:', event.data.data);
      // You can handle progress updates here
    }
  });
  
  // Request initial resize
  setTimeout(() => {
    const iframe = document.querySelector('iframe[src*="${iframeSelector}"]');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'RESIZE_REQUEST' }, '*');
    }
  }, 1000);
</script>`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateEmbedCode())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="embed-generator">
      <h2>🔗 Embed Generator</h2>
      <p>Genereer een iframe code om specifieke oefeningen in je eigen website of LMS te integreren. Kies tussen AI Veiligheid & Ethiek of Prompt Engineering, en optioneel een specifiek niveau.</p>
      
      <div className="embed-config">
        <div className="config-group">
          <label htmlFor="width">Breedte:</label>
          <input
            id="width"
            type="text"
            value={config.width}
            onChange={(e) => setConfig({...config, width: e.target.value})}
            placeholder="100%, 800px, etc."
          />
        </div>

        <div className="config-group">
          <label htmlFor="height">Hoogte:</label>
          <input
            id="height"
            type="text"
            value={config.height}
            onChange={(e) => setConfig({...config, height: e.target.value})}
            placeholder="600px, 100vh, etc."
          />
        </div>

        <div className="config-group">
          <label htmlFor="course">Kies Cursus:</label>
          <select
            id="course"
            value={config.course}
            onChange={(e) => setConfig({...config, course: e.target.value, level: ''})}
          >
            <option value="">-- Selecteer een cursus --</option>
            <option value="ai-safety">🛡️ AI Veiligheid & Ethiek</option>
            <option value="prompt-engineering">🎯 Prompt Engineering</option>
          </select>
          <p className="config-help">
            {!config.course 
              ? "Kies welke cursus je wilt embedden in je website of LMS"
              : config.course === 'ai-safety' 
                ? "AI Veiligheid & Ethiek oefeningen geselecteerd"
                : "Prompt Engineering oefeningen geselecteerd"
            }
          </p>
        </div>

        <div className="config-group">
          <label htmlFor="level">Kies Niveau (optioneel):</label>
          <select
            id="level"
            value={config.level}
            onChange={(e) => setConfig({...config, level: e.target.value})}
            disabled={!config.course}
          >
            <option value="">Laat gebruiker niveau kiezen</option>
            {config.course && (
              <>
                <option value="beginner">🌱 Beginner</option>
                <option value="intermediate">🌿 Gemiddeld</option>
                <option value="advanced">🌳 Gevorderd</option>
              </>
            )}
          </select>
          <p className="config-help">
            {!config.course 
              ? "Selecteer eerst een cursus om niveau opties te zien"
              : !config.level 
                ? "Laat leeg om gebruikers zelf het niveau te laten kiezen"
                : `Niveau ${config.level} wordt automatisch geladen`
            }
          </p>
        </div>

        <div className="config-group">
          <label>
            <input
              type="checkbox"
              checked={config.autoStart}
              onChange={(e) => setConfig({...config, autoStart: e.target.checked})}
            />
            Start automatisch met oefeningen
          </label>
        </div>

        <div className="config-group">
          <label>
            <input
              type="checkbox"
              checked={config.showHeader}
              onChange={(e) => setConfig({...config, showHeader: e.target.checked})}
            />
            Toon header (aanbevolen voor standalone gebruik)
          </label>
        </div>
      </div>

        <div className="embed-preview">
        <h3>Preview:</h3>
        {!config.course ? (
          <div className="preview-placeholder">
            <p style={{textAlign: 'center', padding: '2rem', color: '#666', background: '#f8f9fa', border: '2px dashed #e9ecef', borderRadius: '8px'}}>
              📝 Selecteer eerst een cursus om de preview te zien
            </p>
          </div>
        ) : (
          <div className="iframe-container" style={{width: config.width === '100%' ? '100%' : config.width, height: config.height}}>
            <iframe
              src={(() => {
                const basePath = import.meta.env.DEV ? '' : '/Techgrounds.playgrounds2.0'
                let baseSrc = `${basePath}/exercises`
                if (config.course === 'prompt-engineering') {
                  baseSrc = `${basePath}/prompt-exercises`
                } else if (config.course === 'ai-safety') {
                  baseSrc = `${basePath}/exercises`
                }
                
                const params = new URLSearchParams()
                if (config.level) params.append('level', config.level)
                
                return baseSrc + (params.toString() ? '?' + params.toString() : '')
              })()} 
              style={{
                width: '100%',
                height: '100%',
                border: '1px solid #e9ecef',
                borderRadius: '8px'
              }}
              title="Preview"
            />
          </div>
        )}
      </div>

      <div className="embed-code">
        <h3>Embed Code:</h3>
        <div className="code-container">
          <pre className="code-block">
            <code>{generateEmbedCode()}</code>
          </pre>
          <button 
            className={`copy-button ${copied ? 'copied' : ''}`}
            onClick={copyToClipboard}
          >
            {copied ? '✅ Gekopieerd!' : '📋 Kopiëren'}
          </button>
        </div>
      </div>

      <div className="embed-instructions">
        <h3>📋 Instructies:</h3>
        <ol>
          <li><strong>Selecteer een cursus</strong> - Kies tussen AI Veiligheid & Ethiek of Prompt Engineering</li>
          <li><strong>Kies optioneel een niveau</strong> - Laat leeg voor niveau selectie door gebruiker</li>
          <li><strong>Configureer instellingen</strong> - Pas breedte, hoogte en andere opties aan</li>
          <li><strong>Kopieer de embed code</strong> hierboven</li>
          <li><strong>Plak de code</strong> in je HTML pagina of LMS</li>
          <li><strong>Test de integratie</strong> om er zeker van te zijn dat alles werkt</li>
        </ol>
        
        <div className="configuration-tips">
          <h4>💡 Configuratie Tips:</h4>
          <ul>
            <li><strong>Geen cursus geselecteerd:</strong> Toont standaard AI Veiligheid oefeningen</li>
            <li><strong>Specifieke cursus:</strong> Laadt direct de gekozen cursus (AI Safety of Prompt Engineering)</li>
            <li><strong>Niveau selectie:</strong> Laat leeg om gebruikers zelf te laten kiezen, of kies een specifiek niveau</li>
            <li><strong>Auto-start:</strong> Start automatisch na niveau selectie (voorkomt scroll problemen)</li>
            <li><strong>Header verbergen:</strong> Aanbevolen voor embed gebruik in externe websites</li>
          </ul>
        </div>
        
        <div className="example-link-section">
          <Link to="/embed/example" className="btn btn-primary">
            🎯 Bekijk Live Embed Voorbeeld
          </Link>
          <p>Test de embedding functionaliteit en zie hoe parent-child communicatie werkt</p>
        </div>
        
        <div className="embed-features">
          <h4>🚀 Features:</h4>
          <ul>
            <li>✅ <strong>Afzonderlijke cursus selectie</strong> - Kies specifiek tussen AI Veiligheid of Prompt Engineering</li>
            <li>✅ <strong>Niveau configuratie per cursus</strong> - Stel een specifiek niveau in of laat gebruikers kiezen</li>
            <li>✅ <strong>Automatische hoogte aanpassing</strong> - iframe past zich aan aan de content</li>
            <li>✅ <strong>Automatische start na niveau selectie</strong> - geen scroll problemen in embedded modus</li>
            <li>✅ <strong>Progress tracking</strong> - ontvang updates over voortgang van leerlingen</li>
            <li>✅ <strong>Responsive design</strong> - werkt op alle apparaten</li>
            <li>✅ <strong>GDPR compliant</strong> - geen tracking cookies</li>
            <li>✅ <strong>Offline ready</strong> - werkt zonder internetverbinding na laden</li>
          </ul>
        </div>

        <div className="integration-examples">
          <h4>🔧 Integratie voorbeelden:</h4>
          <details>
            <summary>Moodle LMS</summary>
            <p>Voeg een "Label" activiteit toe en schakel de HTML editor in. Plak de embed code in de HTML modus.</p>
          </details>
          <details>
            <summary>WordPress</summary>
            <p>Gebruik een "Custom HTML" block of voeg de code toe aan een post/pagina in HTML modus.</p>
          </details>
          <details>
            <summary>Canvas LMS</summary>
            <p>Maak een nieuwe pagina aan, klik op "HTML Editor" en plak de embed code.</p>
          </details>
        </div>
      </div>
    </div>
  )
}

export default EmbedGenerator