import { useModalStore } from "./hooks/useStore"

export default function Header() {
    const modalStore = useModalStore()

    return (
        <header className="flex justify-between items-center border-b border-zinc-600 py-4">
            <img 
                src='/images/circle-info-solid.svg' className='w-5 h-5 cursor-pointer hover:invert duration-300'
                onClick={() => { modalStore.toggleInfoModal(true) }}
            />
            <h1 className="text-3xl font-bold text-center uppercase">🇮🇹 Wordle 🇮🇹</h1>
            <img 
                src='/images/gear-solid.svg' className='w-5 h-5 cursor-pointer hover:invert duration-300'
                onClick={() => { modalStore.toggleSettingsModal(true) }}
            />
        </header>
    )
}