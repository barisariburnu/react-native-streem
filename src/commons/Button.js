import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

class Button extends Component {
    render() {
        return (
            <View style={styles.buttonViewStyle}>
                <Text style={styles.buttonTextStyle}>{this.props.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonViewStyle: {
        width: width * 0.71,
        height: height * 0.07,
        backgroundColor: '#53008C',
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTextStyle: {
        color: 'white'
    }
});

export default Button;
