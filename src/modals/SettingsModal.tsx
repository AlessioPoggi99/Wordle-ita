import { useState } from "react"
import { useModalStore, useStatisticsStore } from "../hooks/useStore"
import FullScreenModal from "./FullScreenModal"
import Switch from "react-switch"

export default function SettingsModal({ show = false }: {show: boolean}) {
    const modalStore = useModalStore()
    const statisticsStore = useStatisticsStore()

    const handleThemeChange = (checked: boolean) => {
        console.log('theme', checked)
    }

    const handleAnimationChange = (checked: boolean) => {
        console.log('animation', checked)
    }

    return (
        <FullScreenModal show={show}>
            
            <header className="relative flex justify-center items-center py-4">
                <h1 className="text-xl font-bold text-center uppercase">Impostazioni</h1>
                <img 
                    src='/images/xmark-solid.svg' 
                    className='absolute right-0 w-5 h-5 cursor-pointer hover:invert duration-300'
                    onClick={() => { modalStore.toggleSettingsModal(false) }}
                />
            </header>
            
            <section className="flex flex-col text-lg font-semibold py-4 gap-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-zinc-600">
                    <p>Tema scuro</p>
                    <SwitchToggle 
                        checked={true} 
                        handleChange={handleThemeChange}
                    />
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-600">
                    <p>Disattiva animazioni</p>
                    <SwitchToggle 
                        checked={false} 
                        handleChange={handleAnimationChange}
                    />
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-600">
                    <p>Elimina statistiche</p>
                    <img 
                        src='/images/trash-can-solid.svg' 
                        className='w-5 h-5 cursor-pointer duration-300' 
                        onClick={() => statisticsStore.resetStatistics()}
                    />
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-600">
                    <p>Feedback</p>
                    <a href="https://github.com/AlessioPoggi99" target="_blank" className="text-base font-normal text-white/50 underline">Github</a>
                </div>
            </section>
            
            <footer className="text-center absolute bottom-4 left-0 right-0">
                <h3 className="text-white/50 text-sm">© 2023: Alessio Poggi, v1.0.0</h3>
            </footer>
            
        </FullScreenModal>
    )
}

const SwitchToggle = ({ checked, handleChange }: { checked: boolean, handleChange: (checked: boolean) => void }) => {

    const [isChecked, setIsChecked] = useState(checked)

    return (
        <Switch 
            onChange={(checked) => {
                setIsChecked(checked)
                handleChange(checked)
            }} 
            checked={isChecked}
            checkedIcon={false}
            uncheckedIcon={false}
            width={45}
            height={25}
            handleDiameter={20}
            onColor="#538d4e"
            offColor="#52525b"
        />
    )
}