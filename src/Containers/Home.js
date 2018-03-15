import React, { Component } from 'react';
import { View, Text, AsyncStorage, ScrollView } from 'react-native';
import styles from "../Resources/Styles/styles";
import { Card, Thumbnail } from 'native-base';

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
        }
    };

    async componentWillMount(){
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

            </View>
        );
    }
}

export default Home;