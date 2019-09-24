import React, { Component } from 'react';
import {
    ScrollView, View, Text, TouchableOpacity, AsyncStorage, ToastAndroid
} from 'react-native';
import { Overlay } from 'react-native-elements';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import DoctorListItem from '../../components/DoctorListItem';
import AppointmentCalander from '../../components/AppointmentCalender';
import { doubleDigitMaker } from '../../utilities/Calander';
import styles from './styles';
import StorageKeys from '../../constants/asyncStorageKeys.json';

class BodyPartsList extends Component {
    constructor(props) {
        super(props);
        let doctorData = this.props.navigation.getParam('data');
        this.state = {
            markedDates: {},
            overlayIsVisibale: false,
            selectedDate: null,
            doctorData: doctorData,
            user:'',
            phone:''
        };
    }

    //mark todays date in calander
    componentDidMount() {
        let date = new Date();
        let dateString = date.getFullYear() + '-' + (doubleDigitMaker(date.getMonth() + 1)) + '-' + doubleDigitMaker(date.getDate());
        this.addToMarkedDates(dateString, Moment(date).format('dddd, DD MMMM YYYY'));

        AsyncStorage.getItem(StorageKeys.User).then(res=>{
            res=JSON.parse(res);
            this.setState({
                user:res.name,
                phone:res.phone
            });
        });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Set Appointment',
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
                    onPress={() => navigation.goBack()}
                    name="arrow-left"
                    size={30}
                    color="#EAFAF1"
                    style={{ marginLeft: 5 }} />
            )
        };
    };

    //submit Appointment and toogle modal
    submitAppointment = () => {
        let val = this.state.overlayIsVisibale;
        this.setState({
            overlayIsVisibale: !val
        });
    }

    //save data to localstore
    confirmAppointment = () => {
        AsyncStorage.getItem(StorageKeys.PendingAppointment).then(data => {
            data = JSON.parse(data);
            console.log('async', data);
            if (data) {
                let newId = data.length + 1;
                let appointmentEntry = {
                    id: newId,
                    pending: true,
                    reviewed: false,
                    doctor: this.state.doctorData,
                    date: this.state.selectedDate,
                    user: this.state.user,
                    phone:this.state.phone
                };
                data.push(appointmentEntry);
                AsyncStorage.setItem(StorageKeys.PendingAppointment, JSON.stringify(data)).then(res => {
                    console.log('added to list', res);
                });
            }
            else {
                let data = [];
                let newId = 1;
                let appointmentEntry = {
                    id: newId,
                    pending: true,
                    reviewed: false,
                    doctor: this.state.doctorData,
                    date: this.state.selectedDate,
                    user: this.state.user,
                    phone:this.state.phone
                };
                data.push(appointmentEntry);
                AsyncStorage.setItem(StorageKeys.PendingAppointment, JSON.stringify(data)).then(res => {
                    console.log('created and added to list', res);
                });
            }
        });
        ToastAndroid.show('Appointment was fixed successfully', ToastAndroid.SHORT);
        this.setState({
            overlayIsVisibale: false
        });
    }

    //toogle modal and go to review
    reviewPending = () => {
        this.submitAppointment();
        this.props.navigation.navigate('Review Appointments');
    }

    //prop for AppointmentCalander
    addToMarkedDates = (dateString, date) => {
        let markedDates = {};
        markedDates[dateString] = { selected: true, selectedColor: '#8e44ad' };
        this.setState({
            markedDates: markedDates,
            selectedDate: date
        });
    }

    render() {
        //let data = this.props.navigation.getParam('data');
        let data = this.state.doctorData;
        return (
            <ScrollView>
                <DoctorListItem
                    name={data.name}
                    degree={data.degree}
                    chamber={data.chamber}
                    rating={data.rating}
                    position={data.position}
                    confirmAction={() => this.submitAppointment()}
                />
                <View style={{ backgroundColor: 'black', height: 1 }} />
                <AppointmentCalander
                    markedDates={this.state.markedDates}
                    addMarked={(dateString, date) => this.addToMarkedDates(dateString, date)}
                />

                {/* Confirmation Overlay */}
                <Overlay
                    isVisible={this.state.overlayIsVisibale}
                    windowBackgroundColor='rgba(21, 67, 96,.9)'
                    overlayBackgroundColor='#ffffff'
                    borderRadius={10}
                    onBackdropPress={() => this.submitAppointment()}
                    width="95%"
                    height="70%">
                    <ScrollView>
                        <Text style={styles.greet}>Hello {this.state.user}!</Text>
                        <Text style={styles.text}>Thank you for using our service.</Text>
                        <View style={{ backgroundColor: 'black', height: 1, marginVertical: 5 }} />
                        <View style={styles.bodyContainer}>
                            <Text style={styles.text}>
                                You are about to fix an Appointment with
                                </Text>
                            <Text style={styles.doctorName}>
                                {` ${data.name}`}
                            </Text>
                            <Text style={styles.text}>
                                Chamber / Location
                            </Text>
                            <Text style={styles.chamberName}>
                                {` ${data.chamber}`}
                            </Text>
                            <Text style={styles.text}>
                                Your preferred date is
                                </Text>
                            <Text style={styles.date}>
                                {` ${this.state.selectedDate}`}
                            </Text>
                            <Text style={styles.confirmText}>
                                Do you want to confirm this appointment?
                                </Text>
                        </View>
                        <View style={styles.confirmContainer}>
                            <TouchableOpacity style={styles.confirm}
                                onPress={() => this.confirmAppointment()}>
                                <Icon style={{ marginRight: 5 }} name='user-check' size={20} color='#16A085' />
                                <Text style={styles.confirmText}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancel}
                                onPress={() => this.submitAppointment()}>
                                <Icon style={{ marginRight: 5 }} name='user-x' size={20} color='#b03a2e' />
                                <Text style={styles.confirmText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.reviewContainer}>
                            <TouchableOpacity style={styles.review}
                                onPress={() => this.reviewPending()}>
                                <Icon style={{ marginRight: 5 }} name='heart' size={20} color='#C0392B' />
                                <Text style={styles.confirmText}>Review Pending Appoinments</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Overlay>
            </ScrollView>
        );
    }
}



export default BodyPartsList;
