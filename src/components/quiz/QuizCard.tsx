import type { QuizFrage } from '../../data/quizFragen'

interface QuizCardProps {
  question: QuizFrage
  selectedAnswer: number | null
  onSelectAnswer: (index: number) => void
}

function answerBg(answerIndex: number, selectedAnswer: number | null, correctIndex: number): string {
  if (selectedAnswer === null) return 'bg-white border-gray-200 shadow-sm hover:border-amber-400 hover:shadow-md'
  if (answerIndex === correctIndex) return 'bg-green-50 border-green-500 shadow-sm'
  if (answerIndex === selectedAnswer) return 'bg-red-50 border-red-400 shadow-sm'
  return 'bg-gray-50 border-gray-100 opacity-60'
}

function answerIcon(answerIndex: number, selectedAnswer: number | null, correctIndex: number) {
  if (selectedAnswer === null) return null
  if (answerIndex === correctIndex) return <span className="ml-auto text-green-600 font-bold">✓</span>
  if (answerIndex === selectedAnswer) return <span className="ml-auto text-red-500 font-bold">✗</span>
  return null
}

const LETTERS = ['A', 'B', 'C', 'D']

export function QuizCard({ question, selectedAnswer, onSelectAnswer }: QuizCardProps) {
  const difficultyLabel = question.difficulty === 1 ? '⭐' : '⭐⭐'

  return (
    <div className="flex flex-col gap-3 px-4">
      {/* Question card */}
      <div
        className={`rounded-2xl p-5 shadow-md ${
          question.difficulty === 1
            ? 'bg-amber-100 border border-amber-200'
            : 'bg-orange-100 border border-orange-200'
        }`}
      >
        <div className="flex justify-end mb-2">
          <span className="text-xs font-semibold text-gray-500 bg-white/70 px-2.5 py-0.5 rounded-full">
            {difficultyLabel} {question.points} Pkt.
          </span>
        </div>
        <div className="text-center mb-3">
          <span className="text-6xl">{question.emoji}</span>
        </div>
        <p className="text-lg font-bold text-gray-800 text-center leading-snug">
          {question.question}
        </p>
      </div>

      {/* Answer buttons */}
      <div className="flex flex-col gap-2">
        {question.answers.map((answer, i) => (
          <button
            key={i}
            onClick={() => onSelectAnswer(i)}
            disabled={selectedAnswer !== null}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2
              transition-all active:scale-[0.98] touch-manipulation
              ${answerBg(i, selectedAnswer, question.correctIndex)}`}
          >
            <span className="text-sm font-bold text-gray-400 w-5 shrink-0">
              {LETTERS[i]}.
            </span>
            <span className={`text-base font-medium text-left flex-1 ${
              selectedAnswer !== null && i === question.correctIndex ? 'text-green-700' :
              selectedAnswer === i && i !== question.correctIndex ? 'text-red-700' :
              'text-gray-800'
            }`}>
              {answer}
            </span>
            {answerIcon(i, selectedAnswer, question.correctIndex)}
          </button>
        ))}
      </div>
    </div>
  )
}
