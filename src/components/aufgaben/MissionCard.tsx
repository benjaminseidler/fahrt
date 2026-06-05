import type { Aufgabe } from '../../data/aufgaben'

interface MissionCardProps {
  aufgabe: Aufgabe
}

export function MissionCard({ aufgabe }: MissionCardProps) {
  const isHard = aufgabe.difficulty === 2
  return (
    <div
      className={`card-enter rounded-3xl shadow-lg p-6 flex flex-col items-center gap-4 mx-4
        ${isHard ? 'bg-orange-100 border-2 border-orange-300' : 'bg-yellow-50 border-2 border-yellow-300'}
      `}
    >
      <span className="text-7xl">{aufgabe.emoji}</span>
      <h2 className="text-2xl font-bold text-gray-800 text-center">{aufgabe.title}</h2>
      <p className="text-lg text-gray-700 text-center leading-relaxed">{aufgabe.description}</p>
      <div className="flex gap-1 mt-1">
        {'⭐'.repeat(aufgabe.difficulty).split('').map((s, i) => (
          <span key={i} className="text-xl">{s}</span>
        ))}
        <span className="text-sm text-gray-500 self-center ml-1">+{aufgabe.points} Punkt{aufgabe.points > 1 ? 'e' : ''}</span>
      </div>
    </div>
  )
}
