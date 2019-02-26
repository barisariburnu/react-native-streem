import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Form from './components/Form';

class Root extends Component {
    render() {
        return (
            <Router>
                <Scene key='Root'>
                    <Scene key='Form' component={Form} hideNavBar initial />
                </Scene>
            </Router>
        );
    }
}

export default Root;
