import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Types for the prompt database
export interface PromptTemplate {
  id: string
  title: string
  description: string
  category: string
  framework: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  industry: string[]
  aiModel: string[]
  template: string
  variables: string[]
  example: string
  tags: string[]
  author: string
  rating: number
  usageCount: number
  dateCreated: string
  lastUpdated: string
}

// Sample comprehensive prompt database
const promptDatabase: PromptTemplate[] = [
  {
    id: 'marketing-persona-1',
    title: 'Marketing Persona Ontwikkeling',
    description: 'Maak gedetailleerde buyer personas voor marketingdoeleinden',
    category: 'Marketing',
    framework: ['SMART Goals', 'Customer Journey'],
    difficulty: 'intermediate',
    industry: ['E-commerce', 'SaaS', 'Retail'],
    aiModel: ['ChatGPT', 'Claude', 'Gemini'],
    template: 'Je bent een ervaren marketing strategist. Ontwikkel een gedetailleerde buyer persona voor [PRODUCT/SERVICE] die zich richt op [TARGET_AUDIENCE]. Include demografische data, psychografische kenmerken, pain points, motivaties, en voorkeurskanalen. Format je antwoord als een structured profile met de volgende secties: Demographics, Psychographics, Goals & Motivations, Pain Points, Preferred Channels, Messaging Preferences.',
    variables: ['PRODUCT/SERVICE', 'TARGET_AUDIENCE'],
    example: 'Je bent een ervaren marketing strategist. Ontwikkel een gedetailleerde buyer persona voor "duurzame sportkleding" die zich richt op "milieubewuste millennials". Include demografische data...',
    tags: ['marketing', 'persona', 'strategy', 'customer-research'],
    author: 'Marketing Expert',
    rating: 4.5,
    usageCount: 1247,
    dateCreated: '2024-01-15',
    lastUpdated: '2024-03-10'
  },
  {
    id: 'code-review-1',
    title: 'Code Review & Optimalisatie',
    description: 'Professionele code review met verbeteringsvoorstellen',
    category: 'Development',
    framework: ['SOLID Principles', 'Clean Code'],
    difficulty: 'advanced',
    industry: ['Tech', 'Software Development', 'Startup'],
    aiModel: ['ChatGPT', 'Claude', 'Copilot'],
    template: 'Je bent een senior software engineer met 10+ jaar ervaring. Review de volgende [PROGRAMMING_LANGUAGE] code en geef gedetailleerde feedback op: 1) Code kwaliteit en leesbaarheid, 2) Performance optimalisaties, 3) Security vulnerabilities, 4) Best practices, 5) Refactoring suggesties. Format je antwoord met duidelijke secties en concrete verbeteringsvoorstellen.\\n\\nCode to review:\\n[CODE_BLOCK]',
    variables: ['PROGRAMMING_LANGUAGE', 'CODE_BLOCK'],
    example: 'Je bent een senior software engineer met 10+ jaar ervaring. Review de volgende Python code en geef gedetailleerde feedback op...',
    tags: ['code-review', 'programming', 'optimization', 'best-practices'],
    author: 'Senior Developer',
    rating: 4.8,
    usageCount: 892,
    dateCreated: '2024-02-01',
    lastUpdated: '2024-03-15'
  },
  {
    id: 'content-strategy-1',
    title: 'Content Marketing Strategie',
    description: 'Ontwikkel comprehensive content marketing plannen',
    category: 'Content Marketing',
    framework: ['AIDA', 'Content Pillar Strategy'],
    difficulty: 'intermediate',
    industry: ['Marketing', 'SaaS', 'E-commerce', 'B2B'],
    aiModel: ['ChatGPT', 'Claude', 'Gemini'],
    template: 'Je bent een content marketing specialist. Ontwikkel een 3-maands content strategie voor [COMPANY_TYPE] in de [INDUSTRY] sector. Richt je op [TARGET_AUDIENCE] en [BUSINESS_GOALS]. Include: 1) Content pillars en themes, 2) Content calendar outline, 3) Platform-specific aanpak, 4) KPI metrics, 5) Resource vereisten. Format als actionable plan met concrete deliverables.',
    variables: ['COMPANY_TYPE', 'INDUSTRY', 'TARGET_AUDIENCE', 'BUSINESS_GOALS'],
    example: 'Je bent een content marketing specialist. Ontwikkel een 3-maands content strategie voor "B2B SaaS startup" in de "HR tech" sector...',
    tags: ['content-marketing', 'strategy', 'planning', 'social-media'],
    author: 'Content Strategist',
    rating: 4.3,
    usageCount: 634,
    dateCreated: '2024-01-20',
    lastUpdated: '2024-02-28'
  },
  {
    id: 'data-analysis-1',
    title: 'Data Analyse & Insights',
    description: 'Analyse datasets en genereer actionable business insights',
    category: 'Data Analytics',
    framework: ['CRISP-DM', 'Data Storytelling'],
    difficulty: 'advanced',
    industry: ['Finance', 'Healthcare', 'E-commerce', 'Tech'],
    aiModel: ['ChatGPT', 'Claude', 'Copilot'],
    template: 'Je bent een senior data analyst. Analyseer de volgende dataset over [DATA_TOPIC] en genereer business insights voor [STAKEHOLDER_GROUP]. Provide: 1) Data quality assessment, 2) Key trends en patterns, 3) Statistical significance testing, 4) Actionable recommendations, 5) Visualization suggesties. Format als executive summary met supporting details.\\n\\nDataset context: [DATASET_DESCRIPTION]\\nSpecific questions: [BUSINESS_QUESTIONS]',
    variables: ['DATA_TOPIC', 'STAKEHOLDER_GROUP', 'DATASET_DESCRIPTION', 'BUSINESS_QUESTIONS'],
    example: 'Je bent een senior data analyst. Analyseer de volgende dataset over "customer churn" en genereer business insights voor "C-level executives"...',
    tags: ['data-analysis', 'insights', 'business-intelligence', 'statistics'],
    author: 'Data Science Expert',
    rating: 4.7,
    usageCount: 445,
    dateCreated: '2024-02-10',
    lastUpdated: '2024-03-05'
  },
  {
    id: 'education-curriculum-1',
    title: 'Onderwijscurriculum Ontwikkeling',
    description: 'Ontwikkel comprehensive onderwijs curricula en leerplannen',
    category: 'Education',
    framework: ['Blooms Taxonomy', 'Backward Design'],
    difficulty: 'intermediate',
    industry: ['Education', 'Training', 'Corporate Learning'],
    aiModel: ['ChatGPT', 'Claude', 'Gemini'],
    template: 'Je bent een ervaren instructional designer. Ontwikkel een [COURSE_DURATION] curriculum voor [SUBJECT_AREA] gericht op [TARGET_LEARNERS]. Include: 1) Learning objectives (Blooms taxonomy), 2) Module breakdown met timelines, 3) Assessment strategies, 4) Required resources, 5) Engagement activities. Format als detailed course outline met practical implementation guide.',
    variables: ['COURSE_DURATION', 'SUBJECT_AREA', 'TARGET_LEARNERS'],
    example: 'Je bent een ervaren instructional designer. Ontwikkel een "8-week" curriculum voor "Digital Marketing" gericht op "business professionals"...',
    tags: ['education', 'curriculum', 'learning-design', 'training'],
    author: 'Education Designer',
    rating: 4.4,
    usageCount: 523,
    dateCreated: '2024-02-05',
    lastUpdated: '2024-03-12'
  }
]

// Filter and search functionality
interface FilterState {
  category: string
  difficulty: string
  framework: string
  industry: string
  aiModel: string
  searchQuery: string
  sortBy: 'rating' | 'usage' | 'recent' | 'alphabetical'
  sortOrder: 'asc' | 'desc'
}

const PromptDatabase: React.FC = () => {
  const [filteredPrompts, setFilteredPrompts] = useState<PromptTemplate[]>(promptDatabase)
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    difficulty: '',
    framework: '',
    industry: '',
    aiModel: '',
    searchQuery: '',
    sortBy: 'rating',
    sortOrder: 'desc'
  })
  const [selectedPrompt, setSelectedPrompt] = useState<PromptTemplate | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Get unique values for filter options
  const categories = [...new Set(promptDatabase.map(p => p.category))].sort()
  const frameworks = [...new Set(promptDatabase.flatMap(p => p.framework))].sort()
  const industries = [...new Set(promptDatabase.flatMap(p => p.industry))].sort()
  const aiModels = [...new Set(promptDatabase.flatMap(p => p.aiModel))].sort()

  // Filter and search logic
  useEffect(() => {
    let filtered = [...promptDatabase]

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category)
    }
    if (filters.difficulty) {
      filtered = filtered.filter(p => p.difficulty === filters.difficulty)
    }
    if (filters.framework) {
      filtered = filtered.filter(p => p.framework.includes(filters.framework))
    }
    if (filters.industry) {
      filtered = filtered.filter(p => p.industry.includes(filters.industry))
    }
    if (filters.aiModel) {
      filtered = filtered.filter(p => p.aiModel.includes(filters.aiModel))
    }

    // Apply search
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query)) ||
        p.template.toLowerCase().includes(query)
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal, bVal
      switch (filters.sortBy) {
        case 'rating':
          aVal = a.rating
          bVal = b.rating
          break
        case 'usage':
          aVal = a.usageCount
          bVal = b.usageCount
          break
        case 'recent':
          aVal = new Date(a.lastUpdated).getTime()
          bVal = new Date(b.lastUpdated).getTime()
          break
        case 'alphabetical':
          aVal = a.title.toLowerCase()
          bVal = b.title.toLowerCase()
          break
        default:
          return 0
      }

      if (filters.sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

    setFilteredPrompts(filtered)
  }, [filters])

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      difficulty: '',
      framework: '',
      industry: '',
      aiModel: '',
      searchQuery: '',
      sortBy: 'rating',
      sortOrder: 'desc'
    })
  }

  const copyPromptTemplate = (template: string) => {
    navigator.clipboard.writeText(template)
    // You could add a toast notification here
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '🌱'
      case 'intermediate': return '🌿'
      case 'advanced': return '🌳'
      default: return '📝'
    }
  }

  const getRatingStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐')
    }
    if (hasHalfStar) {
      stars.push('✨')
    }
    return stars.join('')
  }

  return (
    <div className="prompt-database">
      <div className="database-header">
        <div className="breadcrumb">
          <Link to="/">Home</Link> &gt; <span>Prompt Database</span>
        </div>
        
        <h1>🗃️ Prompt Database</h1>
        <p>Ontdek professionele prompt templates voor verschillende use cases en industrieën</p>
        
        <div className="database-stats">
          <div className="stat-item">
            <span className="stat-number">{promptDatabase.length}</span>
            <span className="stat-label">Prompt Templates</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{categories.length}</span>
            <span className="stat-label">Categorieën</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{filteredPrompts.length}</span>
            <span className="stat-label">Resultaten</span>
          </div>
        </div>
      </div>

      <div className="database-controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Zoek prompts, tags, of keywords..."
            value={filters.searchQuery}
            onChange={(e) => updateFilter('searchQuery', e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-section">
          <select value={filters.category} onChange={(e) => updateFilter('category', e.target.value)}>
            <option value="">Alle Categorieën</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select value={filters.difficulty} onChange={(e) => updateFilter('difficulty', e.target.value)}>
            <option value="">Alle Niveaus</option>
            <option value="beginner">🌱 Beginner</option>
            <option value="intermediate">🌿 Intermediate</option>
            <option value="advanced">🌳 Advanced</option>
          </select>

          <select value={filters.framework} onChange={(e) => updateFilter('framework', e.target.value)}>
            <option value="">Alle Frameworks</option>
            {frameworks.map(fw => (
              <option key={fw} value={fw}>{fw}</option>
            ))}
          </select>

          <select value={filters.industry} onChange={(e) => updateFilter('industry', e.target.value)}>
            <option value="">Alle Industrieën</option>
            {industries.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>

          <select value={filters.aiModel} onChange={(e) => updateFilter('aiModel', e.target.value)}>
            <option value="">Alle AI Models</option>
            {aiModels.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>

          <button onClick={clearFilters} className="btn btn-secondary">
            🔄 Reset Filters
          </button>
        </div>

        <div className="view-controls">
          <div className="sort-controls">
            <select value={filters.sortBy} onChange={(e) => updateFilter('sortBy', e.target.value)}>
              <option value="rating">Rating</option>
              <option value="usage">Populariteit</option>
              <option value="recent">Recent Updated</option>
              <option value="alphabetical">Alfabetisch</option>
            </select>
            <button 
              onClick={() => updateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
              className="sort-order-btn"
            >
              {filters.sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>

          <div className="view-mode-controls">
            <button 
              onClick={() => setViewMode('grid')} 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            >
              ⚏
            </button>
            <button 
              onClick={() => setViewMode('list')} 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      <div className={`prompts-container ${viewMode}`}>
        {filteredPrompts.map(prompt => (
          <div key={prompt.id} className="prompt-card" onClick={() => setSelectedPrompt(prompt)}>
            <div className="prompt-header">
              <h3>{prompt.title}</h3>
              <div className="prompt-meta">
                <span className="difficulty">{getDifficultyIcon(prompt.difficulty)}</span>
                <span className="category">{prompt.category}</span>
              </div>
            </div>
            
            <p className="prompt-description">{prompt.description}</p>
            
            <div className="prompt-stats">
              <div className="rating">
                <span>{getRatingStars(prompt.rating)}</span>
                <span>{prompt.rating}</span>
              </div>
              <div className="usage">
                👥 {prompt.usageCount.toLocaleString()}
              </div>
            </div>

            <div className="prompt-tags">
              {prompt.tags.slice(0, 3).map(tag => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
              {prompt.tags.length > 3 && <span className="tag">+{prompt.tags.length - 3}</span>}
            </div>

            <div className="prompt-footer">
              <div className="ai-models">
                {prompt.aiModel.slice(0, 2).map(model => (
                  <span key={model} className="ai-model">{model}</span>
                ))}
                {prompt.aiModel.length > 2 && <span className="ai-model">+{prompt.aiModel.length - 2}</span>}
              </div>
              <span className="author">by {prompt.author}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredPrompts.length === 0 && (
        <div className="no-results">
          <h3>Geen prompts gevonden</h3>
          <p>Probeer je filters aan te passen of een andere zoekterm te gebruiken.</p>
          <button onClick={clearFilters} className="btn btn-primary">
            Reset Alle Filters
          </button>
        </div>
      )}

      {/* Prompt Detail Modal */}
      {selectedPrompt && (
        <div className="prompt-modal-overlay" onClick={() => setSelectedPrompt(null)}>
          <div className="prompt-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedPrompt.title}</h2>
              <button onClick={() => setSelectedPrompt(null)} className="close-btn">✕</button>
            </div>
            
            <div className="modal-content">
              <div className="prompt-details">
                <div className="detail-section">
                  <h4>Beschrijving</h4>
                  <p>{selectedPrompt.description}</p>
                </div>

                <div className="detail-section">
                  <h4>Template</h4>
                  <div className="template-container">
                    <pre className="template-text">{selectedPrompt.template}</pre>
                    <button 
                      onClick={() => copyPromptTemplate(selectedPrompt.template)}
                      className="copy-btn"
                    >
                      📋 Kopieer Template
                    </button>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Variabelen</h4>
                  <div className="variables">
                    {selectedPrompt.variables.map(variable => (
                      <span key={variable} className="variable">[{variable}]</span>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Voorbeeld</h4>
                  <div className="example-container">
                    <p className="example-text">{selectedPrompt.example}</p>
                  </div>
                </div>

                <div className="detail-grid">
                  <div className="detail-item">
                    <h5>Frameworks</h5>
                    <div className="tags">
                      {selectedPrompt.framework.map(fw => (
                        <span key={fw} className="tag">{fw}</span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-item">
                    <h5>Industrieën</h5>
                    <div className="tags">
                      {selectedPrompt.industry.map(ind => (
                        <span key={ind} className="tag">{ind}</span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-item">
                    <h5>AI Models</h5>
                    <div className="tags">
                      {selectedPrompt.aiModel.map(model => (
                        <span key={model} className="tag">{model}</span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-item">
                    <h5>Tags</h5>
                    <div className="tags">
                      {selectedPrompt.tags.map(tag => (
                        <span key={tag} className="tag">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="prompt-stats-detail">
                  <div className="stat">
                    <span className="label">Rating:</span>
                    <span className="value">{getRatingStars(selectedPrompt.rating)} ({selectedPrompt.rating})</span>
                  </div>
                  <div className="stat">
                    <span className="label">Gebruik:</span>
                    <span className="value">{selectedPrompt.usageCount.toLocaleString()} keer</span>
                  </div>
                  <div className="stat">
                    <span className="label">Auteur:</span>
                    <span className="value">{selectedPrompt.author}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Laatste update:</span>
                    <span className="value">{new Date(selectedPrompt.lastUpdated).toLocaleDateString('nl-NL')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                onClick={() => copyPromptTemplate(selectedPrompt.template)}
                className="btn btn-primary"
              >
                📋 Kopieer Template
              </button>
              <button 
                onClick={() => setSelectedPrompt(null)}
                className="btn btn-secondary"
              >
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PromptDatabase