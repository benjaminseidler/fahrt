import { useState, useEffect, useCallback } from 'react'
import { QUIZ_POOL } from '../data/quizFragen'
import type { QuizFrage } from '../data/quizFragen'

interface QuizState {
  deck: QuizFrage[]
  currentIndex: number
  selectedAnswer: number | null
}

const STORAGE_KEY = 'fahrt_quiz'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function useQuiz(onScore: (points: number) => void) {
  const [state, setState] = useState<QuizState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return JSON.parse(stored) as QuizState
    } catch {
      // ignore
    }
    return { deck: shuffle(QUIZ_POOL), currentIndex: 0, selectedAnswer: null }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore
    }
  }, [state])

  const currentQuestion = state.deck[state.currentIndex] ?? null
  const isDone = state.currentIndex >= state.deck.length
  const isAnswered = state.selectedAnswer !== null
  const isCorrect = isAnswered && currentQuestion !== null && state.selectedAnswer === currentQuestion.correctIndex

  const selectAnswer = useCallback((index: number) => {
    setState((prev) => {
      if (prev.selectedAnswer !== null) return prev
      const question = prev.deck[prev.currentIndex]
      if (question && index === question.correctIndex) {
        onScore(question.points)
      }
      return { ...prev, selectedAnswer: index }
    })
  }, [onScore])

  const next = useCallback(() => {
    setState((prev) => ({ ...prev, currentIndex: prev.currentIndex + 1, selectedAnswer: null }))
  }, [])

  const restart = useCallback(() => {
    setState({ deck: shuffle(QUIZ_POOL), currentIndex: 0, selectedAnswer: null })
  }, [])

  return {
    currentQuestion,
    currentIndex: state.currentIndex,
    totalQuestions: state.deck.length,
    selectedAnswer: state.selectedAnswer,
    isDone,
    isAnswered,
    isCorrect,
    selectAnswer,
    next,
    restart,
  }
}
