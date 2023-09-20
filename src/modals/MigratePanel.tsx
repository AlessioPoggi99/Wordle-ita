import { useState } from 'react'
import { useStatisticsStore } from '../hooks/useStore'
import Panel from './Panel'
import { copyToClipboard } from '../utils/clipboardUtils'
import { encrypt, decrypt } from '../utils/encryptionUtils'

interface MigrateModalProps {
    show: boolean
    setMigrateModalOpen: (isOpen: boolean) => void
    setNotification: (notification: string) => void
}

export const MigratePanel = ({ show = false, setMigrateModalOpen, setNotification }: MigrateModalProps) => {
    const statisticsStore = useStatisticsStore()

    const [activeFunction, setActiveFunction] = useState<'export' | 'import'>('export')
    const [importText, setImportText] = useState('')

    const closePanel = () => {
        setImportText('')
        setMigrateModalOpen(false)
    }

    return (
        <Panel 
            show={show}
            onClose={() => closePanel()}
        >
            <div className='flex flex-col gap-y-6'>
                <div className='grid grid-cols-2 font-semibold'>
                    <button 
                        className={`${activeFunction == 'export' ? 'underline' : 'opacity-50'} transition-all`}
                        onClick={() => setActiveFunction('export')}
                    >
                        Esporta
                    </button>
                    <button 
                        className={`${activeFunction == 'import' ? 'underline' : 'opacity-50'} transition-all`}
                        onClick={() => setActiveFunction('import')}
                    >
                        Importa
                    </button>
                </div>

                {activeFunction == 'export' && <textarea
                    readOnly={true}
                    rows={8}
                    className="block w-full rounded-lg border border-zinc-300 bg-gray-50 p-2.5 text-sm dark:border-gray-600 dark:bg-zinc-700 outline-none"
                    value={encrypt(JSON.stringify(statisticsStore))}
                />}
                {activeFunction == 'import' && <textarea
                    readOnly={false}
                    rows={8}
                    className="block w-full rounded-lg border border-zinc-300 bg-gray-50 p-2.5 text-sm dark:border-gray-600 dark:bg-zinc-700 outline-none"
                    value={importText}
                    onChange={e => setImportText(e.target.value)}
                />}

                <button
                    className="font-bold text-base uppercase transition-all rounded bg-[rgb(106,170,100)] hover:bg-[rgb(80,160,90)] dark:bg-[rgb(83,141,78)] dark:hover:bg-[rgb(50,130,68)] p-3 shadow w-full text-[rgba(255,255,255,0.87)]"
                    onClick={async() => {
                        try {
                            if(activeFunction == 'export') {
                                await copyToClipboard(encrypt(JSON.stringify(statisticsStore)))
                                setNotification('Copiato')
                            } else {
                                const string = decrypt(importText) ?? ''
                                const result = statisticsStore.importStatistics(string)
                                if(result) {
                                    setNotification('Statistiche aggiornate')
                                    closePanel()
                                } else
                                    setNotification('Stringa non valida')
                            }
                        } catch { setNotification('Errore') }
                    }}
                >
                    {activeFunction == 'export' ? 'Copia' : 'Importa'}
                </button>
            </div>
        </Panel>
    )
}
