import { useEffect, useState } from "react"

export default function NotificationModal({ notification }: { notification?: string }) {

    const [show, setShow] = useState(false)
    const [notificationText, setNotificationText] = useState('')

    useEffect(() => {
        if(notification) {
            setNotificationText(notification)
            setShow(true)
        } else setShow(false)
    }, [notification])

    return (
        <div role="modal" className='absolute h-[calc(100svh-0px)] w-full top-0 left-0 pointer-events-none z-50'>
            <div className='flex flex-col items-center mx-auto max-w-lg px-4 pt-28'>
                <div 
                    className={`bg-[#242424] dark:bg-[#e3e3e1] text-[rgba(255,255,255,0.87)] dark:text-black duration-300
                        px-4 py-2 rounded font-bold text-base sm:text-lg transition-all opacity-0 ${show ? 'opacity-100 translate-y-2' : ''}`}
                >
                    {notificationText}
                </div>
            </div>
        </div>
    )
}