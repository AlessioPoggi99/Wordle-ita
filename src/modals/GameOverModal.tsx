import { useGameStore, useStatisticsStore, useModalStore } from '../hooks/useStore'
import WordRow from '../WordRow'
import FullScreenModal from './FullScreenModal'
import Statistics from '../Statistics'

export const GameOverModal = ({ show = false }: {show: boolean}) => {
    const gameStore = useGameStore()
    const statisticsStore = useStatisticsStore()
    const modalStore = useModalStore()

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
                    disableAnimations={true}
                />
            </section>
            
            <Statistics hideBorder={false} />

            <button
                aria-label="new-game"
                className="font-bold text-base uppercase transition-all rounded bg-[rgb(106,170,100)] hover:bg-[rgb(80,160,90)] dark:bg-[rgb(83,141,78)] dark:hover:bg-[rgb(50,130,68)] p-3 mt-6 shadow w-full text-[rgba(255,255,255,0.87)]"
                onClick={() => {
                    gameStore.newGame()
                    modalStore.toggleGameOverModal(false)
                }}
            >
                Nuova Partita
            </button>
        </FullScreenModal>
    )
}

export const GameOverOverlay = ({ show, onClick }: { show: boolean, onClick: () => void }) => {
    return show && 
        <div 
            role='button'
            aria-label="open-gameover-modal"
            className='absolute w-full h-[calc(100svh-70px)] top-[70px] left-0 opacity-0 cursor-default'
            onClick={onClick}
        >
        </div>
}