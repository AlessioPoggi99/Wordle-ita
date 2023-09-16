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
    rows: Array<GuessRow>
    currentRow: number
    gameState: 'playing' | 'won' | 'lost'
    updateRow(row: GuessRow): void
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
		(set, get) => ({
			answer: getRandomWord(),
            rows: Array(NUMBER_OF_GUESSES).fill(''),
            currentRow: 0,
            gameState: 'playing',
            updateRow: (row) => {
                const rows = get().rows
                let didWin = false
                let currentRow = get().currentRow
                rows[currentRow] = row
                
                if(row.result && row.result.length == WORD_LENGTH) {
                    didWin = row.result.every(res => res === LetterState.Match)
                    currentRow += 1
                }

                set ({
                    rows: rows,
                    currentRow: currentRow,
                    gameState: didWin ? 'won' : currentRow >= NUMBER_OF_GUESSES ? 'lost' : 'playing',
                })
            },
            newGame: (initialRows = []) => {
                const rowsToAdd = NUMBER_OF_GUESSES - initialRows.length
                initialRows = initialRows.concat(Array(rowsToAdd).fill(''))

                set({
                    gameState: 'playing',
                    answer: getRandomWord(),
                    rows: initialRows,
                    currentRow: 0,
                })
            },
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