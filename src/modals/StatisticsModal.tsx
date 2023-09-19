import Statistics from '../Statistics'
import { useGameStore, useModalStore, useStatisticsStore } from '../hooks/useStore'
import FullScreenModal from './FullScreenModal'

export const StatisticsModal = ({ show = false, setNotification }: {show: boolean, setNotification: (notification: string) => void}) => {
    const modalStore = useModalStore()
    const gameStore =  useGameStore()
    const statisticsStore = useStatisticsStore()

    return (
        <FullScreenModal 
            show={show}
            title={'statistiche'}
            onClose={() => modalStore.toggleStatisticsModal(false)}
        >
            <Statistics showSubtitle={false} />
            <button
                className="font-bold text-base uppercase transition-all rounded bg-[rgb(106,170,100)] hover:bg-[rgb(80,160,90)] dark:bg-[rgb(83,141,78)] dark:hover:bg-[rgb(50,130,68)] p-3 mt-6 shadow w-full text-[rgba(255,255,255,0.87)]"
                onClick={() => {}}
            >
                Trasferisci
            </button>
            <button
                className='font-bold text-base uppercase transition-all rounded bg-[rgb(220,53,69)] hover:bg-[rgb(187,45,59)] p-3 mt-6 shadow w-full text-[rgba(255,255,255,0.87)]'
                onClick={() => {
                    if(gameStore.gameState == 'playing') {
                        setNotification('Riprova a fine partita')
                    } else {
                        setNotification('Statistiche eliminate')
                        gameStore.newGame()
                        statisticsStore.resetStatistics()
                        modalStore.toggleGameOverModal(false)
                        modalStore.toggleStatisticsModal(false)
                    }
                }}
            >
                Elimina statistiche
            </button>
        </FullScreenModal>
    )
}