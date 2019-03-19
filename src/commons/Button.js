import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

class Button extends Component {
    render() {
        return (
            <TouchableOpacity 
                style={styles.buttonViewStyle} 
                onPress={() => this.props.onPress()}
            >
                <Text style={styles.buttonTextStyle}>{this.props.text}</Text>
            </TouchableOpacity>
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
