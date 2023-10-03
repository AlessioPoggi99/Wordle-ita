/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useGameStore, useStatisticsStore, useModalStore, WORD_LENGTH, useSettingsStore } from './hooks/useStore'
import useGuess from './hooks/useGuess'
import usePrevious from './hooks/usePrevious'
import { computeGuess, isValidGuess } from './utils/wordUtils'
import WordRow from './WordRow'
import Keyboard from './Keyboard'

interface GameProps {
    answer?: string
    setNotification: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function Game({ answer, setNotification }: GameProps) {
    /* STORE HOOKS */
    const gameStore = useGameStore()
    const statisticsStore = useStatisticsStore()
    const modalStore = useModalStore()
    const settingsStore = useSettingsStore()

    useEffect(() => { if(answer) gameStore.newGame([], answer) }, [])

    /* GUESS HOOK */
    const [guess, setGuess, addGuessLetter] = useGuess(modalStore.showGameOverModal || modalStore.showInfoModal || modalStore.showMultiplayerModal || modalStore.showSettingsModal || modalStore.showStatisticsPanel)
    const previousGuess = usePrevious(guess)

    // Remove guess if reset statistics
    useEffect(() => setGuess(''), [gameStore.answer])

    useEffect(() => {
        if (guess.length === 0 && previousGuess?.length === WORD_LENGTH) {
            // Adding guess
            const guessCheck = isValidGuess(settingsStore.hardMode, previousGuess, gameStore.currentRow, gameStore.rows)
            if(guessCheck.isValid) {
                const result = computeGuess(previousGuess, gameStore.answer)
                gameStore.updateRow({ guess: previousGuess, result })
            } else {
                setNotification(guessCheck.error)
                setInvalidGuess(true)
                setGuess(previousGuess)
            }
        } else {
            // Adding letter
            gameStore.updateRow({guess})
        }
    }, [guess])

    /* INVALID ANIMATION */
    const [showInvalidGuess, setInvalidGuess] = useState(false)
    useEffect(() => {
        const timer: ReturnType<typeof setTimeout> = setTimeout(() => setInvalidGuess(false), 600)
        return () => clearTimeout(timer)
    }, [showInvalidGuess])

    /* GAME OVER & STATISTICS UPDATE */
    const winNotification = ['Genio!', 'Magnifico!', 'Impressionante!', 'Splendido!', 'Grande!', 'Buono!']

    useEffect(() => {
        if(gameStore.gameState != 'playing') {
            const isWin = gameStore.gameState == 'won' ? true : false
            const attempts = isWin ? gameStore.currentRow : -1
            statisticsStore.addMatch(gameStore.answer, isWin, attempts, Date.now())

            const timer1: ReturnType<typeof setTimeout> = setTimeout(() => {
                setNotification(isWin ? winNotification[gameStore.currentRow - 1] : gameStore.answer.toUpperCase())
            }, 1000)

            const timer2: ReturnType<typeof setTimeout> = setTimeout(() => {
                modalStore.toggleGameOverModal(true)
            }, 3000)

            return () => {clearTimeout(timer1); clearTimeout(timer2)}
        }
    }, [gameStore.gameState])

    return (
        <>
            <section>
                <div className="grid grid-rows-6 gap-[5px] max-w-sm mx-auto px-4 py-6 short:py-2">
                    {gameStore.rows.map((word, index) => (
                        <WordRow
                            key={index}
                            word={word.guess}
                            result={word.result}
                            className={showInvalidGuess && index === gameStore.currentRow ? 'animate-vibration' : ''}
                            isWinningRow={gameStore.gameState == 'won' && index == gameStore.currentRow - 1}
                        />
                    ))}
                </div>
            </section>

            <section>
                <Keyboard onClick={(key) => { addGuessLetter(key) }}/>
            </section>
        </>
    )
}