import { useState, useEffect, useCallback } from 'react'
import { BINGO_POOL } from '../data/bingoItems'
import type { BingoItem } from '../data/bingoItems'

export interface BingoCellState {
  item: BingoItem
  isMarked: boolean
}

interface BingoState {
  board: BingoCellState[]
  hasWon: boolean
  winningLines: number[][]
}

const STORAGE_KEY = 'fahrt_bingo'

const ALL_LINES = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function createBoard(): BingoCellState[] {
  return shuffle(BINGO_POOL)
    .slice(0, 16)
    .map((item) => ({ item, isMarked: false }))
}

function detectWinningLines(board: BingoCellState[]): number[][] {
  return ALL_LINES.filter((line) => line.every((idx) => board[idx].isMarked))
}

export function useBingo() {
  const [state, setState] = useState<BingoState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return JSON.parse(stored) as BingoState
    } catch {
      // ignore
    }
    return { board: createBoard(), hasWon: false, winningLines: [] }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore
    }
  }, [state])

  const toggle = useCallback((id: string) => {
    setState((prev) => {
      if (prev.hasWon) return prev
      const board = prev.board.map((cell) =>
        cell.item.id === id ? { ...cell, isMarked: !cell.isMarked } : cell
      )
      const winningLines = detectWinningLines(board)
      return { board, winningLines, hasWon: winningLines.length > 0 }
    })
  }, [])

  const newCard = useCallback(() => {
    setState({ board: createBoard(), hasWon: false, winningLines: [] })
  }, [])

  const winningCellIndices = new Set(state.winningLines.flat())

  return {
    board: state.board,
    hasWon: state.hasWon,
    winningCellIndices,
    toggle,
    newCard,
  }
}
