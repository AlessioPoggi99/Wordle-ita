import { useEffect, useState } from 'react'
import { useGameStore, useStatisticsStore, WORD_LENGTH } from './hooks/useStore'
import useGuess from './hooks/useGuess'
import usePrevious from './hooks/usePrevious'
import { computeGuess, isValidWord } from './word-utils'
import WordRow from './WordRow'
import GameOverModal from './modals/GameOverModal'
import Keyboard from './Keyboard'
import Header from './Header'


export default function App() {
    /* STORE HOOKS */
    const gameStore = useGameStore()
    const statisticsStore = useStatisticsStore()

    /* GUESS HOOK */
    const [guess, setGuess, addGuessLetter] = useGuess()
    const previousGuess = usePrevious(guess)

    useEffect(() => {
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
    const [showGameOverModal, setGameOverModal] = useState<boolean>(false)

    useEffect(() => {
        if(gameStore.gameState != 'playing') {
            const isWin = gameStore.gameState == 'won' ? true : false
            statisticsStore.addMatch(gameStore.answer, isWin, gameStore.currentRow)
            const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
                setGameOverModal(true)
            }, 2000)
            return () => clearTimeout(timer)
        } else {
            setGameOverModal(false)
            setGuess('')
        }
    }, [gameStore.gameState])

    /* APP TSX */
    return (
        <div className='flex flex-col justify-between mx-auto max-w-lg px-4 h-[100svh]'>

            <Header />

            <section className=''>
                <div className="grid grid-rows-6 gap-[5px] max-w-sm mx-auto p-4">
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

            <section className=''>
                <Keyboard onClick={(key) => { addGuessLetter(key) }}/>
            </section>

            <GameOverModal show={showGameOverModal} />

        </div>
    )
}