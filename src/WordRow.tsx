import { useEffect, useState } from 'react'
import { WORD_LENGTH, useSettingsStore } from './hooks/useStore'
import { LetterState } from './utils/wordUtils'

interface WordRowProps {
  word: string
  result?: LetterState[]
  className?: string
  disableAnimations?: boolean
}

export default function WordRow({ word = '', result = [], className = '', disableAnimations = false }: WordRowProps) {
    
    const lettersRemaining = WORD_LENGTH - word.length
    const letters = word.split('').concat(Array(lettersRemaining).fill(''))

    const settingsStore = useSettingsStore()

    return(
        <div className={`grid grid-cols-5 gap-[5px] ${className}`}>
            {letters.map((char, index) => (
                <CharacterBox key={index} value={char} state={result[index]} index={index} disableAnimations={settingsStore.disableAnimations || disableAnimations}/>
            ))}
        </div>
    )
}

interface CharacterBoxProps {
    value?: string
    state?: LetterState
    index: number
    disableAnimations: boolean
}

function CharacterBox({ value, state, index, disableAnimations }: CharacterBoxProps) {
    const [showNewValue, setNewValue] = useState(false)
    const [showFlip, setFlip] = useState(false)
    const [changeColor, setChangeColor] = useState(false)

    useEffect(() => {
        const timer: ReturnType<typeof setTimeout> = setTimeout(() => setNewValue(false), 100)
        return () => clearTimeout(timer)
    }, [showNewValue])

    useEffect(() => {
        const timer: ReturnType<typeof setTimeout> = setTimeout(() => setFlip(false), 500)
        return () => clearTimeout(timer)
    }, [showFlip])

    useEffect(() => {
        if(value && value.length && !disableAnimations) {
            setNewValue(true)
        }
    }, [value])

    useEffect(() => {
        if(state != null && [LetterState.Match, LetterState.Miss, LetterState.Present].includes(state)) {
            if(!disableAnimations) {
                const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
                    setFlip(true)
                    const timer2: ReturnType<typeof setTimeout> = setTimeout(() => {
                        setChangeColor(true)
                    }, 250)
                    return () => clearTimeout(timer2)
                }, (index + 1) * 100)
                return () => clearTimeout(timer)
            } else {
                setChangeColor(true)
            }
        } else {
            setFlip(false)
            setChangeColor(false)
        }
    }, [state])
  
    return (
        <div
            className={`aspect-square w-full rounded-md inline-flex justify-center items-center border border-zinc-400 dark:border-zinc-600
                p-2 uppercase font-extrabold text-4xl before:inline-block before:content-['_'] animate-delay-[0s,_250ms]
                ${state == undefined ? 'text-black dark:text-[rgba(255,255,255,0.87)]' : ''}
                ${showNewValue ? 'animate-[pop_100ms]' : ''}
                ${value && value.length && !state ? '!border-zinc-500' : ''}
                ${showFlip ? 'animate-[flipin_250ms_ease-in,_flipout_250ms_ease-in]' : ''}
                ${changeColor && state != null ? `${characterStateStyles[state]}` : ''}
            `}
        >
            {value}
        </div>
    )
}
  
const characterStateStyles = {
    [LetterState.Miss]: '!border-0 !bg-[#787c7e] dark:!bg-[#3a3a3c] !text-[rgba(255,255,255,0.87)]',
    [LetterState.Present]: '!border-0 !bg-[#c9b458] dark:!bg-[#b59f3b] !text-[rgba(255,255,255,0.87)]',
    [LetterState.Match]: '!border-0 !bg-[#6aaa64] dark:!bg-[#538d4e] !text-[rgba(255,255,255,0.87)]',
}