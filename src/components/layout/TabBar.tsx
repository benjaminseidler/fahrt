export type Tab = 'bingo' | 'aufgaben'

interface TabBarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <nav className="flex border-t-2 border-amber-200 bg-white sticky bottom-0 z-10">
      <button
        onClick={() => onTabChange('bingo')}
        className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 text-sm font-semibold transition-colors active:scale-95
          ${activeTab === 'bingo'
            ? 'bg-amber-400 text-white'
            : 'text-gray-400 hover:bg-amber-50'
          }`}
      >
        <span className="text-2xl">🎯</span>
        <span>Bingo</span>
      </button>
      <button
        onClick={() => onTabChange('aufgaben')}
        className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 text-sm font-semibold transition-colors active:scale-95
          ${activeTab === 'aufgaben'
            ? 'bg-amber-400 text-white'
            : 'text-gray-400 hover:bg-amber-50'
          }`}
      >
        <span className="text-2xl">📋</span>
        <span>Aufgaben</span>
      </button>
    </nav>
  )
}
