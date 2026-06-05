import { useBingo } from '../hooks/useBingo'
import { BingoBoard } from '../components/bingo/BingoBoard'
import { BingoWin } from '../components/bingo/BingoWin'

export function BingoPage() {
  const { board, hasWon, winningCellIndices, toggle, newCard } = useBingo()

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <h1 className="text-xl font-bold text-gray-800">Reisebingo 🗺️</h1>
        <button
          onClick={newCard}
          className="text-sm bg-amber-100 text-amber-700 font-semibold px-3 py-1.5 rounded-full border border-amber-300 active:scale-95 transition-transform touch-manipulation"
        >
          Neue Karte 🔀
        </button>
      </div>
      <p className="text-sm text-gray-500 text-center px-4 pb-2">
        Tippe auf alles, was du siehst!
      </p>
      <BingoBoard board={board} winningCellIndices={winningCellIndices} onToggle={toggle} />
      {hasWon && <BingoWin onNewCard={newCard} />}
    </div>
  )
}
