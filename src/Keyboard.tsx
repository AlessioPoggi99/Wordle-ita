import { useGameStore, useSettingsStore } from './hooks/useStore'
import { LetterState } from './utils/wordUtils'

interface KeyboardProps {
    onClick: (key: string) => void
}

export default function Keyboard({ onClick: onClickProps }: KeyboardProps) {
    const keyboardLetterState = useGameStore((s) => s.keyboardLetterState)
    const settingsStore = useSettingsStore()

    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { textContent, innerHTML } = e.currentTarget

        let returnProps = textContent!
        if (textContent !== innerHTML) {
            returnProps = 'Backspace'
        }

        onClickProps(returnProps)
    }

    return (
        <div className={`flex flex-col pb-4`}>
            {keyboardKeys.map((keyboardRow, rowIndex) => (
                <div key={rowIndex} className="my-1 flex justify-center space-x-1">
                    {keyboardRow.map((key, index) => {
                        let styles = 'keyboardButton rounded font-bold uppercase flex-1 py-3 text-center'

                        const letterState = keyStateStyles[keyboardLetterState[key]]
                        if(letterState && !settingsStore.disableAnimations) styles += ' transition-all delay-[1500ms]'

                        if (letterState) {
                            styles += ' text-[rgba(255,255,255,0.87)] px-2 ' + letterState
                        } else if (key !== '') {
                            styles += ' bg-[#d3d6da] dark:bg-[#818384]'
                        }

                        if (key === '') {
                            styles += ' pointer-events-none'
                        } else {
                            styles += ' px-2'
                        }

                        return (
                            <button onClick={onClick} key={key + index} className={styles}>
                                {key === 'delete' ? backspace : key}
                            </button>
                        )
                    })}
                </div>
            ))}
        </div>
    ) 
}

const keyStateStyles = {
    [LetterState.Miss]: '!bg-[#787c7e] dark:!bg-[#3a3a3c]',
    [LetterState.Present]: '!bg-[#c9b458] dark:!bg-[#b59f3b]',
    [LetterState.Match]: '!bg-[#6aaa64] dark:!bg-[#538d4e]',
}

const keyboardKeys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ''],
    ['Go', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'delete'],
]

const backspace = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
        ></path>
    </svg>
)