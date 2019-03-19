import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');

class Map extends Component {

    state = {
        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        },
        origin: {
            latitude: 0,
            longitude: 0
        },
        destination: {
            latitude: 0,
            longitude: 0
        },
        googleMapsApiKey: 'AIzaSyDOIJiwb63xR9mM8cUPfvdaAWs1z-vg8Wc'
    }

    componentWillMount() {
        const { yourLngLat, itsLngLat } = this.props.data;

        this.setState({
            region: {
                latitude: yourLngLat[0],
                longitude: yourLngLat[1],
                latitudeDelta: 5,
                longitudeDelta: 5
            },
            origin: { 
                latitude: yourLngLat[0],
                longitude: yourLngLat[1], 
            },
            destination: {
                latitude: itsLngLat[0],
                longitude: itsLngLat[1],
            }
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapView 
                    style={{ ...StyleSheet.absoluteFillObject }} 
                    region={this.state.region} 
                >
                    <MapViewDirections 
                        origin={this.state.origin}
                        destination={this.state.destination}
                        apikey={this.state.googleMapsApiKey}
                        strokeWidth={6}
                        strokeColor="#05B3FD"
                    />
                    <Marker coordinate={this.state.origin} />
                    <Marker coordinate={this.state.destination} />
                </MapView>

                <TouchableOpacity onPress={() => console.log('This is awesome!')}>
                    <Image 
                        style={styles.buttonStyle} 
                        source={require('../img/button.png')}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        marginTop: height - 80,
        marginRight: width - 80
    }
});

export default Map;
