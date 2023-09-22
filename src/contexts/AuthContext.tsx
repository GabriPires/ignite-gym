import { UserDTO } from '@dtos/UserDTO'
import { api } from '@services/api'
import { useToast } from 'native-base'
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
  const { show } = useToast()

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', {
        email,
        password,
      })

      if (data.user) {
        setUser(data.user)
      }
    } catch (error) {
      show({
        title: 'Erro ao realizar login',
        description: 'Verifique suas credenciais e tente novamente',
        bgColor: 'red.500',
      })
    }
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
