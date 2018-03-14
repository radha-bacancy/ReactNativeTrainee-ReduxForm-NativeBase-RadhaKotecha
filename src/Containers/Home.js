import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';

class Home extends Component{

    constructor(){
        super();

        this.state={
            FirstName: '',
            LastName: ''
        }
    };

    async componentWillMount(){
        let UserDetails = JSON.parse(await AsyncStorage.getItem('loggedIn'));
        this.setState({
            FirstName: UserDetails.FirstName,
            LastName: UserDetails.LastName
        })
    }

    render(){
        return(
            <View>
                <Text>{this.state.FirstName + ' ' + this.state.LastName}</Text>
            </View>
        );
    }
}

export default Home;