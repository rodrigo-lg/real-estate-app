import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { Button, Flex, Heading, SlideFade } from '@chakra-ui/react';

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Real Estate App</title>
            </Head>

            <SlideFade
                in={true}
                offsetY="30px"
                delay={0.2}
                transition={{ enter: { duration: 0.5 } }}
            >
                <Flex
                    as="main"
                    mt="150px"
                    direction="column"
                    align="center"
                >
                    <Heading mb={2} as="h1">Welcome to the Real Estate App!</Heading>

                    <Heading mb={8} fontSize="2xl" as="h2">What are you looking for?</Heading>

                    <Flex w={250} justify="space-between">
                        <Link href="/brokers" passHref>
                            <Button
                                w={100}
                                bg="blue.600"
                                color="gray.50"
                                boxShadow="lg"
                                _hover={{
                                    bg: "blue.500",
                                    color: "gray.100"
                                }}
                            >
                            Brokers
                            </Button>
                        </Link>
                        <Link href="/leads" passHref>
                            <Button
                                w={100}
                                bg="blue.600"
                                color="gray.50"
                                boxShadow="lg"
                                _hover={{
                                    bg: "blue.500",
                                    color: "gray.100"
                                }}
                            >
                            Leads
                            </Button>
                        </Link>
                    </Flex>
                </Flex>
            </SlideFade>
        </div>
    )
}

export default Home
