import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { BrokersProvider } from '../contexts/BrokersContext'
import { LeadsProvider } from '../contexts/LeadsContext'

import Layout from '../components/Layout'

import theme from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <BrokersProvider>
                <LeadsProvider>
                    <Layout>
                        <Head>
                            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></meta>
                        </Head>
                        <Component {...pageProps} />
                    </Layout>
                </LeadsProvider>
            </BrokersProvider>
        </ChakraProvider>
    )
}
export default MyApp
