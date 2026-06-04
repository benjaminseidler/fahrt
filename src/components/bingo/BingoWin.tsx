import { useEffect, useState } from 'react'

interface BingoWinProps {
  onNewCard: () => void
}

const CONFETTI = ['🎊', '🎉', '⭐', '🌟', '✨', '🥳', '🎈', '🏆']

interface ConfettiPiece {
  id: number
  emoji: string
  left: string
  delay: string
  duration: string
}

export function BingoWin({ onNewCard }: BingoWinProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    setPieces(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        emoji: CONFETTI[Math.floor(Math.random() * CONFETTI.length)],
        left: `${Math.random() * 95}%`,
        delay: `${Math.random() * 1.5}s`,
        duration: `${2 + Math.random() * 2}s`,
      }))
    )
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-amber-400/90 backdrop-blur-sm">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }}
        >
          {p.emoji}
        </span>
      ))}
      <div className="flex flex-col items-center gap-6 z-10">
        <p className="bingo-win-text text-7xl font-black text-white drop-shadow-lg tracking-widest">
          BINGO!
        </p>
        <p className="text-3xl">🥳🎉🥳</p>
        <p className="text-xl font-semibold text-white">Super gemacht!</p>
        <button
          onClick={onNewCard}
          className="mt-4 bg-white text-amber-600 font-bold text-xl px-8 py-4 rounded-2xl shadow-xl active:scale-95 transition-transform"
        >
          Neue Karte 🔀
        </button>
      </div>
    </div>
  )
}
