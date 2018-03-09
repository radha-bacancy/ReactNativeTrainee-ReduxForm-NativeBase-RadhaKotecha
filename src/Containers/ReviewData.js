import React from 'react';
import { View, Text, AsyncStorage, ToastAndroid, ScrollView } from 'react-native';
import { Card, Thumbnail } from 'native-base';
import store from '../Redux/Store'
import styles from '../Resources/Styles/styles'
import Btn from "../Components/Btn";
import { Actions } from 'react-native-router-flux'
import { reduxForm } from 'redux-form';

const _submit = () => {
    ToastAndroid.showWithGravity(
        'Sign Up Successful',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
    );
    AsyncStorage.setItem('userData', JSON.stringify(store.getState().form.ReactNativeTest.values));
    Actions.UserDetails()
};

const ReviewData = (props) => {
    const { handleSubmit } = props;
    const x = store.getState();
    let userData = x.form.ReactNativeTest.values;
    return(

        <View style={styles.container}>
            <Card style={{padding:10, borderRadius: 5, alignItems: 'center'}}>

                <View style={{flexDirection: 'row', flex: 1}}>

                    <View style={{padding: 10}}>
                        <Thumbnail
                            large
                            source={userData.ProfilePic}
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
                            <Text>{userData.FirstName}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text>Last Name : </Text>
                            <Text>{userData.LastName}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text>Address     : </Text>
                            <ScrollView>
                                <Text>{userData.Address}</Text>
                            </ScrollView>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text>City              : </Text>
                            <Text>{userData.City}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text>Age Range : </Text>
                            <Text>{userData.Age}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text>Gender        : </Text>
                            <Text>{userData.Gender}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text>Email           : </Text>
                            <ScrollView>
                                <Text>{userData.Email}</Text>
                            </ScrollView>
                        </View>
                    </View>
                </View>

                <Btn onPress={handleSubmit(_submit)}> Submit </Btn>

            </Card>

        </View>
    );
};

export default reduxForm({
    form: 'ReactNativeTest',
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
})(ReviewData)