import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Flex } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Cards} from './components/cards.js';
import { NativeBaseProvider, Box, Center } from "native-base";
import { FlatList } from 'react-native';
import { BottomTabUser } from './components/bottomTabUser.js';


export default function OrderUser () {

    function truncateText(text, maxLength) {
      if (text.length > maxLength) {
         return text.substring(0, maxLength) ;
       }
       return text;
    }
  
    const [item, searchItem] = useState('');
  
    const search = (newText) => {
      newText = truncateText(newText, 10);
      searchItem(newText);
    };
  
    const cardData = [
      { id: '1', imageUrl: require('./jiitcafeassests/Indian-samosa-chutney.webp'), dishName: 'Samosa', coinCount: '10' },
      { id: '2', imageUrl: require('./jiitcafeassests/pasta.png'), dishName: 'Pasta', coinCount: '20' },
      { id: '3', imageUrl: require('./jiitcafeassests/patties.png'), dishName: 'Patty', coinCount: '10' },
      // Add more card data as needed
    ];
  
    const renderCard = ({ item }) => (
      <Cards imageUrl={item.imageUrl} keyExtractor={item.id} dishName={item.dishName} coinCount={item.coinCount} />
    );
  
      
      return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior='height'
        keyboardShouldPersistTaps='always' // This should handle taps outside TextInput
        keyboardVerticalOffset={-500}
        >
        
        <SafeAreaView style={styles.container} keyboardShouldPersistTaps='always'>
        <SafeAreaView style={styles.curvedLine}/>
        <Image
            source={require('./imgs/jcafelogo1-removebg-preview.png')} 
            style={{ width: 60, height: 60, position:'absolute', top: 60, left: 30 }} // Adjust the dimensions as needed
        />
        
          <Text style={{fontSize: 19, fontWeight: 'bold', position:'absolute', textAlign: 'left', left:100 ,top:75, color: 'black'}}>
            JIIT CAFE</Text>
  
            <View style={[styles.fields, {bottom:311, right:85, width: 100, height: 50, backgroundColor: 'white', borderColor:'black', borderWidth: 1, flexDirection: 'row'}]} overflow = 'hidden' >
            <Image
            source={require('./jiitcafeassests/jcoins.png')} 
            style={{ width: 33, height: 33,  }} // Adjust the dimensions as needed
            />
            <Text style={{fontSize:20, }} >100</Text>
            </View>
  
  
            <Image
            source={require('./jiitcafeassests/account.png')} 
            style={{ width: 45, height: 45, position:'absolute', top: 60, right: 25 }} // Adjust the dimensions as needed
            />

            <Image
            source={require('./jiitcafeassests/noorders.png')} 
            style={{ width: 350, height: 350, position:'absolute', top: 140, right: 35 }} // Adjust the dimensions as needed
            />

            <Text style={{fontSize:20, fontWeight:'600'  , top:320 }}>No Orders Found</Text>
            <Text style={{fontSize:16, fontWeight:'300', padding:10,  textAlign:'center'  , top:320 }}>Looks like you haven't ordered anything yet</Text>
  
            <StatusBar style="auto" />
  
         </SafeAreaView>
  
         <NativeBaseProvider>
            <BottomTabUser focussedIndex={1} />
         </NativeBaseProvider>
  
      </KeyboardAvoidingView>
      
      
    );
  }

  const styles = StyleSheet.create({

    container: {
      flex: 1,
      alignItems: 'center', // Center horizontally
      justifyContent: 'center', // Center vertically
    },
  
    curvedLine: {
      position: 'absolute',
      top: 50,
      width: '89%',
      height: '3%',
      borderTopWidth: 2.5,
      borderRightWidth: 0.1,
      borderLeftWidth: 0.1,
      borderRadius: 20,
      borderTopColor: 'black',
      borderRightColor: 'white',
      borderLeftColor: 'white',
    },
  
    
      roundedBox: {
        position: 'absolute', // Change the position to absolute
        bottom: 230,
        width: 350, // Adjust the width as needed
        height: 300, // Adjust the height as needed
        backgroundColor: 'aqua', // Background color of the box
        borderRadius: 30, // Adjust the borderRadius to control the roundness
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
  
    fields: {
      position: 'absolute', // Change the position to absolute
      bottom: 380,
      right: 30,
      width: 250, // Adjust the width as needed
      height: 40, // Adjust the height as needed
      backgroundColor: 'black', // Background color of the box
      borderRadius: 30, // Adjust the borderRadius to control the roundness
      justifyContent: 'center', // Center content vertically
      alignItems: 'center', // Center content horizontally
    },
  
    input: {
      width: 300,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      padding: 10,
    },
  
  
  });