import * as React from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import signupPage from './signup.js';
import loginPage from './login.js'; 
import foodPage from './food.js';
import orderPage from './orders.js';
import walletPage from './wallet.js';
import cartPage from './cart.js';
import { AppRegistry } from 'react-native';
import { NativeBaseProvider, Text, Box } from "native-base";
import { SelectedItemsProvider } from './SelectedItemsContext.js';


AppRegistry.registerComponent('main', () => App);  // a crucial addition in the project to expicitly define app registration when other dependecies was interfering in the automatic registration of the app component in the expo build AppEntry.js file

const Stack = createStackNavigator();

const App = () => {

  const handleCartChange = (updatedItems) => {
    // Update the state or perform any other actions in the food page
    // This function will be called whenever the cart is updated
    console.log('Cart has been updated in the food page:', updatedItems);
  };

  return (

    <NativeBaseProvider>
      <SelectedItemsProvider onCartChange={handleCartChange}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="signup">
        <Stack.Screen name="signup" options={{ headerShown: false }} component={signupPage} />
        <Stack.Screen name="login" options={{ headerShown: false }} component={loginPage} />
        <Stack.Screen name="food" options={{ headerShown: false }} component={foodPage} />
        <Stack.Screen name="cart" options={{ headerShown: false }} component={cartPage}/>
        <Stack.Screen name="orders" options={{ headerShown: false }} component={orderPage}/>
        <Stack.Screen name="wallet" options={{ headerShown: false }} component={walletPage}/>
      </Stack.Navigator>
    </NavigationContainer>
    </SelectedItemsProvider>
    </NativeBaseProvider>
    
  );
};

export default App;