// CustomPopup.js
import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

export default function CustomPopup({ visible, onClose, selectedItems, foodItems }) {
  const totalJcoins = selectedItems.reduce((acc, selectedItem) => {
    const item = foodItems.find((foodItem) => foodItem.id === selectedItem.id);
    return acc + item.coinCount;
  }, 0);

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Selected Items:</Text>
          {selectedItems.map((item) => (
            <Text key={item.id}>{item.dishName}</Text>
          ))}
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Total Jcoins Spent: {totalJcoins}</Text>
          <TouchableOpacity onPress={onClose} style={{ alignItems: 'flex-end', marginTop: 10 }}>
            <Text style={{ color: 'blue', fontSize: 16 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
