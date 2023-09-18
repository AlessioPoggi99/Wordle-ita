import { useEffect, useState } from 'react'
import { useGameStore, useStatisticsStore, useModalStore } from '../hooks/useStore'
import WordRow from '../WordRow'
import FullScreenModal from './FullScreenModal'

export const GameOverModal = ({ show = false }: {show: boolean}) => {
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
        <FullScreenModal 
            show={show}
            title={gameStore.gameState == 'won' ? 'vittoria' : gameStore.gameState == 'lost' ? 'sconfitta' : 'statistiche'}
            onClose={() => modalStore.toggleGameOverModal(false)}
        >
            <section className="items-center flex flex-col my-6">
                <WordRow
                    word={statisticsStore.lastSaved.answer}
                    className="items-center justify-items-center max-w-fit"
                />
            </section>
            
            <section className="flex flex-col gap-y-2 py-6 justify-center text-center border-t border-zinc-400 dark:border-zinc-600">
                <h3 className='font-bold text-base uppercase'>STATISTICHE</h3>
                <div className='grid grid-cols-4 justify-center items-start'>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='font-bold text-4xl'>{statisticsStore.matches}</h1>
                        <p className='font-light text-sm'>Partite</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='font-bold text-4xl'>{
                            statisticsStore.matches > 0 ? Math.floor(statisticsStore.wins / statisticsStore.matches * 100) : 0
                        }</h1>
                        <p className='font-light text-sm'>% Vittorie</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='font-bold text-4xl'>{statisticsStore.winInRow}</h1>
                        <p className='font-light text-sm'>Streak vittorie</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='font-bold text-4xl'>{statisticsStore.winInRowRecord}</h1>
                        <p className='font-light text-sm'>Max Streak</p>
                    </div>
                </div>
            </section>

            <section className='w-full flex flex-col pb-6 gap-y-2 justify-center text-center border-b border-zinc-400 dark:border-zinc-600'>
                <h3 className='font-bold text-base uppercase'>distribuzione tentativi</h3>
                <div className='flex flex-col gap-y-1'>
                    {percentages.map((value, index) => (
                        <div className='grid grid-cols-[1rem_1fr] gap-x-2' key={index}>
                            <p className='text-sm'>{index + 1}</p>
                            <div 
                                className={`
                                    ${statisticsStore.lastSaved.attempts == index + 1 ? 'bg-[#6aaa64] dark:bg-[#538d4e]' : 'bg-[#787c7e] dark:bg-[#3a3a3c]'} 
                                    text-sm font-semibold text-right pr-2 rounded-e
                                `}
                                style={{width: `${value}%`}}
                            >
                                {distribution[index]}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <button
                className="hover:scale-[1.03] font-bold text-base uppercase transition-all rounded bg-[#6aaa64] dark:bg-[#538d4e] p-3 mt-6 shadow w-full"
                onClick={() => {
                    gameStore.newGame()
                    modalStore.toggleGameOverModal(false)
                }}
            >
                New Game
            </button>
        </FullScreenModal>
    )
}

export const GameOverOverlay = ({ show, onClick }: { show: boolean, onClick: () => void }) => {
    return show && 
        <div 
            role='button'
            className='absolute w-full h-[calc(100svh-70px)] top-[70px] left-0 opacity-0 cursor-default'
            onClick={onClick}
        >
        </div>
}