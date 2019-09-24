import React, { Component } from 'react';
import {
    ScrollView, View, Text, TouchableOpacity, AsyncStorage, ToastAndroid, StyleSheet
} from 'react-native';
import { Overlay } from 'react-native-elements';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import DoctorListItem from '../../components/DoctorListItem';
import AppointmentCalander from '../../components/AppointmentCalender';
import { doubleDigitMaker } from '../../utilities/Calander';
import StorageKeys from '../../constants/asyncStorageKeys.json';

class DoctorCalander extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markedDates: {},
            selectedDate: null
        };
    }

    //mark todays date in calander
    componentDidMount() {
        let date = new Date();
        let dateString = date.getFullYear() + '-' + (doubleDigitMaker(date.getMonth() + 1)) + '-' + doubleDigitMaker(date.getDate());
        this.addToMarkedDates(dateString, Moment(date).format('dddd, DD MMMM YYYY'));
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Appointment Date',
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

    //prop for AppointmentCalander
    addToMarkedDates = (dateString, date) => {
        let markedDates = {};
        markedDates[dateString] = { selected: true, selectedColor: '#8e44ad' };
        console.log(date);
        this.setState({
            markedDates: markedDates,
            selectedDate: date
        });
    }

    render(){
        return(
            <View style={styles.containter}>
                <AppointmentCalander
                    markedDates={this.state.markedDates}
                    addMarked={(dateString, date) => this.addToMarkedDates(dateString, date)}
                />
                <TouchableOpacity style={styles.bookingContainer}
                    onPress={() => this.props.navigation.navigate('DoctorAppointmentList', { data: this.state.selectedDate })}>
                    <Icon style={{marginRight:5}} name='check' size={20} color='#16A085' />
                    <Text style={styles.rating}>See Patients List</Text>
                </TouchableOpacity>   
            </View>
            
        );
    }
}

const styles= StyleSheet.create({
    containter: {
        flex: 1,
        margin:5,
        padding: 5
    },
    bookingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#16A085',
        borderRadius: 5,
        padding:10,
        margin:10,
        width:250,
        alignSelf:'center'
    },
    rating: {
        fontFamily: 'Share',
        fontSize: 18,
        textAlign: 'center'
    }
});

export default DoctorCalander;