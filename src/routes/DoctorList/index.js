import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ListOfDoctors from '../../components/ListOfDoctors';
import partsList from '../../constants/BodyParts.json';

class DoctorList extends Component {
    constructor(props){
        super(props);
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.getParam('bodyPart','?')+' Specialists',
            headerStyle: {
                backgroundColor: '#34495E',
            },
            headerTintColor: '#EAFAF1',
            headerTitleStyle: {
                flex: 1,
                alignSelf: 'center',
                textAlign: 'center',
                fontFamily:'Share',
                marginLeft:-30
            },
            headerLeft: (
                <Icon 
                    onPress={() => navigation.goBack()} 
                    name="arrow-left" 
                    size={30} 
                    color="#EAFAF1"
                    style={{marginLeft:5}} />                
            )   
        };
    };
    render() {
        const bodyPartIndex = this.props.navigation.getParam('bodyPartIndex',0);
        let item = partsList[bodyPartIndex];
        return (
            <ListOfDoctors dortorList={item.doctors} navigation={this.props.navigation} />
        );
    }
}

export default DoctorList;
