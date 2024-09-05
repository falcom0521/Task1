import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale } from 'react-native-size-matters';

const DashboardScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          setUserData(JSON.parse(user));
        }
      } catch (error) {
        console.error('Failed to load the data from the storage', error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {userData ? (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.usernameText}>{userData.username}!</Text>
          <Text style={styles.welcomepass}>Password :{userData.password}</Text>

         
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
      <View  style={styles.logout}>
         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
         </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  welcomeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
    backgroundColor: '#fff',
    borderRadius: moderateScale(15),
    elevation: 5, // For shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  welcomeText: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    color: '#333',
  },
  welcomepass: {
    paddingTop:moderateScale(100),
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: '#333',
  },
  usernameText: {
    fontSize: moderateScale(30),
    fontWeight: 'bold',
    color: '#6495ED',
    marginTop: moderateScale(10),
  },
  usernamedesc: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#6495ED',
    marginTop: moderateScale(10),
  },
  logoutButton: {
    marginTop: moderateScale(20),
    backgroundColor: '#191970',
    paddingHorizontal: moderateScale(30),
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(50),
  },
  logoutButtonText: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  loadingText: {
    fontSize: moderateScale(18),
    color: '#999',
  },
  logout:{
    marginTop:moderateScale(300),
    justifyContent:'flex-end'
  }
});

export default DashboardScreen;
