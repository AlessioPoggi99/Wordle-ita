import { useGameStore, useModalStore, useStatisticsStore } from '../hooks/useStore'
import Panel from './Panel'

interface DeleteStatisticsPanelProps {
    show: boolean
    closePanel: () => void
    setNotification: (notification: string) => void
}

export const DeleteStatisticsPanel = ({ show = false, closePanel, setNotification }: DeleteStatisticsPanelProps) => {

    const gameStore = useGameStore()
    const modalStore = useModalStore()
    const statisticsStore = useStatisticsStore()

    return (
        <Panel 
            show={show}
            onClose={closePanel}
        >
            <div className='flex flex-col text-justify mt-1 border-b border-zinc-400 dark:border-zinc-600 pb-4 gap-y-2'>
                <p>Sei sicuro di voler eleminare definitivamente le tue statistiche?</p>
                <p><strong>ATTENZIONE:</strong>&nbsp;Questa operazione non è reversibile</p>
            </div>
            <div className='grid grid-cols-2 px-4 gap-x-4 pt-4'>
                <button 
                    aria-label="delete-statistics"
                    className="font-bold text-base uppercase transition-all bg-[#dc3545] rounded p-3 shadow w-full text-[rgba(255,255,255,0.87)]"
                    onClick={() => {
                        if(gameStore.gameState == 'playing' && gameStore.currentRow > 0) {
                            setNotification('Riprova a fine partita')
                        } else {
                            statisticsStore.resetStatistics()
                            setNotification('Statistiche eliminate')
                            gameStore.newGame()
                            modalStore.toggleGameOverModal(false)
                            modalStore.toggleSettingsModal(false)
                            closePanel()
                        }
                    }}
                >
                    Elimina
                </button>

                <button 
                    aria-label="cancel"
                    className="font-bold text-base uppercase transition-all rounded bg-[rgb(106,170,100)] hover:bg-[rgb(80,160,90)] dark:bg-[rgb(83,141,78)] dark:hover:bg-[rgb(50,130,68)] p-3 shadow w-full text-[rgba(255,255,255,0.87)]"
                    onClick={() => closePanel()}
                >
                    Annulla
                </button>
            </div>
        </Panel>
    )
}
