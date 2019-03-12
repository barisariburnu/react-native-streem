import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Image } from 'react-native';
import Button from '../commons/Button';
import { strings } from '../lang/Strings';

const { width, height } = Dimensions.get('window');

class Form extends Component {

    renderSection(text) {
        return (
            <View style={styles.section}>
                <View style={styles.subSection}>
                    <Text style={styles.textStyle}>{text}</Text>                    
                    <Image source={require('../img/ok.png')} />
                </View>
            </View>
        );
    }

    renderPickerButton(text) {
        return (
            <View>
                <View style={styles.pickerButtonStyle}>
                    <Image source={require('../img/add.png')} />
                </View>
                <Text style={styles.pickerTextStyle}>{text}</Text>
            </View>
        );
    }

    render() {
        return (
            <ImageBackground source={require('../img/bg.png')} style={styles.imageBackgroundStyle}>

                <Image source={require('../img/logo.png')} />

                { this.renderSection(strings.yourLocation) }

                { this.renderSection(strings.itsLocation) }

                <View style={styles.pickerMainViewStyle}>
                    { this.renderPickerButton(strings.yourPhoto) }
                    { this.renderPickerButton(strings.itsPhoto) }
                </View>

                <Button text={strings.createRoadMap} />

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    imageBackgroundStyle: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center'
    },    
    section: { 
        marginTop: 10,
        backgroundColor: 'white', 
        borderRadius: 10,
        width: width * 0.59,
        height: height * 0.05,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    subSection: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    textStyle: {
        flex: 19
    },
    pickerMainViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.59,
        marginTop: 20
    },
    pickerButtonStyle: {
        width: width * 0.24,
        height: width * 0.24,
        borderRadius: (width * 0.24) / 2,
        backgroundColor: 'white',
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pickerTextStyle: {
        width: width * 0.24,
        textAlign: 'center',
        color: 'white',
        marginTop: 10
    },
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

export default Form;
