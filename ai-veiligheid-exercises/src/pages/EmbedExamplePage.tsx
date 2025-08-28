import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface EmbedMessage {
  type: string
  data?: any
  height?: number
}

const EmbedExamplePage: React.FC = () => {
  const [messages, setMessages] = useState<EmbedMessage[]>([])
  const [iframeHeight, setIframeHeight] = useState('600px')
  const [currentSrc, setCurrentSrc] = useState('/exercises?level=beginner&hideHeader=true')

  const loadExercise = (src: string) => {
    setCurrentSrc(src)
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('Received message from iframe:', event.data)
      
      // Store message for display
      setMessages(prev => [...prev, event.data])
      
      // Handle resize
      if (event.data.type === 'RESIZE_RESPONSE') {
        setIframeHeight(event.data.height + 'px')
      }
    }

    window.addEventListener('message', handleMessage)

    // Request initial resize after iframe loads
    const timer = setTimeout(() => {
      const iframe = document.querySelector('#demo-iframe') as HTMLIFrameElement
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'RESIZE_REQUEST' }, '*')
      }
    }, 2000)

    return () => {
      window.removeEventListener('message', handleMessage)
      clearTimeout(timer)
    }
  }, [])

  const clearMessages = () => {
    setMessages([])
  }

  const requestResize = () => {
    const iframe = document.querySelector('#demo-iframe') as HTMLIFrameElement
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'RESIZE_REQUEST' }, '*')
    }
  }

  return (
    <div className="embed-example-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> &gt; <Link to="/embed">Embed Generator</Link> &gt; <span>Example</span>
      </div>
      
      <h1>🔗 Embed Example & Test Page</h1>
      <p>This page demonstrates how both AI Safety and Prompt Engineering exercises appear when embedded in an iframe and shows the communication between parent and child windows.</p>

      <div className="embed-demo-section">
        <h2>📱 Live Embed Demo</h2>
        <p>Below is a live example of the exercises embedded in an iframe. Switch between AI Safety and Prompt Engineering:</p>
        
        <div className="demo-controls">
          <div className="control-group">
            <h4>AI Veiligheid & Ethiek</h4>
            <button className="btn btn-primary" onClick={() => loadExercise('/exercises?hideHeader=true')}>
              🛡️ Basic
            </button>
            <button className="btn btn-primary" onClick={() => loadExercise('/exercises?level=beginner&hideHeader=true')}>
              🌱 Beginner
            </button>
            <button className="btn btn-primary" onClick={() => loadExercise('/exercises?level=intermediate&hideHeader=true')}>
              🌿 Intermediate
            </button>
            <button className="btn btn-primary" onClick={() => loadExercise('/exercises?level=advanced&hideHeader=true')}>
              🌳 Advanced
            </button>
          </div>
          
          <div className="control-group">
            <h4>Prompt Engineering</h4>
            <button className="btn btn-secondary" onClick={() => loadExercise('/prompt-exercises?hideHeader=true')}>
              🎯 Basic
            </button>
            <button className="btn btn-secondary" onClick={() => loadExercise('/prompt-exercises?level=beginner&hideHeader=true')}>
              🌱 Beginner
            </button>
            <button className="btn btn-secondary" onClick={() => loadExercise('/prompt-exercises?level=intermediate&hideHeader=true')}>
              🌿 Intermediate
            </button>
            <button className="btn btn-secondary" onClick={() => loadExercise('/prompt-exercises?level=advanced&hideHeader=true')}>
              🌳 Advanced
            </button>
          </div>
        </div>
        
        <div className="iframe-container">
          <iframe
            id="demo-iframe"
            src={currentSrc}
            width="100%"
            height={iframeHeight}
            style={{
              border: '2px solid #e9ecef',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}
            title="AI Exercises Demo"
            allow="fullscreen"
          />
        </div>

        <div className="demo-actions">
          <button className="btn btn-outline" onClick={requestResize}>
            📏 Request Resize
          </button>
          <button className="btn btn-outline" onClick={clearMessages}>
            🗑️ Clear Messages
          </button>
        </div>
        
        <div className="demo-controls">
          <button className="btn btn-secondary" onClick={requestResize}>
            📏 Request Resize
          </button>
          <button className="btn btn-secondary" onClick={clearMessages}>
            🗑️ Clear Messages
          </button>
        </div>
      </div>

      <div className="communication-log">
        <h3>📡 Communication Log</h3>
        <p>Messages received from the embedded iframe:</p>
        
        <div className="message-container">
          {messages.length === 0 ? (
            <p className="no-messages">No messages received yet. Interact with the embedded exercises above to see communication in action.</p>
          ) : (
            messages.map((message, index) => (
              <div key={index} className="message-item">
                <div className="message-header">
                  <span className="message-type">{message.type}</span>
                  <span className="message-time">{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="message-data">
                  {JSON.stringify(message, null, 2)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="integration-examples">
        <h3>🛠️ Integration Examples</h3>
        
        <div className="example-section">
          <h4>Basic HTML Integration</h4>
          <pre className="code-block">
{`<!-- AI Safety Exercises -->
<iframe 
  src="${window.location.origin}/exercises"
  width="100%"
  height="600px"
  frameborder="0"
  title="AI Safety Exercises">
</iframe>

<!-- Prompt Engineering Exercises -->
<iframe 
  src="${window.location.origin}/prompt-exercises"
  width="100%"
  height="600px"
  frameborder="0"
  title="Prompt Engineering Exercises">
</iframe>`}
          </pre>
        </div>

        <div className="example-section">
          <h4>With Auto-Resize JavaScript</h4>
          <pre className="code-block">
{`<iframe 
  id="ai-exercises"
  src="${window.location.origin}/exercises?hideHeader=true"
  width="100%"
  height="600px"
  frameborder="0"
  title="AI Safety Exercises">
</iframe>

<script>
window.addEventListener('message', function(event) {
  if (event.data.type === 'RESIZE_RESPONSE') {
    const iframe = document.getElementById('ai-exercises');
    if (iframe) {
      iframe.style.height = event.data.height + 'px';
    }
  }
  
  if (event.data.type === 'EXERCISE_PROGRESS') {
    console.log('Student progress:', event.data.data);
    // Handle progress tracking here
  }
});

// Request initial resize
setTimeout(() => {
  const iframe = document.getElementById('ai-exercises');
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage({ type: 'RESIZE_REQUEST' }, '*');
  }
}, 1000);
</script>`}
          </pre>
        </div>

        <div className="example-section">
          <h4>React Integration (Both Courses)</h4>
          <pre className="code-block">
{`import React, { useEffect, useRef, useState } from 'react';

const AICoursesEmbed = () => {
  const iframeRef = useRef(null);
  const [currentCourse, setCurrentCourse] = useState('ai-safety');

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'RESIZE_RESPONSE') {
        if (iframeRef.current) {
          iframeRef.current.style.height = event.data.height + 'px';
        }
      }
      
      if (event.data.type === 'EXERCISE_PROGRESS') {
        console.log('Progress:', event.data.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const getSrc = () => {
    const base = currentCourse === 'ai-safety' ? '/exercises' : '/prompt-exercises';
    return "${window.location.origin}" + base + "?hideHeader=true";
  };

  return (
    <div>
      <div>
        <button onClick={() => setCurrentCourse('ai-safety')}>
          AI Safety & Ethics
        </button>
        <button onClick={() => setCurrentCourse('prompt-engineering')}>
          Prompt Engineering
        </button>
      </div>
      <iframe
        ref={iframeRef}
        src={getSrc()}
        width="100%"
        height="600px"
        frameBorder="0"
        title={currentCourse === 'ai-safety' ? 'AI Safety' : 'Prompt Engineering'}
      />
    </div>
  );
};`}
          </pre>
        </div>
      </div>

      <div className="features-showcase">
        <h3>✨ Embedding Features</h3>
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-icon">📏</span>
            <strong>Auto-Resize</strong>
            <p>Iframe automatically adjusts height based on content</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <strong>Progress Tracking</strong>
            <p>Receive real-time updates on student progress</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎨</span>
            <strong>Customizable</strong>
            <p>Configure starting level, hide header, auto-start options</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📱</span>
            <strong>Responsive</strong>
            <p>Works perfectly on desktop, tablet, and mobile devices</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🔒</span>
            <strong>Privacy-Safe</strong>
            <p>No tracking cookies or external dependencies</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <strong>Fast Loading</strong>
            <p>Optimized for quick load times and smooth performance</p>
          </div>
        </div>
      </div>

      <div className="back-navigation">
        <Link to="/embed" className="btn btn-secondary">
          ← Back to Embed Generator
        </Link>
        <Link to="/" className="btn btn-primary">
          🏠 Home
        </Link>
      </div>
    </div>
  )
}

export default EmbedExamplePage