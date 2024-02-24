import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, View, SafeAreaView, Image, TextInput, Flex } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import { BottomTabAdmin } from './components/bottomTabAdmin.js';
//import AdminCartButton from './components/AdminCartButton.js';
//import { Center } from 'native-base';

export default function Stock () {

  const [items, setItems] = useState([
    { id: 1, name: 'Coffee', stock: 0 },
    { id: 2, name: 'Pasta', stock: 0 },
    { id: 3, name: 'Idli', stock: 0 },
    { id: 4, name: 'Hotdog', stock: 0 },
    { id: 5, name: 'Patties', stock: 0 },
    { id: 6, name: 'Burger', stock: 0 },
    { id: 7, name: 'Sandwich', stock: 0 },
    { id: 8, name: 'Aaloo Boonda', stock: 0 },
    { id: 9, name: 'Paneer Patties', stock: 0 },
    { id: 10, name: 'Pav Bhaaji', stock: 0 },
    { id: 11, name: 'Kachori', stock: 0 },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([...items]); 

  const [inputValues, setInputValues] = useState({});

  
  
  
  const handleAddStock = (itemId) => {
    const updatedFilteredItems = filteredItems.map((item) => {
      if (item.id === itemId) {
        const inputValue = parseInt(inputValues[itemId] || 0);
        return { ...item, stock: item.stock + inputValue };
      }
      return item;
    });
  
    setFilteredItems(updatedFilteredItems);
  };
  
  

  const handleInputChange = (itemId, inputValue) => {
    setInputValues({ ...inputValues, [itemId]: inputValue });
  };
    
  const handleSearch = (text) => {
    setSearchQuery(text); // Update the search query state
    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        String(item.id).includes(text)
    );
    setFilteredItems(filtered); // Update the filtered items state
  };

    return (
      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='height'
      keyboardShouldPersistTaps='always' 
      keyboardVerticalOffset={-500}
      >
      
      <SafeAreaView style={styles.container2} keyboardShouldPersistTaps='always'>
      <Image
            source={require('./jiitcafeassests/cafelogo.png')} 
            style={{ width: 60, height: 60, position:'absolute', top: 35, left: 10 }}
        />
        
          <Text style={{fontSize: 19, fontWeight: 'bold', position:'absolute', textAlign: 'left', left:74 ,top:55, color: 'black'}}>
            JIIT CAFE</Text>

          <TextInput
            style={styles.searchBar}
            placeholder="Search by name or ID"
            value={searchQuery}
            onChangeText={handleSearch}/>

          <StatusBar style="auto" />

       </SafeAreaView>
       
       <ScrollView style={styles.container}>
      {filteredItems.map((item) => (
        <View key={item.id} style={styles.cardContainer}>
        <Card key={item.id} >
          
          <View style={styles.cardHeader}>
            <Text style={styles.itemTitle}>{item.id}: {item.name}</Text>
            <Text style={styles.stockText}>Stock: {item.stock}</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Update Stock"
                keyboardType="numeric"
                value={inputValues[item.id]}
                onChangeText={(text) => handleInputChange(item.id, text)}
              />
            </View>
            <View style={styles.addButtonContainer}>
              <Button
                title="Add"
                onPress={() => handleAddStock(item.id)}
                buttonStyle={styles.addButton}
              />
            </View>
          </View>
        </Card>
        </View>
      ))}
    </ScrollView>
    <BottomTabAdmin focussedIndex={0} />

    </KeyboardAvoidingView>    
    
  );
}



const styles = StyleSheet.create({

  searchBar: {
    top: 102,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    //marginBottom: 40,
    backgroundColor: '#F8FA92'
  },
  
    container2: {
      flex:1,
      margin: 0
    },
    container: {
      marginTop: 150,
      marginBottom: 60,
      alignContent: 'center'
    },
    cardContainer: {
        height: 135, 
    },  
    cardHeader: {
      flexDirection: 'column',
      height: 200,
      //justifyContent: 'space-between',
    },
    itemTitle: {
      top: 15,
      fontSize: 23,
      fontWeight: 'bold',
    },
    stockText: {
      fontSize: 20,
      top: 22
    },
    cardBody: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 220,
      //alignItems: 'center',
      position: 'absolute',
      top: 0
      , left: 250
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 60, 
      position: 'absolute',
      top: 0,
      
    },
    inputField: {
      position: 'absolute',
      top: 0,
      right: -35, 
      width: 110,
      height: 65,
      textAlign: 'center',
      backgroundColor: '#D9D9D9',
      marginRight: 10,
      borderWidth: 1,
      alignItems: 'center',
      borderColor: 'gray',
      borderRadius: 20,
      padding: 5,
    },
    addButton: {
      backgroundColor: '#0000FF',
      width: 90,
      borderRadius: 50
    },
    addButtonContainer: {
      position: 'abosolute',
      top: 70,
      right: 12,
      width:100,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });