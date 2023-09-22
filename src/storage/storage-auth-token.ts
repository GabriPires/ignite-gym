import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_TOKEN_STORAGE } from './storage-config'

export async function storageSaveAuthToken(token: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token)
}

export async function storageGetAuthToken() {
  return await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)
}
