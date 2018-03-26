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
import RNFetchBlob from 'react-native-fetch-blob';

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

firebase.initializeApp(androidConfig);

const rootRef = firebase.database().ref();
const dataRef = rootRef.child('Users');

const storage = firebase.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const ReviewData = (props) => {

    const _uploadImage = ( uri, mime = 'img/jpg') => {
        return new Promise((resolve, reject) =>{
            const uploadUri = uri;
            const sessionId = new Date().getTime();
            const imageRef = storage.ref('images').child(`${sessionId}.jpg`);
            console.log(uploadUri.uri);

            fs.readFile(uploadUri.uri, 'base64')
                .then(() => {
                    return imageRef.put(uploadUri.uri, {contentType: mime})
                })
                .then(() => {
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    resolve(url)
                })
                .catch((error) => {
                    console.log(error);
                    reject(error)
                })
        })
    };

    const _submit = (values) => {

        firebase.auth().createUserWithEmailAndPassword(values.Email, values.Password)
            .then((usr) => {
                _uploadImage(values.ProfilePic)
                    .then((url) => {
                        dataRef.child(usr.uid).set({
                            FirstName: values.FirstName,
                            LastName: values.LastName,
                            Address: values.Address,
                            Gender: values.Gender,
                            Age: values.Age,
                            City: values.City,
                            Email: values.Email,
                            ProfilePic: url
                        });
                        ToastAndroid.showWithGravity(
                            'Sign Up Successful',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                        );
                        firebase.auth().signInWithEmailAndPassword(values.Email, values.Password)
                            .then(() => {
                                AsyncStorage.setItem('loggedIn', JSON.stringify({
                                    FirstName: values.FirstName,
                                    LastName: values.LastName,
                                    Address: values.Address,
                                    Gender: values.Gender,
                                    Age: values.Age,
                                    City: values.City,
                                    Email: values.Email,
                                    ProfilePic: url
                                }));
                                Actions.Home()
                            });
                    })
                    .catch((err) => {
                        console.warn('err', err)
                    });
                })
            .catch((err) => {
                alert(err)
            });

    };

    const { handleSubmit } = props;

    const { FirstName, LastName, Address, Gender, Age, City, ProfilePic, Email } = props.user;

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
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
})(ReviewData));