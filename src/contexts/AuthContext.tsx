import { UserDTO } from '@dtos/UserDTO'
import { ReactNode, createContext, useContext } from 'react'

interface AuthContextProps {
  user: UserDTO
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: '1',
          name: 'Gabriel Pires',
          email: 'gabriel@email.com',
          avatar: 'https://github.com/GabriPires.png',
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthContextProvider')
  }
  return context
}
