interface ScoreDisplayProps {
  score: number
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="flex items-center gap-1 bg-amber-100 border border-amber-300 rounded-full px-3 py-1">
      <span className="text-lg">⭐</span>
      <span className="text-lg font-bold text-amber-700">{score}</span>
    </div>
  )
}
