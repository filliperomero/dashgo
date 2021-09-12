import { useQuery } from "react-query"

import { api } from "services/api"

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get('users')

  return data.users.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }))
}

export const useUsers = () => {
  return useQuery('users', getUsers, {
    staleTime: 1000 * 5, // The data will remain fresh for 5 seconds. Which means, if you change screen and go back within 5 seconds, react query will not get new data
  })
}