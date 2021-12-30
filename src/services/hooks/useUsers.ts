import { useQuery, UseQueryOptions, UseQueryResult } from "react-query"

import { api } from "services/api"

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

type GetUsersResponse = {
  users: User[];
  totalCount: number;
}

export const getUsers = async (page: number): Promise<GetUsersResponse> => {
  const { data, headers } = await api.get('users', {
    params: {
      page
    }
  })

  const totalCount = Number(headers['x-total-count'])

  const users = data.users.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }))

  return {
    users,
    totalCount
  }
}

export const useUsers = (page: number, options: UseQueryOptions) => {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // The data will remain fresh for 10 minutes. Which means, if you change screen and go back within 10 minutes, react query will not get new data
    ...options
  }) as UseQueryResult<GetUsersResponse, unknown>
}