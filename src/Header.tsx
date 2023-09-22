import { useModalStore } from "./hooks/useStore"
import InfoIcon from "./assets/info.svg"
import GearIcon from "./assets/gear.svg"
import ChartIcon from "./assets/chart.svg"
import GlobeIcon from "./assets/globe.svg"

export default function Header() {
    const modalStore = useModalStore()

    return (
        <header className="flex justify-between items-center border-b border-zinc-400 dark:border-zinc-600 py-4">
            <div className="flex items-center justify-center gap-x-4">
                <img 
                    role="button"
                    aria-label="open-infos"
                    src={InfoIcon}
                    alt="open infos"
                    className='w-5 h-5 cursor-pointer hover:invert duration-300'
                    onClick={() => { modalStore.toggleInfoModal(true) }}
                />
                <img 
                    role="button"
                    aria-label="open-infos"
                    src={GlobeIcon}
                    alt="open infos"
                    className='w-5 h-5 cursor-pointer hover:invert duration-300'
                    onClick={() => { modalStore.toggleMultiplayerModal(true) }}
                />
            </div>
            <h1 className="text-3xl font-extrabold text-center">Wordle-Ita</h1>
            <div className="flex items-center justify-center gap-x-4">
                <img 
                    role="button"
                    aria-label="open-settings"
                    src={ChartIcon}
                    alt="open settings"
                    className='w-5 h-5 cursor-pointer hover:invert duration-300'
                    onClick={() => { modalStore.toggleStatisticsPanel(true) }}
                />
                <img 
                    role="button"
                    aria-label="open-settings"
                    src={GearIcon}
                    alt="open settings"
                    className='w-5 h-5 cursor-pointer hover:invert duration-300'
                    onClick={() => { modalStore.toggleSettingsModal(true) }}
                />
            </div>
        </header>
    )
}