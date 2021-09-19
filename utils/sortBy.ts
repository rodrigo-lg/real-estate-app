function sortBy (data: any[], key: string, ascending: boolean) {
    if (ascending) {
        return [...data].sort((a, b) => a[key] > b[key] ? 1 : -1)
    }

    return [...data].sort((a, b) => a[key] > b[key] ? -1 : 1)
}

export { sortBy }
