import { useContext, useMemo } from 'react'

import { BrokersContext } from '../contexts/BrokersContext'
import { LeadsContext } from '../contexts/LeadsContext'

import { phoneFormatter } from '../utils/phoneFormatter'

import { IParsedBroker } from '../types/IParsedBroker'

function useBrokers () {
    const { brokers } = useContext(BrokersContext)
    const { leads } = useContext(LeadsContext)

    const parsedBrokers = useMemo<IParsedBroker[] | undefined>(() => {
        if (brokers) {
            return brokers.map(broker => ({
                ...broker,
                phoneFormatted: phoneFormatter(broker.int_code + broker.phone),
                commissionsValue: broker.commissions.reduce((acc, cur) => acc + Number(cur.value), 0),
                numberOfLeads: leads?.filter(lead => lead.broker_key === broker.key).length
            })) as IParsedBroker[]
        }
    }, [brokers, leads])

    return parsedBrokers
}

export { useBrokers }
