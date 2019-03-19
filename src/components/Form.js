import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, ImageBackground, Dimensions, Image, TouchableOpacity 
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import RNGoolePlaces from 'react-native-google-places';
import ImagePicker from 'react-native-image-picker';
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
        itsImgOk: require('../img/ok.png'),
        yourPhoto: '',
        itsPhoto: ''
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

    renderPickerButton(text, onPress) {
        return (
            <TouchableOpacity onPress={() => onPress}>
                <View style={styles.pickerButtonStyle}>
                    <Image source={require('../img/add.png')} />
                </View>
                <Text style={styles.pickerTextStyle}>{text}</Text>
            </TouchableOpacity>
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

    openImagePicker(type) {
        const options = {
            title: strings.imagePickerTitle,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
            takePhotoButtonTitle: strings.takePhotoButtonTitle,
            chooseFromLibraryButtonTitle: strings.chooseFromLibraryButtonTitle,
            cancelButtonTitle: strings.cancelButtonTitle,
            maxWidth: 500,
            maxHeight: 500,
            quality: 0.5
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };

                if (type === 'your') {
                    this.setState({
                        yourPhoto: source
                    });
                } else {
                    this.setState({
                        itsPhoto: source
                    });
                }
            }
        });
    }

    showPhoto(type, text, onPress) {
        return (
            <TouchableOpacity onPress={() => onPress}>
                <Image 
                    source={type === 'your' ? this.state.yourPhoto : this.state.itsPhoto} 
                    styl={styles.photoStyle}
                />
                <Text style={styles.pickerTextStyle}>{text}</Text>
            </TouchableOpacity>
        );
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
                    { 
                        this.state.yourPhoto !== '' ? 
                        this.showPhoto(
                            'your',
                            strings.yourPhoto, 
                            () => this.openImagePicker('your')
                        ) :
                        this.renderPickerButton(
                            strings.yourPhoto, 
                            () => this.openImagePicker('your')
                        )
                    }
                    { 
                        this.state.itsPhoto !== '' ? 
                        this.showPhoto(
                            'its',
                            strings.itsPhoto, 
                            () => this.openImagePicker('its')
                        ) :
                        this.renderPickerButton(
                            strings.itsPhoto, 
                            () => this.openImagePicker('its')
                        )
                    }
                </View>

                <Button 
                    text={strings.createRoadMap} 
                    onPress={() => Actions.Map({
                        data: {
                            yourLngLat: this.state.yourLngLat,
                            itsLngLat: this.state.itsLngLat,
                            yourPhoto: this.state.yourPhoto,
                            itsPhoto: this.state.itsPhoto
                        }
                    })}
                />

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
        alignItems: 'center'
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
    },
    photoStyle: {
        width: width * 0.24,
        height: width * 0.24,
        borderRadius: (width * 0.24) / 2
    }
});

export default Form;
