interface MissionControlsProps {
  onComplete: () => void
  onSkip: () => void
  points: number
}

export function MissionControls({ onComplete, onSkip, points }: MissionControlsProps) {
  return (
    <div className="flex flex-col gap-3 px-4 w-full max-w-sm mx-auto">
      <button
        onClick={onComplete}
        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold text-xl py-4 rounded-2xl shadow-md active:scale-95 transition-all touch-manipulation"
      >
        <span>Erledigt! ✓</span>
        <span className="bg-green-400 text-white text-sm font-semibold px-2 py-0.5 rounded-full">
          +{points} ⭐
        </span>
      </button>
      <button
        onClick={onSkip}
        className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-600 font-semibold text-lg py-3 rounded-2xl active:scale-95 transition-all touch-manipulation"
      >
        Weiter →
      </button>
    </div>
  )
}
