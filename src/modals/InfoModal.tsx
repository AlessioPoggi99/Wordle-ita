import WordRow from "../WordRow"
import { useModalStore } from "../hooks/useStore"
import { LetterState } from "../utils/wordUtils"
import FullScreenModal from "./FullScreenModal"

export default function InfoModal({ show = false }: {show: boolean}) {
    const modalStore = useModalStore()

    return (
        <FullScreenModal show={show} title="Come giocare" onClose={() => modalStore.toggleInfoModal(false)}>
            <section className="text-justify font-light flex flex-col gap-y-2 my-4">
                <p>Hai <strong className="font-bold">6</strong> tentativi per indovinare una parola di <strong className="font-bold">5</strong> lettere.</p>
                <p>Dopo ogni tentativo potrai capire quante delle lettere da te inserite sono contenute nella parola da indovinare, secondo i colori assunti delle caselle.</p>
            </section>
            <section className="flex flex-col gap-y-3 py-6 justify-center text-center border-y border-zinc-400 dark:border-zinc-600">
                <div className="flex flex-col gap-y-2">
                    <WordRow 
                        word={"falco"}
                        result={[LetterState.Match,LetterState.Miss,LetterState.Miss,LetterState.Miss,LetterState.Miss]}
                        className="px-8 sm:px-16"
                        disableAnimations={true}
                    />
                    <p>La lettera <strong className="font-bold">F</strong> è al posto corretto.</p>
                </div>
                <div className="flex flex-col gap-y-2">
                    <WordRow 
                        word={"tasca"}
                        result={[LetterState.Miss,LetterState.Miss,LetterState.Present,LetterState.Miss,LetterState.Miss]}
                        className="px-8 sm:px-16"
                        disableAnimations={true}
                    />
                    <p>La lettera <strong className="font-bold">S</strong> è al posto sbagliato.</p>
                </div>
                <div className="flex flex-col gap-y-2">
                    <WordRow 
                        word={"porto"}
                        result={[LetterState.Miss,LetterState.Miss,LetterState.Miss,LetterState.Miss,LetterState.Miss]}
                        className="px-8 sm:px-16"
                        disableAnimations={true}
                    />
                    <p>Nessuna di queste lettere è corretta</p>
                </div>
            </section>
            <p className="my-4">Più di <strong className="font-bold">3000</strong> parole 🇮🇹 con cui giocare.</p>
        </FullScreenModal>
    )
}