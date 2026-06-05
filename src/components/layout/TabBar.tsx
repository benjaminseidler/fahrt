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
    <nav className="flex border-t-2 border-amber-200 bg-white sticky bottom-0 z-10">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 text-sm font-semibold transition-colors active:scale-95
            ${activeTab === tab.id
              ? 'bg-amber-400 text-white'
              : 'text-gray-400 hover:bg-amber-50'
            }`}
        >
          <span className="text-2xl">{tab.emoji}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
