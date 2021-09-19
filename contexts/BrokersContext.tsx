import { createContext } from 'react'
import { useFetch } from '../hooks/useFetch'

import { IBroker } from '../types/IBroker'

interface IBrokersContext {
    brokers: IBroker[] | undefined
}

const BrokersContext = createContext<IBrokersContext>({} as IBrokersContext)

const BrokersProvider: React.FC = ({ children }) => {
    const { data: brokers } = useFetch<IBroker[]>(`${process.env.NEXT_PUBLIC_API_URL}/brokers/list`)

    return (
        <BrokersContext.Provider
            value={{ brokers }}
        >
            {children}
        </BrokersContext.Provider>
    )
}

export { BrokersContext, BrokersProvider }
