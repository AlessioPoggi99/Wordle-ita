import { useEffect, useState } from 'react'
import { useGameStore, useStatisticsStore, WORD_LENGTH } from './hooks/useStore'
import useGuess from './hooks/useGuess'
import usePrevious from './hooks/usePrevious'
import { computeGuess, isValidWord } from './word-utils'
import WordRow from './WordRow'
import GameOver from './GameOver'


export default function App() {
    /* STORE HOOKS */
    const gameStore = useGameStore()
    const statisticsStore = useStatisticsStore()

    /* GUESS HOOK */
    const [guess, setGuess, addGuessLetter] = useGuess()
    const previousGuess = usePrevious(guess);

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

    /* APP TSX */
    return (
        <div className='mx-auto h-screen max-w-lg px-4'>

        <header className="flex justify-between items-center border-b border-zinc-600 py-4">
            <img src='/images/chart-simple-solid.svg' className='w-5 h-5'/>
            <h1 className="text-3xl font-bold text-center uppercase">🇮🇹 Wordle 🇮🇹</h1>
            <img src='/images/gear-solid.svg' className='w-5 h-5'/>
        </header>

        <main>
            <section className="grid grid-rows-6 gap-[5px] my-4 max-w-sm mx-auto px-4">
                {gameStore.rows.map((word, index) => (
                    <WordRow
                        key={index}
                        word={word.guess}
                        result={word.result}
                        className={showInvalidGuess && index === gameStore.currentRow ? 'animate-vibration' : ''}
                    />
                ))}
            </section>
            <section>
                {gameStore.gameState !== 'playing' && <GameOver />}
            </section>
      </main>
    </div>
  )
}
