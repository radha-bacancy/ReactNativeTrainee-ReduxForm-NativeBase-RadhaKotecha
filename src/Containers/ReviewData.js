import React from 'react';
import { View, Text, AsyncStorage, ToastAndroid } from 'react-native';
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
    AsyncStorage.setItem('userData', JSON.stringify(store.getState().form.ReactNativeTest.values))
    Actions.UserDetails()
};

const ReviewData = (props) => {
    const { handleSubmit } = props;
    const x = store.getState();

    return(

        <View style={styles.container}>

            <View>
                <View style={{flexDirection: 'row'}}>
                    <Text>First Name : </Text>
                    <Text>{x.form.ReactNativeTest.values.FirstName}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Text>Last Name : </Text>
                    <Text>{x.form.ReactNativeTest.values.LastName}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Text>Address     : </Text>
                    <Text>{x.form.ReactNativeTest.values.Address}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Text>City              : </Text>
                    <Text>{x.form.ReactNativeTest.values.City}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Text>Age Range : </Text>
                    <Text>{x.form.ReactNativeTest.values.Age}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Text>Gender        : </Text>
                    <Text>{x.form.ReactNativeTest.values.Gender}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Text>Email           : </Text>
                    <Text>{x.form.ReactNativeTest.values.Email}</Text>
                </View>
            </View>

            <Btn onPress={handleSubmit(_submit)}> Submit </Btn>

        </View>
    );
};

export default reduxForm({
    form: 'ReactNativeTest',
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
})(ReviewData)