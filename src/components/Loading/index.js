import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image
} from 'react-native';

class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.contentContainer}>
                <Image
                    source={require('../../../assets/logo.png')}
                    resizeMode='cover'
                    style={styles.imageStyle} />
                <Text style={styles.appName}>Loading</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyle:{ 
        height: 150, 
        width: 150, 
        alignSelf: 'center' 
    },
    appName:{ 
        fontFamily: 'Share', 
        fontSize: 18, 
        alignSelf: 'center', 
        color: 'black'
    }
});

export default Loading;
