import { useGameStore, useModalStore } from './hooks/useStore'
import { GameOverModal, GameOverOverlay } from './modals/GameOverModal'
import Header from './Header'
import InfoModal from './modals/InfoModal'
import SettingsModal from './modals/SettingsModal'
import NotificationModal from './modals/NotificationModal'
import { useNotification } from './hooks/useNotification'
import { StatisticsPanel } from './modals/StatisticsPanel'
import MultiplayerModal from './modals/MultiplayerModal'
import Game from './Game'

export default function App() {
    /* STORE HOOKS */
    const gameStore = useGameStore()
    const modalStore = useModalStore()

    /* NOTIFICATION HOOK */
    const [notification, setNotification] = useNotification()

    /* APP TSX */
    return (
        <div className='flex flex-col justify-between mx-auto max-w-lg px-4 min-h-[100svh] relative'>
            <Header />
            <Game setNotification={setNotification} />
            <GameOverOverlay show={gameStore.gameState != 'playing'} onClick={() => modalStore.toggleGameOverModal(true)}/>
            <GameOverModal show={modalStore.showGameOverModal} />
            <StatisticsPanel show={modalStore.showStatisticsPanel} closePanel={() => modalStore.toggleStatisticsPanel(false)} />
            <InfoModal show={modalStore.showInfoModal} />
            <MultiplayerModal show={modalStore.showMultiplayerModal} />
            <SettingsModal show={modalStore.showSettingsModal} setNotification={setNotification} />
            <NotificationModal notification={notification} />
        </div>
    )
}