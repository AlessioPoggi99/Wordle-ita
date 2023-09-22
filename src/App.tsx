import { useEffect, useState } from 'react'
import { useGameStore, useStatisticsStore, useModalStore, WORD_LENGTH, useSettingsStore } from './hooks/useStore'
import useGuess from './hooks/useGuess'
import usePrevious from './hooks/usePrevious'
import { computeGuess, isValidGuess } from './utils/wordUtils'
import WordRow from './WordRow'
import { GameOverModal, GameOverOverlay } from './modals/GameOverModal'
import Keyboard from './Keyboard'
import Header from './Header'
import InfoModal from './modals/InfoModal'
import SettingsModal from './modals/SettingsModal'
import NotificationModal from './modals/NotificationModal'
import { useNotification } from './hooks/useNotification'

export default function App() {
    /* STORE HOOKS */
    const gameStore = useGameStore()
    const statisticsStore = useStatisticsStore()
    const modalStore = useModalStore()
    const settingsStore = useSettingsStore()

    /* NOTIFICATION HOOK */
    const [notification, setNotification] = useNotification()

    /* GUESS HOOK */
    const [guess, setGuess, addGuessLetter] = useGuess()
    const previousGuess = usePrevious(guess)

    useEffect(() => {
        if(gameStore.gameState != 'playing') {
            // Don't add guess or letter if game is over
            setGuess('')
            return
        }
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
            statisticsStore.addMatch(gameStore.answer, isWin, attempts)

            const timer1: ReturnType<typeof setTimeout> = setTimeout(() => {
                setNotification(isWin ? winNotification[gameStore.currentRow - 1] : gameStore.answer.toUpperCase())
            }, 1000)

            const timer2: ReturnType<typeof setTimeout> = setTimeout(() => {
                modalStore.toggleGameOverModal(true)
            }, 3000)

            return () => {clearTimeout(timer1); clearTimeout(timer2)}
        }
    }, [gameStore.gameState])

    /* APP TSX */
    return (
        <div className='flex flex-col justify-between mx-auto max-w-lg px-4 min-h-[100svh] relative'>

            <Header />

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


            <GameOverOverlay show={gameStore.gameState != 'playing'} onClick={() => modalStore.toggleGameOverModal(true)}/>
            <GameOverModal show={modalStore.showGameOverModal} />
            <InfoModal show={modalStore.showInfoModal} />
            <SettingsModal show={modalStore.showSettingsModal} setNotification={setNotification} />
            <NotificationModal notification={notification} />

        </div>
    )
}