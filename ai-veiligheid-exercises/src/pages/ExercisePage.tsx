import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Exercise types and interfaces
export type ExerciseType = 'multiple-choice' | 'multiple-select'

export interface Exercise {
  id: string
  title: string
  question: string
  context?: string
  type: ExerciseType
  options: string[]
  correctAnswer: string | string[]
  explanation: string
}

export interface ExerciseSet {
  [level: string]: Exercise[]
}

// Exercise data
const exercises: ExerciseSet = {
  beginner: [
    {
      id: 'privacy-basic-1',
      title: 'Privacy Detectie - Basis',
      question: 'Welke van de volgende prompts bevat persoonsgegevens die weggelaten zouden moeten worden?',
      type: 'multiple-choice',
      options: [
        'Schrijf een verhaal over een hond',
        'Help me een e-mail schrijven aan Jan de Vries (jan.devries@email.com)',
        'Leg uit hoe zonnepanelen werken',
        'Maak een recept voor pasta'
      ],
      correctAnswer: 'Help me een e-mail schrijven aan Jan de Vries (jan.devries@email.com)',
      explanation: 'Deze prompt bevat een echte naam en e-mailadres, wat persoonsgegevens zijn volgens de AVG. Deze informatie moet worden geanonimiseerd voordat je het aan een AI-systeem geeft.'
    },
    {
      id: 'ethics-basic-1',
      title: 'Ethische AI Beslissingen',
      question: 'Een AI-systeem geeft discriminerende resultaten op basis van etniciteit. Wat is de beste eerste stap?',
      type: 'multiple-choice',
      options: [
        'Het systeem blijven gebruiken omdat het technisch gezien werkt',
        'Het systeem onmiddellijk stopzetten en onderzoeken waarom dit gebeurt',
        'De resultaten handmatig aanpassen zonder het onderliggende probleem op te lossen',
        'Het probleem negeren omdat het maar een klein percentage beïnvloedt'
      ],
      correctAnswer: 'Het systeem onmiddellijk stopzetten en onderzoeken waarom dit gebeurt',
      explanation: 'Discriminatie is ethisch onaanvaardbaar en juridisch problematisch. Het systeem moet worden gestopt en onderzocht om de oorzaak te vinden en op te lossen voordat het weer gebruikt wordt.'
    },
    {
      id: 'consent-basic-1',
      title: 'Toestemming voor AI',
      question: 'Wanneer moet je toestemming vragen voordat je persoonlijke data aan een AI-systeem geeft?',
      type: 'multiple-choice',
      options: [
        'Alleen bij gevoelige data zoals medische informatie',
        'Alleen wanneer de data publiek beschikbaar is',
        'Bij alle persoonlijke data, ongeacht de bron',
        'Nooit, AI-systemen hebben geen toestemming nodig'
      ],
      correctAnswer: 'Bij alle persoonlijke data, ongeacht de bron',
      explanation: 'Volgens de AVG moet je altijd toestemming hebben om persoonlijke data te verwerken, ongeacht of het gevoelige data is of publiek beschikbaar. Toestemming is een fundamenteel recht.'
    },
    {
      id: 'bias-basic-1',
      title: 'Vooroordelen Herkennen',
      question: 'Welk scenario toont een duidelijk voorbeeld van AI-bias?',
      type: 'multiple-choice',
      options: [
        'Een weersvoorspelling AI die accurater is in stedelijke gebieden',
        'Een CV-screening AI die systematisch vrouwelijke kandidaten lager scoort',
        'Een vertaal-AI die beter werkt met korte zinnen',
        'Een aanbevelings-AI die populaire items voorstelt'
      ],
      correctAnswer: 'Een CV-screening AI die systematisch vrouwelijke kandidaten lager scoort',
      explanation: 'Dit is een duidelijk geval van geslachtsbias. Als een AI systematisch een geslacht benadeelt, is dit discriminatie en moet het worden gecorrigeerd.'
    },
    {
      id: 'transparency-basic-1',
      title: 'AI Transparantie',
      question: 'Waarom is transparantie belangrijk bij AI-beslissingen?',
      type: 'multiple-select',
      options: [
        'Om fouten en bias te kunnen ontdekken',
        'Om vertrouwen van gebruikers te behouden',
        'Om juridische verantwoording af te kunnen leggen',
        'Om de AI sneller te laten werken',
        'Om aan regelgeving te voldoen'
      ],
      correctAnswer: ['Om fouten en bias te kunnen ontdekken', 'Om vertrouwen van gebruikers te behouden', 'Om juridische verantwoording af te kunnen leggen', 'Om aan regelgeving te voldoen'],
      explanation: 'Transparantie is cruciaal voor vertrouwen, controle, juridische verantwoording en compliance. Het helpt niet om AI sneller te maken, maar wel om het beter en ethischer te maken.'
    }
  ],
  intermediate: [
    {
      id: 'privacy-intermediate-1',
      title: 'Complexe Privacy Scenarios',
      question: 'Je wilt een AI gebruiken om feedback te geven op werknemersbeoordelingen. Welke stappen zijn essentieel voor privacybescherming?',
      type: 'multiple-select',
      options: [
        'Namen vervangen door codes of nummers',
        'Alle identificeerbare informatie verwijderen',
        'Toestemming vragen van alle betrokken werknemers',
        'Een risicoanalyse uitvoeren',
        'De originele data bewaren voor backup doeleinden'
      ],
      correctAnswer: ['Namen vervangen door codes of nummers', 'Alle identificeerbare informatie verwijderen', 'Toestemming vragen van alle betrokken werknemers', 'Een risicoanalyse uitvoeren'],
      explanation: 'Privacybescherming vereist meerdere stappen: anonimisering, toestemming, en risicoanalyse. Het bewaren van originele data vergroot juist de privacy-risicos.'
    },
    {
      id: 'bias-intermediate-1',
      title: 'Algoritme Bias Detectie',
      question: 'Een online recruitment platform merkt dat hun AI-systeem minder vaak vrouwen voorstelt voor technische functies. Wat zijn mogelijke oorzaken?',
      type: 'multiple-select',
      options: [
        'Historische data bevat weinig vrouwelijke tech-professionals',
        'De AI is geprogrammeerd om mannen te bevoordelen',
        'Trainingsdata reflecteert maatschappelijke vooroordelen',
        'Vrouwen gebruiken andere zoektermen',
        'Het algoritme leert patronen uit bestaande ongelijkheid'
      ],
      correctAnswer: ['Historische data bevat weinig vrouwelijke tech-professionals', 'Trainingsdata reflecteert maatschappelijke vooroordelen', 'Het algoritme leert patronen uit bestaande ongelijkheid'],
      explanation: 'AI-bias ontstaat vaak door bevooroordeelde trainingsdata die historische ongelijkheden weergeeft. Het algoritme leert deze patronen en perpetueert ze, ook al was dit niet de intentie.'
    },
    {
      id: 'consent-intermediate-1',
      title: 'Geïnformeerde Toestemming',
      question: 'Een zorgverlener wil patiëntgegevens gebruiken voor AI-onderzoek. Wat moet er gebeuren voor geldige toestemming?',
      context: 'De onderzoeksresultaten kunnen leiden tot betere behandelmethoden, maar patiënten moeten hun privacy beschermd zien.',
      type: 'multiple-select',
      options: [
        'Uitleggen hoe de data wordt gebruikt in begrijpelijke taal',
        'Aangeven dat toestemming later ingetrokken kan worden',
        'Specificeren welke data precies wordt gebruikt',
        'Vermelden welke risicos er zijn voor privacy',
        'Toestemming automatisch afgeven omdat het onderzoek nuttig is'
      ],
      correctAnswer: ['Uitleggen hoe de data wordt gebruikt in begrijpelijke taal', 'Aangeven dat toestemming later ingetrokken kan worden', 'Specificeren welke data precies wordt gebruikt', 'Vermelden welke risicos er zijn voor privacy'],
      explanation: 'Geïnformeerde toestemming vereist transparantie over gebruik, risicos, en rechten. Automatische toestemming is nooit geldig onder de AVG.'
    },
    {
      id: 'accountability-intermediate-1',
      title: 'AI Verantwoordelijkheid',
      question: 'Een zelfrijdende auto veroorzaakt een ongeluk door een verkeerde AI-beslissing. Wie is er verantwoordelijk?',
      type: 'multiple-choice',
      options: [
        'Alleen de AI-ontwikkelaar',
        'Alleen de autofabrikant',
        'Alleen de eigenaar van de auto',
        'Een complexe verdeling tussen ontwikkelaar, fabrikant en gebruiker'
      ],
      correctAnswer: 'Een complexe verdeling tussen ontwikkelaar, fabrikant en gebruiker',
      explanation: 'AI-verantwoordelijkheid is complex en wordt meestal gedeeld tussen verschillende partijen: ontwikkelaars (voor algoritmes), fabrikanten (voor implementatie) en gebruikers (voor correct gebruik).'
    },
    {
      id: 'fairness-intermediate-1',
      title: 'Eerlijkheid in AI-systemen',
      question: 'Een kredietbeoordelings-AI keurt relatief meer aanvragen af van mensen uit bepaalde buurten. Hoe evalueer je of dit eerlijk is?',
      type: 'multiple-select',
      options: [
        'Controleren of de AI consistent is in vergelijkbare gevallen',
        'Analyseren of de buurten correleren met beschermde kenmerken',
        'Onderzoeken of er alternative, minder discriminerende methodes zijn',
        'Kijken naar de bedrijfsresultaten van de bank',
        'Beoordelen of de criteria relevant zijn voor kredietwaardigheid'
      ],
      correctAnswer: ['Controleren of de AI consistent is in vergelijkbare gevallen', 'Analyseren of de buurten correleren met beschermde kenmerken', 'Onderzoeken of er alternative, minder discriminerende methodes zijn', 'Beoordelen of de criteria relevant zijn voor kredietwaardigheid'],
      explanation: 'Eerlijkheid in AI vereist consistentie, non-discriminatie, relevantie en het zoeken naar minder discriminerende alternatieven. Bedrijfsresultaten zijn niet relevant voor eerlijkheid.'
    }
  ],
  advanced: [
    {
      id: 'advanced-privacy-1',
      title: 'Geavanceerde Privacy Technieken',
      question: 'Een ziekenhuis wil AI gebruiken voor medisch onderzoek met patiëntdata. Welke privacy-preserving technieken zijn het meest geschikt?',
      context: 'Het onderzoek vereist analyse van gevoelige medische gegevens van duizenden patiënten.',
      type: 'multiple-select',
      options: [
        'Differential Privacy',
        'Federated Learning',
        'Homomorphic Encryption',
        'Synthetic Data Generation',
        'Gewone data-anonimisering',
        'K-anonymity'
      ],
      correctAnswer: ['Differential Privacy', 'Federated Learning', 'Homomorphic Encryption', 'Synthetic Data Generation'],
      explanation: 'Voor medische data zijn geavanceerde technieken nodig. Differential privacy, federated learning, homomorphic encryption en synthetic data bieden sterke privacy-bescherming. Gewone anonimisering en k-anonymity zijn vaak onvoldoende voor zo gevoelige data.'
    },
    {
      id: 'advanced-governance-1',
      title: 'AI Governance Framework',
      question: 'Een multinationale organisatie implementeert een AI governance framework. Welke elementen zijn essentieel?',
      type: 'multiple-select',
      options: [
        'AI Ethics Review Board met diverse expertise',
        'Geautomatiseerde compliance monitoring',
        'Risico assessment procedures voor AI projecten',
        'Whistleblower procedures voor AI misbruik',
        'Performance metrics gericht op winstmaximalisatie',
        'Transparantie rapportage naar stakeholders'
      ],
      correctAnswer: ['AI Ethics Review Board met diverse expertise', 'Geautomatiseerde compliance monitoring', 'Risico assessment procedures voor AI projecten', 'Whistleblower procedures voor AI misbruik', 'Transparantie rapportage naar stakeholders'],
      explanation: 'Een robuust AI governance framework vereist ethische oversight, risicobeheer, compliance monitoring, melding procedures en transparantie. Winstmaximalisatie alleen is onvoldoende voor verantwoorde AI.'
    },
    {
      id: 'advanced-algorithmic-1',
      title: 'Algoritmische Audit',
      question: 'Je voert een algoritmische audit uit op een AI-systeem voor personeelsselectie. Welke metrieken zijn cruciaal voor bias detectie?',
      context: 'Het systeem wordt gebruikt door een internationale HR-afdeling en moet voldoen aan verschillende nationale anti-discriminatie wetten.',
      type: 'multiple-select',
      options: [
        'Demographic Parity (gelijke uitkomstverhouding)',
        'Equalized Odds (gelijke true positive/false positive rates)',
        'Calibration (voorspelde kansen komen overeen met werkelijkheid)',
        'Individual Fairness (vergelijkbare individuen krijgen vergelijkbare behandeling)',
        'Overall Accuracy (algemene nauwkeurigheid)',
        'Counterfactual Fairness (uitkomst zou hetzelfde zijn in alternatieve wereld)'
      ],
      correctAnswer: ['Demographic Parity (gelijke uitkomstverhouding)', 'Equalized Odds (gelijke true positive/false positive rates)', 'Calibration (voorspelde kansen komen overeen met werkelijkheid)', 'Individual Fairness (vergelijkbare individuen krijgen vergelijkbare behandeling)', 'Counterfactual Fairness (uitkomst zou hetzelfde zijn in alternatieve wereld)'],
      explanation: 'Comprehensive bias detectie vereist meerdere fairness metrieken omdat elk een ander aspect van eerlijkheid meet. Overall accuracy alleen is onvoldoende omdat een accuraat systeem nog steeds biased kan zijn.'
    },
    {
      id: 'advanced-regulatory-1',
      title: 'Regulatory Compliance',
      question: 'Een AI-systeem voor kredietbeoordeling moet voldoen aan zowel de EU AI Act als lokale financiele regelgeving. Welke compliance maatregelen zijn vereist?',
      type: 'multiple-select',
      options: [
        'Risico classificatie volgens EU AI Act categorien',
        'Conformity assessment door derde partij',
        'CE markering en Declaration of Conformity',
        'Continuous monitoring en incident reporting',
        'Data minimalisatie volgens GDPR principes',
        'Explainability voor alle AI beslissingen'
      ],
      correctAnswer: ['Risico classificatie volgens EU AI Act categorien', 'Conformity assessment door derde partij', 'CE markering en Declaration of Conformity', 'Continuous monitoring en incident reporting', 'Data minimalisatie volgens GDPR principes', 'Explainability voor alle AI beslissingen'],
      explanation: 'High-risk AI systemen onder de EU AI Act vereisen uitgebreide compliance procedures, inclusief third-party assessment, CE markering, monitoring en explainability. GDPR principes blijven ook van toepassing.'
    },
    {
      id: 'advanced-explainability-1',
      title: 'AI Explainability Strategien',
      question: 'Een complex deep learning model wordt gebruikt voor medische diagnose. Welke explainability technieken zijn het meest geschikt voor verschillende stakeholders?',
      context: 'Het systeem moet uitlegbaar zijn voor artsen (klinische beslissingen), patiënten (begrijpelijke uitleg) en regulators (compliance verificatie).',
      type: 'multiple-select',
      options: [
        'LIME (Local Interpretable Model-agnostic Explanations) voor lokale uitleg',
        'SHAP (SHapley Additive exPlanations) voor feature importance',
        'Attention mechanisms voor relevante input highlighting',
        'Counterfactual explanations voor alternatieve scenarios',
        'Model simplificatie door kleinere neural networks',
        'Rule extraction voor begrijpbare decision trees'
      ],
      correctAnswer: ['LIME (Local Interpretable Model-agnostic Explanations) voor lokale uitleg', 'SHAP (SHapley Additive exPlanations) voor feature importance', 'Attention mechanisms voor relevante input highlighting', 'Counterfactual explanations voor alternatieve scenarios', 'Rule extraction voor begrijpbare decision trees'],
      explanation: 'Verschillende stakeholders hebben verschillende explainability behoeften. Een combinatie van technieken (LIME, SHAP, attention, counterfactuals, rule extraction) biedt de beste coverage. Model simplificatie kan de performance te veel schaden.'
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
    description: 'Basis concepten en eenvoudige oefeningen',
    icon: '🌱'
  },
  {
    id: 'intermediate',
    name: 'Gemiddeld',
    description: 'Praktijkscenarios en toepassingen',
    icon: '🌿'
  },
  {
    id: 'advanced',
    name: 'Gevorderd',
    description: 'Complexe situaties en expertkennis',
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

const ExercisePage: React.FC = () => {
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

  const levelExercises = selectedLevel ? exercises[selectedLevel] || [] : []
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
        shuffled[exercise.id] = shuffleArray(exercise.options)
      })
      setShuffledOptions(shuffled)
    }
  }, [selectedLevel, levelExercises.length])

  useEffect(() => {
    setSelectedAnswers([])
  }, [currentExerciseIndex])
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
        selectedAnswers.every(answer => currentExercise.correctAnswer.includes(answer))

    const userAnswer: UserAnswer = {
      questionId: currentExercise.id,
      answer: currentExercise.type === 'multiple-choice' ? selectedAnswers[0] : selectedAnswers,
      isCorrect,
      question: currentExercise.question,
      correctAnswer: currentExercise.correctAnswer,
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
          <h2>🎉 Oefeningen Voltooid!</h2>
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
                  Uitstekend! Je hebt een zeer goed begrip van AI-veiligheid en ethiek.
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
          <Link to="/">Home</Link> &gt; <span>Oefeningen</span>
        </div>
        
        <h2>Kies je Niveau</h2>
        <p>Selecteer het niveau dat bij jouw ervaring past</p>
        
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
                <div className="exercise-icon">🛡️</div>
                <div>
                  <h3 className="exercise-title">AI Veiligheid & Ethische Overwegingen</h3>
                </div>
              </div>
              <p className="exercise-description">
                {selectedLevel === 'beginner' && 'Leer de fundamenten van AI-veiligheid en ethiek met eenvoudige, praktische oefeningen.'}
                {selectedLevel === 'intermediate' && 'Verdiep je kennis met complexere scenarios en praktijkgevallen uit de echte wereld.'}
                {selectedLevel === 'advanced' && 'Beheers geavanceerde concepten en technieken voor AI-professionals en besluitvormers.'}
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

export default ExercisePage