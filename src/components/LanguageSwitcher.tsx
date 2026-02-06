import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n, { getDirection } from '../i18n'

const LANGS = [
  { code: 'en', labelKey: 'languages.en' },
  { code: 'fr', labelKey: 'languages.fr' },
  { code: 'ar', labelKey: 'languages.ar' }
]

export default function LanguageSwitcher() {
  const { t } = useTranslation()
  const [lang, setLang] = useState<string>(i18n.language || 'en')

  useEffect(() => {
    // Initialize from localStorage if available
    const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null
    const initial = (stored || i18n.language || 'en')
    if (initial !== lang) {
      setLang(initial)
      i18n.changeLanguage(initial)
    }

    // Update document attributes when language changes
    const onChange = (l: string) => {
      setLang(l)
      if (typeof document !== 'undefined') {
        document.documentElement.lang = l
        document.documentElement.dir = getDirection(l)
      }
      if (typeof window !== 'undefined') localStorage.setItem('lang', l)
    }

    i18n.on('languageChanged', onChange)
    return () => {
      i18n.off('languageChanged', onChange)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value
    i18n.changeLanguage(next)
    // i18n.on handler will update DOM and localStorage
  }

  return (
    <div className="fixed top-6 end-6 z-40 flex items-center gap-2">
      <label htmlFor="lang" className="sr-only">Language</label>
      <select
        id="lang"
        value={lang}
        onChange={handleChange}
        className="bg-[#081d3f] text-white border border-white/20 py-1 px-2 rounded-md text-sm"
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code}>
            {t(l.labelKey)}
          </option>
        ))}
      </select>
    </div>
  )
}
