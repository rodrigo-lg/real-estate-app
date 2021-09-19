import useSWR from 'swr'

function fetcher (url: string) {
    return fetch(url).then(response => response.json())
}

function useFetch<T = any>(url: string) {
    const { data, error } = useSWR<T>(url, fetcher)

    return { data, error }
}

export { useFetch }
