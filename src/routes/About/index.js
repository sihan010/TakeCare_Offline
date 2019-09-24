import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
    View, Text, StyleSheet, Linking, TouchableOpacity, Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FA from 'react-native-vector-icons/FontAwesome'
import { ScrollView } from 'react-native-gesture-handler';

class About extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'About',
            headerStyle: {
                backgroundColor: '#34495E',
            },
            headerTintColor: '#EAFAF1',
            headerTitleStyle: {
                flex: 1,
                alignSelf: 'center',
                textAlign: 'center',
                fontFamily: 'Share',
                marginLeft: -30
            },
            headerLeft: (
                <Icon
                    onPress={() => navigation.openDrawer()}
                    name="menu"
                    size={30}
                    color="#EAFAF1"
                    style={{ marginLeft: 5 }} />
            )
        };
    };

    fbPressed = (name) => {
        let url = 'https://www.fb.com/sihan010';
        if(name==='akash') url = 'https://www.fb.com/NilakAsh0049';
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                alert('Can\'t find him on facebook');
            }
        });
    }

    render() {
        return (
            <ScrollView>
                <Image
                    source={require('../../../assets/logo.png')}
                    resizeMode='cover'
                    style={{ height: 150, width: 150, alignSelf: 'center' }} />
                <Text style={{ fontFamily: 'Share', fontSize: 22, alignSelf: 'center', color: '#1f618d', marginBottom: 15 }}>Take Care</Text>
                <View style={styles.contentContainer}>
                    <Text style={styles.commonText}>Ideaবাজ</Text>
                    <Text style={styles.nameText}>Ariful আকাশ</Text>
                    <TouchableOpacity style={styles.fbButton} onPress={() => this.fbPressed('akash')}>
                        <Text style={styles.commonText}> Find আকাশ at</Text>
                        <FA name='facebook-square' color='#3b5998' size={30} style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.commonText}>Proগ্রাmmer</Text>
                    <Text style={styles.nameText}>Mohaimen সিহান </Text>
                    <TouchableOpacity style={styles.fbButton} onPress={() => this.fbPressed('sihan')}>
                        <Text style={styles.commonText}> Find সিহান at</Text>
                        <FA name='facebook-square' color='#3b5998' size={30} style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e9f7ef',
        margin: 10,
        padding: 10,
        borderRadius: 10
    },
    commonText: {
        fontFamily: 'Share',
        fontSize: 18
    },
    nameText: {
        fontFamily: 'Share',
        fontSize: 22
    },
    fbButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const AboutStack = createStackNavigator({
    'About': { screen: About }
}, {
    initialRouteName: 'About'
});

export default createAppContainer(AboutStack);
