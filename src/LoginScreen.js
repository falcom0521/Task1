import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableHighlight,  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale } from 'react-native-size-matters';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username && password) {
      try {
        // Store user data in AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify({ username, password }));
        navigation.navigate('Dashboard');
      } catch (error) {
        console.error('Failed to save the data to the storage', error);
      }
    } else {
      Alert.alert('Please enter both username and password');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <View style={styles.inputseciton} >
            <View style={styles.welcomecontainer}>
                <Text style={styles.welcome} >Login</Text>
            </View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      </View>
      <View style={styles.buttonContainer}>

     <TouchableHighlight 
          style={styles.buttonStyle} 
          onPress={handleLogin}
          underlayColor="#F0F0F0" // Adjust color as needed
        >
            <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
            </View>
    </View>
    
  );
};
const styles = StyleSheet.create({
    input: {
        height: 50,
        backgroundColor: '#F1F1F1', // Background color for TextInput
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: moderateScale(37),
        paddingHorizontal: moderateScale(20),
        width: moderateScale(308),
      },
      buttonContainer: {
        marginTop: moderateScale(30),
        alignItems: 'center',
      },
      buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: moderateScale(127),
        height: moderateScale(48),
        backgroundColor: "#191970",
      },
      buttonText: {
        color: "white",
        fontSize: 20,
      },
      inputseciton:{
        justifyContent:'center',
        alignItems:'center',
      },
      welcome:{
        fontSize:40

      },
      welcomecontainer:{
        justifyContent:'center',
        alignItems:'center'
      },
      desc:{
        fontSize:16,
        paddingTop:20,
      }
}
)

export default LoginScreen;
