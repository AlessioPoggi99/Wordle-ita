import { useModalStore } from "./hooks/useStore"
import InfoIcon from "./assets/info.svg"
import GearIcon from "./assets/gear.svg"

export default function Header() {
    const modalStore = useModalStore()

    return (
        <header className="flex justify-between items-center border-b border-zinc-600 py-4">
            <img 
                src={InfoIcon}
                alt="open info button"
                className='w-5 h-5 cursor-pointer hover:invert duration-300'
                onClick={() => { modalStore.toggleInfoModal(true) }}
            />
            <h1 className="text-3xl font-bold text-center uppercase">🇮🇹 Wordle 🇮🇹</h1>
            <img 
                src={GearIcon}
                alt="open settings button"
                className='w-5 h-5 cursor-pointer hover:invert duration-300'
                onClick={() => { modalStore.toggleSettingsModal(true) }}
            />
        </header>
    )
}