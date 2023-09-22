import { useEffect, useState } from "react"
import { useModalStore, useSettingsStore, useGameStore } from "../hooks/useStore"
import FullScreenModal from "./FullScreenModal"
import Switch from "react-switch"
import { applyThemePreference } from "../utils/themeUtils"
import TrashIcon from '../assets/trash.svg'
import ImportIcon from '../assets/import.svg'
import { MigratePanel } from "./MigratePanel"
import { DeleteStatisticsPanel } from "./DeleteStatisticsPanel"

interface SettingsModalProps {
    show: boolean
    setNotification: (notification: string) => void
}

export default function SettingsModal({ show = false, setNotification }: SettingsModalProps) {
    const gameStore = useGameStore()
    const modalStore = useModalStore()
    const settingsStore = useSettingsStore()

    const [isMigratePanelOpen, setMigratePanelOpen] = useState(false)
    const [isDeleteStatisticsPanelOpen, setDeleteStatisticsPanelOpen] = useState(false)

    useEffect(() => {
        applyThemePreference(settingsStore.theme)
    }, [settingsStore.theme])

    return (
        <FullScreenModal show={show} title="Impostazioni" onClose={() => modalStore.toggleSettingsModal(false)}>
            
            <section className="flex flex-col text-lg font-medium py-4 gap-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-zinc-400 dark:border-zinc-600">
                    <div>
                        <p>Modalità difficile</p>
                        <p className="text-xs font-light text-black/50 dark:text-white/50">Ogni lettera nota deve essere usata nei tentativi successivi</p>
                    </div>
                    <div onClick={() => { if(gameStore.currentRow > 0) setNotification('Puoi cambiare solo a inizio partita') }}>
                        <SwitchToggle 
                            checked={settingsStore.hardMode} 
                            disabled={gameStore.currentRow > 0}
                            handleChange={(checked) => settingsStore.toggleHardMode(checked)}
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-400 dark:border-zinc-600">
                    <p>Tema scuro</p>
                    <SwitchToggle 
                        checked={settingsStore.theme == 'dark'} 
                        handleChange={() => settingsStore.toggleTheme()}
                    />
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-400 dark:border-zinc-600">
                    <p>Disattiva animazioni</p>
                    <SwitchToggle 
                        checked={settingsStore.disableAnimations} 
                        handleChange={(checked) => settingsStore.toggleDisableAnimations(checked)}
                    />
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-400 dark:border-zinc-600">
                    <p>Trasferisci statistiche</p>
                    <img 
                        role="button"
                        aria-label="open-import-export-panel"
                        src={ImportIcon}
                        alt="open import/export panel"
                        className='w-5 h-5 cursor-pointer hover:invert duration-300'
                        onClick={() => setMigratePanelOpen(true)}
                    />
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-400 dark:border-zinc-600">
                    <p>Elimina statistiche</p>
                    <img 
                        role="button"
                        aria-label="reset-statistics"
                        src={TrashIcon}
                        alt="reset statistics"
                        className='w-5 h-5 cursor-pointer hover:invert-[20%] duration-300'
                        onClick={() => setDeleteStatisticsPanelOpen(true)}
                    />
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-400 dark:border-zinc-600">
                    <p>Feedback</p>
                    <a href="https://github.com/AlessioPoggi99" target="_blank" className="text-base font-normal text-black/50 dark:text-white/50 underline">Github</a>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-400 dark:border-zinc-600">
                    <p>Segnala un Bug</p>
                    <a href="mailto:alessio_poggi@hotmail.it" target="_blank" className="text-base font-normal text-black/50 dark:text-white/50 underline">Email</a>
                </div>
            </section>
            
            <footer className="text-center absolute bottom-4 left-0 right-0">
                <h3 className="text-black/50 dark:text-white/50 text-sm">© 2023: Alessio Poggi, v1.0.0</h3>
            </footer>

            <DeleteStatisticsPanel show={isDeleteStatisticsPanelOpen} closePanel={() => setDeleteStatisticsPanelOpen(false)} setNotification={setNotification} />
            <MigratePanel show={isMigratePanelOpen} closePanel={() => setMigratePanelOpen(false)} setNotification={setNotification} />
            
        </FullScreenModal>
    )
}

const SwitchToggle = ({ checked, disabled = false, handleChange }: { checked: boolean, disabled?: boolean, handleChange: (checked: boolean) => void }) => {

    const [isChecked, setIsChecked] = useState(checked)
    const settingsStore = useSettingsStore()

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
            onColor={settingsStore.theme == 'light' ? '#6aaa64' : '#538d4e'}
            offColor={settingsStore.theme == 'light' ? '#878a8c' : '#565758'}
            disabled={disabled}
        />
    )
}