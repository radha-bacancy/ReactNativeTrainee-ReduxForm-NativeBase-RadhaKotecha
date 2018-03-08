import React from 'react';
import { View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import UploadImage from '../Components/UploadImage'
import Btn from "../Components/Btn";
import { Actions } from 'react-native-router-flux';
import { Card } from 'native-base'
import styles from '../Resources/Styles/styles';

let _submit = (values) => {
    console.warn(values);
    Actions.LoginCredentials()
};

let ProfilePicture = (props) => {
    const { handleSubmit } = props;

    return(
        <View style={styles.container}>
            <Card style={{padding:10, borderRadius: 5, justifyContent: 'space-between'}}>

                <View>
                    <Field name='ProfilePic' component={UploadImage} type='file'/>
                </View>

                <Btn onPress={handleSubmit(_submit)}> Next </Btn>

            </Card>
        </View>
    );
};

export default reduxForm({
    form: 'ReactNativeTest',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(ProfilePicture)