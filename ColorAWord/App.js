import React, { Component } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { StatusBar } from 'react-native'
import SplashScreen from './src/SplashScreen'
import HomeScreen from './src/HomeScreen'
import ColorGridScreen from './src/ColorGridScreen'

const Stack = createStackNavigator()

export default class App extends Component {
  createHomeStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ColorGrid"
        component={ColorGridScreen}
        options={{
          title: '',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );

  render() {
    return (
      <NavigationContainer>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        {this.createHomeStack()}
      </NavigationContainer>
    )
  }
}
