import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from '../Resources/Styles/styles'

const Btn = (props) => {
    return(
        <View style={styles.btnContainer}>
            <TouchableOpacity onPress={props.onPress}>
                <View style={styles.btn}>
                    <Text style={{color: '#000'}}> {props.children} </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Btn