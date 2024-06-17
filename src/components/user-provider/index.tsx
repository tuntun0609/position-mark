'use client'

import { createContext, ReactNode, useContext } from 'react'

type User = any

export const UserContext = createContext<User>(null)

export const useCurrentUserUser = () => {
  const user = useContext(UserContext)
  if (user === undefined) {
    throw new Error('useUser must be used within a UserContext')
  }
  return user
}

export const UserProvider = ({
  children,
  user,
}: {
  children: ReactNode
  user: User | null
}) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
