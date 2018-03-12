import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import UploadImage from '../Components/UploadImage'
import Btn from "../Components/Btn";
import { Actions } from 'react-native-router-flux';
import { Card } from 'native-base'
import styles from '../Resources/Styles/styles';
import * as actions from "../Redux/Actions";
import * as validate from './validate';

const _submit = (values) => {
    actions._addProfilePicture(values);
    Actions.LoginCredentials()
};

const ProfilePicture = (props) => {
    const { handleSubmit, invalid, pristine, submitting } = props;

    return(
        <View style={styles.container}>
            <Card style={{padding:10, borderRadius: 5, justifyContent: 'space-between'}}>

                <View>
                    <Field name='ProfilePic' component={UploadImage} validate={validate.required}/>
                </View>

                <Btn onPress={handleSubmit(_submit)} disabled={invalid || pristine || submitting}> Next </Btn>

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
})(ProfilePicture));