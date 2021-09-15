import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <meta charSet="utf-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></meta>
                <title>Real Estate App</title>
                <meta name="description" content="Real State App to check leads and brokers" />
            </Head>

            <main>
                <h1>
                    Welcome!
                </h1>
            </main>
        </div>
    )
}

export default Home
