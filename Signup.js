import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Signup extends React.Component {
    state = {
        phone: '',
        code: ''
    }

    signup = async () => {
        if (this.state.phone.length == 0) { alert('Enter phone number'); return }
        var raw = JSON.stringify({ "phone": this.state.phone });
        try {

            const resp = await fetch('http://10.0.2.2:3000/create_user', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: raw
            })
                .then(res => res.text())
            console.log(resp)
            if (resp == 'user registered successfully!') {
                this.props.phone_save(this.state.phone)
                this.props.onSend(1)
            }
        } catch (err) {
            console.log(err)
        }

    }

    signin = async () => {
        if (this.state.phone.length == 0) { alert('Enter phone number'); return }
        if (this.state.code.length == 0) { alert('Enter Code'); return }
        var raw = JSON.stringify({ "phone": this.state.phone, 'code': this.state.code });
        try {

            const resp = await fetch('http://10.0.2.2:3000/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: raw
            })
                .then(res => res.json())
            console.log(resp)
            if (resp.status == 'exists') {
                this.props.phone_save(this.state.phone)
                await AsyncStorage.setItem('userData', JSON.stringify({
                    phone: this.state.phone, code: resp.token
                }))
                this.props.onSend(2)
            }

        } catch (err) {
            console.log(err)
        }

    }

    render() {
        return (
            <View>
                <View style={{ marginBottom: 30 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, alignSelf: 'center', marginBottom: 10 }}>Signup</Text>
                    <View style={{ width: '100%', height: 50, justifyContent: 'center', borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: 'gray' }}>
                        <TextInput
                            placeholder='Phone Number'
                            keyboardType='decimal-pad'
                            onChangeText={text => this.setState({ phone: text })}
                        />
                    </View>
                    <TouchableOpacity onPress={() => this.signup()} style={{ height: 50, width: '100%', backgroundColor: 'rgb(100,50,200)', marginTop: 15, justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 18, color: 'white', fontWeight: 'bold' }}>Send</Text>
                    </TouchableOpacity>

                </View>
                <View >
                    <Text style={{ fontWeight: 'bold', fontSize: 18, alignSelf: 'center', marginBottom: 10 }}>Signin</Text>
                    <View style={{ width: '100%', height: 50, justifyContent: 'center', borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: 'gray' }}>
                        <TextInput
                            placeholder='Phone Number'
                            keyboardType='decimal-pad'
                            onChangeText={text => this.setState({ phone: text })}
                        />
                    </View>
                    <View style={{ width: '100%', height: 50, justifyContent: 'center', borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: 'gray' }}>
                        <TextInput
                            placeholder='Code..'
                            keyboardType='decimal-pad'
                            onChangeText={text => this.setState({ code: text })}
                        />
                    </View>
                    <TouchableOpacity onPress={() => this.signin()} style={{ height: 50, width: '100%', backgroundColor: 'rgb(100,50,200)', marginTop: 15, justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 18, color: 'white', fontWeight: 'bold' }}>Send</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}