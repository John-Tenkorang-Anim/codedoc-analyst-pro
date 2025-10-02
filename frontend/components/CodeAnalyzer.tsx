'use client'

import { useState } from 'react'
import { Code2, Copy, RotateCcw, Check, Loader2, Sparkles, Shield, RefreshCw, TestTube, Activity, Languages, BookOpen } from 'lucide-react'

const LANGUAGES = ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'C#']

const FEATURES = [
  { id: 'docstring', name: 'Documentation', icon: BookOpen, endpoint: '/api/v1/generate-docstring', color: 'violet' },
  { id: 'explain', name: 'Explain Code', icon: Sparkles, endpoint: '/api/v1/explain-code', color: 'blue' },
  { id: 'quality', name: 'Quality Analysis', icon: Shield, endpoint: '/api/v1/analyze-quality', color: 'emerald' },
  { id: 'translate', name: 'Translate', icon: Languages, endpoint: '/api/v1/translate-language', color: 'amber', needsTarget: true },
  { id: 'refactor', name: 'Refactor', icon: RefreshCw, endpoint: '/api/v1/suggest-refactoring', color: 'pink' },
  { id: 'tests', name: 'Generate Tests', icon: TestTube, endpoint: '/api/v1/generate-tests', color: 'cyan' },
  { id: 'complexity', name: 'Complexity', icon: Activity, endpoint: '/api/v1/complexity-analysis', color: 'orange' },
]

const EXAMPLE_CODE = `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`

export default function CodeAnalyzer() {
  const [code, setCode] = useState(EXAMPLE_CODE)
  const [language, setLanguage] = useState('Python')
  const [targetLanguage, setTargetLanguage] = useState('JavaScript')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [activeFeature, setActiveFeature] = useState(FEATURES[0].id)

  const currentFeature = FEATURES.find(f => f.id === activeFeature)

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError('Please enter some code first')
      return
    }

    setLoading(true)
    setError('')
    setOutput('')

    try {
      const body: any = { code, language: language.toLowerCase() }
      if (currentFeature?.needsTarget) {
        body.target_language = targetLanguage.toLowerCase()
      }

      const response = await fetch(`http://localhost:8000${currentFeature?.endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!response.ok) throw new Error('Analysis failed')
      
      const data = await response.json()
      setOutput(data.result)
    } catch (err) {
      setError('Failed to analyze code. Make sure the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleReset = () => {
    setCode(EXAMPLE_CODE)
    setOutput('')
    setError('')
  }

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string, hover: string, text: string, border: string }> = {
      violet: { bg: 'bg-violet-600', hover: 'hover:bg-violet-700', text: 'text-violet-400', border: 'border-violet-500/30' },
      blue: { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', text: 'text-blue-400', border: 'border-blue-500/30' },
      emerald: { bg: 'bg-emerald-600', hover: 'hover:bg-emerald-700', text: 'text-emerald-400', border: 'border-emerald-500/30' },
      amber: { bg: 'bg-amber-600', hover: 'hover:bg-amber-700', text: 'text-amber-400', border: 'border-amber-500/30' },
      pink: { bg: 'bg-pink-600', hover: 'hover:bg-pink-700', text: 'text-pink-400', border: 'border-pink-500/30' },
      cyan: { bg: 'bg-cyan-600', hover: 'hover:bg-cyan-700', text: 'text-cyan-400', border: 'border-cyan-500/30' },
      orange: { bg: 'bg-orange-600', hover: 'hover:bg-orange-700', text: 'text-orange-400', border: 'border-orange-500/30' },
    }
    return colors[color] || colors.violet
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="glass-card border-b border-violet-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-pink-500 rounded-xl blur-sm opacity-75"></div>
                <div className="relative bg-gradient-to-br from-violet-500 to-pink-500 p-3 rounded-xl">
                  <Code2 className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold gradient-text">
                  CodeDoc Analyst Pro
                </h1>
                <p className="text-sm text-gray-400 font-medium mt-1">
                  Advanced AI-Powered Code Analysis with GPT-4
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="font-medium">Powered by OpenAI GPT-4</span>
            </div>
          </div>
        </div>
      </header>

      {/* Feature Tabs */}
      <div className="border-b border-gray-800 bg-gray-900/50 sticky top-[88px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4">
            {FEATURES.map((feature) => {
              const Icon = feature.icon
              const isActive = activeFeature === feature.id
              const colors = getColorClasses(feature.color)
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                    isActive 
                      ? `${colors.bg} text-white shadow-lg` 
                      : `bg-gray-800 text-gray-400 hover:bg-gray-700`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {feature.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input Section */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <div className="flex items-center justify-between gap-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-4 py-2.5 border-2 border-violet-500/30 bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-100 font-medium text-sm"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>

              {currentFeature?.needsTarget && (
                <>
                  <span className="text-gray-400">→</span>
                  <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className="px-4 py-2.5 border-2 border-amber-500/30 bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-100 font-medium text-sm"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </>
              )}
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="flex-1 w-full p-5 font-mono text-sm code-editor text-gray-100 border-2 border-violet-500/30 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-xl min-h-[500px]"
            />

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className={`px-6 py-4 ${getColorClasses(currentFeature?.color || 'violet').bg} ${getColorClasses(currentFeature?.color || 'violet').hover} text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  {currentFeature && <currentFeature.icon className="w-5 h-5" />}
                  {currentFeature?.name}
                </>
              )}
            </button>

            {error && (
              <div className="p-4 bg-red-900/30 border-2 border-red-500/50 rounded-xl text-red-300 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Output Section */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-100">AI Analysis</h2>
              <div className="flex gap-2">
                {output && (
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 border-2 border-emerald-500/30 rounded-xl transition-all flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-emerald-400">Copy</span>
                      </>
                    )}
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 rounded-xl transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Reset</span>
                </button>
              </div>
            </div>

            <div className="flex-1 glass-card p-6 rounded-2xl overflow-auto shadow-xl min-h-[500px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <Loader2 className="w-16 h-16 animate-spin text-violet-500" />
                  <p className="text-gray-300 font-semibold">Analyzing with GPT-4...</p>
                  <p className="text-gray-500 text-sm">This should be fast</p>
                </div>
              ) : output ? (
                <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-mono bg-gray-800/50 p-6 rounded-xl border border-violet-500/20">
                  {output}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <div className={`p-6 rounded-2xl border ${getColorClasses(currentFeature?.color || 'violet').border}`}>
                    {currentFeature && <currentFeature.icon className={`w-12 h-12 mx-auto ${getColorClasses(currentFeature.color).text}`} />}
                  </div>
                  <p className="text-gray-300 font-semibold">
                    Ready to analyze with {currentFeature?.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-card border-t border-violet-500/20 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-400">
            Built with <span className="text-pink-500">❤</span> using FastAPI, Next.js & OpenAI GPT-4
          </p>
        </div>
      </footer>
    </div>
  )
}