import { useState, useEffect, useRef } from 'react'

interface ScoreDisplayProps {
  score: number
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  const [bumped, setBumped] = useState(false)
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return }
    setBumped(true)
    const id = setTimeout(() => setBumped(false), 350)
    return () => clearTimeout(id)
  }, [score])

  return (
    <div
      className={`flex items-center gap-1.5 bg-amber-500 rounded-full px-4 py-1.5 shadow-md
        transition-transform duration-150 ${bumped ? 'scale-125' : 'scale-100'}`}
    >
      <span className="text-lg">⭐</span>
      <span className="text-lg font-bold text-white">{score}</span>
    </div>
  )
}
