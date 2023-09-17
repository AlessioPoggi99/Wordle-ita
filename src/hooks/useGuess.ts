import { useState, useEffect } from "react"
import { WORD_LENGTH } from "./useStore"

export default function useGuess(): [string, React.Dispatch<React.SetStateAction<string>>, (letter: string) => void] {
    const [guess, setGuess] = useState('')

    const addGuessLetter = (letter: string) => {
        setGuess((curGuess) => {
            const newGuess = letter.length === 1 && curGuess.length !== WORD_LENGTH ? curGuess + letter : curGuess

            switch (letter) {
                case 'Backspace':
                    return newGuess.slice(0, -1);
                case 'Enter':
                case 'Go':
                    if (newGuess.length === WORD_LENGTH) {
                        return ''
                    }
            }

            return newGuess
        })
    }

    const onKeyDown = (e: KeyboardEvent) => {
        const letter = e.key
        addGuessLetter(letter)
    }
    
    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => { document.removeEventListener('keydown', onKeyDown) }
    }, [])
    
    return [guess, setGuess, addGuessLetter];
}