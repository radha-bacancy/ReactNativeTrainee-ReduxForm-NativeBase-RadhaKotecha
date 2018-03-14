import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, AsyncStorage, ToastAndroid, ScrollView } from 'react-native';
import { Card, Thumbnail } from 'native-base';
import styles from '../Resources/Styles/styles'
import Btn from "../Components/Btn";
import { Actions } from 'react-native-router-flux'
import { reduxForm } from 'redux-form';
import * as actions from "../Redux/Actions";
import firebase from 'react-native-firebase';

const androidConfig = {
    clientId: '999827385879-600phkhqg5t13hidv2kq3o74odgnoalu.apps.googleusercontent.com',
    appId: '1:999827385879:android:b18f7074e328c7d5',
    apiKey: 'AIzaSyAH6ehaz030E7kVc639y0T7up3LGj2-ONU',
    databaseURL: 'https://reactnativetest-293b3.firebaseio.com/',
    storageBucket: 'reactnativetest-293b3.appspot.com',
    messagingSenderId: '999827385879',
    projectId: 'reactnativetest-293b3',
    persistence: true,
};

const rootRef = firebase.database().ref();
const dataRef = rootRef.child('Users');

const ReviewData = (props) => {

    const _submit = (values) => {

        firebase.auth().createUserWithEmailAndPassword(values.Email, values.Password)
            .then((usr) => {
                console.log(usr);
                dataRef.child(usr.uid).set({
                    FirstName: values.FirstName,
                    LastName: values.LastName,
                    Address: values.Address,
                    Gender: values.Gender,
                    Age: values.Age,
                    City: values.City,
                    ProfilePic: values.ProfilePic,
                    Email: values.Email,
                });

                ToastAndroid.showWithGravity(
                    'Sign Up Successful',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                );
                AsyncStorage.setItem('userData', JSON.stringify(usr));
                Actions.UserDetails()
            })
            .catch((err) => {
                console.warn('err', err)
            });
    };

    const { handleSubmit } = props;

    const { FirstName, LastName, Address, Gender, Age, City, ProfilePic, Email } = props.user;

    return(

        <View style={styles.container}>
            <Card style={{padding:10, borderRadius: 5, alignItems: 'center'}}>

                <View style={{flexDirection: 'row', flex: 1}}>

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
                </View>

                <Btn onPress={handleSubmit(_submit)}> Submit </Btn>

            </Card>

        </View>
    );
};


function mapStateToProps(state) {
    return {
        user: state.user,
        form: state.form
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'ReactNativeTest',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(ReviewData));