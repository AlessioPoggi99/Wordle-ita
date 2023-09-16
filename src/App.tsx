import { useEffect, useState } from 'react'
import { useGameStore, useStatisticsStore, NUMBER_OF_GUESSES, WORD_LENGTH } from './hooks/useStore'
import useGuess from './hooks/useGuess'
import usePrevious from './hooks/usePrevious'
import { LetterState, computeGuess, isValidWord } from './word-utils'
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
                addGuess(previousGuess)
            } else {
                setInvalidGuess(true)
                setGuess(previousGuess)
            }
        }
    }, [guess])

    const addGuess = (guess: string) => {
        const result = computeGuess(guess, gameStore.answer)
        const rows = gameStore.rows.concat({ guess, result })
        gameStore.updateRows(rows)
    }

    /* GAME VARS */
    const isGameOver = gameStore.gameState !== 'playing'

    let rows = [...gameStore.rows]

    let currentRow = 0

    if (rows.length < NUMBER_OF_GUESSES) {
        currentRow = rows.push({ guess }) - 1
    }

    const guessesRemaining = NUMBER_OF_GUESSES - rows.length

    rows = rows.concat(Array(guessesRemaining).fill(''))

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
                {rows.map((word, index) => (
                    <WordRow
                        key={index}
                        word={word.guess}
                        result={word.result}
                        className={showInvalidGuess && index === currentRow ? 'animate-vibration' : ''}
                    />
                ))}
                
                {/*[...Array(NUMBER_OF_GUESSES - gameStore.rows.length).keys()].map((_, index) => (
                    <WordRow
                        key={index}
                        word={''}
                        className={showInvalidGuess && index === currentRow ? 'animate-vibration' : ''}
                    />
                ))*/}
            </section>
            <section>
                {isGameOver && <GameOver />}
            </section>
      </main>
    </div>
  )
}
