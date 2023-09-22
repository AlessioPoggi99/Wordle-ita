import { useModalStore } from "../hooks/useStore"
import FullScreenModal from "./FullScreenModal"

export default function MultiplayerModal({ show = false }: {show: boolean}) {
    const modalStore = useModalStore()

    //const friendsList = [{ name: "Marco", status: "Ultimo accesso 4h fa"}, { name: "Luca", status: "online"}, { name: "Andrea", status: "online"}]
    //const searchList = [{ name: "Giorgio", status: "online"}]

    return (
        <FullScreenModal show={show} title="Multiplayer" onClose={() => modalStore.toggleMultiplayerModal(false)}>
            <p className="w-full text-center px-8">A breve verrà aggiunta la possibilità di sfidare i propri amici in sfide a punti al meglio dei 3 o al meglio dei 5</p>
            {/*
            <section>
                <input 
                    type="text"
                    placeholder="ID o Username"
                    className="bg-black/10 dark:bg-white/10 rounded-full placeholder:text-sm placeholder:italic px-4 py-1 w-full">
                </input>
                <p className="text-sm border-b border-zinc-400 dark:border-zinc-600 my-4">Risultati ricerca</p>
                <div className="flex flex-col gap-y-2">
                    {searchList.length == 0 ? <p>Cerca i tuoi amici con il loro ID o Username</p> :
                    searchList.sort(u => (u.status == 'online') ? -1 : 1).map((user, index) => (
                        <div key={index} className="flex justify-between bg-black/10 dark:bg-white/10 py-2 rounded px-2">
                            <div className="flex items-center gap-x-2">
                                <StatusIcon status={user.status} />
                                <p className="font-bold">{user.name}</p>
                                <p className="text-xs">({user.status})</p>
                            </div>
                            <AddUserIcon />
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <p className="text-sm border-b border-zinc-400 dark:border-zinc-600 my-4">Elenco amici</p>
                <div className="flex flex-col gap-y-2">
                    {friendsList.length == 0 ? <p>Aggiungi degli amici per visualizzarli qui</p> :
                    friendsList.sort(f => (f.status == 'online') ? -1 : 1).map((friend, index) => (
                        <div key={index} className="flex justify-between bg-black/10 dark:bg-white/10 py-2 rounded px-2">
                            <div className="flex items-center gap-x-2">
                                <StatusIcon status={friend.status} />
                                <p className="font-bold">{friend.name}</p>
                                <p className="text-xs">({friend.status})</p>
                            </div>
                            {friend.status == 'online' && <ChallengeIcon />}
                        </div>
                    ))}
                </div>
            </section>
            */}
        </FullScreenModal>
    )
}


/* ICONS */
/*
const StatusIcon = ({ status }: { status: string }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512"
            className={`${status == 'online' ? 'fill-[#6aaa64] dark:fill-[#538d4e]' : 'fill-[rgb(82,82,91)]'} w-2 h-2`}
        >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>
        </svg>
    )
}

const ChallengeIcon = () => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 stroke-[#6aaa64] dark:stroke-[#538d4e] mt-0.5"
        >
            <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/>
            <line x1="13" x2="19" y1="19" y2="13"/>
            <line x1="16" x2="20" y1="16" y2="20"/>
            <line x1="19" x2="21" y1="21" y2="19"/>
            <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/>
            <line x1="5" x2="9" y1="14" y2="18"/>
            <line x1="7" x2="4" y1="17" y2="20"/>
            <line x1="3" x2="5" y1="19" y2="21"/>
        </svg>
    )
}

const AddUserIcon = () => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            fill="white"
            className="w-5 h-5 mt-0.5"
        >
            <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
        </svg>
    )
}
*/