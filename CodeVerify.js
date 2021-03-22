import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CodeVerify extends React.Component {
  state = {
    code: ''
  }
  send_code = async () => {
    if (this.state.code.length == 0) { alert('Enter Code'); return }
    var raw = JSON.stringify({ "phone": this.props.phone, "code": this.state.code });
    try {

      const resp = await fetch('http://10.0.2.2:3000/verify_code', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: raw
      })
        .then(res => res.json())
      console.log(resp)
      if (resp.status == 'Success') {
        // console.log(''
        AsyncStorage.setItem('userData', JSON.stringify({
          phone: this.props.phone, code: resp.token
        }))
        this.props.onSend(2)
      }

    } catch (err) {
      console.log(err)
    }


  }

  render() {
    return (
      <View >
        <Text style={{ fontWeight: 'bold', fontSize: 18, alignSelf: 'center', marginBottom: 10 }}>Code</Text>
        <View style={{ width: '100%', height: 50, justifyContent: 'center', borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: 'gray' }}>
          <TextInput
            placeholder='Please enter code here'
            keyboardType='decimal-pad'
            onChangeText={(text) => this.setState({ code: text })}
          />
        </View>
        <TouchableOpacity onPress={() => this.send_code()} style={{ height: 50, width: '100%', backgroundColor: 'rgb(100,50,200)', marginTop: 15, justifyContent: 'center' }}>
          <Text style={{ alignSelf: 'center', fontSize: 18, color: 'white', fontWeight: 'bold' }}>Send</Text>
        </TouchableOpacity>

      </View>
    )
  }
}