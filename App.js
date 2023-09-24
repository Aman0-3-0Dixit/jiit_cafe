import * as React from 'react';
import{useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import signupPage from './signup.js';
import loginPage from './login.js'; 
import foodPage from './food.js';
import { AppRegistry } from 'react-native';


AppRegistry.registerComponent('main', () => App);  // a crucial addition in the project to expicitly define app registration when other dependecies was interfering in the automatic registration of the app component in the expo build AppEntry.js file

const Stack = createStackNavigator();

const App = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="signup">
        <Stack.Screen name="signup" options={{ headerShown: false }} component={signupPage} />
        <Stack.Screen name="login" options={{ headerShown: false }} component={loginPage} />
        <Stack.Screen name="food" options={{ headerShown: false }} component={foodPage} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default App;