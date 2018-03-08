import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'native-base'
import { Field, reduxForm } from 'redux-form';
import TextBox from '../Components/TextBox';
import RadioButton from "../Components/RadioButton";
import DropDown from "../Components/DropDown";
import { Actions } from 'react-native-router-flux';
import Btn from '../Components/Btn';
import * as validate from './validate'
import styles from '.././Resources/Styles/styles'

let _submit = (values) => {
    console.warn(values);
    Actions.ProfilePicture()
};

let UserDetails = (props) => {

    const { handleSubmit } = props;

    return(

        <View style={styles.container}>
            <Card style={{padding:10, borderRadius: 5}}>

                <ScrollView>
                    <Field
                        name='FirstName'
                        component={TextBox}
                        placeholder = 'First Name'
                        validate={validate.required}
                        type='text'
                    />

                    <Field
                        name='LastName'
                        component={TextBox}
                        placeholder = 'Last Name'
                        type='text'
                    />

                    <Field
                        name='Address'
                        component={TextBox}
                        placeholder='Address'
                        validate={validate.required}
                        multiline = {true}
                    />

                    <Field
                        name='City'
                        component={TextBox}
                        placeholder='City'
                        type='text'
                        validate={validate.required}
                    />

                    <View style={{padding: 6}}>
                        <View><Text style={{color:'#777'}}>Gender</Text></View>
                        <View style={{paddingLeft: 7}}>
                            <Field
                                name='Gender'
                                radios={[
                                    {label:'Male',value:'Male'},
                                    {label:'Female',value:'Female'},
                                ]}
                                component={RadioButton}
                                validate={validate.required}
                            />
                        </View>
                    </View>

                    <View style={{padding: 6}}>
                        <View><Text style={{color:'#777'}}>Age</Text></View>
                        <View>
                            <Field
                                name='Age'
                                options={[
                                    {label: '', value: ''},
                                    {label: '0-18', value: '0-18'},
                                    {label: '18-25', value: '18-25'},
                                    {label: '25-40', value: '25-40'},
                                    {label: '40-60', value: '40-60'},
                                    {label: '60 +', value: '60 +'}
                                ]}
                                component={DropDown}
                                validate={validate.required}
                            />
                        </View>
                    </View>

                </ScrollView>

                <Btn onPress={handleSubmit(_submit)}> Next </Btn>

            </Card>
        </View>
    );
};

export default reduxForm({
    form: 'ReactNativeTest',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(UserDetails)