export interface IBroker {
    key: number
    name: string
    email: string
    int_code: string
    phone: string
    commissions: {
        value: string
        property_code: string
        date: string
    }[]
}
