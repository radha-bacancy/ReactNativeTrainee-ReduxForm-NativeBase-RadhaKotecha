import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, AsyncStorage, ToastAndroid } from 'react-native';
import { Card } from 'native-base';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import Btn from '../Components/Btn';
import styles from '../Resources/Styles/styles';

const data = firebase.database().ref('/Users');

class Login extends Component{
    constructor(props){
        super(props);

        this.unsubscriber = null;

        this.state={
            isAuthentic : false,
            emailId: '',
            password: '',
            user: null,
        };
    }

    componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged((changedUser) => {
            this.setState({
                user: changedUser
            })
        })
    };

    componentWillUnmount() {
        if(this.unsubscriber){
            this.unsubscriber();
        }
    }

    _enterEmail = (email) => {
        this.setState({
            emailId: email
        })
    };

    _enterPassword = (password) => {
        this.setState({
            password: password
        })
    };

    _onLogin = async () => {
        await firebase.auth().signInWithEmailAndPassword(this.state.emailId, this.state.password)
            .then((loggedInUser) => {
                data.once('value')
                    .then(snapshot => {
                        snapshot.forEach((doc) => {
                            if(doc.toJSON().Email === loggedInUser.email){
                                AsyncStorage.setItem('loggedIn', JSON.stringify(doc.toJSON()));
                                ToastAndroid.showWithGravity(
                                    'Logged In successfully',
                                    ToastAndroid.SHORT,
                                    ToastAndroid.BOTTOM
                                );
                                Actions.Home();
                            }
                        })
                    });
            })
            .catch((err) => {
                alert(err);
            })
    };

    _signUp = () => {
        Actions.UserDetails()
    };

    render(){
        return(
            <View style={styles.container}>
                <Card style={{padding:10, borderRadius: 5, justifyContent: 'space-between'}}>
                    <View>
                        <TextInput
                            placeholder={'Email Address'}
                            autoCapitalize='none'
                            onChangeText={(email) => this._enterEmail(email)}
                        />
                        <TextInput
                            secureTextEntry={true}
                            placeholder={'Password'}
                            autoCapitalize='none'
                            onChangeText={(password) => this._enterPassword(password)}
                        />
                    </View>
                    <View style={{margin: 70}}>
                        <Btn onPress={this._onLogin}>Login</Btn>
                        <TouchableOpacity onPress={this._signUp} style={{alignItems: 'center'}}>
                            <Text>Not a user already?</Text>
                        </TouchableOpacity>
                    </View>
                </Card>
            </View>
        );
    }
}

export default Login;