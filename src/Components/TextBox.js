import React from 'react';
import { View, Item, Input, Label, Text } from 'native-base';
import styles from "../Resources/Styles/styles";

const TextBox = ({
    placeholder,
    secureTextEntry,
    type,
    multiline,
    numberOfLines,
    input: { onChange, ...restInput },
    meta: {touched, error, warning}
}) => {
    return <View style={{padding: 1}}>
        <View>
            <Item floatingLabel>
                <Label style={{fontSize: 14}}>{placeholder}</Label>
                <Input
                    style={{justifyContent: 'flex-start'}}
                    underlineColorAndroid='transparent'
                    secureTextEntry={secureTextEntry}
                    type={type}
                    onChangeText={onChange}
                    numberOfLines={numberOfLines}
                    multiline={multiline}
                    { ...restInput }
                />
            </Item>
        </View>
        <View>
            {
                touched && (
                    (error && <Text style={styles.errorText}>{error}</Text>) ||
                    (warning && <Text style={styles.warnText}>{warning}</Text>))
            }
        </View>
    </View>
};
export default TextBox;