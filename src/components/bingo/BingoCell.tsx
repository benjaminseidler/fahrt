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
        relative flex flex-col items-center justify-center rounded-xl border p-1 gap-0.5
        transition-all duration-150 active:scale-90 select-none touch-manipulation
        ${isWinning
          ? 'bg-yellow-300 border-yellow-400 ring-2 ring-yellow-400 shadow-md'
          : isMarked
            ? 'bg-green-500 border-green-600 shadow-md'
            : 'bg-white border-gray-200 shadow-sm hover:border-amber-300 hover:shadow-md'
        }
      `}
    >
      <span className="text-3xl leading-none">{item.emoji}</span>
      <span className={`text-[10px] font-semibold leading-tight text-center ${isMarked ? 'text-white' : 'text-gray-600'}`}>
        {item.label}
      </span>
      {isMarked && (
        <span className="absolute top-0.5 right-1 text-[10px] text-white leading-none">✓</span>
      )}
    </button>
  )
}
