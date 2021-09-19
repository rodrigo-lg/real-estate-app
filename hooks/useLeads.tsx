import { useContext, useMemo } from 'react'

import { LeadsContext } from '../contexts/LeadsContext'

import { phoneFormatter } from '../utils/phoneFormatter'

import { IParsedLead } from '../types/IParsedLead'

function useLeads () {
    const { leads } = useContext(LeadsContext)

    const parsedLeads = useMemo<IParsedLead[] | undefined>(() => {
        if (leads) {
            return leads.map(lead => ({
                ...lead,
                phoneFormatted: phoneFormatter(lead.int_code + lead.phone),
            })) as IParsedLead[]
        }
    }, [leads])

    return parsedLeads
}

export { useLeads }
