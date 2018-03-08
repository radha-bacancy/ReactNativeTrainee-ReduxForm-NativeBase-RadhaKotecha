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
    AsyncStorage.setItem('userData', JSON.stringify(store.getState().form.ReactNativeTest.values))
    Actions.UserDetails()
};

const ReviewData = (props) => {
    const { handleSubmit } = props;
    const x = store.getState();

    return(

        <View style={styles.container}>
            <Card style={{padding:10, borderRadius: 5, alignItems: 'center'}}>

                <View style={{flexDirection: 'row'}}>

                    <View style={{padding: 10}}>
                        { (
                            x.form.ReactNativeTest.values.ProfilePic === '' ||
                            x.form.ReactNativeTest.values.ProfilePic === undefined
                        )
                            ? <View style={{ borderRadius: 100, width: 85, height: 85, borderWidth: 0.5 }}/>
                            : <Thumbnail
                                large
                                source={x.form.ReactNativeTest.values.ProfilePic}
                                style={{
                                    borderRadius: 95,
                                    width: 150,
                                    height: 150
                                }}/>
                        }
                    </View>

                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <Text>First Name : </Text>
                            <Text>{x.form.ReactNativeTest.values.FirstName}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text>Last Name : </Text>
                            <Text>
                                { (
                                    x.form.ReactNativeTest.values.LastName === '' ||
                                    x.form.ReactNativeTest.values.LastName === undefined
                                )
                                    ? <Text/>
                                    : <Text>{x.form.ReactNativeTest.values.LastName}</Text>
                                }
                                </Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text>Address     : </Text>
                            <ScrollView>
                                <Text>{x.form.ReactNativeTest.values.Address}</Text>
                            </ScrollView>
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
                            <ScrollView>
                                <Text>{x.form.ReactNativeTest.values.Email}</Text>
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