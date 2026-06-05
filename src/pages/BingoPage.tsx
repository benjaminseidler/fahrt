import { useBingo } from '../hooks/useBingo'
import { BingoBoard } from '../components/bingo/BingoBoard'
import { BingoWin } from '../components/bingo/BingoWin'

export function BingoPage() {
  const { board, hasWon, winningCellIndices, toggle, newCard } = useBingo()

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between px-4 pt-4 pb-1">
        <h1 className="text-xl font-bold text-gray-800">Reisebingo 🗺️</h1>
        <button
          onClick={newCard}
          className="text-sm bg-white text-amber-600 font-semibold px-3 py-1.5 rounded-full border border-amber-300 shadow-sm active:scale-95 transition-transform touch-manipulation"
        >
          Neue Karte 🔀
        </button>
      </div>
      <p className="text-xs text-gray-400 text-center pb-2">
        Tippe auf alles, was du siehst!
      </p>
      <div className="flex-1 flex items-center justify-center px-3 pb-3">
        <BingoBoard board={board} winningCellIndices={winningCellIndices} onToggle={toggle} />
      </div>
      {hasWon && <BingoWin onNewCard={newCard} />}
    </div>
  )
}
