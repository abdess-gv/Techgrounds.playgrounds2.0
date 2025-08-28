import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ExercisePage from './pages/ExercisePage'
import PromptExercisePage from './pages/PromptExercisePage'
import PromptDatabase from './pages/PromptDatabase'
import EmbedGenerator from './components/EmbedGenerator'
import EmbedExamplePage from './pages/EmbedExamplePage'

function App() {
  // Detect if running in iframe and set up communication
  useEffect(() => {
    const isEmbedded = window.self !== window.top
    
    if (isEmbedded) {
      // Send ready message to parent
      window.parent.postMessage({ type: 'AI_EXERCISES_READY' }, '*')
      
      // Listen for messages from parent
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === 'RESIZE_REQUEST') {
          // Send current height to parent
          const height = document.documentElement.scrollHeight
          window.parent.postMessage({ 
            type: 'RESIZE_RESPONSE', 
            height: height 
          }, '*')
        }
      }
      
      window.addEventListener('message', handleMessage)
      
      // Send progress updates
      const sendProgress = (progress: any) => {
        window.parent.postMessage({
          type: 'EXERCISE_PROGRESS',
          data: progress
        }, '*')
      }
      
      // Make sendProgress available globally for exercise components
      ;(window as any).sendProgressToParent = sendProgress
      
      return () => {
        window.removeEventListener('message', handleMessage)
      }
    }
  }, [])

  const isEmbedded = window.self !== window.top
  const urlParams = new URLSearchParams(window.location.search)
  const hideHeader = urlParams.get('hideHeader') === 'true'
  const shouldShowHeader = !isEmbedded && !hideHeader

  return (
    <Router basename={import.meta.env.DEV ? '/' : '/Techgrounds.playgrounds2.0'}>
      <div className={`app ${isEmbedded ? 'embedded' : ''}`}>
        {shouldShowHeader && (
          <header className="app-header">
            <div className="header-content">
              <Link to="/" className="logo-link">
                <div className="logo">
                  <span className="logo-icon">🛡️</span>
                  <span className="logo-text">AI Veiligheid & Ethische Overwegingen</span>
                </div>
              </Link>
              <p className="subtitle">Leer veilig en verantwoord omgaan met AI-systemen</p>
            </div>
          </header>
        )}
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/exercises" element={<ExercisePage />} />
            <Route path="/prompt-exercises" element={<PromptExercisePage />} />
            <Route path="/prompt-database" element={<PromptDatabase />} />
            <Route path="/embed" element={<EmbedGenerator />} />
            <Route path="/embed/example" element={<EmbedExamplePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App