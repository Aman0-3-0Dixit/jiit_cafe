import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Food () {

    
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
          style={{ width: 70, height: 70, position:'absolute', top: 60, left: 40 }} // Adjust the dimensions as needed
      />
      
        <Text style={{fontSize: 25, fontWeight: 'bold',position:'absolute', textAlign: 'left', left:125 ,top:75, color: 'black'}}>
          JIIT CAFE</Text>

          <StatusBar style="auto" />

       </SafeAreaView>
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
        bottom: 150,
        width: 350, // Adjust the width as needed
        height: 480, // Adjust the height as needed
        backgroundColor: 'lightblue', // Background color of the box
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
      borderRadius: 10, // Adjust the borderRadius to control the roundness
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