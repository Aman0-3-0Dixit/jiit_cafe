// UserComponent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UserComponent = ({ setSelectedTab }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setSelectedTab('Admin')}
      >
        <Text style={styles.buttonText}>Tap to login as Admin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  switchButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    bottom:450
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserComponent;
