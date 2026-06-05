import { useCallback } from 'react'
import { useQuiz } from '../hooks/useQuiz'
import { QuizCard } from '../components/quiz/QuizCard'

interface QuizPageProps {
  onScore: (points: number) => void
}

export function QuizPage({ onScore }: QuizPageProps) {
  const stableOnScore = useCallback(onScore, [])
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedAnswer,
    isDone,
    isAnswered,
    isCorrect,
    selectAnswer,
    next,
    restart,
  } = useQuiz(stableOnScore)

  if (isDone) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center gap-6 p-8">
        <span className="text-7xl">🧠</span>
        <p className="text-2xl font-bold text-gray-800 text-center">Quiz geschafft!</p>
        <p className="text-gray-500 text-center">Ihr seid echte Wissens-Champions!</p>
        <button
          onClick={restart}
          className="bg-amber-400 text-white font-bold text-xl px-8 py-4 rounded-2xl shadow-md active:scale-95 transition-transform touch-manipulation"
        >
          Nochmal spielen 🔄
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Scrollable area — question + answers */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center justify-between px-4">
            <h1 className="text-xl font-bold text-gray-800">Quiz 🧠</h1>
            <span className="text-sm text-gray-400 font-medium">
              {currentIndex + 1} / {totalQuestions}
            </span>
          </div>

          <div
            className="bg-gray-100 h-2 mx-4 rounded-full overflow-hidden"
            style={{ width: 'calc(100% - 2rem)' }}
          >
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${(currentIndex / totalQuestions) * 100}%` }}
            />
          </div>

          {currentQuestion && (
            <QuizCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={selectAnswer}
              key={currentQuestion.id}
            />
          )}
        </div>
      </div>

      {/* Always-visible footer — appears after answering */}
      {isAnswered && (
        <div className="border-t-2 border-amber-100 bg-amber-50 px-4 py-3 flex flex-col gap-2 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
          <p className={`text-xl font-bold text-center ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? '🎉 Richtig!' : '😅 Nicht ganz…'}
          </p>
          <button
            onClick={next}
            className="w-full bg-amber-400 text-white font-bold text-xl py-4 rounded-2xl shadow-md active:scale-95 transition-transform touch-manipulation"
          >
            Weiter →
          </button>
        </div>
      )}
    </div>
  )
}
