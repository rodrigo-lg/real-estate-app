import { NextPage } from 'next'
import React, { useState, useMemo } from 'react'
import {
    SlideFade,
    Heading,
    Flex,
    Input,
    VStack,
    Skeleton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Text,
    Tooltip,
    useDisclosure,
    Button,
    Link
} from '@chakra-ui/react'
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'

import BrokerModal from '../components/BrokerModal'

import { useBrokers } from '../hooks/useBrokers'

import { currencyFormatter } from '../utils/currencyFormatter'
import { phoneFormatter } from '../utils/phoneFormatter'
import { sortBy } from '../utils/sortBy'

import { IParsedBroker } from '../types/IParsedBroker'

const Brokers: NextPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const brokers = useBrokers()

    const [nameFilter, setNameFilter] = useState('')
    const [phoneFilter, setPhoneFilter] = useState('')
    const filteredBrokers = useMemo(() => {
        const brokersFilteredByName = brokers?.filter(
            broker => nameFilter ? broker.name.toLowerCase().startsWith(nameFilter.toLocaleLowerCase()) : brokers
        )

        const brokersFilteredByPhone = brokersFilteredByName?.filter(
            broker => phoneFilter ? broker.phoneFormatted.startsWith(phoneFilter) : brokersFilteredByName
        )

        return brokersFilteredByPhone
    }, [brokers, nameFilter, phoneFilter])

    function handleNameFilter (event: React.ChangeEvent<HTMLInputElement>) {
        setNameFilter(event.target.value)
    }

    function handlePhoneFilter (event: React.ChangeEvent<HTMLInputElement>) {
        event.currentTarget.maxLength = 19

        setPhoneFilter(phoneFormatter(event.currentTarget.value))
    }

    const [sortedBy, setSortedBy] = useState('name')
    const [ascendingOrder, setAscendingOrder] = useState(true)
    const sortedBrokers = useMemo(() => {
        if (filteredBrokers) {
            const sortedData = sortBy(filteredBrokers, sortedBy, ascendingOrder)

            return sortedData
        }
    }, [filteredBrokers, sortedBy, ascendingOrder])

    function handleSort(key: string) {
        if (key === sortedBy) {
            setAscendingOrder(previousValue => !previousValue)
        } else {
            setSortedBy(key)
            setAscendingOrder(true)
        }
    }

    function sortingIcon (key: string) {
        if (key === sortedBy) {
            if (ascendingOrder) {
                return <ArrowDownIcon w={4} h={4} mr={2} />
            }

            return <ArrowUpIcon w={4} h={4} mr={2} />
        }

        return <Box p={2} mr={2} display="inline" />
    }

    const [selectedBroker, setSelectedBroker] = useState<IParsedBroker | null>(null)

    function handleSelectBroker (broker: IParsedBroker) {
        setSelectedBroker(broker)

        onOpen()
    }

    return (
        <>
            <SlideFade
                in={true}
                offsetY="30px"
                delay={0.2}
                transition={{ enter: { duration: 0.5 } }}
            >
                <Flex
                    mt="60px"
                    justify="center"
                    align="center"
                    direction="column"
                >
                    <Heading mb={10}>Brokers</Heading>

                    <Flex
                        justify="space-between"
                        mb="30px"
                        w="40%"
                    >
                        <Flex direction="column" mr="80px" w="100%">
                            <Text mb={1}>Filter by name:</Text>
                            <Input
                                value={nameFilter}
                                onChange={handleNameFilter}
                                placeholder="Name"
                            />
                        </Flex>
                        <Flex direction="column" w="100%">
                            <Text mb={1}>Filter by phone number:</Text>
                            <Input
                                value={phoneFilter}
                                onChange={handlePhoneFilter}
                                placeholder="Phone"
                            />
                        </Flex>
                    </Flex>

                    {!sortedBrokers && (
                        <VStack spacing="5px" w="50%">
                            <Skeleton duration={1.2} height="40px" width="100%" />
                            <Skeleton duration={1.2} height="50px" width="100%" />
                            <Skeleton duration={1.2} height="50px" width="100%" />
                            <Skeleton duration={1.2} height="50px" width="100%" />
                            <Skeleton duration={1.2} height="50px" width="100%" />
                            <Skeleton duration={1.2} height="50px" width="100%" />
                        </VStack>
                    )}

                    {sortedBrokers && (
                        <>
                            <Text mb={3}>Sort data by name, commissions or number of leads by clicking on the respective column name.</Text>

                            <Table minWidth="860px" w="50%" variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th
                                            cursor="pointer"
                                            onClick={() => handleSort('name')}
                                        >
                                            {sortingIcon('name')}
                                            <Tooltip label="Sort by name" placement="top-end">
                                                Name
                                            </Tooltip>
                                        </Th>
                                        <Th>Phone</Th>
                                        <Th
                                            cursor="pointer"
                                            onClick={() => handleSort('commissionsValue')}
                                            isNumeric
                                        >
                                            {sortingIcon('commissionsValue')}
                                            <Tooltip label="Sort by commissions" placement="top-end">
                                                Commissions
                                            </Tooltip>
                                        </Th>
                                        <Th
                                            cursor="pointer"
                                            onClick={() => handleSort('numberOfLeads')}
                                            isNumeric
                                        >
                                            <Text whiteSpace="nowrap">
                                                {sortingIcon('numberOfLeads')}
                                                <Tooltip label="Sort by number of leads" placement="top-end">
                                                    Number of leads
                                                </Tooltip>
                                            </Text>

                                        </Th>
                                        <Th />
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {sortedBrokers.map(broker => (
                                        <Tr key={broker.key}>
                                            <Td pl={10}>{broker.name}</Td>
                                            <Td>
                                                <Link
                                                    href={`https://wa.me/${broker.int_code + broker.phone}`}
                                                    isExternal
                                                    color="blue.400"
                                                >
                                                    {broker.phoneFormatted}
                                                </Link>
                                            </Td>
                                            <Td pl={10} isNumeric>{currencyFormatter(broker.commissionsValue)}</Td>
                                            <Td pl={10} isNumeric>{broker.numberOfLeads}</Td>
                                            <Td onClick={() => handleSelectBroker(broker)}>
                                                <Button><Text whiteSpace="nowrap">View details</Text></Button>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </>
                    )}
                </Flex>
            </SlideFade>

            <BrokerModal broker={selectedBroker} isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default Brokers
