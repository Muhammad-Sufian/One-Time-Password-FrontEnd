import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Signup from './Signup';
import CodeVerify from './CodeVerify';
import Dashboard from './Dashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends React.Component {
  state={
    next:0,
    phone:'',
    code:''
  }
  componentDidMount(){
   
    this.getPhone()
  }

  getPhone=async()=>{
    const phoneValue = await AsyncStorage.getItem('userData')
    console.log(phoneValue)
    let phoneValue_parsed=JSON.parse(phoneValue)
    if(phoneValue_parsed!=null){
      this.setState({phone:phoneValue_parsed.phone,code:phoneValue_parsed.code,next:2})
    }
    
  }

  

  render() {
    let render=''
    
    if(this.state.next==0){
    render = <Signup onSend={(next)=>this.setState({next:next})} phone_save={(phone_text)=>this.setState({phone:phone_text})}/>
    }
    else if(this.state.next==1){
      render = <CodeVerify onSend={(next)=>this.setState({next:next})} phone={this.state.phone}/>
    }
    else{
      render = <Dashboard onSend={(next)=>this.setState({next:next})} phone={this.state.phone}/>
    }
    return (
      <View style={{ height: '100%', width: '100%',justifyContent:'center' }}>
        
        {render}

      </View>
    )
  }
}