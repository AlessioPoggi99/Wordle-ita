import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { getRandomWord, LetterState } from '../utils/wordUtils';

export const NUMBER_OF_GUESSES = 6;
export const WORD_LENGTH = 5;

export interface GuessRow {
    guess: string
    result?: LetterState[]
}

interface GameStoreState {
    answer: string
    rows: Array<GuessRow>
    currentRow: number
    gameState: 'playing' | 'won' | 'lost'
    keyboardLetterState: { [letter: string]: LetterState }
    updateRow(row: GuessRow): void
    newGame(initialGuess?: GuessRow[]): void
}

interface StatisticsStoreState {
    matches: number
    wins: number
    winInRow: number
    winInRowRecord: number
    winAttemptsArr: number[]
    lastSaved: {answer: string, attempts: number}
    addMatch(answer: string, isWin: boolean, attempts: number): void
    resetStatistics(): void
    importStatistics(statistics: string): boolean
}

type ModalStoreState = {
    showGameOverModal: boolean
    showSettingsModal: boolean
    showInfoModal: boolean
    showMultiplayerModal: boolean
    showStatisticsPanel: boolean
    toggleGameOverModal: (showGameOverModal: boolean) => void
    toggleSettingsModal: (showSettingsModal: boolean) => void
    toggleInfoModal: (showInfoModal: boolean) => void
    toggleMultiplayerModal: (showMultiplayerModal: boolean) => void
    toggleStatisticsPanel: (showStatisticsPanel: boolean) => void
}

type SettingsStoreState = {
    hardMode: boolean
    disableAnimations: boolean
    theme: 'light' | 'dark'
    toggleHardMode: (hardMode: boolean) => void
    toggleTheme: () => void
    toggleDisableAnimations: (disableAnimations: boolean) => void
}

export const useGameStore = create<GameStoreState>()(
	persist(
		(set, get) => ({
			answer: getRandomWord(),
            rows: Array(NUMBER_OF_GUESSES).fill(''),
            currentRow: 0,
            gameState: 'playing',
            keyboardLetterState: {},
            updateRow: (row) => {
                const rows = get().rows
                let didWin = false
                let currentRow = get().currentRow
                let gameState = get().gameState
                const keyboardLetterState = get().keyboardLetterState

                if(currentRow >= NUMBER_OF_GUESSES || gameState != 'playing')
                    return

                rows[currentRow] = row
                
                if(row.result && row.result.length == WORD_LENGTH)
                    currentRow += 1

                for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
                    const result = rows[i].result
                    if(result) {
                        didWin = result.every(r => r === LetterState.Match)
                        result.forEach((r, index) => {
                            const resultGuessLetter = rows[i].guess[index]
                            const currentLetterState = keyboardLetterState[resultGuessLetter]
                            switch (currentLetterState) {
                                case LetterState.Match:
                                    break
                                case LetterState.Present:
                                    if (r === LetterState.Miss) {
                                        break
                                    } else {
                                        keyboardLetterState[resultGuessLetter] = r
                                        break
                                    }
                                default:
                                    keyboardLetterState[resultGuessLetter] = r
                                    break
                            }
                        })
                    }
                    if(didWin) break
                }

                gameState = didWin ? 'won' : currentRow >= NUMBER_OF_GUESSES ? 'lost' : 'playing'

                set ({
                    rows: rows,
                    currentRow: currentRow,
                    gameState: gameState,
                    keyboardLetterState: keyboardLetterState,
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
                    keyboardLetterState: {},
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
            winAttemptsArr: [],
            lastSaved: {answer: '', attempts: 0},
            addMatch: (answer, isWin, attempts) => set((state) => ({ 
                matches: !(answer == state.lastSaved.answer && attempts == state.lastSaved.attempts) ? state.matches + 1 : state.matches,
                wins: !(answer == state.lastSaved.answer && attempts == state.lastSaved.attempts) && isWin ? state.wins + 1 : state.wins,
                winInRowRecord: !(answer == state.lastSaved.answer && attempts == state.lastSaved.attempts) && isWin ? (
                    state.winInRowRecord < state.winInRow + 1 ? state.winInRow + 1 : state.winInRowRecord
                ) : (
                    state.winInRowRecord < state.winInRow ? state.winInRow : state.winInRowRecord
                ),
                winInRow: !(answer == state.lastSaved.answer && attempts == state.lastSaved.attempts) ? isWin ? state.winInRow + 1 : 0 : state.winInRow,
                winAttemptsArr: !(answer == state.lastSaved.answer && attempts == state.lastSaved.attempts) && isWin ? [...state.winAttemptsArr, attempts] : state.winAttemptsArr,
                lastSaved: {answer, attempts},
            })),
            resetStatistics: () => set(() => ({ 
                matches: 0,
                wins: 0,
                winInRow: 0,
                winInRowRecord: 0,
                winAttemptsArr: [],
                lastSaved: {answer: '', attempts: 0},
            })),
            importStatistics: (statistics) => {
                try {
                    const stats = JSON.parse(statistics)

                    set({
                        matches: stats.matches,
                        wins: stats.wins,
                        winInRow: stats.winInRow,
                        winInRowRecord: stats.winInRowRecord,
                        winAttemptsArr: stats.winAttemptsArr,
                        lastSaved: stats.lastSaved,
                    })

                    return true
                } catch (error) {
                    return false
                }
            },
		}),
		{
			name: 'wordle-statistics-storage', // unique name
			storage: createJSONStorage(() => localStorage),
		}
	)
)

export const useModalStore = create<ModalStoreState>()(
    (set) => ({
        showGameOverModal: false,
        showSettingsModal: false,
        showInfoModal: false,
        showMultiplayerModal: false,
        showStatisticsPanel: false,
        toggleGameOverModal: (showGameOverModal) => set(() => ({ showGameOverModal })),
        toggleSettingsModal: (showSettingsModal) => set(() => ({ showSettingsModal })),
        toggleInfoModal: (showInfoModal) => set(() => ({ showInfoModal })),
        toggleMultiplayerModal: (showMultiplayerModal) => set(() => ({ showMultiplayerModal })),
        toggleStatisticsPanel: (showStatisticsPanel) => set(() => ({ showStatisticsPanel })),
    }),
)

export const useSettingsStore = create<SettingsStoreState>()(
    persist((set) => ({
        hardMode: false,
        disableAnimations: false,
        theme: 'dark',
        toggleHardMode: (hardMode) => set(() => ({ hardMode })),
        toggleDisableAnimations: (disableAnimations) => set(() => ({ disableAnimations })),
        toggleTheme: () => set((state) => ({ theme: state.theme == 'dark' ? 'light' : 'dark' })),
    }),
    {
        name: 'wordle-settings-storage', // unique name
        storage: createJSONStorage(() => localStorage),
    }
))