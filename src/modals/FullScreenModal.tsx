import { useEffect, useState } from "react"

export default function FullScreenModal({ children, show }: { children: React.ReactNode | React.ReactNode[], show: boolean }) {

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
            role="modal" 
            className={`absolute h-[calc(100svh-0px)] w-full bg-[#242424] top-0 left-0 pointer-events-none opacity-0
                ${show ? 'animate-slidein pointer-events-auto opacity-100' : 'animate-slideout'}`
        }>
            <div className='flex flex-col justify-between mx-auto max-w-lg px-4'>
                {children}
            </div>
        </div>
    )
}