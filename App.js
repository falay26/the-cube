import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import MainScreen from './screens/MainScreen'
import LevelsScreen from './screens/LevelsScreen'
import LevelScreen from './screens/LevelScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { levelsconstants } from './constants/levelsconstants'

import asyncSave from './customFunctions/asyncSave'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="Levels"
        component={LevelsScreen}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="Level"
        component={LevelScreen}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  /*
  useEffect(() => {
    asyncSave.read().then((data) => {
      for (let i = 0; i < data.length; i++) {
        levelsconstants[i] = data[i]
      }
    })
  })
  */
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}