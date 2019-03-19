import React, { Component } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

class Map extends Component {

    state = {
        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
    }

    componentWillMount() {
        const { yourLngLat } = this.props.data;

        this.setState({
            region: {
                latitude: yourLngLat[0],
                longitude: yourLngLat[1],
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
        });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <MapView 
                    style={{ flex: 1 }} 
                    region={this.state.region} 
                />
            </View>
        );
    }
}

export default Map;
