import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, ImageBackground, Dimensions, Image, TouchableOpacity 
} from 'react-native';
import RNGoolePlaces from 'react-native-google-places';
import Button from '../commons/Button';
import { strings } from '../lang/Strings';

const { width, height } = Dimensions.get('window');

class Form extends Component {

    state = {
        yourLocation: '',
        itsLocation: '',
        yourLngLat: [],
        itsLngLat: [],
        yourImgOk: require('../img/ok.png'),
        itsImgOk: require('../img/ok.png')
    }

    componentWillMount() {
        this.setState({
            yourLocation: strings.yourLocation,
            itsLocation: strings.itsLocation
        });
    }

    renderSection(text, onPress, img) {
        return (
            <View style={styles.section}>
                <TouchableOpacity style={styles.subSection} onPress={() => onPress}>
                    <Text style={styles.textStyle}>{text}</Text>                    
                    <Image source={img} />
                </TouchableOpacity>
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

    openSearchModel(type) {
        RNGoolePlaces.openAutocompleteModal()
        .then((place) => {
            if (type === 'your') {
                this.setState({ 
                    yourLocation: place.name,
                    yourImgOk: require('../img/check.png'),
                    yourLngLat: [place.latitude, place.longitude]
                });
            } else {
                this.setState({ 
                    itsLocation: place.name,
                    itsImgOk: require('../img/check.png'),
                    itsLngLat: [place.latitude, place.longitude]
                 });
            }
        })
        .catch(error => console.log(error.message));
    }

    render() {
        return (
            <ImageBackground source={require('../img/bg.png')} style={styles.imageBackgroundStyle}>

                <Image source={require('../img/logo.png')} />

                { this.renderSection(
                    this.state.yourLocation, 
                    () => this.openSearchModel('your'), 
                    this.state.yourImgOk
                )}

                { this.renderSection(
                    this.state.itsLocation, 
                    () => this.openSearchModel('its'), 
                    this.state.itsImgOk
                )}

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
