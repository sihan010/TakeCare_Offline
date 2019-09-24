import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
    View, Text, AsyncStorage, Picker, StyleSheet, ScrollView, ToastAndroid
} from 'react-native';
import StorageKeys from '../../constants/asyncStorageKeys.json';
import Icon from 'react-native-vector-icons/Feather';

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLang: 'en'
        };
    }

    componentDidMount() {
        AsyncStorage.getItem(StorageKeys.Language).then(res => {
            res = JSON.parse(res);
            this.setState({
                selectedLang: res
            });
        });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Setting',
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

    changeLanguage = (itemValue) => {
        this.setState({ selectedLang: itemValue });
        AsyncStorage.setItem(StorageKeys.Language, JSON.stringify(itemValue)).then(() => {
            ToastAndroid.show('Language Successfully Changed', ToastAndroid.SHORT);
        });
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.item}>
                    <View style={styles.caption}>
                        <Text style={{ fontFamily: 'Share', fontSize: 20 }}>Language</Text>
                    </View>
                    <View style={styles.option}>
                        <Picker
                            selectedValue={this.state.selectedLang}
                            mode='dropdown'
                            onValueChange={(itemValue) => this.changeLanguage(itemValue)}>
                            <Picker.Item label="English" value="en" />
                            <Picker.Item label="Bangla" value="bn" />
                        </Picker>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        padding:5,
        backgroundColor:'#f1f1f1',
        borderRadius:10
    },
    caption: {
        flex: 2,
        justifyContent: 'center'
    },
    option: {
        flex: 1
    }
});

const SettingStack = createStackNavigator({
    'Setting': { screen: Setting }
}, {
    initialRouteName: 'Setting'
});

export default createAppContainer(SettingStack);
