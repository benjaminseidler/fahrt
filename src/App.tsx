import { useState, useCallback } from 'react'
import { TabBar } from './components/layout/TabBar'
import type { Tab } from './components/layout/TabBar'
import { ScoreDisplay } from './components/layout/ScoreDisplay'
import { BingoPage } from './pages/BingoPage'
import { AufgabenPage } from './pages/AufgabenPage'
import { QuizPage } from './pages/QuizPage'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('bingo')
  const [score, setScore] = useLocalStorage<number>('fahrt_score', 0)

  const handleScore = useCallback((points: number) => {
    setScore((prev) => prev + points)
  }, [setScore])

  return (
    <div className="flex flex-col min-h-svh bg-amber-50">
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b-2 border-amber-200 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🚗</span>
          <span className="text-lg font-bold text-amber-700">Fahrt</span>
        </div>
        <ScoreDisplay score={score} />
      </header>

      <main className="flex flex-col flex-1 overflow-auto pb-2">
        {activeTab === 'bingo' && <BingoPage />}
        {activeTab === 'aufgaben' && <AufgabenPage onScore={handleScore} />}
        {activeTab === 'quiz' && <QuizPage onScore={handleScore} />}
      </main>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default App
