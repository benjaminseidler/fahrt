import { useState, useEffect, useCallback } from 'react'
import { AUFGABEN_POOL } from '../data/aufgaben'
import type { Aufgabe } from '../data/aufgaben'

interface AufgabenState {
  deck: Aufgabe[]
  currentIndex: number
}

const STORAGE_KEY = 'fahrt_aufgaben'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function useAufgaben(onScore: (points: number) => void) {
  const [state, setState] = useState<AufgabenState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return JSON.parse(stored) as AufgabenState
    } catch {
      // ignore
    }
    return { deck: shuffle(AUFGABEN_POOL), currentIndex: 0 }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore
    }
  }, [state])

  const currentCard = state.deck[state.currentIndex] ?? null
  const isDone = state.currentIndex >= state.deck.length

  const complete = useCallback(() => {
    if (!currentCard) return
    onScore(currentCard.points)
    setState((prev) => ({ ...prev, currentIndex: prev.currentIndex + 1 }))
  }, [currentCard, onScore])

  const skip = useCallback(() => {
    setState((prev) => ({ ...prev, currentIndex: prev.currentIndex + 1 }))
  }, [])

  const restart = useCallback(() => {
    setState({ deck: shuffle(AUFGABEN_POOL), currentIndex: 0 })
  }, [])

  return {
    currentCard,
    currentIndex: state.currentIndex,
    totalCards: state.deck.length,
    isDone,
    complete,
    skip,
    restart,
  }
}
