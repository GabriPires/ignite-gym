import { UserDTO } from '@dtos/UserDTO'
import { api } from '@services/api'
import { ReactNode, createContext, useContext, useState } from 'react'

interface AuthContextProps {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  async function signIn(email: string, password: string) {
    const { data } = await api.post('/sessions', {
      email,
      password,
    })

    if (data.user) {
      setUser(data.user)
    }

    // try {
    //   const { data } = await api.post('/sessions', {
    //     email,
    //     password,
    //   })

    //   if (data.user) {
    //     setUser(data.user)
    //   }
    // } catch (error) {
    //   throw error
    // }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthContextProvider')
  }
  return context
}
