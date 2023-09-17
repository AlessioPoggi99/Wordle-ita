import { useEffect, useState } from 'react'
import { WORD_LENGTH } from './hooks/useStore'
import { LetterState } from './word-utils'

interface WordRowProps {
  word: string;
  result?: LetterState[];
  className?: string;
}

export default function WordRow({ word = '', result = [], className = '' }: WordRowProps) {
    
    const lettersRemaining = WORD_LENGTH - word.length;
    const letters = word.split('').concat(Array(lettersRemaining).fill(''));

    return(
        <div className={`grid grid-cols-5 gap-[5px] ${className}`}>
            {letters.map((char, index) => (
                <CharacterBox key={index} value={char} state={result[index]} index={index} />
            ))}
        </div>
    )
}

interface CharacterBoxProps {
    value?: string
    state?: LetterState
    index: number
}

function CharacterBox({ value, state, index }: CharacterBoxProps) {
    const [showNewValue, setNewValue] = useState(false)
    const [showFlip, setFlip] = useState(false)
    const [changeBg, setChangeBg] = useState(false)

    useEffect(() => {
        const timer: ReturnType<typeof setTimeout> = setTimeout(() => setNewValue(false), 100);
        return () => clearTimeout(timer)
    }, [showNewValue])

    useEffect(() => {
        const timer: ReturnType<typeof setTimeout> = setTimeout(() => setFlip(false), 250);
        return () => clearTimeout(timer)
    }, [showFlip])

    useEffect(() => {
        if(value && value.length) {
            setNewValue(true)
        }
    }, [value])

    useEffect(() => {
        if(state != null && [LetterState.Match, LetterState.Miss, LetterState.Present].includes(state)) {
            const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
                setFlip(true)
                setChangeBg(true)
            }, (index + 1) * 200)
            return () => clearTimeout(timer)
        } else {
            setFlip(false)
            setChangeBg(false)
        }
    }, [state])
  
    return (
        <div
            className={`aspect-square w-full rounded-md inline-flex justify-center items-center border border-zinc-600 p-2 uppercase 
                font-extrabold text-4xl before:inline-block before:content-['_']
                ${showNewValue ? 'animate-[pop_100ms]' : ''}
                ${value && value.length && !state ? '!border-zinc-500' : ''}
                ${showFlip ? 'animate-flip' : ''}
                ${changeBg && state != null ? `${characterStateStyles[state]}` : ''}
            `}
        >
            {value}
        </div>
    )
}
  
const characterStateStyles = {
    [LetterState.Miss]: '!border-0 !bg-[#3a3a3c]',
    [LetterState.Present]: '!border-0 !bg-[#b59f3b]',
    [LetterState.Match]: '!border-0 !bg-[#538d4e]',
}