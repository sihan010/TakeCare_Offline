import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image
} from 'react-native';

class Splash extends Component {
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
                <Text style={styles.appName}>Take Care</Text>
                <Text style={styles.subName}>Powered By</Text>
                <Image
                    source={require('../../../assets/company.png')}
                    resizeMode='cover'/>
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
        fontSize: 30, 
        alignSelf: 'center', 
        color: '#1f618d', 
        marginBottom: 15 
    },
    subName:{ 
        fontFamily: 'Share', 
        fontSize: 22, 
        alignSelf: 'center',
        marginTop: 100
    }
});

export default Splash;
