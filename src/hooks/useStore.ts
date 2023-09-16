import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { getRandomWord, LetterState } from '../word-utils';

export const NUMBER_OF_GUESSES = 6;
export const WORD_LENGTH = 5;

interface GuessRow {
    guess: string
    result?: LetterState[]
}

interface GameStoreState {
    answer: string
    rows: GuessRow[]
    gameState: 'playing' | 'won' | 'lost'
    updateRows(rows: GuessRow[]): void
    newGame(initialGuess?: GuessRow[]): void
}

interface StatisticsStoreState {
    matches: number
    wins: number
    winInRow: number
    winInRowRecord: number
    addMatch(isWin: boolean): void
}

export const useGameStore = create<GameStoreState>()(
	persist(
		(set) => ({
			answer: getRandomWord(),
            rows: [],
            gameState: 'playing',
            //updateRows: (rows) => set({ rows: rows }),
            updateRows: (rows) => {
                const didWin = rows[rows.length-1].result?.every(res => res === LetterState.Match)
                set ({ 
                    rows: rows,
                    gameState: didWin ? 'won' : rows.length === NUMBER_OF_GUESSES ? 'lost' : 'playing'
                })
            },
            newGame: (initialRows = []) => set({ 
                gameState: 'playing',
                answer: getRandomWord(),
                rows: initialRows,
            }),
		}),
		{
			name: 'wordle-game-storage', // unique name
			storage: createJSONStorage(() => localStorage),
		}
	)
)

export const useStatisticsStore = create<StatisticsStoreState>()(
	persist(
		(set) => ({
            matches: 0,
            wins: 0,
            winInRow: 0,
            winInRowRecord: 0,
            addMatch: (isWin) => set((state) => ({ 
                matches: state.matches + 1,
                wins: isWin ? state.wins + 1 : state.wins,
                winInRowRecord: isWin ? (
                    state.winInRowRecord < state.winInRow + 1 ? state.winInRow + 1 : state.winInRowRecord
                ) : (
                    state.winInRowRecord < state.winInRow ? state.winInRow : state.winInRowRecord
                ),
                winInRow: isWin ? state.winInRow + 1 : 0,
            })),
		}),
		{
			name: 'wordle-statistics-storage', // unique name
			storage: createJSONStorage(() => localStorage),
		}
	)
)