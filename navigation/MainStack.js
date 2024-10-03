import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/Ionicons'

import Onboarding from '../screens/Onboarding'
import Favorites from '../screens/Favorites'
import Discover from '../screens/Discover'
import Details from '../screens/Details'

import { colors, sizes } from '../lib/styles'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const tabOptions = ({ route }) => ({
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.neutral,
  tabBarIcon: ({ focused, color }) => {
    let iconName
    if (route.name === 'Home') {
      if (focused) {
        iconName = 'home'
      } else {
        iconName = 'home-outline'
      }
    }
    if (route.name === 'Discover') {
      if (focused) {
        iconName = 'compass'
      } else {
        iconName = 'compass-outline'
      }
    }
    if (route.name === 'Favorites') {
      if (focused) {
        iconName = 'heart'
      } else {
        iconName = 'heart-outline'
      }
    }
    return <Icon name={iconName} size={20} color={color} />
  }
})

const stackOptions = ({ route, navigation }) => ({
  title: route.params?.name,
  headerBackVisible: false,
  headerLeft: ({ canGoBack }) => {
    if (!canGoBack) {
      return null
    }

    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back" size={sizes.xxl} color={colors.black} />
      </TouchableOpacity>
    )
  }
})

function Main() {
  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Favorites" component={Favorites} options={{ headerShown: false }}/>
    </Tab.Navigator>
  )
}

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={stackOptions}>
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Details" component={Details} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 5
  },
})


