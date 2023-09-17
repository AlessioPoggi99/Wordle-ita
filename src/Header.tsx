import { useModalStore } from "./hooks/useStore"

export default function Header() {
    const modalStore = useModalStore()

    return (
        <header className="flex justify-between items-center border-b border-zinc-600 py-4">
            <img 
                src='./assets/circle-info-solid.svg' 
                alt="open info button"
                className='w-5 h-5 cursor-pointer hover:invert duration-300'
                onClick={() => { modalStore.toggleInfoModal(true) }}
            />
            <h1 className="text-3xl font-bold text-center uppercase">🇮🇹 Wordle 🇮🇹</h1>
            <img 
                src="./assets/gear-solid.svg"
                alt="open settings button"
                className='w-5 h-5 cursor-pointer hover:invert duration-300'
                onClick={() => { modalStore.toggleSettingsModal(true) }}
            />
        </header>
    )
}