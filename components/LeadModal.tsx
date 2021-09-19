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

import { IParsedLead } from '../types/IParsedLead'

interface ILeadModalProps {
    lead: IParsedLead | null
    isOpen: boolean
    onClose: () => void
}

const LeadModal: React.FC<ILeadModalProps> = ({ lead, isOpen, onClose }) => {
    return (
        <Modal
            blockScrollOnMount={true}
            isOpen={isOpen}
            onClose={onClose}
            size="xl"
        >
            <ModalOverlay />
            {lead && (
                <ModalContent>
                    <ModalHeader>{lead.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex justify="space-between">
                            <Text>E-mail:
                                {' '}
                                <Link
                                    href={`mailto:${lead.email}`}
                                    color="blue.400"
                                >
                                    {lead.email}
                                </Link>
                            </Text>
                            <Text>Phone:
                                {' '}
                                <Link
                                    href={`https://wa.me/${lead.int_code + lead.phone}`}
                                    isExternal
                                    color="blue.400"
                                >
                                    {lead.phoneFormatted}
                                </Link>
                            </Text>
                        </Flex>
                        <Heading size="md" textAlign="center" mt={8} mb={4}>Interests</Heading>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Code</Th>
                                    <Th>Title</Th>
                                    <Th>Type</Th>
                                    <Th isNumeric>Sale price</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {lead.interests.map(interest => (
                                    <Tr key={interest.code}>
                                        <Td>{interest.code}</Td>
                                        <Td>{interest.title}</Td>
                                        <Td>{interest.type}</Td>
                                        <Td isNumeric>{currencyFormatter(Number(interest.sale_price))}</Td>
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

export default LeadModal
