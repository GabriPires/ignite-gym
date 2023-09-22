import { UserDTO } from '@dtos/UserDTO'
import { ReactNode, createContext, useContext, useState } from 'react'

interface AuthContextProps {
  user: UserDTO
  signIn: (email: string, password: string) => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({
    id: '1',
    name: 'Gabriel Pires',
    email: 'gabriel@email.com',
    avatar: 'https://github.com/GabriPires.png',
  })

  function signIn(email: string, password: string) {
    setUser({
      id: '1',
      name: 'Gabriel Pires',
      email,
      avatar: '',
    })
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
