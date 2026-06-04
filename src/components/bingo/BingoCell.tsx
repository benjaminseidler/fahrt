import type { BingoItem } from '../../data/bingoItems'

interface BingoCellProps {
  item: BingoItem
  isMarked: boolean
  isWinning: boolean
  onToggle: () => void
}

export function BingoCell({ item, isMarked, isWinning, onToggle }: BingoCellProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        relative flex flex-col items-center justify-center rounded-xl border-2 p-1 gap-0.5
        transition-all duration-150 active:scale-90 select-none touch-manipulation
        ${isWinning
          ? 'bg-yellow-300 border-yellow-500 ring-2 ring-yellow-400 shadow-lg'
          : isMarked
            ? 'bg-green-400 border-green-600 shadow-md'
            : 'bg-white border-amber-200 hover:border-amber-400'
        }
      `}
    >
      <span className="text-2xl leading-none">{item.emoji}</span>
      <span className={`text-xs font-medium leading-tight text-center ${isMarked ? 'text-white' : 'text-gray-700'}`}>
        {item.label}
      </span>
      {isMarked && (
        <span className="absolute top-0.5 right-0.5 text-xs leading-none">✓</span>
      )}
    </button>
  )
}
