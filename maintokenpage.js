import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, StyleSheet, Image, ScrollView } from 'react-native';
import { useSelectedItems } from './SelectedItemsContext.js';
import { useUser } from './userContext.js';
import OrderList from './orderList.js';


const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const OrderBox = ({ order, currentTimestamp }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [timer, setTimer] = useState(900);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const individualCost = (order) => {
    // Calculate total cost for each item and sum them up
    const totalCost = order.items.reduce((acc, item) => acc + item.count * item.coinCount, 0);
    return totalCost;
  };

  const calculateTimeDifference = () => {
    const orderDate = new Date(order.orderDate).getTime();
    const currentTime = currentTimestamp || new Date().getTime(); // Use currentTimestamp if available
    return Math.floor((currentTime - orderDate) / 1000);
  };

   useEffect(() => {
    const orderDate = new Date(order.orderDate).getTime();
    const currentTime = new Date().getTime();
    const timeDifferenceInSeconds = Math.floor((currentTime - orderDate) / 1000);

    if (timeDifferenceInSeconds < 900) {
      setTimer(900 - timeDifferenceInSeconds);

      // Start ticking the timer back to zero
      const interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setTimer(0);
    }
  }, [order]);

  return (
    <TouchableOpacity onPress={toggleExpansion}>
      <View style={{ marginBottom: 10, padding: 10, backgroundColor: '#E4E4E4', borderRadius: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontFamily: 'press-start-2p', fontWeight: 'bold' }}>{`Order ID: ${order.orderId}`}</Text>
          {timer > 0 ? (
            <Text style={{ fontSize: 20, fontFamily: 'press-start-2p' }}>{`Timer: ${formatTime(timer)}`}</Text>
          ) : (
            <Text style={{ fontSize: 20, fontFamily: 'press-start-2p', color: 'green' }}>
              Completed
            </Text>
          )}
        </View>
        <Text style={{ fontSize: 16, fontFamily: 'press-start-2p' }}>{`Order Date: ${order.orderDate}`}</Text>
        {order.items.map((item, itemIndex) => (
            <View key={itemIndex} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontFamily: 'press-start-2p' }}>{`${item.count} X ${item.dishName}`}</Text>
                <Text style={{ fontSize: 18, fontFamily: 'press-start-2p' }}>{`${item.coinCount * item.count}`}<Image source={require('./jiitcafeassests/jcoins.png')} style={{ width: 20, height: 20 }} /></Text>
            </View>
))}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontFamily: 'press-start-2p', fontWeight: 'bold' }}>Total Coins:</Text>
          <Text style={{ fontSize: 18, fontFamily: 'press-start-2p' }}>{individualCost(order)}<Image source={require('./jiitcafeassests/jcoins.png')} style={{ width: 20, height: 20 }} /></Text>

        </View>
      </View>
      {isExpanded && (
        <View>
          <Text>{`Order ID: ${order.orderId}`}</Text>
          <Text>{`Order Date: ${order.orderDate}`}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const MaintokenPage = ({ onClose }) => {
  const [showOrderId, setShowOrderId] = useState(false);
  const [timer, setTimer] = useState(900); // 15 minutes in seconds
  const [latestOrderTimestamp, setLatestOrderTimestamp] = useState(null);

  const [pendingOrders, setPendingOrders] = useState([]);
  const { userData } = useUser();
  
  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const fetchPendingOrders = async () => {
    try {
      const { token } = userData;
      // Make an API call to fetch pending orders
      const response = await fetch('http:///192.168.1.2:3000/auth/pendingOrders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('API Response:', response);

      if (response.ok) {
        const data = await response.json();
        console.log('Pending Orders:', data);

        // Store the timestamp of the latest order
        if (data.length > 0) {
          setLatestOrderTimestamp(new Date(data[0].orderDate).getTime());
        }

        // Set the pending orders in the state
        setPendingOrders(data);
      } else {
        // Handle error
        console.error('Failed to fetch pending orders');
      }
    } catch (error) {
      // Handle network error
      console.error('Error fetching pending orders:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  const handleOrderIdToggle = () => {
    setShowOrderId(!showOrderId);
  };

  const { selectedItems } = useSelectedItems();

  // Calculate total cost
  const totalCost = selectedItems.reduce((acc, item) => acc + item.amount * item.cost, 0);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardShouldPersistTaps="always"
      keyboardVerticalOffset={-500}
    >
      <ScrollView>
        <View style={{ flexDirection: 'row', marginTop: 0 }}>
          <View style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '85%' }}></View>
          <View style={{ backgroundColor: '#E4E4E4', width: '15%' }}>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={onClose}>
              <Image source={require('./jiitcafeassests/jcoins.png')} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ backgroundColor: '#E4E4E4', marginBottom: 75, padding: 25 }}>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', fontFamily: 'PressStart2P-Regular', textAlign: 'center' }}>
              {'*'.repeat(30)} JIIT {'\n'} ANNAPURNA {'\n'}SEC-128 NOIDA {'*'.repeat(30)}
            </Text>
          </View>
          <Text style={{ fontSize: 20, fontFamily: 'press-start-2p', textAlign: 'center', fontWeight: 'bold' }}>
            {new Date().toLocaleString()}
          </Text>

          <View style={{ marginTop: 10 }}>
            {pendingOrders.length > 0 ? (
              pendingOrders.map((order, index) => (
                <OrderBox key={index} order={order} currentTimestamp={new Date().getTime()} />
              ))
            ) : (
              <Text>No pending orders found</Text>
            )}
          </View>
          <View style={{ marginTop: 20, flexDirection: 'row' }}>
            <View style={{ width: '73%' }}>
              <Text style={{ fontSize: 30, fontFamily: 'press-start-2p', fontWeight: 'bold' }}>Total Cost</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={require('./jiitcafeassests/jcoins.png')}
                style={{ width: 35, height: 35, position: 'relative', top: 5 }}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 30,
                  fontFamily: 'press-start-2p',
                  position: 'relative',
                  left: 4.5,
                  top: 0.3,
                }}>
                {totalCost}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              backgroundColor: '#BEB6B6',
              padding: 10,
              borderRadius: 10,
              alignItems: 'center',
              width: '50%',
              position: 'relative',
              left: 83,
            }}>
            <Text style={{ fontSize: 18, fontFamily: 'press-start-2p', fontWeight: 'bold' }}>Timer</Text>
            <Text style={{ fontSize: 35, fontFamily: 'press-start-2p', fontWeight: 'bold' }}>{formatTime(timer)}</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MaintokenPage;
