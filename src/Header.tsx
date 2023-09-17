export default function Header() {
    return (
        <header className="flex justify-between items-center border-b border-zinc-600 py-4">
            <img src='/images/chart-simple-solid.svg' className='w-5 h-5 cursor-pointer hover:invert duration-300'/>
            <h1 className="text-3xl font-bold text-center uppercase">🇮🇹 Wordle 🇮🇹</h1>
            <img src='/images/gear-solid.svg' className='w-5 h-5 cursor-pointer hover:invert duration-300'/>
        </header>
    )
}