import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Dashboard extends React.Component {
  state={
    code:'',
    phone:''
  }


  logout=async()=>{
    await AsyncStorage.removeItem('userData')
    this.props.onSend(0);
  }
  
  render() {
    return (
      <View >
        <Text style={{ fontWeight: 'bold', fontSize: 18, alignSelf: 'center', marginBottom: 10 }}>Dashboard</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 18, alignSelf: 'center', marginBottom: 10 }}>Phone:{this.props.phone}</Text>

        <TouchableOpacity onPress={() => this.logout()} style={{ height: 50, width: '100%', backgroundColor: 'rgb(100,50,200)', marginTop: 15, justifyContent: 'center' }}>
          <Text style={{ alignSelf: 'center', fontSize: 18, color: 'white', fontWeight: 'bold' }}>Logout</Text>
        </TouchableOpacity>

      </View>
    )
  }
}