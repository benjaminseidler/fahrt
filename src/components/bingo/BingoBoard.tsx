import type { BingoCellState } from '../../hooks/useBingo'
import { BingoCell } from './BingoCell'

interface BingoBoardProps {
  board: BingoCellState[]
  winningCellIndices: Set<number>
  onToggle: (id: string) => void
}

export function BingoBoard({ board, winningCellIndices, onToggle }: BingoBoardProps) {
  return (
    <div className="grid grid-cols-4 gap-1.5 p-2 w-full max-w-sm mx-auto">
      {board.map((cell, idx) => (
        <BingoCell
          key={cell.item.id}
          item={cell.item}
          isMarked={cell.isMarked}
          isWinning={winningCellIndices.has(idx)}
          onToggle={() => onToggle(cell.item.id)}
        />
      ))}
    </div>
  )
}
