import { Loader2, Sparkles } from 'lucide-react'

interface LoadingSpinnerProps {
  mode?: 'docstring' | 'explain'
}

export default function LoadingSpinner({ mode = 'docstring' }: LoadingSpinnerProps) {
  const message = mode === 'docstring' 
    ? '✨ Crafting documentation...' 
    : '🔍 Analyzing your code...'

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="relative">
        <Loader2 className="w-16 h-16 animate-spin text-blue-500" />
        <Sparkles className="w-6 h-6 text-purple-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p className="text-slate-600 font-semibold text-lg animate-pulse">
        {message}
      </p>
      <p className="text-slate-400 text-sm">This may take a few seconds</p>
    </div>
  )
}