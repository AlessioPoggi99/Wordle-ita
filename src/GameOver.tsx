import { useGameStore, useStatisticsStore } from './hooks/useStore'
import WordRow from './WordRow'

export default function GameOver() {
    /* STORE HOOKS */
    const gameStore = useGameStore()
    const statisticsStore = useStatisticsStore()

    //statisticsStore.addMatch(gameStore.gameState == 'won' ? true : false)

    return (
        <div 
            role="modal"
            className="absolute bg-[#2a2733] border border-gray-500 rounded text-center
                w-11/12 h-1/2 p-6 left-0 right-0 mx-auto top-1/4 grid grid-rows-4"
        >
            <p>Game Over</p>
            <WordRow
                word={gameStore.answer}
                className="items-center justify-items-center"
            />

            <button
                className="border border-green-500 rounded bg-green-500 p-2 mt-4 text-gray-800 shadow"
                onClick={() => {
                    gameStore.newGame()
                    //setGuess('')
                }}
            >
                New Game
            </button>
        </div>
    )
}