import React from 'react';
import { View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Card } from 'native-base';
import { Actions } from 'react-native-router-flux';
import TextBox from '../Components/TextBox';
import Btn from '../Components/Btn';
import * as  validate from './validate';
import * as warn from './warn'
import styles from '../Resources/Styles/styles';

let _submit = (values) => {
    console.warn(values);

    Actions.ReviewData()
};

const LoginCredentials = (props) => {
    const { handleSubmit } = props;

    return(
        <View style={styles.container}>
            <Card style={{padding:10, borderRadius: 5, justifyContent: 'space-between'}}>

                <View>
                    <View>
                        <Field
                            name='Email'
                            component={TextBox}
                            placeholder = 'Email Id'
                            validate={[validate.email, validate.required]}
                            warn={warn.aol}
                        />
                    </View>

                    <View>
                        <Field
                            name='Password'
                            component={TextBox}
                            secureTextEntry={true}
                            placeholder = 'Password'
                            type='text'
                            validate={[validate.required, validate.password]}
                        />
                    </View>

                    <View>
                        <Field
                            name='ConfirmPassword'
                            component={TextBox}
                            secureTextEntry={true}
                            placeholder = 'Confirm Password'
                            type='text'
                            validate={[validate.required, validate.confirmPassword]}
                        />
                    </View>
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
})(LoginCredentials)