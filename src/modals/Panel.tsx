import { useEffect, useState } from "react"
import XmarkIcon from '../assets/xmark.svg'

interface PanelProps {
    children: React.ReactNode | React.ReactNode[]
    show: boolean
    className?: string
    onClose: () => void
}

export default function Panel({ children, show, onClose, className = '' }: PanelProps) {

    const [showPanel, setShowPanel] = useState(false)

    useEffect(() => {
        if(show) setShowPanel(true)
        else {
            const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
                setShowPanel(false)
            }, 200)
            return () => clearTimeout(timer)
        }
    }, [show])

    return (
        showPanel && <div 
            role='dialog'
            id='panel'
            onClick={(e) => { 
                const target = e.target as Element
                if(target.id == 'panel')
                    onClose() 
            }}
            className={`absolute h-[calc(100svh-0px)] w-full bg-[rgba(107,114,128,0.75)] top-0 left-0 pointer-events-none opacity-0
                ${show ? 'animate-slidein pointer-events-auto opacity-100' : 'animate-slideout'}
                ${className}`
        }>
            <div className="relative top-[50%] left-[50%] max-w-sm translate-x-[-50%] translate-y-[-50%] px-4">
                <img
                    role="button"
                    aria-label="close-panel"
                    src={XmarkIcon}
                    alt='close panel'
                    className='absolute right-6 top-2 w-5 h-5 cursor-pointer hover:invert duration-300'
                    onClick={onClose}
                />
                <div className='bg-[#e3e3e1] dark:bg-[#242424] px-4 py-6 rounded-md'>
                    {children}
                </div>
            </div>
        </div>
    )
}