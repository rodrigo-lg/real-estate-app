function phoneFormatter (phone: string) {
    phone = phone.replace(/\D/g, '')
    phone = phone.replace(/^(\d+)/, '+$1')
    phone = phone.replace(/^([+]\d{2})(\d+)/, '$1 ($2')
    phone = phone.replace(/^([+]\d{2}[\s][(]\d{2})(\d+)/, '$1) $2')
    phone = phone.replace(/^([+]\d{2}[\s][(]\d{2}[)][\s]\d{5})(\d+)/, '$1-$2')

    return phone
}

export { phoneFormatter }
