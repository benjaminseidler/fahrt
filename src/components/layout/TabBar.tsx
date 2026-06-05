export type Tab = 'bingo' | 'aufgaben' | 'quiz'

interface TabBarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const TABS: { id: Tab; emoji: string; label: string }[] = [
  { id: 'bingo', emoji: '🎯', label: 'Bingo' },
  { id: 'aufgaben', emoji: '📋', label: 'Aufgaben' },
  { id: 'quiz', emoji: '🧠', label: 'Quiz' },
]

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <nav className="flex bg-white border-t border-gray-200 sticky bottom-0 z-10 shadow-[0_-1px_8px_rgba(0,0,0,0.06)]">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex-1 flex flex-col items-center pt-3 pb-2.5 gap-0.5
              transition-colors active:scale-95 touch-manipulation
              ${isActive ? 'text-amber-600' : 'text-gray-400 hover:text-gray-500'}`}
          >
            {isActive && (
              <div className="absolute top-0 left-6 right-6 h-0.5 bg-amber-500 rounded-full" />
            )}
            <span className={`text-2xl transition-transform duration-150 ${isActive ? 'scale-110' : ''}`}>
              {tab.emoji}
            </span>
            <span className={`text-xs font-semibold ${isActive ? 'text-amber-600' : 'text-gray-400'}`}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
