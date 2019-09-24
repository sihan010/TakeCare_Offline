import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    AsyncStorage,
    ToastAndroid,
    Image
} from 'react-native';
import styles from './style';
import { Rating } from 'react-native-elements';
import storageKeys from '../../constants/asyncStorageKeys.json';
import Icon from 'react-native-vector-icons/Feather';
import Position from '../../components/DoctorPositionBadge';
import Loading from '../../components/Loading';
import CameraComp from '../../components/CameraComp';
import ImagePicker from 'react-native-image-picker';

class ReviewAppointment extends Component {
    constructor(props) {
        super(props);
        let appointmentId = this.props.navigation.getParam('id');
        this.state = {
            appointmentId: appointmentId,
            appointment: null,
            rating: -1,
            imageUri: null,
            viewOptions: 0
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Review Appointment',
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

    componentDidMount() {
        let appointmentId = this.state.appointmentId;
        let appointment = {};
        AsyncStorage.getItem(storageKeys.PendingAppointment).then(res => {
            let data = JSON.parse(res);
            if (data && data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id === appointmentId)
                        appointment = data[i];
                }
            }
            this.setState({
                appointment: appointment
            });
        });
    }

    ratingGiven = (r) => {
        this.setState({
            rating: r
        });
    }

    toogleImageOption = (i) => {
        const options = {
            title: 'Select Prescription Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        if (i === 1) {
            ImagePicker.launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.uri };
                    this.imageUriChange(source.uri);
                }
            });
        }
        else {
            this.setState({
                viewOptions: i
            });
        }
    }

    imageUriChange = (uri) => {
        console.log('got img', uri);
        this.setState({
            imageUri: uri,
            viewOptions: 0
        });
    }

    submitReview = () => {
        if (this.state.imageUri && this.state.rating > 0) {
            let appointmentId = this.state.appointmentId;
            AsyncStorage.getItem(storageKeys.PendingAppointment).then(res => {
                let data = JSON.parse(res);
                if (data && data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].id === appointmentId){
                            data[i].reviewed=true;
                            data[i].doctor.rating = data[i].doctor.rating + this.state.rating;
                        }
                    }
                }
                AsyncStorage.setItem(storageKeys.PendingAppointment,JSON.stringify(data)).then(()=>{
                    ToastAndroid.show('Review Submitted Successfully', ToastAndroid.SHORT);
                });
            });            
        }
        else if (this.state.rating <= 0) {
            ToastAndroid.show('Please rate doctor\'s appointment', ToastAndroid.SHORT);
        }
        else if (!this.state.imageUri) {
            ToastAndroid.show('Please upload image of your Prescription', ToastAndroid.SHORT);
        }
    }

    render() {
        const mainView = this.state.appointment ?
            <ScrollView>
                <View style={styles.containter}>
                    <Text style={styles.doctorName}>{this.state.appointment.doctor.name}</Text>
                    <Text style={styles.specialization}>{this.state.appointment.doctor.degree}</Text>
                    <Text style={styles.chamber}>{this.state.appointment.doctor.chamber}</Text>
                    <Position position={this.state.appointment.doctor.position} />
                    <Text style={styles.date}>Appointment date: {this.state.appointment.date}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}>Rate the appointment out of 5
                        {this.state.rating > 0 ? <Icon name='check-circle' size={20} color='#229954' style={{ marginLeft: 10 }} /> : null}
                        </Text>
                        <Rating
                            imageSize={40}
                            onFinishRating={(r) => this.ratingGiven(r)}
                            startingValue={0}
                            //fractions={1}
                            ratingColor='#C0392B'
                            ratingCount={5}
                            type='heart'
                        />
                    </View>
                    <View style={styles.prescriptionContainer}>
                        <Text style={styles.rating}>Image of your prescription
                        {this.state.imageUri ? <Icon name='check-circle' size={20} color='#229954' style={{ marginLeft: 10 }} /> : null}
                        </Text>
                        <TouchableOpacity style={styles.prescriptionButton} onPress={() => this.toogleImageOption(1)}>
                            <Icon name='image' size={20} color='#D35400' style={{ marginHorizontal: 5 }} />
                            <Text style={styles.specialization}>From Gallary</Text>
                        </TouchableOpacity>
                        <Text style={styles.chamber}>OR</Text>
                        <TouchableOpacity style={styles.prescriptionButton} onPress={() => this.toogleImageOption(2)}>
                            <Icon name='camera' size={20} color='#8E44AD' style={{ marginHorizontal: 5 }} />
                            <Text style={styles.specialization}>From Camera</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={() => this.submitReview()}>
                    <Icon name='send' size={20} color='#2E4053' style={{ marginHorizontal: 5 }} />
                    <Text style={styles.specialization}>Submit Review</Text>
                </TouchableOpacity>
                {
                    this.state.imageUri ?
                        <Image source={{ isStatic: true, uri: this.state.imageUri }} style={styles.imageStyle} resizeMode='contain' /> : null
                }
            </ScrollView>
            :
            <Loading />;
        const cameraView = <CameraComp imageLink={(uri) => this.imageUriChange(uri)} />;
        let renderView;
        switch (this.state.viewOptions) {
            case 0: renderView = mainView;
                break;
            case 2: renderView = cameraView;
                break;
            default: renderView = mainView;
        }
        return renderView;
    }
}

export default ReviewAppointment;
