import { IBroker } from './IBroker'

export interface IParsedBroker extends IBroker {
    phoneFormatted: string
    commissionsValue: number
    numberOfLeads: number
}
