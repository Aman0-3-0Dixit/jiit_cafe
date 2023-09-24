import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Login() {

  function truncateText(text, maxLength) {
        if (text.length > maxLength) {
           return text.substring(0, maxLength) ;
         }
         return text;
  }
 

  const navigation = useNavigation();

  const [enrollmentNo, getEnrollmentNo] = useState('');
  const [password, getPassword] = useState('');


  const enrollmentNum = (newText) => {
    newText = truncateText(newText, 10);
    getEnrollmentNo(newText);
  };

  const passWord = (newText) => {
    newText = truncateText(newText, 20);
    getPassword(newText);
  };


  

  const handleSignUp = () => {
    // Perform sign-up logic here
    // This function will be called when the button is pressed
    // You can add your sign-up logic here
  };

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

       <View style={styles.roundedBox} keyboardShouldPersistTaps='always'>

            <Image
                source={require('./icons/id-card.png')} 
                style={{ width: 40, height: 40, position:'absolute', top: 65, left: 15 }} // Adjust the dimensions as needed
            /> 
            <View style={[styles.fields, {bottom:200, right: 30,}]} overflow = 'hidden' >
              <TextInput style={{color: 'white', right: 60, }}
                         keyboardType="numeric" // Specify the keyboard type here 
                         placeholder='Enrollment No.' 
                         placeholderTextColor= 'white' 
                         onChangeText={enrollmentNum} 
                         value={enrollmentNo} />
            </View>

            <Image
                source={require('./icons/security.png')} 
                style={{ width: 40, height:40, position:'absolute', top: 140, left: 15 }} // Adjust the dimensions as needed
            /> 

            <View style={[styles.fields, {bottom:120, right: 30,}]} overflow = 'hidden' >
              <TextInput style={{color: 'white', right: 30, }}
                         secureTextEntry={true} 
                         placeholder='Enter your Password'
                         placeholderTextColor= 'white'
                         onChangeText={passWord} 
                         value={password} />
            </View>
            
                <TouchableOpacity 
                       style={[styles.roundedBox, 
                       {width: 200, height:60, backgroundColor:'black',bottom:30}]} 
                       onPress={() => navigation.navigate('food')}
                >
                    
                <Text style={{color: 'white', alignItems:'center', fontSize: 20 }} >Login</Text>

                </TouchableOpacity>

            <Image
                 source={require('./icons/profile.png')} 
                 style={{ width: 80, height: 80, position:'absolute', top: -40, left: 135 }} // Adjust the dimensions as needed
            /> 

            <Text style={{position:'absolute', bottom : -30}}>
                 Doesn't have an account? <Text style={{color: 'blue',}} onPress={() => navigation.navigate('signup')} >Sign up</Text>
            </Text>

        </View>
    <StatusBar style="auto" />

    </SafeAreaView></KeyboardAvoidingView>
    
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
