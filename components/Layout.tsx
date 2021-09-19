import Link from 'next/link'
import { useRouter } from 'next/router'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Heading,
    Text,
    Switch,
    useColorMode
} from '@chakra-ui/react'

const Layout: React.FC = ({ children }) => {
    const router = useRouter()

    const { colorMode, toggleColorMode } = useColorMode()

    const currentPageStyle = {
        textDecoration: 'underline',
    }

    return (
        <>
            <Flex
                as="header"
                bg="blue.600"
                color="gray.50"
                align="center"
                justify="space-between"
                p={4}
                pr={8}
                boxShadow="lg"
            >
                <Flex
                    align="center"
                >
                    <Heading fontSize="3xl">Real Estate App</Heading>

                    <Breadcrumb ml={8} separator="">
                        <BreadcrumbItem
                            style={router.pathname === '/' ? currentPageStyle : {}}
                            isCurrentPage={router.pathname === '/'}
                        >
                            <Link href="/" passHref>
                                <BreadcrumbLink href="#">Home</BreadcrumbLink>
                            </Link>

                        </BreadcrumbItem>

                        <BreadcrumbItem
                            style={router.pathname === '/brokers' ? currentPageStyle : {}}
                            isCurrentPage={router.pathname === '/brokers'}
                        >
                            <Link href="/brokers" passHref>
                                <BreadcrumbLink href="#">Brokers</BreadcrumbLink>
                            </Link>

                        </BreadcrumbItem>

                        <BreadcrumbItem
                            style={router.pathname === '/leads' ? currentPageStyle : {}}
                            isCurrentPage={router.pathname === '/leads'}
                        >
                            <Link href="/leads" passHref>
                                <BreadcrumbLink>Leads</BreadcrumbLink>
                            </Link>

                        </BreadcrumbItem>
                    </Breadcrumb>
                </Flex>

                <Flex
                    align="center"
                >
                    <Text mr={3}>Toggle Mode</Text>
                    <Switch
                        size="lg"
                        colorScheme="purple"
                        isChecked={colorMode === 'dark'}
                        onChange={toggleColorMode}
                    />
                </Flex>
            </Flex>

            {children}
        </>
    )
}

export default Layout
