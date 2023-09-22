import { ReactNode, createContext, useContext } from 'react'

interface AuthContextProps {
  id: string
  name: string
  email: string
  avatar: string
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContext.Provider
      value={{
        id: '1',
        name: 'Gabriel Pires',
        email: 'gabriel@email.com',
        avatar: 'https://github.com/GabriPires.png',
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
