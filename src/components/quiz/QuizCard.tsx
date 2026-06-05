import type { QuizFrage } from '../../data/quizFragen'

interface QuizCardProps {
  question: QuizFrage
  selectedAnswer: number | null
  onSelectAnswer: (index: number) => void
}

function answerStyle(
  answerIndex: number,
  selectedAnswer: number | null,
  correctIndex: number
): string {
  const base =
    'w-full text-left px-4 py-4 rounded-2xl font-semibold text-base border-2 transition-all active:scale-95 touch-manipulation min-h-[64px]'
  if (selectedAnswer === null) {
    return `${base} bg-white border-amber-200 text-gray-800 hover:border-amber-400`
  }
  if (answerIndex === correctIndex) {
    return `${base} bg-green-100 border-green-500 text-green-800`
  }
  if (answerIndex === selectedAnswer) {
    return `${base} bg-red-100 border-red-400 text-red-800`
  }
  return `${base} bg-gray-50 border-gray-200 text-gray-400`
}

function answerIcon(answerIndex: number, selectedAnswer: number | null, correctIndex: number) {
  if (selectedAnswer === null) return null
  if (answerIndex === correctIndex) return ' ✅'
  if (answerIndex === selectedAnswer) return ' ❌'
  return null
}

export function QuizCard({ question, selectedAnswer, onSelectAnswer }: QuizCardProps) {
  const difficultyLabel = question.difficulty === 1 ? '⭐' : '⭐⭐'

  return (
    <div className="flex flex-col gap-4 px-4">
      <div
        className={`rounded-3xl p-5 shadow-md ${
          question.difficulty === 1
            ? 'bg-amber-100 border-2 border-amber-300'
            : 'bg-orange-100 border-2 border-orange-300'
        }`}
      >
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="text-5xl">{question.emoji}</span>
          <span className="text-sm font-bold text-gray-500 mt-1">{difficultyLabel} {question.points} Pkt.</span>
        </div>
        <p className="text-lg font-bold text-gray-800 leading-snug">{question.question}</p>
      </div>

      <div className="flex flex-col gap-3">
        {question.answers.map((answer, i) => (
          <button
            key={i}
            onClick={() => onSelectAnswer(i)}
            disabled={selectedAnswer !== null}
            className={answerStyle(i, selectedAnswer, question.correctIndex)}
          >
            <span className="font-bold text-gray-400 mr-2">
              {['A', 'B', 'C', 'D'][i]}.
            </span>
            {answer}
            {answerIcon(i, selectedAnswer, question.correctIndex)}
          </button>
        ))}
      </div>
    </div>
  )
}
