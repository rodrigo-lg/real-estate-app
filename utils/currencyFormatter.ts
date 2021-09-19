function currencyFormatter (valueInCents: number) {
    return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valueInCents)
}

export { currencyFormatter }
