import { createContext } from 'react'
import { useFetch } from '../hooks/useFetch'

import { ILead } from '../types/ILead'

interface ILeadsContext {
    leads: ILead[] | undefined
}

const LeadsContext = createContext<ILeadsContext>({} as ILeadsContext)

const LeadsProvider: React.FC = ({ children }) => {
    const { data: leads } = useFetch<ILead[]>(`${process.env.NEXT_PUBLIC_API_URL}/leads/list`)

    return (
        <LeadsContext.Provider
            value={{ leads }}
        >
            {children}
        </LeadsContext.Provider>
    )
}

export { LeadsContext, LeadsProvider }
