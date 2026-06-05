import { useCallback } from 'react'
import { useAufgaben } from '../hooks/useAufgaben'
import { MissionCard } from '../components/aufgaben/MissionCard'
import { MissionControls } from '../components/aufgaben/MissionControls'

interface AufgabenPageProps {
  onScore: (points: number) => void
}

export function AufgabenPage({ onScore }: AufgabenPageProps) {
  const stableOnScore = useCallback(onScore, [])
  const { currentCard, currentIndex, totalCards, isDone, complete, skip, restart } =
    useAufgaben(stableOnScore)

  if (isDone) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center gap-6 p-8">
        <span className="text-7xl">🏆</span>
        <p className="text-2xl font-bold text-gray-800 text-center">Alle Aufgaben erledigt!</p>
        <p className="text-gray-500 text-center">Ihr seid echte Reise-Champions!</p>
        <button
          onClick={restart}
          className="bg-amber-500 text-white font-bold text-xl px-8 py-4 rounded-2xl shadow-md active:scale-95 transition-transform touch-manipulation"
        >
          Nochmal spielen 🔄
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between px-4 pt-4 pb-1">
        <h1 className="text-xl font-bold text-gray-800">Aufgaben 📋</h1>
        <span className="text-sm text-gray-400 font-medium">
          {currentIndex + 1} / {totalCards}
        </span>
      </div>

      <div className="mx-4 mb-3 bg-gray-200 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-amber-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${(currentIndex / totalCards) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center gap-4 pb-4">
        {currentCard && (
          <>
            <MissionCard aufgabe={currentCard} key={currentCard.id} />
            <MissionControls
              onComplete={complete}
              onSkip={skip}
              points={currentCard.points}
            />
          </>
        )}
      </div>
    </div>
  )
}
