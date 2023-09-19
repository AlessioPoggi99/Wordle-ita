import { useState, useEffect } from "react";

export const useNotification = () => {
    const [notification, setNotification] = useState<string>()

    useEffect(() => {
        if(notification && notification.length) {
            const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
                setNotification('')
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [notification])

    return [notification, setNotification] as const
}