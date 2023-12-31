import { useEffect, useState } from 'react'
import { useStatisticsStore, NUMBER_OF_GUESSES } from './hooks/useStore'

export default function Statistics({ hideBorder }: { hideBorder: boolean }) {
    const statisticsStore = useStatisticsStore()

    const [distribution, setDistribution] = useState<number[]>([])
    const [percentages, setPercentages] = useState<number[]>([])

    useEffect(() => {
        const distribution = statisticsStore.winAttemptsArr
        const percentages = Array(NUMBER_OF_GUESSES).fill(0)

        const max = Math.max(...distribution)

        distribution.forEach((value, index) => {
            percentages[index] = max == 0 ? 10 : Math.floor(90 * value / max) + 10
        })

        setDistribution(distribution)
        setPercentages(percentages)
    }, [statisticsStore.winAttemptsArr])

    return (
        <>
            <section className={`flex flex-col gap-y-2 py-6 justify-center text-center ${hideBorder ? '' : 'border-t'} border-zinc-400 dark:border-zinc-600`}>
                <p className="font-bold text-base uppercase">STATISTICHE</p>
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

            <section className={`w-full flex flex-col pb-6 gap-y-2 justify-center text-center ${hideBorder ? '' : 'border-b'} border-zinc-400 dark:border-zinc-600`}>
                <p className='font-bold text-base uppercase'>distribuzione tentativi</p>
                <div className='flex flex-col gap-y-1'>
                    {percentages.map((value, index) => (
                        <div className='grid grid-cols-[1rem_1fr] gap-x-2' key={index}>
                            <p className='text-sm'>{index + 1}</p>
                            <div 
                                className={`
                                    ${statisticsStore.lastSaved.attempts == index + 1 ? 'bg-[#6aaa64] dark:bg-[#538d4e]' : 'bg-[hsl(200,2%,48%)] dark:bg-[#3a3a3c]'} 
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
        </>
    )
}