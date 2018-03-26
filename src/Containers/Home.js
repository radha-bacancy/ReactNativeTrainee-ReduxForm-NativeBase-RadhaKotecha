import React, { Component } from 'react';
import {View, Text, AsyncStorage, ScrollView, ToastAndroid} from 'react-native';
import styles from "../Resources/Styles/styles";
import { Card, Thumbnail } from 'native-base';
import Btn from '../Components/Btn';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

class Home extends Component{

    constructor(){
        super();

        this.state={
            FirstName: '',
            LastName: '',
            Address: '',
            Gender: '',
            Age: '',
            City: '',
            ProfilePic: '',
            Email: '',
        };
        console.disableYellowBox = true;
    };

    _logout = async () => {
        await firebase.auth().signOut()
            .then(() => {
                ToastAndroid.showWithGravity(
                    'Logged Out',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
                Actions.Login();
                AsyncStorage.removeItem('loggedIn')
            })
            .catch((err) => {
                alert(err)
            })
    };

    async componentWillMount(){
        if(
            await AsyncStorage.getItem('loggedIn') !== '' &&
            await AsyncStorage.getItem('loggedIn') !== null &&
            await AsyncStorage.getItem('loggedIn') !== undefined
        ){
            let UserDetails = JSON.parse(await AsyncStorage.getItem('loggedIn'));

            this.setState({
                FirstName: UserDetails.FirstName,
                LastName: UserDetails.LastName,
                Address: UserDetails.Address,
                Gender: UserDetails.Gender,
                Age: UserDetails.Age,
                City: UserDetails.City,
                Email: UserDetails.Email,
                ProfilePic: {uri: UserDetails.ProfilePic},
            })
        }
        else{
            Actions.Login()
        }
    }

    render(){

        const { FirstName, LastName, Address, Gender, Age, City, ProfilePic, Email } = this.state;

        return(
            <View style={styles.container}>
                <Card style={{padding:10, borderRadius: 5, alignItems: 'center'}}>

                    <View style={{padding: 10}}>
                        <Thumbnail
                            large
                            source={ProfilePic}
                            style={{
                                borderRadius: 95,
                                width: 85,
                                height: 85,
                            }}
                        />
                    </View>

                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <Text>First Name : </Text>
                            <Text>{FirstName}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text>Last Name : </Text>
                            <Text>{LastName}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text>Address     : </Text>
                            <ScrollView>
                                <Text>{Address}</Text>
                            </ScrollView>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text>City              : </Text>
                            <Text>{City}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text>Age Range : </Text>
                            <Text>{Age}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text>Gender        : </Text>
                            <Text>{Gender}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text>Email           : </Text>
                            <ScrollView>
                                <Text>{Email}</Text>
                            </ScrollView>
                        </View>
                    </View>

                </Card>

                <Btn onPress={this._logout}>Log Out</Btn>

            </View>
        );
    }
}

export default Home;