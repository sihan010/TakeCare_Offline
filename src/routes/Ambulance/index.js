import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
    View, Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ambulances from '../../constants/ambulance.json';
import AmbulanceListItem from '../../components/AmbulanceListItem';

class Ambulance extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Ambulance',
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

    render() {
        const renderView = Ambulances.map((item,key)=>{
            return(
                <AmbulanceListItem key={key} hospitalName={item.hospitalName} phone={item.phone} />
            );
        });
        return renderView;
    }
}

const AmbulanceStack = createStackNavigator({
    'Ambulance': { screen: Ambulance }
}, {
    initialRouteName: 'Ambulance'
});

export default createAppContainer(AmbulanceStack);
