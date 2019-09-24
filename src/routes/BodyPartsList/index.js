import React, { Component } from 'react';
import {
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import BodyParts from '../../components/BodyPartsList';

class BodyPartsList extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Category',
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
        return (
            <View >
                <BodyParts navigation={this.props.navigation} />
            </View>
        );
    }
}

export default BodyPartsList;
