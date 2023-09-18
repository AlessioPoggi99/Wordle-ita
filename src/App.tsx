import { useEffect, useState } from 'react'
import { useGameStore, useStatisticsStore, useModalStore, WORD_LENGTH } from './hooks/useStore'
import useGuess from './hooks/useGuess'
import usePrevious from './hooks/usePrevious'
import { computeGuess, isValidWord } from './utils/wordUtils'
import WordRow from './WordRow'
import { GameOverModal, GameOverOverlay } from './modals/GameOverModal'
import Keyboard from './Keyboard'
import Header from './Header'
import InfoModal from './modals/InfoModal'
import SettingsModal from './modals/SettingsModal'

export default function App() {
    /* STORE HOOKS */
    const gameStore = useGameStore()
    const statisticsStore = useStatisticsStore()
    const modalStore = useModalStore()

    /* GUESS HOOK */
    const [guess, setGuess, addGuessLetter] = useGuess()
    const previousGuess = usePrevious(guess)

    useEffect(() => {
        if(gameStore.gameState != 'playing') {
            setGuess('')
            return
        }

        if (guess.length === 0 && previousGuess?.length === WORD_LENGTH) {
            if (isValidWord(previousGuess)) {
                setInvalidGuess(false)
                const result = computeGuess(previousGuess, gameStore.answer)
                gameStore.updateRow({ guess: previousGuess, result })
            } else {
                setInvalidGuess(true)
                setGuess(previousGuess)
            }
        } else {
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
    useEffect(() => {
        if(gameStore.gameState != 'playing') {
            const isWin = gameStore.gameState == 'won' ? true : false
            const attempts = isWin ? gameStore.currentRow : -1
            statisticsStore.addMatch(gameStore.answer, isWin, attempts)
            const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
                modalStore.toggleGameOverModal(true)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [gameStore.gameState])

    /* APP TSX */
    return (
        <div className='flex flex-col justify-between mx-auto max-w-lg px-4 h-[100svh]'>

            <Header />

            <section>
                <div className="grid grid-rows-6 gap-[5px] max-w-sm mx-auto px-4 py-2">
                    {gameStore.rows.map((word, index) => (
                        <WordRow
                            key={index}
                            word={word.guess}
                            result={word.result}
                            className={showInvalidGuess && index === gameStore.currentRow ? 'animate-vibration' : ''}
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
            <SettingsModal show={modalStore.showSettingsModal} />

        </div>
    )
}