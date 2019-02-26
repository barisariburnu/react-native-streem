import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Form extends Component {
    render() {
        return (
            <View style={style.container}>
                <Text>
                    Merhaba Dünya!
                </Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'green', 
        alignItems: 'center', 
        justifyContent: 'center'
    }
});

export default Form;
