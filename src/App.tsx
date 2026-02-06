import { useState } from 'react'
import { useTranslation } from 'react-i18next' 
import bgImage from '../assets/images/background-img.png'
import craftersSign from '../assets/images/crafters-sign.png'
import AuditForm from './components/AuditForm'
import LanguageSwitcher from './components/LanguageSwitcher' 

function App() {
  const { t } = useTranslation()
  const [started, setStarted] = useState(false)

  if (started) {
    return <AuditForm onBack={() => setStarted(false)} />
  }

  return (
    <div 
      className="relative min-h-screen w-screen flex items-center justify-center overflow-x-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(8, 29, 63, 0.7) 0%, rgba(30, 58, 110, 0.7) 100%), url('${bgImage}')`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <LanguageSwitcher />
      {/* Decorative image - smaller version, hidden on smaller screens */}
      <div className="hidden lg:block absolute top-10 start-10 w-[300px] h-[300px] z-0 opacity-[0.12] pointer-events-none">
        <img 
          src={craftersSign} 
          alt="Crafters Sign" 
          className="w-full h-full object-contain float-image drop-shadow-2xl"
        />
      </div>

      {/* Decorative image - smaller version, hidden on smaller screens */}
      <div className="hidden lg:block absolute bottom-10 end-10 w-[300px] h-[300px] z-0 opacity-[0.12] pointer-events-none">
        <img 
          src={craftersSign} 
          alt="Crafters Sign" 
          className="w-full h-full object-contain float-image drop-shadow-2xl"
        />
      </div>

      {/* Content container */}
      <div className="w-full flex items-center justify-center px-4 sm:px-8 py-8 z-10">
        <div className="w-full max-w-4xl text-center text-white slide-up">
      
         

          {/* Main Header */}
          <div className="mb-6 sm:mb-10 animate-fadeIn" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black mb-2 sm:mb-4 leading-tight tracking-tight">
              {t('titles.main')}
            </h1>
            <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-medium text-[#e0e0e0] tracking-wide px-2 xs:px-0">
              {t('subtitle')}
            </p>
          </div>

          {/* Feature highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12 animate-fadeIn" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <div className="bg-[rgba(255,255,255,0.08)] border border-[rgba(236,220,44,0.2)] p-4 sm:p-6 rounded-xl backdrop-blur-lg transition-all duration-300 hover:bg-[rgba(236,220,44,0.15)] hover:border-[rgba(236,220,44,0.5)] hover:-translate-y-1 hover:shadow-2xl">
              <h3 className="font-semibold text-white text-base sm:text-lg mb-3">{t('features.axisTitle')}</h3>
              <p className="text-sm sm:text-base text-[#e0e0e0] leading-relaxed">
                {t('features.axisDesc')}
              </p>
            </div>
            <div className="bg-[rgba(255,255,255,0.08)] border border-[rgba(236,220,44,0.2)] p-4 sm:p-6 rounded-xl backdrop-blur-lg transition-all duration-300 hover:bg-[rgba(236,220,44,0.15)] hover:border-[rgba(236,220,44,0.5)] hover:-translate-y-1 hover:shadow-2xl">
              <h3 className="font-semibold text-white text-base sm:text-lg mb-3">{t('features.recommendationsTitle')}</h3>
              <p className="text-sm sm:text-base text-[#e0e0e0] leading-relaxed">
                {t('features.recommendationsDesc')}
              </p>
            </div>
            <div className="bg-[rgba(255,255,255,0.08)] border border-[rgba(236,220,44,0.2)] p-4 sm:p-6 rounded-xl backdrop-blur-lg transition-all duration-300 hover:bg-[rgba(236,220,44,0.15)] hover:border-[rgba(236,220,44,0.5)] hover:-translate-y-1 hover:shadow-2xl">
              <h3 className="font-semibold text-white text-base sm:text-lg mb-3">{t('features.roadmapTitle')}</h3>
              <p className="text-sm sm:text-base text-[#e0e0e0] leading-relaxed">
                {t('features.roadmapDesc')}
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-8 sm:mt-12 animate-fadeIn flex flex-col items-center gap-4 px-2 xs:px-0" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            <button
              onClick={() => setStarted(true)}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-br from-[#ECDC2C] to-[#f5e447] text-[#081d3f] px-6 sm:px-12 py-3 sm:py-4 text-sm sm:text-lg md:text-xl font-bold rounded-2xl uppercase tracking-wider shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(236,220,44,0.4)] active:-translate-y-0 active:shadow-lg relative overflow-hidden group w-auto"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-400"></span>
              <span className="relative z-10 whitespace-nowrap">{t('buttons.start')}</span>
              <span className="relative z-10 text-xl sm:text-2xl transition-transform duration-300 group-hover:translate-x-1 ms-2">→</span>
            </button>
            <p className="text-xs sm:text-sm md:text-base text-[#b0b0b0] font-medium tracking-wide text-center">
              {t('cta.subtitle')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
