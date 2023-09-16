import answeerDict from './dict/dict5-1524.json'
import validatorDict from './dict/dict5-8262.json'

export enum LetterState {
    Miss, // Letter doesn't exist at all
    Present, // Letter exists but wrong location
    Match, // Letter exists and is in the right location
}

interface DoubleLetterInfo {
    count: number
    indexes: number[]
}

export function computeGuess(guess: string, answer: string): LetterState[] {
    const result: LetterState[] = []

    const guessArr = guess.split('')
    const answerArr = answer.split('')

    // Find all LetterStates
    guessArr.forEach((letter, index) => {
        if(answerArr.includes(letter))
            if(guessArr[index] == answerArr[index])
                result.push(LetterState.Match)
            else
                result.push(LetterState.Present)
        else
            result.push(LetterState.Miss)
    })

    // Remove double letters from guess
    const toBeRemoved: Record<string, DoubleLetterInfo> = {}
    guessArr.forEach(letter => {
        const guessLetterCount = (guess.match(new RegExp(letter, 'g')) || []).length
        const answerLetterCount = (answer.match(new RegExp(letter, 'g')) || []).length
        
        if(guessLetterCount - answerLetterCount > 0 && answerLetterCount > 0) {
            toBeRemoved[letter] = {count: guessLetterCount - answerLetterCount, indexes: allIndexOf(guessArr, letter).reverse()}
        }
    })

    for(const letter in toBeRemoved) {
        toBeRemoved[letter].indexes.forEach(index => {
            if(result[index] != LetterState.Match && toBeRemoved[letter].count > 0) {
                toBeRemoved[letter].count -= 1
                result[index] = LetterState.Miss
            }
        })
    }

    return result
}

export function getRandomWord(): string {
    return answeerDict[Math.floor(Math.random() * answeerDict.length)].toLowerCase()
}

export function isValidWord(word: string): boolean {
    return validatorDict.includes(word.toUpperCase()) ||
        validatorDict.includes(word.toLowerCase()) ||
        answeerDict.includes(word.toUpperCase()) ||
        answeerDict.includes(word.toLowerCase())
}

const allIndexOf = (arr: string[], char: string) => {
    const indexes: number[] = []
    arr.forEach((element, index) => {
        if (element === char) {
            indexes.push(index)
        }
    })
    return indexes
}