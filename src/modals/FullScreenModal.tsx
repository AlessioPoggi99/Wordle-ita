export default function FullScreenModal({ children, show }: { children: React.ReactNode | React.ReactNode[], show: boolean }) {
    return (
        show && <div className={`absolute h-[100svh] w-full bg-[#242424] top-0 left-0 ${show ? 'animate-slidein' : 'animate-slideout'}`}>
            {children}
        </div>
    )
}