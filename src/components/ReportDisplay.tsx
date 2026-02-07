import { useTranslation } from 'react-i18next'
import logoLight from '../../assets/images/ai-crafters-logo-light.png'
import logoArabicLight from '../../assets/images/ai-crafters-logo-arabic-light.png'

interface Axis {
  id: number
  titre: string
  score: number
  forces: string[]
  faiblesses: string[]
}

interface Roadmap {
  actions_prioritaires: string[]
  conclusion: string
}

interface ReportData {
  resume_executif: string
  niveau_maturite: string
  axes: Axis[]
  analyse_globale: string
  feuille_de_route: Roadmap
  generatedAt: string
}

interface ReportDisplayProps {
  report: ReportData
  onBack?: () => void
}

export default function ReportDisplay({ report }: ReportDisplayProps) {
  const { t, i18n } = useTranslation()
  const lang = i18n?.language || 'en'
  const logoSrc = (lang && lang.startsWith('ar')) ? logoArabicLight : logoLight

  const getScoreColor = (score: number) => {
    if (score <= 1) return 'bg-red-600'
    if (score <= 2) return 'bg-orange-600'
    if (score <= 3) return 'bg-yellow-600'
    if (score <= 4) return 'bg-lime-600'
    return 'bg-green-600'
  }

  const getOverallScore = () => {
    if (!report.axes || report.axes.length === 0) return 0
    const sum = report.axes.reduce((acc, axis) => acc + axis.score, 0)
    return parseFloat((sum / report.axes.length).toFixed(1))
  }

  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white min-h-screen shadow-2xl overflow-hidden font-sans text-slate-800">
      
      {/* --- HEADER SECTION --- */}
      <div className="bg-[#0f172a] text-white p-12 relative overflow-hidden">
       
        {/* Logo (language aware) */}
        <img src={logoSrc} alt="AI Crafters" className={`absolute top-6 ${lang && lang.startsWith('ar') ? 'left-6' : 'right-6'} w-20 sm:w-28 opacity-80 z-0 pointer-events-none print:hidden`} />

        <div className="relative z-10">
          <div className="uppercase tracking-widest text-xs font-bold text-[#ECDC2C] mb-2">
            {t('report.auditLabel')}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
             <span className="text-[#ECDC2C]">{t('report.title')}</span>
          </h1>
          
          {/* Header Grid: Score & Meta */}
          <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center mt-8 border-t border-slate-700 pt-8">
            <div className="flex items-center gap-4">
              <div className="relative flex items-center justify-center w-24 h-24 rounded-full border-4 border-[#ECDC2C] text-[#ECDC2C]">
                <span className="text-3xl font-bold">{getOverallScore().toFixed(1)}</span>
                <span className="absolute text-xs bottom-4 text-slate-400">/ 5.0</span>
              </div>
              <div>
                <div className="text-sm text-slate-400 uppercase tracking-wide">{t('report.maturityLabel')}</div>
                <div className="text-xl font-bold">{report.niveau_maturite}</div>
              </div>
            </div>
            
            <div className="flex-1 sm:pl-8 sm:border-l border-slate-700">
              <p className="text-slate-300 italic leading-relaxed text-sm">
                "{report.resume_executif}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT BODY --- */}
      <div className="p-10 sm:p-14 space-y-12">

        {/* SECTION 1: AXES EVALUATION */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-slate-200 flex-1"></div>
            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-wide">{t('report.evaluationByAxis')}</h2>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {report.axes.map((axis) => (
              <div key={axis.id} className="relative pl-6">
                {/* Axis Header */}
                <div className="flex justify-between items-end mb-3">
                  <h3 className="text-xl font-bold text-slate-800">{axis.titre}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-500">{t('report.scoreLabel')}:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(axis.score)}`}>
                      {axis.score.toFixed(1)}/5
                    </span>
                  </div>
                </div>

                {/* Progress Bar (Thinner, more print style) */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 mb-5">
                  <div
                    className="h-1.5 rounded-full bg-slate-800"
                    style={{ width: `${(axis.score / 5) * 100}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-1 gap-6 text-sm">
                  {/* Forces */}
                  {axis.forces && axis.forces.length > 0 && (
                    <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                      <p className="text-emerald-800 font-bold mb-2 flex items-center gap-2">
                        <span className="text-lg">✓</span> {t('report.strengthsTitle')}
                      </p>
                      <ul className="space-y-1.5">
                        {axis.forces.map((force, idx) => (
                          <li key={idx} className="text-slate-700 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-emerald-400">
                            {force}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Faiblesses */}
                  {axis.faiblesses && axis.faiblesses.length > 0 && (
                    <div className="bg-red-50/50 p-4 rounded-lg border border-red-100">
                      <p className="text-red-800 font-bold mb-2 flex items-center gap-2">
                        <span className="text-lg">!</span> {t('report.weaknessesTitle')}
                      </p>
                      <ul className="space-y-1.5">
                        {axis.faiblesses.map((faiblesse, idx) => (
                          <li key={idx} className="text-slate-700 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-red-400">
                            {faiblesse}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: GLOBAL ANALYSIS */}
        <section className="break-inside-avoid">
           <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2 border-slate-200">
             🔍 {t('report.globalAnalysisTitle')}
           </h2>
           <div className="text-slate-600 leading-7 text-justify">
             {report.analyse_globale}
           </div>
        </section>

        {/* SECTION 3: ROADMAP */}
        <section className="bg-slate-50 p-8 rounded-xl border border-slate-200 break-inside-avoid">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-6 flex items-center gap-3">
            <span>🎯</span> {t('report.roadmapTitle')}
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">{t('report.actionsPrioritaires')}</h3>
              <div className="space-y-3">
                {report.feuille_de_route.actions_prioritaires.map((action, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-white p-3 rounded shadow-sm border border-slate-100">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0f172a] text-[#ECDC2C] text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 font-medium">{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {report.feuille_de_route.conclusion && (
              <div className="pt-6 mt-6 border-t border-slate-200">
                <p className="text-slate-600 italic">
                  "{report.feuille_de_route.conclusion}"
                </p>
              </div>
            )}
          </div>
        </section>

      </div>

      {/* --- FOOTER / ACTIONS --- */}
      <div className="bg-slate-50 border-t border-slate-200 p-8 flex justify-between items-center print:hidden">
        <span className="text-slate-400 text-sm">{t('report.generatedBy')}</span>
        <button
          onClick={() => window.print()}
          className="px-8 py-3 bg-[#0f172a] text-white rounded font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
        >
          {t('buttons.print') || 'Imprimer le rapport'}
        </button>
      </div>
    </div>
  )
}
