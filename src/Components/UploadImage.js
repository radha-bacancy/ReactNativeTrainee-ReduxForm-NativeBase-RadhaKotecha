import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import { Text, View, Thumbnail } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import styles from '../Resources/Styles/styles';
import store from '../Redux/Store';

class UploadImage extends Component {

    constructor(props) {
        super(props);

        this.state={
            source:'',
        }
    }

    _uploadPic = () => {

        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.setState({
                    source: { uri: response.uri }
                });
                this.props.input.onChange(this.state.source)
            }
        });
    };

    render(){

        const {meta: {touched, error, warning}, input: {value}} = this.props;
        console.warn(value);
        return(
            <View>
                <View style={{
                    paddingTop: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={this._uploadPic}>
                        <View style={{
                            borderWidth: 0.5,
                            borderRadius: 95,
                            width: 150,
                            height: 150,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 20
                        }}>
                            { ( value === '' || value === undefined )
                                ? <Text>Select a Photo</Text>
                                : <Thumbnail
                                    large
                                    source={value}
                                    style={{
                                        borderRadius: 95,
                                        width: 150,
                                        height: 150
                                    }}/>
                            }
                        </View>
                    </TouchableOpacity>
                </View>

                <View>
                    {
                        touched && (
                            (error && <Text style={styles.errorText}>{error}</Text>) ||
                            (warning && <Text style={styles.warnText}>{warning}</Text>))
                    }
                </View>
            </View>
        );
    };
}

export default UploadImage