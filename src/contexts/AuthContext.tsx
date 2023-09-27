import { UserDTO } from '@dtos/UserDTO'
import { api } from '@services/api'
import {
  storageGetAuthToken,
  storageRemoveAuthToken,
  storageSaveAuthToken,
} from '@storage/storage-auth-token'
import {
  storageGetUser,
  storageRemoveUser,
  storageSaveUser,
} from '@storage/storage-user'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

interface AuthContextProps {
  user: UserDTO
  isLoadingUserStorageData: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateUserProfile: (user: UserDTO) => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function updateUserAndToken(userData: UserDTO, token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    setUser(userData)
  }

  async function saveUserAndTokenOnStorage(
    userData: UserDTO,
    token: string,
    refresh_token: string,
  ) {
    try {
      await storageSaveUser(userData)
      await storageSaveAuthToken({ token, refresh_token })
    } catch (error) {
      throw error
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', {
        email,
        password,
      })

      if (data.user && data.token) {
        setIsLoadingUserStorageData(true)

        await saveUserAndTokenOnStorage(
          data.user,
          data.token,
          data.refresh_token,
        )
        await updateUserAndToken(data.user, data.token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  const signOut = useCallback(async () => {
    try {
      setIsLoadingUserStorageData(true)

      setUser({} as UserDTO)
      await storageRemoveUser()
      await storageRemoveAuthToken()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }, [])

  const loadUserData = useCallback(async () => {
    try {
      setIsLoadingUserStorageData(true)

      const user = await storageGetUser()
      const { token, refresh_token } = await storageGetAuthToken()

      if (token && user && refresh_token) {
        updateUserAndToken(user, token)
        setIsLoadingUserStorageData(false)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }, [])

  async function updateUserProfile(user: UserDTO) {
    try {
      setUser(user)
      await storageSaveUser(user)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    loadUserData()
  }, [loadUserData])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
  }, [signOut])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingUserStorageData,
        signIn,
        signOut,
        updateUserProfile,
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
