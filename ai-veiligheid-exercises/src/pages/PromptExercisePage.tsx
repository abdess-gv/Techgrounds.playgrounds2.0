import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Exercise types and interfaces
export type PromptExerciseType = 'multiple-choice' | 'multiple-select' | 'prompt-improvement' | 'prompt-analysis'

export interface PromptExercise {
  id: string
  title: string
  question: string
  context?: string
  type: PromptExerciseType
  options?: string[]
  correctAnswer?: string | string[]
  explanation: string
  examplePrompt?: string
  improvedPrompt?: string
}

export interface PromptExerciseSet {
  [level: string]: PromptExercise[]
}

// Exercise data
const promptExercises: PromptExerciseSet = {
  beginner: [
    {
      id: 'basic-elements-1',
      title: 'Basis Prompt Elementen',
      question: 'Welke elementen maken een prompt effectiever? Selecteer alle juiste antwoorden.',
      type: 'multiple-select',
      options: [
        'Duidelijke taakbeschrijving (Task)',
        'Relevante context (Context)', 
        'Specifieke rol of persona (Role)',
        'Gewenste format (Format)',
        'Zo veel mogelijk technische termen',
        'Toon en stijl instructies (Tone)'
      ],
      correctAnswer: ['Duidelijke taakbeschrijving (Task)', 'Relevante context (Context)', 'Specifieke rol of persona (Role)', 'Gewenste format (Format)', 'Toon en stijl instructies (Tone)'],
      explanation: 'Een effectieve prompt bevat: Taak, Context, Persona/Rol, Format en Toon. Technische termen maken een prompt meestal onduidelijker, niet beter.'
    },
    {
      id: 'vague-vs-specific-1',
      title: 'Vaag vs. Specifiek',
      question: 'Welke prompt is effectiever voor het krijgen van een bruikbare marketingslogan?',
      context: 'Je bent bezig met een marketingcampagne voor een nieuw product.',
      type: 'multiple-choice',
      options: [
        'Maak een slogan.',
        'Bedenk een pakkende slogan voor mijn product.',
        'Gedraag je als een ervaren copywriter. Creëer 3 korte, pakkende slogans (max. 6 woorden) voor een nieuwe eco-vriendelijke tandenborstel gericht op milieubewuste gezinnen. De toon moet vertrouwd en inspirerend zijn.',
        'Kun je een goede slogan maken die mensen aanspreekt?'
      ],
      correctAnswer: 'Gedraag je als een ervaren copywriter. Creëer 3 korte, pakkende slogans (max. 6 woorden) voor een nieuwe eco-vriendelijke tandenborstel gericht op milieubewuste gezinnen. De toon moet vertrouwd en inspirerend zijn.',
      explanation: 'Deze prompt bevat alle essentiële elementen: rol (copywriter), taak (creëer slogans), format (3 slogans, max. 6 woorden), context (eco-vriendelijke tandenborstel), doelgroep (milieubewuste gezinnen) en toon (vertrouwd en inspirerend).'
    },
    {
      id: 'role-importance-1',
      title: 'Belang van Rollen',
      question: 'Waarom is het definiëren van een rol of persona belangrijk in prompting?',
      type: 'multiple-choice',
      options: [
        'Het maakt de prompt langer en dus beter',
        'Het helpt de AI de juiste stijl, toon en expertisegebied te bepalen',
        'Het is verplicht voor alle AI-tools',
        'Het voorkomt dat de AI antwoord geeft'
      ],
      correctAnswer: 'Het helpt de AI de juiste stijl, toon en expertisegebied te bepalen',
      explanation: 'Door een rol te definiëren (bijv. "gedraag je als een geschiedenisprofessor") geef je de AI context over het gewenste niveau van expertise, schrijfstijl en aanpak voor het antwoord.'
    },
    {
      id: 'format-specification-1',
      title: 'Format Specificatie',
      question: 'Welke format-instructies zijn het meest specifiek en bruikbaar?',
      type: 'multiple-choice',
      options: [
        'Geef me een lijst',
        'Schrijf het in een goede vorm',
        'Presenteer het resultaat als een tabel met 3 kolommen: Onderwerp, Uitleg, Voorbeeld',
        'Maak er iets moois van'
      ],
      correctAnswer: 'Presenteer het resultaat als een tabel met 3 kolommen: Onderwerp, Uitleg, Voorbeeld',
      explanation: 'Deze instructie is specifiek en actionable. De AI weet precies welke structuur je verwacht: een tabel met drie duidelijk benoemde kolommen.'
    },
    {
      id: 'context-importance-1',
      title: 'Context Toevoegen',
      question: 'Wat is het effect van het toevoegen van context aan een prompt?',
      context: 'Vergelijk: "Leg kwantumcomputing uit" vs. "Ik ben een 16-jarige middelbare scholier. Leg kwantumcomputing uit in eenvoudige taal met een goede analogie."',
      type: 'multiple-select',
      options: [
        'Het antwoord wordt aangepast aan het niveau van de doelgroep',
        'De AI gebruikt passende taal en voorbeelden',
        'Het antwoord wordt automatisch langer',
        'De AI kan relevantere informatie selecteren',
        'Het verhoogt de kans op technische fouten'
      ],
      correctAnswer: ['Het antwoord wordt aangepast aan het niveau van de doelgroep', 'De AI gebruikt passende taal en voorbeelden', 'De AI kan relevantere informatie selecteren'],
      explanation: 'Context helpt de AI om het antwoord af te stemmen op de situatie en doelgroep. Meer context betekent niet automatisch een langer antwoord, en verhoogt niet het risico op fouten.'
    }
  ],
  intermediate: [
    {
      id: 'few-shot-prompting-1',
      title: 'Few-shot Prompting',
      question: 'Wat is "few-shot prompting" en wanneer is het nuttig?',
      type: 'multiple-choice',
      options: [
        'Het gebruik van korte prompts',
        'Het geven van een of meer voorbeelden van gewenste output',
        'Het stellen van meerdere vragen tegelijk',
        'Het beperken van het aantal woorden in het antwoord'
      ],
      correctAnswer: 'Het geven van een of meer voorbeelden van gewenste output',
      explanation: 'Few-shot prompting betekent dat je de AI voorbeelden geeft van het soort output dat je verwacht. Dit is zeer effectief voor specifieke formats of stijlen.'
    },
    {
      id: 'negative-instructions-1',
      title: 'Negatieve Instructies',
      question: 'Welke negatieve instructies zijn het meest effectief?',
      context: 'Je wilt een productbeschrijving voor een website, maar wilt bepaalde elementen vermijden.',
      type: 'multiple-select',
      options: [
        'Vermijd technisch jargon',
        'Schrijf geen slechte tekst',
        'Noem geen specifieke merknamen van concurrenten',
        'Maak het niet saai',
        'Focus niet op de prijs of kosten',
        'Gebruik geen clichés zoals "revolutionair" of "game-changer"'
      ],
      correctAnswer: ['Vermijd technisch jargon', 'Noem geen specifieke merknamen van concurrenten', 'Focus niet op de prijs of kosten', 'Gebruik geen clichés zoals "revolutionair" of "game-changer"'],
      explanation: 'Effectieve negatieve instructies zijn specifiek en actionable. "Slechte tekst" of "saai" zijn te vaag. Concrete beperkingen zoals "geen technisch jargon" of "geen merknamen" zijn duidelijk.'
    },
    {
      id: 'prompt-chaining-1',
      title: 'Prompt Chaining',
      question: 'Wat is het voordeel van het opsplitsen van complexe taken in meerdere prompts?',
      context: 'Je wilt een complete marketingstrategie ontwikkelen voor een nieuw product.',
      type: 'multiple-select',
      options: [
        'Elke stap kan beter worden gecontroleerd en aangepast',
        'De AI kan zich focussen op één aspect tegelijk',
        'Je kunt tussenresultaten evalueren en bijsturen',
        'Het voorkomt dat de AI de taak weigert',
        'De AI werkt sneller met korte prompts',
        'Je kunt expertiserollen per stap aanpassen'
      ],
      correctAnswer: ['Elke stap kan beter worden gecontroleerd en aangepast', 'De AI kan zich focussen op één aspect tegelijk', 'Je kunt tussenresultaten evalueren en bijsturen', 'Je kunt expertiserollen per stap aanpassen'],
      explanation: 'Prompt chaining verbetert de kwaliteit door complexe taken op te splitsen. Dit geeft meer controle, focus en de mogelijkheid om per stap bij te sturen. Snelheid is geen hoofdvoordeel.'
    },
    {
      id: 'tone-consistency-1',
      title: 'Toon Consistentie',
      question: 'Hoe zorg je voor consistente toon bij het schrijven van meerdere gerelateerde contentstukken?',
      context: 'Je schrijft een serie blogposts voor hetzelfde bedrijf.',
      type: 'multiple-choice',
      options: [
        'Gebruik dezelfde prompt elke keer',
        'Specificeer de gewenste toon expliciet in elke prompt en verwijs naar eerdere voorbeelden',
        'Laat de AI zelf de toon bepalen',
        'Gebruik alleen korte prompts'
      ],
      correctAnswer: 'Specificeer de gewenste toon expliciet in elke prompt en verwijs naar eerdere voorbeelden',
      explanation: 'Consistentie bereik je door de toon expliciet te definiëren en waar mogelijk te verwijzen naar eerdere goede voorbeelden. Dit geeft de AI duidelijke richtlijnen voor de gewenste stijl.'
    },
    {
      id: 'context-length-1',
      title: 'Context Lengte Optimalisatie',
      question: 'Wat is de beste aanpak voor het beheren van context lengte in lange conversations?',
      type: 'multiple-select',
      options: [
        'Herhaal belangrijke context-informatie periodiek',
        'Gebruik samenvattingen van eerdere delen van het gesprek',
        'Start elke keer een nieuw gesprek',
        'Verwijs expliciet naar eerdere instructies wanneer relevant',
        'Gebruik alleen korte zinnen',
        'Combineer gerelateerde vragen in één prompt'
      ],
      correctAnswer: ['Herhaal belangrijke context-informatie periodiek', 'Gebruik samenvattingen van eerdere delen van het gesprek', 'Verwijs expliciet naar eerdere instructies wanneer relevant'],
      explanation: 'Effectief context management vereist strategische herhaling van belangrijke informatie, samenvattingen voor lange gesprekken, en expliciete verwijzingen naar eerdere instructies.'
    }
  ],
  advanced: [
    {
      id: 'prompt-injection-1',
      title: 'Prompt Injection Awareness',
      question: 'Wat zijn tekenen dat een prompt mogelijk gevoelig is voor "prompt injection" aanvallen?',
      context: 'Je bouwt een systeem dat gebruikersinput verwerkt via AI.',
      type: 'multiple-select',
      options: [
        'De prompt bevat gebruikersinput zonder filtering',
        'Er worden expliciete instructies gegeven over wat niet te doen',
        'De prompt gebruikt dynamische variabelen',
        'Het systeem heeft toegang tot gevoelige data',
        'De prompt is erg lang',
        'Er wordt gevraagd om code te genereren'
      ],
      correctAnswer: ['De prompt bevat gebruikersinput zonder filtering', 'De prompt gebruikt dynamische variabelen', 'Het systeem heeft toegang tot gevoelige data'],
      explanation: 'Prompt injection risico\'s ontstaan vooral bij ongevalideerde gebruikersinput, dynamische variabelen, en toegang tot gevoelige systemen. Lengte en negatieve instructies zijn geen primaire risicofactoren.'
    },
    {
      id: 'multi-modal-prompting-1',
      title: 'Multi-modal Prompting',
      question: 'Wat zijn beste praktijken voor het combineren van tekst en beelden in prompts?',
      type: 'multiple-select',
      options: [
        'Beschrijf wat je in het beeld ziet voordat je de taak geeft',
        'Verwijs specifiek naar elementen in het beeld',
        'Gebruik het beeld alleen ter inspiratie, vermeld het niet in de tekst',
        'Geef duidelijke instructies over hoe beeld en tekst zich verhouden',
        'Upload altijd hoogresolutie beelden',
        'Beperk de tekstprompt wanneer je beelden gebruikt'
      ],
      correctAnswer: ['Verwijs specifiek naar elementen in het beeld', 'Geef duidelijke instructies over hoe beeld en tekst zich verhouden'],
      explanation: 'Effectieve multi-modal prompts maken expliciete verbindingen tussen visuele en tekstuele elementen, en specificeren duidelijk hoe beide inputs zich tot elkaar verhouden.'
    },
    {
      id: 'prompt-versioning-1',
      title: 'Prompt Versioning & Testing',
      question: 'Welke strategieën zijn belangrijk voor het systematisch verbeteren van prompts in productieomgevingen?',
      type: 'multiple-select',
      options: [
        'A/B testing van verschillende prompt varianten',
        'Systematische documentatie van prompt wijzigingen',
        'Regelmatige evaluatie van output kwaliteit',
        'Gebruiksfeedback verzamelen en analyseren',
        'Alleen de nieuwste AI-modellen gebruiken',
        'Baseline metrics vastleggen voor vergelijking'
      ],
      correctAnswer: ['A/B testing van verschillende prompt varianten', 'Systematische documentatie van prompt wijzigingen', 'Regelmatige evaluatie van output kwaliteit', 'Gebruiksfeedback verzamelen en analyseren', 'Baseline metrics vastleggen voor vergelijking'],
      explanation: 'Professioneel prompt engineering vereist systematische testing, documentatie, kwaliteitsmonitoring en feedback loops. Het AI-model is slechts één factor in de vergelijking.'
    },
    {
      id: 'custom-instructions-1',
      title: 'Custom Instructions Optimalisatie',
      question: 'Wat zijn de belangrijkste elementen voor effectieve "Custom Instructions" of systeem-prompts?',
      context: 'Je configureert een AI-assistent voor een specifieke organisatie.',
      type: 'multiple-select',
      options: [
        'Duidelijke rol en verantwoordelijkheden van de AI',
        'Specifieke kennis over de organisatie en context',
        'Voorkeuren voor communicatiestijl en toon',
        'Beperkingen en ethische richtlijnen',
        'Alle mogelijk nuttige informatie, ongeacht relevantie',
        'Fallback instructies voor onbekende situaties'
      ],
      correctAnswer: ['Duidelijke rol en verantwoordelijkheden van de AI', 'Specifieke kennis over de organisatie en context', 'Voorkeuren voor communicatiestijl en toon', 'Beperkingen en ethische richtlijnen', 'Fallback instructies voor onbekende situaties'],
      explanation: 'Effectieve custom instructions definiëren duidelijk de rol, context, stijl, beperkingen en fallback gedrag. Te veel irrelevante informatie kan juist contraproductief zijn.'
    },
    {
      id: 'prompt-frameworks-1',
      title: 'Geavanceerde Prompt Frameworks',
      question: 'Welke gestructureerde frameworks kunnen helpen bij het ontwikkelen van complexe prompts?',
      type: 'multiple-select',
      options: [
        'CLEAR framework (Concise, Logical, Explicit, Adaptive, Reflective)',
        'CREATE framework (Character, Request, Examples, Adjustments, Type, Extras)',
        'RISEN framework (Role, Instructions, Steps, End goal, Narrowing)',
        'SMART framework (Specific, Measurable, Achievable, Relevant, Time-bound)',
        'RANDOM framework (willekeurige elementen combineren)',
        'TRACE framework (Task, Role, Audience, Context, Example)'
      ],
      correctAnswer: ['CLEAR framework (Concise, Logical, Explicit, Adaptive, Reflective)', 'CREATE framework (Character, Request, Examples, Adjustments, Type, Extras)', 'RISEN framework (Role, Instructions, Steps, End goal, Narrowing)', 'TRACE framework (Task, Role, Audience, Context, Example)'],
      explanation: 'CLEAR, CREATE, RISEN en TRACE zijn bestaande frameworks specifiek ontwikkeld voor prompt engineering. SMART is voor projectmanagement en RANDOM is geen echt framework.'
    }
  ]
}

interface Level {
  id: string
  name: string
  description: string
  icon: string
}

const levels: Level[] = [
  {
    id: 'beginner',
    name: 'Beginner',
    description: 'Basis concepten en prompt elementen',
    icon: '🌱'
  },
  {
    id: 'intermediate',
    name: 'Gemiddeld',  
    description: 'Geavanceerde technieken en strategieën',
    icon: '🌿'
  },
  {
    id: 'advanced',
    name: 'Gevorderd',
    description: 'Professionele frameworks en optimalisatie',
    icon: '🌳'
  }
]

interface UserAnswer {
  questionId: string
  answer: string | string[]
  isCorrect?: boolean
  question: string
  correctAnswer: string | string[]
  explanation: string
  userSelectedAnswers: string[]
}

const PromptExercisePage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [showExercises, setShowExercises] = useState(false)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [fadeClass, setFadeClass] = useState('fade-in')
  const [shuffledOptions, setShuffledOptions] = useState<{[key: string]: string[]}>({})

  const levelExercises = selectedLevel ? promptExercises[selectedLevel] || [] : []
  const currentExercise = levelExercises[currentExerciseIndex]

  // Shuffle array function
  const shuffleArray = (array: string[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Initialize shuffled options for each exercise
  useEffect(() => {
    if (levelExercises.length > 0) {
      const shuffled: {[key: string]: string[]} = {}
      levelExercises.forEach(exercise => {
        if (exercise.options) {
          shuffled[exercise.id] = shuffleArray(exercise.options)
        }
      })
      setShuffledOptions(shuffled)
    }
  }, [selectedLevel, levelExercises.length])

  useEffect(() => {
    setSelectedAnswers([])
  }, [currentExerciseIndex])

  // Handle URL parameters for embedding
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const levelParam = urlParams.get('level')
    const autoStartParam = urlParams.get('autoStart')
    
    if (levelParam && ['beginner', 'intermediate', 'advanced'].includes(levelParam)) {
      setSelectedLevel(levelParam)
      
      if (autoStartParam === 'true') {
        setTimeout(() => {
          setShowExercises(true)
        }, 500)
      }
    }
  }, [])

  const handleLevelSelect = (levelId: string) => {
    if (selectedLevel === levelId) return
    
    setIsTransitioning(true)
    setFadeClass('fade-out')
    
    setTimeout(() => {
      setSelectedLevel(levelId)
      setShowExercises(false)
      setCurrentExerciseIndex(0)
      setUserAnswers([])
      setScore(0)
      setIsCompleted(false)
      setFadeClass('fade-in')
      setIsTransitioning(false)
      
      // Auto-start exercises when embedded to avoid scrolling issues
      const isEmbedded = window.self !== window.top
      if (isEmbedded) {
        setTimeout(() => {
          setShowExercises(true)
        }, 500)
      }
    }, 300)
  }

  const startExercises = () => {
    if (selectedLevel) {
      setFadeClass('fade-out')
      
      setTimeout(() => {
        setShowExercises(true)
        setFadeClass('fade-in')
      }, 300)
    }
  }

  const resetToLevelSelection = () => {
    setFadeClass('fade-out')
    
    setTimeout(() => {
      setShowExercises(false)
      setSelectedLevel(null)
      setFadeClass('fade-in')
    }, 300)
  }

  const handleAnswerSelect = (answer: string) => {
    if (currentExercise.type === 'multiple-choice') {
      setSelectedAnswers([answer])
    } else if (currentExercise.type === 'multiple-select') {
      setSelectedAnswers(prev => 
        prev.includes(answer) 
          ? prev.filter(a => a !== answer)
          : [...prev, answer]
      )
    }
  }

  const submitAnswer = () => {
    if (selectedAnswers.length === 0) return

    const isCorrect = currentExercise.type === 'multiple-choice'
      ? selectedAnswers[0] === currentExercise.correctAnswer
      : Array.isArray(currentExercise.correctAnswer) &&
        selectedAnswers.length === currentExercise.correctAnswer.length &&
        selectedAnswers.every(answer => currentExercise.correctAnswer!.includes(answer))

    const userAnswer: UserAnswer = {
      questionId: currentExercise.id,
      answer: currentExercise.type === 'multiple-choice' ? selectedAnswers[0] : selectedAnswers,
      isCorrect,
      question: currentExercise.question,
      correctAnswer: currentExercise.correctAnswer!,
      explanation: currentExercise.explanation,
      userSelectedAnswers: [...selectedAnswers]
    }

    setUserAnswers(prev => [...prev, userAnswer])

    if (isCorrect) {
      setScore(prev => prev + 1)
    }

    // Move to next exercise immediately without showing feedback
    setFadeClass('fade-out')
    
    setTimeout(() => {
      if (currentExerciseIndex < levelExercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1)
      } else {
        setIsCompleted(true)
      }
      setFadeClass('fade-in')
    }, 200)
  }

  const resetExercises = () => {
    setCurrentExerciseIndex(0)
    setUserAnswers([])
    setScore(0)
    setIsCompleted(false)
    setSelectedAnswers([])
  }

  // Completion screen
  if (isCompleted) {
    const percentage = Math.round((score / levelExercises.length) * 100)
    
    return (
      <div className="exercise-page">
        <div className={`exercise-content transition-container ${fadeClass}`}>
          <h2>🎉 Prompt Oefeningen Voltooid!</h2>
          <div className="completion-stats">
            <h3>Jouw Resultaat</h3>
            <div className="score-display">
              <span className="score-number">{score}</span>
              <span className="score-total">/ {levelExercises.length}</span>
              <span className="score-percentage">({percentage}%)</span>
            </div>
            
            <div className="score-feedback">
              {percentage >= 80 && (
                <p className="feedback-excellent">
                  Uitstekend! Je beheerst de kunst van effectief prompten.
                </p>
              )}
              {percentage >= 60 && percentage < 80 && (
                <p className="feedback-good">
                  Goed gedaan! Je hebt de basis onder de knie. Bekijk de uitgebreide feedback hieronder.
                </p>
              )}
              {percentage < 60 && (
                <p className="feedback-needs-improvement">
                  Er is ruimte voor verbetering. Bestudeer de feedback hieronder zorgvuldig.
                </p>
              )}
            </div>
          </div>

          {/* Detailed feedback for each question */}
          <div className="detailed-feedback">
            <h3>Uitgebreide Feedback</h3>
            {userAnswers.map((answer, index) => {
              const exercise = levelExercises.find(ex => ex.id === answer.questionId)
              if (!exercise) return null
              
              return (
                <div key={answer.questionId} className="question-feedback">
                  <div className="question-header">
                    <span className="question-number">Vraag {index + 1}</span>
                    <span className={`question-result ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                      {answer.isCorrect ? '✅ Correct' : '❌ Incorrect'}
                    </span>
                  </div>
                  
                  <div className="question-text">{answer.question}</div>
                  
                  <div className="answer-comparison">
                    <div className="user-answer">
                      <strong>Jouw antwoord:</strong>
                      <ul>
                        {answer.userSelectedAnswers.map((selectedAnswer, idx) => (
                          <li key={idx} className="user-selected">{selectedAnswer}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="correct-answer">
                      <strong>Juiste antwoord{Array.isArray(answer.correctAnswer) && answer.correctAnswer.length > 1 ? 'en' : ''}:</strong>
                      <ul>
                        {Array.isArray(answer.correctAnswer) ? (
                          answer.correctAnswer.map((correctAns, idx) => (
                            <li key={idx} className="correct-option">{correctAns}</li>
                          ))
                        ) : (
                          <li className="correct-option">{answer.correctAnswer}</li>
                        )}
                      </ul>
                      {Array.isArray(answer.correctAnswer) && answer.correctAnswer.length > 1 && (
                        <p className="multiple-answers-note">
                          <em>Meerdere antwoorden waren vereist voor een volledig correct antwoord.</em>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="explanation">
                    <strong>Uitleg:</strong>
                    <p>{answer.explanation}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="exercise-navigation">
            <Link to="/" className="btn btn-secondary">
              ← Terug naar Home
            </Link>
            <button className="btn btn-secondary" onClick={resetToLevelSelection}>
              Kies Ander Niveau
            </button>
            <button className="btn btn-primary" onClick={resetExercises}>
              Probeer Opnieuw
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Exercise runner
  if (showExercises && selectedLevel && currentExercise) {
    const progress = ((currentExerciseIndex + 1) / levelExercises.length) * 100

    return (
      <div className="exercise-page">
        <div className={`exercise-runner transition-container ${fadeClass}`}>
          <div className="exercise-header">
            <button className="btn btn-secondary" onClick={resetToLevelSelection}>
              ← Terug
            </button>
            <div className="exercise-progress">
              <span>Oefening {currentExerciseIndex + 1} van {levelExercises.length}</span>
            </div>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="exercise-content">
            <h2>{currentExercise.title}</h2>
            <div className="exercise-question">
              {currentExercise.question}
            </div>

            {currentExercise.context && (
              <div className="exercise-context">
                <h4>Context:</h4>
                <p>{currentExercise.context}</p>
              </div>
            )}

            {currentExercise.examplePrompt && (
              <div className="example-prompt">
                <h4>Voorbeeld:</h4>
                <code>{currentExercise.examplePrompt}</code>
              </div>
            )}

            {currentExercise.options && (
              <div className="exercise-options">
                {(shuffledOptions[currentExercise.id] || currentExercise.options).map((option: string, index: number) => (
                  <button
                    key={index}
                    className={`option-button ${
                      selectedAnswers.includes(option) ? 'selected' : ''
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            <div className="answer-instruction">
              {currentExercise.type === 'multiple-select' && (
                <p className="selection-hint">
                  💡 <em>Meerdere antwoorden kunnen correct zijn. Selecteer alle juiste opties.</em>
                </p>
              )}
            </div>

            <button 
              className="btn btn-primary"
              onClick={submitAnswer}
              disabled={selectedAnswers.length === 0}
            >
              {currentExerciseIndex < levelExercises.length - 1 ? 'Volgende Vraag' : 'Beëindig Quiz'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Level selection
  return (
    <div className="exercise-page">
      <div className={`level-selection transition-container ${fadeClass}`}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> &gt; <span>Prompt Engineering Oefeningen</span>
        </div>
        
        <h2>Kies je Niveau</h2>
        <p>Leer de kunst van effectief prompten en AI-frameworks</p>
        
        <div className="level-grid">
          {levels.map((level) => (
            <div
              key={level.id}
              className={`level-card ${selectedLevel === level.id ? 'selected' : ''} ${isTransitioning ? 'transitioning' : ''}`}
              onClick={() => handleLevelSelect(level.id)}
            >
              <div className="level-icon">{level.icon}</div>
              <div className="level-name">{level.name}</div>
              <div className="level-description">{level.description}</div>
            </div>
          ))}
        </div>

        {selectedLevel && !showExercises && (
          <div className="exercise-overview">
            <div className="exercise-card">
              <div className="exercise-header">
                <div className="exercise-icon">🎯</div>
                <div>
                  <h3 className="exercise-title">Prompt Engineering & AI Frameworks</h3>
                </div>
              </div>
              <p className="exercise-description">
                {selectedLevel === 'beginner' && 'Leer de fundamenten van effectief prompten: taak, context, persona, format en toon.'}
                {selectedLevel === 'intermediate' && 'Verdiep je kennis met geavanceerde technieken zoals few-shot prompting en prompt chaining.'}
                {selectedLevel === 'advanced' && 'Beheers professionele frameworks en optimalisatietechnieken voor productieomgevingen.'}
              </p>
              
              <div className="exercise-meta">
                <div className="meta-item">
                  <span>📊</span>
                  <span>{levelExercises.length} Oefeningen</span>
                </div>
                <div className="meta-item">
                  <span>⏱️</span>
                  <span>Interactief</span>
                </div>
                <div className="difficulty-badge">
                  Niveau: {levels.find(l => l.id === selectedLevel)?.name}
                </div>
              </div>

              {/* Only show start button when not embedded */}
              {window.self === window.top && (
                <button 
                  className="btn btn-primary"
                  onClick={startExercises}
                >
                  <span>💡</span>
                  Start Oefeningen
                </button>
              )}
              
              {/* Show auto-start message when embedded */}
              {window.self !== window.top && (
                <div className="auto-start-message">
                  <span>🚀</span>
                  <em>Oefeningen starten automatisch...</em>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PromptExercisePage