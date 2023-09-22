import Panel from './Panel'
import Statistics from '../Statistics'

interface StatisticsPanelProps {
    show: boolean
    closePanel: () => void
}

export const StatisticsPanel = ({ show = false, closePanel }: StatisticsPanelProps) => {
    return (
        <Panel 
            show={show}
            onClose={closePanel}
        >
            <div className='flex flex-col gap-y-6'>
                <Statistics hideBorder={true} />
            </div>
        </Panel>
    )
}