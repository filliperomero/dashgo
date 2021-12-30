import { useState } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue, Spinner, Link as ChakraLink } from '@chakra-ui/react'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'

import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Pagination from '../../components/Pagination'

import { useUsers, User } from 'services/hooks/useUsers'
import { queryClient } from 'services/queryClient'
import { api } from 'services/api'

type UserListProps = {
  users: User[]
}

const UserList = ({ users }: UserListProps) => {
  const [page, setpage] = useState(1)
  const { data, isLoading, isFetching, error } = useUsers(page, {
    initialData: users
  })

  const isWideVersion = useBreakpointValue({ base: false, lg: true })

  const handlePrefetchUser = async (userId: string) => {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)

      return response.data
    }, {
      staleTime: 1000 * 60 * 10, // 10 minutes
    })
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="5" />}
            </Heading>

            <Link href="/users/create" passHref>
              <Button as="a" size="sm" fontSize="sm" colorScheme="pink" leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
                Criar novo
              </Button>
            </Link>
          </Flex>

          { isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    { isWideVersion && <Th>Data de cadastro</Th> }
                    { isWideVersion && <Th width="8"></Th> }
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.users.map(user => {
                    return (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <ChakraLink color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                              <Text fontWeight="bold">{user.name}</Text>
                            </ChakraLink>
                            <Text fontSize="sm" color="gray.300">{user.email}</Text>
                          </Box>
                        </Td>
                        { isWideVersion && <Td>{user.createdAt}</Td> }
                        { isWideVersion && (
                          <Td>
                            <Button as="a" size="sm" fontSize="sm" colorScheme="purple" leftIcon={<Icon as={RiPencilLine} fontSize="16" />}>
                              Editar
                            </Button>
                          </Td>
                        )}
                      </Tr>
                    )
                  })}
                  
                </Tbody>
              </Table>

              <Pagination totalCountOfRegisters={data?.totalCount || 0} currentPage={page} onPageChange={setpage} />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default UserList

// If you want to implement ServerSide rendering.
// export const getServerSideProps: GetServerSideProps = async () => {
//   const { users, totalCount} = await getUsers(1)

//   return {
//     props: {
//       users
//     }
//   }
// }