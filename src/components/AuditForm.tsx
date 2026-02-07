import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import auditData from '../data/data.json'
import bgImage from '../../assets/images/background-img.png' 
import ReportDisplay from './ReportDisplay'

interface AuditFormProps {
  onBack?: () => void
}

export default function AuditForm({ onBack }: AuditFormProps) {
  const [currentAxisIndex, setCurrentAxisIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showPersonalForm, setShowPersonalForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [personal, setPersonal] = useState({
    fullName: '',
    companyName: '',
    sector: '',
    size: '',
    phone: '',
    email: ''
  })

  const isPersonalValid = () => {
    return personal.fullName.trim() !== '' && /\S+@\S+\.\S+/.test(personal.email)
  }
  const { t, i18n } = useTranslation()

  const localize = (value: any) => {
    if (!value) return ''
    if (typeof value === 'string') return value
    const lang = (i18n.language || 'en').split('-')[0]
    return value[lang] ?? value.en ?? value.fr ?? Object.values(value)[0]
  }

  const axes = auditData.audit_framework.axes
  const totalQuestions = axes.reduce((sum, axis) => sum + axis.questions.length, 0)
  const answeredQuestions = Object.keys(answers).length
  const progressPercentage = Math.round((answeredQuestions / totalQuestions) * 100)

  const currentAxis = axes[currentAxisIndex]
  const currentQuestion = currentAxis.questions[currentQuestionIndex]
  const questionNumber = axes
    .slice(0, currentAxisIndex)
    .reduce((sum, axis) => sum + axis.questions.length, 0) + currentQuestionIndex + 1

  const handleAnswer = (value: number) => {
    // record the answer but DO NOT auto-advance — user must click Suivant
    setAnswers({ ...answers, [currentQuestion.id]: value })
  }

  const handleNext = () => {
    if (currentQuestionIndex < currentAxis.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else if (currentAxisIndex < axes.length - 1) {
      setCurrentAxisIndex(currentAxisIndex + 1)
      setCurrentQuestionIndex(0)
    } else {
      // Completed all questions — show personal info form
      setShowPersonalForm(true)
    }
  }

  const handlePrevious = () => {
    if (showPersonalForm) {
      setShowPersonalForm(false)
      return
    }
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else if (currentAxisIndex > 0) {
      setCurrentAxisIndex(currentAxisIndex - 1)
      setCurrentQuestionIndex(axes[currentAxisIndex - 1].questions.length - 1)
    }
  }

  const handleSubmitProfile = async () => {
    if (!isPersonalValid()) return
    
    setLoading(true)
    setError(null)

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      
      // Flatten questions for the API
      const flatQuestions = axes.flatMap(axis => axis.questions)

      const response = await fetch(`${API_URL}/api/audit/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          answers,
          personal,
          questions: flatQuestions,
          language: i18n.language
        })
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate report')
      }

      setReport(data.report)
      setSubmitted(true)
    } catch (err: any) {
      console.error('Error submitting audit:', err)
      setError(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="w-screen min-h-screen overflow-x-hidden relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#081d3f] to-[#1e3a6e] opacity-70"></div>



      {/* Back Button - Top Left */}
      <button
        onClick={onBack}
        className="fixed top-6 start-6 z-40 flex items-center gap-2 transition-colors text-sm sm:text-base"
        style={{ color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}
      >
        <span className="text-2xl">←</span>
        <span>{t('buttons.back')}</span>
      </button>

      {/* Fixed Progress Bar */}
      <div className="fixed top-0 inset-x-0 h-1 bg-gray-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#ECDC2C] to-[#f5e447] transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Main Content - Centered Container */}
      <div className="relative z-20 flex items-center justify-center min-h-screen p-4 pt-12">
        <div className="w-full max-w-2xl">
          {/* Container Box with Border */}
          <div className="border-2 border-gray-600 rounded-2xl p-8 sm:p-12 bg-opacity-10 bg-black backdrop-blur-sm">
{!showPersonalForm && !submitted && (
            /* Axis and Question Number - Top of Container */
            <div className="text-center mb-8">
              <div className="flex justify-between items-center mb-8">
                <span className="inline-block px-4 py-2 bg-[rgba(236,220,44,0.15)] border border-[rgba(236,220,44,0.4)] rounded-full text-[#ECDC2C] text-sm font-semibold">
                  {localize(currentAxis.title)}
                </span>
                <p className="text-gray-400 text-xs sm:text-sm">{t('question.progress', { current: questionNumber, total: totalQuestions })}</p>
              </div>
            </div>
          )}

{!showPersonalForm && !submitted ? (
            <>
              {/* Question */}
              <h2 className="text-3xl sm:text-3xl lg:text-3xl font-bold text-white text-center mb-10 leading-tight animate-fadeIn">
                {localize(currentQuestion.text)}
              </h2>

              {/* Options */}
              <div className="space-y-2 mb-10">
                {currentQuestion.options.map((option) => {
                  const isSelected = answers[currentQuestion.id] === option.value
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full p-3 sm:p-4 rounded-lg text-white text-sm sm:text-base transition-all duration-200 flex items-center justify-between group ${isSelected ? 'bg-[rgba(236,220,44,0.12)] border border-[rgba(236,220,44,0.45)]' : 'bg-[rgba(70,90,120,0.4)] border border-[rgba(150,170,200,0.3)] hover:bg-[rgba(100,120,150,0.6)] hover:border-[rgba(236,220,44,0.5)]'}`}
                    >
                      <span className="text-start font-medium">{localize(option.label)}</span>
                      <div className={`w-5 h-5 rounded-full flex-shrink-0 ms-3 ${isSelected ? 'border-[rgba(236,220,44,0.45)] flex items-center justify-center' : 'border-2 border-gray-500 group-hover:border-[#ECDC2C]'}`}>
                        {isSelected && <div className="w-3 h-3 rounded-full bg-[#ECDC2C]"></div>}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentAxisIndex === 0 && currentQuestionIndex === 0}
                  style={{
                    padding: '0.5rem 1rem',
                    color: (currentAxisIndex === 0 && currentQuestionIndex === 0) ? '#9CA3AF' : '#fff',
                    opacity: (currentAxisIndex === 0 && currentQuestionIndex === 0) ? 0.3 : 1,
                    cursor: (currentAxisIndex === 0 && currentQuestionIndex === 0) ? 'not-allowed' : 'pointer',
                    whiteSpace: 'nowrap',
                    fontSize: '0.875rem',
                    transition: 'color 0.2s'
                  }}
                >
                  ← {t('buttons.previous')}
                </button>

                <p className="text-[#ECDC2C] font-semibold text-sm sm:text-base">{progressPercentage}%</p>

                <button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion.id]}
                  className={`px-4 sm:px-6 py-2 bg-gradient-to-r from-[#ECDC2C] to-[#f5e447] text-[#081d3f] rounded-xl font-semibold whitespace-nowrap text-sm sm:text-base transition-all ${!answers[currentQuestion.id] ? 'opacity-40 cursor-not-allowed hover:shadow-none' : 'hover:shadow-lg'}`}
                >
                  { (currentAxisIndex === axes.length - 1 && currentQuestionIndex === currentAxis.questions.length - 1) ? t('buttons.finish') : `${t('buttons.next')} →` }
                </button>
              </div>
            </>
          ) : !submitted && showPersonalForm ? (
            <div>
              <div className="mb-6 text-center">
                <h2 className="text-2xl sm:text-4xl lg:text-4xl font-bold text-white mb-2">{t('personal.title')}</h2>
                <p className="text-sm sm:text-base text-[#e0e0e0]">{t('personal.subtitle')}</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleSubmitProfile() }} className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">{t('personal.fullName')}</label>
                  <input value={personal.fullName} onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-gray-600 text-white" />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">{t('personal.companyName')}</label>
                  <input value={personal.companyName} onChange={(e) => setPersonal({ ...personal, companyName: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-gray-600 text-white" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">{t('personal.sector')}</label>
                    <input value={personal.sector} onChange={(e) => setPersonal({ ...personal, sector: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-gray-600 text-white" />
                  </div>
                  <div className="relative">
                    <label className="block text-sm text-gray-300 mb-1">{t('personal.size')}</label>
                    <select value={personal.size} onChange={(e) => setPersonal({ ...personal, size: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-gray-600 text-white appearance-none pr-8">
                      <option value="">{t('personal.sizePlaceholder')}</option>
                      <option value="s1">{t('personal.sizeOptions.s1')}</option>
                      <option value="s2">{t('personal.sizeOptions.s2')}</option>
                      <option value="s3">{t('personal.sizeOptions.s3')}</option>
                      <option value="s4">{t('personal.sizeOptions.s4')}</option>
                      <option value="s5">{t('personal.sizeOptions.s5')}</option>
                    </select>
                    <span className="select-arrow absolute end-3 top-1/2 -translate-y-1/2 text-white">▾</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">{t('personal.phone')}</label>
                    <input value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-gray-600 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">{t('personal.email')}</label>
                    <input value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-gray-600 text-white" />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    style={{ padding: '0.5rem 1rem', color: '#9CA3AF', cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '0.875rem', transition: 'color 0.2s' }}
                  >
                    {t('buttons.back')}
                  </button>

                  <button type="button" onClick={handleSubmitProfile} disabled={!isPersonalValid() || loading} className={`px-4 sm:px-6 py-2 bg-gradient-to-r from-[#ECDC2C] to-[#f5e447] text-[#081d3f] rounded-xl font-semibold whitespace-nowrap text-sm sm:text-base transition-all ${!isPersonalValid() || loading ? 'opacity-40 cursor-not-allowed hover:shadow-none' : 'hover:shadow-lg'}`}>
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="inline-block animate-spin">⏳</span>
                        {t('buttons.generating')}
                      </span>
                    ) : (
                      t('buttons.submit')
                    )}
                  </button>
                </div>
              </form>
              {error && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm">
                  {error}
                </div>
              )}
            </div>
          ) : report && submitted ? (
            <ReportDisplay 
              report={report} 
              onBack={() => {
                setReport(null)
                setSubmitted(false)
                setAnswers({})
                setCurrentAxisIndex(0)
                setCurrentQuestionIndex(0)
                setShowPersonalForm(false)
                setPersonal({ fullName: '', companyName: '', sector: '', size: '', phone: '', email: '' })
              }}
            />
          ) : loading || submitted ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <div className="inline-block">
                  <div className="animate-spin text-5xl">🔄</div>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                {t('buttons.generating')}
              </h2>
              <p className="text-gray-300">
                {t('report.generating')}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">{t('personal.thanksTitle')}</h2>
              <p className="text-sm sm:text-base text-[#e0e0e0]">{t('personal.thanksMessage')}</p>
              <div className="mt-6">
                <button onClick={() => { if (onBack) onBack(); }} className="px-6 py-3 bg-[#ECDC2C] text-[#081d3f] rounded-lg font-semibold">{t('buttons.finish')}</button>
              </div>
            </div>
          )
          }
          </div>
        </div>
      </div>
    </div>
  )
}
