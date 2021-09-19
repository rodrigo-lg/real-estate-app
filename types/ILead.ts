export interface ILead {
    key: number
    name: string
    email: string
    int_code: string
    phone: string
    created_at: string
    broker_key: number
    interests: {
        code: string
        title: string
        sale_price: string
        type: string
    }[]
}
