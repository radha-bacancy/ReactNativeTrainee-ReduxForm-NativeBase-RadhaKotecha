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

const ReviewData = (props) => {

    const _submit = () => {
        ToastAndroid.showWithGravity(
            'Sign Up Successful',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
        );
        AsyncStorage.setItem('userData', JSON.stringify(props.user));
        Actions.UserDetails()
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