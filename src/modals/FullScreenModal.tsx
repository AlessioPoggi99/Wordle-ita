import { useEffect, useState } from "react"
import XmarkIcon from '../assets/xmark.svg'

interface FullScreenModalProps {
    children: React.ReactNode | React.ReactNode[]
    show: boolean
    title: string
    className?: string
    onClose: () => void
}

export default function FullScreenModal({ children, show, title, onClose, className = '' }: FullScreenModalProps) {

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if(show) setShowModal(true)
        else {
            const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
                setShowModal(false)
            }, 200)
            return () => clearTimeout(timer)
        }
    }, [show])

    return (
        showModal && <div 
            role="dialog"
            className={`absolute h-[calc(100svh-0px)] w-full bg-[#e3e3e1] dark:bg-[#242424] top-0 left-0 pointer-events-none opacity-0
                ${show ? 'animate-slidein pointer-events-auto opacity-100' : 'animate-slideout'}
                ${className}`
        }>
            <div className='flex flex-col justify-between mx-auto max-w-lg px-4'>
                <header className="relative flex justify-center items-center py-4">
                    <h1 className="text-xl font-extrabold text-center uppercase">{title}</h1>
                    <img
                        role="button"
                        src={XmarkIcon}
                        alt='close button'
                        className='absolute right-0 w-5 h-5 cursor-pointer hover:invert duration-300'
                        onClick={onClose}
                    />
                </header>
                {children}
            </div>
        </div>
    )
}