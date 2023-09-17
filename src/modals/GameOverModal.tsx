import { useEffect, useState } from 'react'
import { useGameStore, useStatisticsStore, useModalStore } from '../hooks/useStore'
import WordRow from '../WordRow'

export default function GameOverModal({ show = false }: {show: boolean}) {
    const gameStore = useGameStore()
    const statisticsStore = useStatisticsStore()
    const modalStore = useModalStore()

    const [distribution, setDistribution] = useState<number[]>([])
    const [percentages, setPercentages] = useState<number[]>([])

    useEffect(() => {
        const distribution = Array(6).fill(0)
        const percentages = Array(6).fill(0)
        const winAttemptsArr = statisticsStore.winAttemptsArr

        winAttemptsArr.forEach(attempt => {
            distribution[attempt-1] += 1
        })

        const max = Math.max(...distribution)

        distribution.forEach((value, index) => {
            percentages[index] = max == 0 ? 10 : Math.floor(90 * value / max) + 10
        })

        setDistribution(distribution)
        setPercentages(percentages)
    }, [statisticsStore.winAttemptsArr])

    return (
        <div 
            role="modal"
            className={`
                absolute bg-[#2a2733] border border-zinc-600 rounded text-center sm:w-full w-[calc(100%-2rem)] max-w-md
                p-6 left-1/2 top-1/2 mx-auto translate-x-[-50%] translate-y-[calc(-50%-100vh)] flex flex-col items-center gap-y-8
                pointer-events-none transition-all opacity-0 duration-300 ${show ? 'opacity-100 pointer-events-auto !translate-y-[-50%]' : ''}`
            }
        >
            <section>
                <h3 className='font-bold text-lg uppercase mb-2'>{gameStore.gameState == 'won' ? 'vittoria' : 'sconfitta'}</h3>
                <WordRow
                    word={statisticsStore.lastSaved.answer}
                    className="items-center justify-items-center max-w-fit"
                />
            </section>
            
            <section>
                <h3 className='font-bold text-lg uppercase mb-2'>STATISTICHE</h3>
                <div className='grid grid-cols-4 justify-center items-start'>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='font-extrabold text-4xl'>{statisticsStore.matches}</h1>
                        <p className='font-light text-sm'>Partite</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='font-extrabold text-4xl'>{
                            statisticsStore.matches > 0 ? Math.floor(statisticsStore.wins / statisticsStore.matches * 100) : 0
                        }</h1>
                        <p className='font-light text-sm'>% Vittorie</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='font-extrabold text-4xl'>{statisticsStore.winInRow}</h1>
                        <p className='font-light text-sm'>Vittorie di fila</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='font-extrabold text-4xl'>{statisticsStore.winInRowRecord}</h1>
                        <p className='font-light text-sm'>Record vittorie di fila</p>
                    </div>
                </div>
            </section>

            <section className='w-full'>
                <h3 className='font-bold text-lg uppercase mb-2'>distribuzione tentativi</h3>
                <div className='flex flex-col gap-y-1'>
                    {percentages.map((value, index) => (
                        <div className='grid grid-cols-[1rem_1fr] gap-x-2' key={index}>
                            <p className='text-sm'>{index + 1}</p>
                            <div 
                                className='bg-zinc-600 text-sm font-semibold text-right pr-2 rounded-e'
                                style={{width: `${value}%`}}
                            >
                                {distribution[index]}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <button
                className="hover:scale-[1.03] font-bold text-base uppercase transition-all rounded bg-[#538d4e] p-2 mt-4 shadow w-full"
                onClick={() => {
                    gameStore.newGame()
                    modalStore.toggleGameOverModal(false)
                }}
            >
                New Game
            </button>
        </div>
    )
}