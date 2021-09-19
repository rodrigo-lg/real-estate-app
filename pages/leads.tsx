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
    Button,
    useDisclosure,
    Link,
    Tooltip
} from '@chakra-ui/react'
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'

import LeadModal from '../components/LeadModal'

import { useLeads } from '../hooks/useLeads'

import { phoneFormatter } from '../utils/phoneFormatter'
import { sortBy } from '../utils/sortBy'

import { IParsedLead } from '../types/IParsedLead'

const Leads: NextPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const leads = useLeads()

    const [nameFilter, setNameFilter] = useState('')
    const [phoneFilter, setPhoneFilter] = useState('')
    const filteredLeads = useMemo(() => {
        const leadsFilteredByName = leads?.filter(
            lead => nameFilter ? lead.name.toLowerCase().startsWith(nameFilter.toLocaleLowerCase()) : leads
        )

        const leadsFilteredByPhone = leadsFilteredByName?.filter(
            lead => phoneFilter ? lead.phoneFormatted.startsWith(phoneFilter) : leadsFilteredByName
        )

        return leadsFilteredByPhone
    }, [leads, nameFilter, phoneFilter])

    function handleNameFilter (event: React.ChangeEvent<HTMLInputElement>) {
        setNameFilter(event.target.value)
    }

    function handlePhoneFilter (event: React.ChangeEvent<HTMLInputElement>) {
        event.currentTarget.maxLength = 19

        setPhoneFilter(phoneFormatter(event.currentTarget.value))
    }

    const [sortedBy, setSortedBy] = useState('name')
    const [ascendingOrder, setAscendingOrder] = useState(true)
    const sortedLeads = useMemo(() => {
        if (filteredLeads) {
            const sortedData = sortBy(filteredLeads, sortedBy, ascendingOrder) as IParsedLead[]

            return sortedData
        }
    }, [filteredLeads, sortedBy, ascendingOrder])

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

    const [selectedLead, setSelectedLead] = useState<IParsedLead | null>(null)

    function handleSelectLead (lead: IParsedLead) {
        setSelectedLead(lead)

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
                    <Heading mb={10}>Leads</Heading>

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

                    {!sortedLeads && (
                        <VStack spacing="5px" w="50%">
                            <Skeleton duration={1.2} height="40px" width="100%" />
                            <Skeleton duration={1.2} height="50px" width="100%" />
                            <Skeleton duration={1.2} height="50px" width="100%" />
                            <Skeleton duration={1.2} height="50px" width="100%" />
                            <Skeleton duration={1.2} height="50px" width="100%" />
                            <Skeleton duration={1.2} height="50px" width="100%" />
                        </VStack>
                    )}

                    {sortedLeads && (
                        <>
                            <Text mb={3}>Sort data by name by clicking on the respective column name.</Text>

                            <Table minWidth="730px" w="50%" variant="simple" mb={20}>
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
                                        <Th>E-mail</Th>
                                        <Th>Phone</Th>
                                        <Th />
                                    </Tr>
                                </Thead>
                                <Tbody maxHeight="200px" overflowY="scroll">
                                    {sortedLeads.map(lead => (
                                        <Tr key={lead.key}>
                                            <Td pl={10}>{lead.name}</Td>
                                            <Td>{lead.email}</Td>
                                            <Td>
                                                <Link
                                                    href={`https://wa.me/${lead.int_code + lead.phone}`}
                                                    isExternal
                                                    color="blue.400"
                                                >
                                                    {lead.phoneFormatted}
                                                </Link>
                                            </Td>
                                            <Td onClick={() => handleSelectLead(lead)}>
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

            <LeadModal lead={selectedLead} isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default Leads
