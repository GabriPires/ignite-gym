import { UserDTO } from '@dtos/UserDTO'
import { api } from '@services/api'
import { storageSaveAuthToken } from '@storage/storage-auth-token'
import {
  storageGetUser,
  storageRemoveUser,
  storageSaveUser,
} from '@storage/storage-user'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

interface AuthContextProps {
  user: UserDTO
  isLoadingUserStorageData: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function storageUserAndToken(userData: UserDTO, token: string) {
    try {
      setIsLoadingUserStorageData(true)

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      await storageSaveUser(userData)
      await storageSaveAuthToken(token)
      setUser(userData)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signIn(email: string, password: string) {
    const { data } = await api.post('/sessions', {
      email,
      password,
    })

    if (data.user && data.token) {
      await storageUserAndToken(data.user, data.token)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await storageRemoveUser()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function loadUserData() {
    try {
      const user = await storageGetUser()

      if (user) {
        setUser(user)
        setIsLoadingUserStorageData(false)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingUserStorageData,
        signIn,
        signOut,
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
