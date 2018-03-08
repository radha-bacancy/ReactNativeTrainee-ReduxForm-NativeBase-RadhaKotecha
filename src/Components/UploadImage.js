import React from 'react';
import { TouchableOpacity, } from 'react-native';
import { Text, View, Thumbnail } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import styles from '.././Resources/Styles/styles';

let source;

const UploadImage = ({input:{ src }, meta: {touched, error, warning}}) => {

    const _uploadPic = () => {

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
                src = { uri: response.uri };
                source = src;
            }
        });
    };

    return(
        <View>
            <View style={{
                paddingTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TouchableOpacity onPress={_uploadPic}>
                    <View style={{
                        borderWidth: 0.5,
                        borderRadius: 95,
                        width: 150,
                        height: 150,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20
                    }}>
                        { ( source === '' || source === undefined )
                            ? <Text>Select a Photo</Text>
                            : <Thumbnail
                                large
                                source={source}
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

export default UploadImage