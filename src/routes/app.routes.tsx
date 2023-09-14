import HistoryIcon from '@assets/history.svg'
import HomeIcon from '@assets/home.svg'
import ProfileIcon from '@assets/profile.svg'
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { Exercise } from '@screens/Exercise'
import { History } from '@screens/History'
import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'
import { useTheme } from 'native-base'

type AppRoutes = {
  home: undefined
  exercise: undefined
  history: undefined
  profile: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Screen, Navigator } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { sizes, colors } = useTheme()

  const iconSize = sizes[6]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeIcon fill={color} height={iconSize} width={iconSize} />
          ),
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistoryIcon fill={color} height={iconSize} width={iconSize} />
          ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileIcon fill={color} height={iconSize} width={iconSize} />
          ),
        }}
      />
      <Screen name="exercise" component={Exercise} />
    </Navigator>
  )
}
