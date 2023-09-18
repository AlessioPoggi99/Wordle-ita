import { useState } from "react"
import { useModalStore, useStatisticsStore, useSettingsStore, useGameStore } from "../hooks/useStore"
import FullScreenModal from "./FullScreenModal"
import Switch from "react-switch"
import TrashIcon from '../assets/trash.svg'

export default function SettingsModal({ show = false }: {show: boolean}) {
    const gameStore = useGameStore()
    const modalStore = useModalStore()
    const statisticsStore = useStatisticsStore()
    const settingsStore = useSettingsStore()

    return (
        <FullScreenModal show={show} title="Impostazioni" onClose={() => modalStore.toggleSettingsModal(false)}>
            
            <section className="flex flex-col text-lg font-semibold py-4 gap-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-zinc-600">
                    <p>Modalità difficile</p>
                    <SwitchToggle 
                        checked={settingsStore.hardMode} 
                        handleChange={(checked) => settingsStore.toggleHardMode(checked)}
                    />
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-600">
                    <p>Tema scuro</p>
                    <SwitchToggle 
                        checked={settingsStore.darkTheme} 
                        handleChange={(checked) => settingsStore.toggleDarkTheme(checked)}
                    />
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-600">
                    <p>Disattiva animazioni</p>
                    <SwitchToggle 
                        checked={settingsStore.disableAnimations} 
                        handleChange={(checked) => settingsStore.toggleDisableAnimations(checked)}
                    />
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-600">
                    <p>Elimina statistiche</p>
                    <img 
                        role="button"
                        src={TrashIcon}
                        alt="delete statistics button"
                        className='w-5 h-5 cursor-pointer duration-300' 
                        onClick={() => {
                            gameStore.newGame()
                            statisticsStore.resetStatistics()
                            modalStore.toggleGameOverModal(false)
                        }}
                    />
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-600">
                    <p>Feedback</p>
                    <a href="https://github.com/AlessioPoggi99" target="_blank" className="text-base font-normal text-white/50 underline">Github</a>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-600">
                    <p>Segnala un Bug</p>
                    <a href="mailto:alessio_poggi@hotmail.it" target="_blank" className="text-base font-normal text-white/50 underline">Email</a>
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