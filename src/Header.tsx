import { useModalStore } from "./hooks/useStore"
import InfoIcon from "./assets/info.svg"
import GearIcon from "./assets/gear.svg"
import ChartIcon from "./assets/chart.svg"

export default function Header() {
    const modalStore = useModalStore()

    return (
        <header className="flex justify-between items-center border-b border-zinc-400 dark:border-zinc-600 py-4">
            <div className="gap-x-4 h-full justify-center items-center hidden sm:flex">
                <img 
                    role="button"
                    src={InfoIcon}
                    alt="open info button"
                    className='w-5 h-5 cursor-pointer hover:invert duration-300'
                    onClick={() => { modalStore.toggleInfoModal(true) }}
                />
                <img 
                    role="button"
                    src={InfoIcon}
                    alt="open info button"
                    className='w-5 h-5 cursor-pointer hover:invert duration-300 hidden sm:block opacity-0 pointer-events-none'
                    onClick={() => { modalStore.toggleInfoModal(true) }}
                />
            </div>
            <h1 className="text-3xl font-extrabold text-center">Wordle-Ita</h1>
            <div className="flex gap-x-4 h-full justify-center items-center">
                <img 
                    role="button"
                    src={InfoIcon}
                    alt="open info button"
                    className='w-5 h-5 cursor-pointer hover:invert duration-300 sm:hidden'
                    onClick={() => { modalStore.toggleInfoModal(true) }}
                />
                <img 
                    role="button"
                    src={ChartIcon}
                    alt="open info button"
                    className='w-5 h-5 cursor-pointer hover:invert duration-300'
                    onClick={() => { modalStore.toggleStatisticsModal(true) }}
                />
                <img 
                    role="button"
                    src={GearIcon}
                    alt="open settings button"
                    className='w-5 h-5 cursor-pointer hover:invert duration-300'
                    onClick={() => { modalStore.toggleSettingsModal(true) }}
                />
            </div>
        </header>
    )
}