import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    ModalBody,
    Flex,
    Text,
    Link,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react'

import { currencyFormatter } from '../utils/currencyFormatter'
import { dateFormatter } from '../utils/dateFormatter'

import { IParsedBroker } from '../types/IParsedBroker'

interface IBrokerModalProps {
    broker: IParsedBroker | null
    isOpen: boolean
    onClose: () => void
}

const BrokerModal: React.FC<IBrokerModalProps> = ({ broker, isOpen, onClose }) => {
    return (
        <Modal
            blockScrollOnMount={true}
            isOpen={isOpen}
            onClose={onClose}
            size="xl"
        >
            <ModalOverlay />
            {broker && (
                <ModalContent>
                    <ModalHeader>{broker.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex justify="space-between">
                            <Text>E-mail:
                                {' '}
                                <Link
                                    href={`mailto:${broker.email}`}
                                    color="blue.400"
                                >
                                    {broker.email}
                                </Link>
                            </Text>
                            <Text>Phone:
                                {' '}
                                <Link
                                    href={`https://wa.me/${broker.int_code + broker.phone}`}
                                    isExternal
                                    color="blue.400"
                                >
                                    {broker.phoneFormatted}
                                </Link>
                            </Text>
                        </Flex>
                        <Heading size="md" textAlign="center" mt={8} mb={4}>Commissions</Heading>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Property Code</Th>
                                    <Th>Date</Th>
                                    <Th isNumeric>Value</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {broker.commissions.map(commission => (
                                    <Tr key={commission.property_code}>
                                        <Td>{commission.property_code}</Td>
                                        <Td>{dateFormatter(commission.date)}</Td>
                                        <Td isNumeric>{currencyFormatter(Number(commission.value))}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </ModalBody>
                </ModalContent>
            )}
        </Modal>
    )
}

export default BrokerModal
