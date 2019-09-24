import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';
import Position from '../DoctorPositionBadge';
import Icon from 'react-native-vector-icons/FontAwesome';

class PendingAppointmentsListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let date = '';
        switch (this.props.user) {
            case 'pending':
                date = <Text style={{ ...styles.date, color: '#138D75' }}>Pending: {this.props.data.date}</Text>;
                break;
            case 'review':
                date = null;
                break;
            case 'complete':
                date = <Text style={{ ...styles.date, color: '#C0392B' }}>Completed: {this.props.data.date}</Text>;
                break;
            default:
                date = null;
        }
        return (
            this.props.data ?
                <View style={styles.containter}>
                    <Text style={styles.doctorName}>{this.props.data.doctor.name}</Text>
                    <Text style={styles.specialization}>{this.props.data.doctor.degree}</Text>
                    <Text style={styles.chamber}>{this.props.data.doctor.chamber}</Text>
                    <Position position={this.props.data.doctor.position} />
                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}>Rating: {this.props.data.doctor.rating}/5 </Text>
                        <Rating
                            imageSize={20}
                            readonly={true}
                            startingValue={this.props.data.doctor.rating}
                            ratingColor='#C0392B'
                            ratingCount={5}
                            type='heart'
                        />
                        {
                            this.props.user === 'review' ?
                                <TouchableOpacity style={styles.bookingContainer} onPress={() => this.props.navigation.navigate('Review Appointment', { id: this.props.data.id })}>
                                    <Icon style={{ marginRight: 5 }} name='star' size={20} color='#C0392B' />
                                    <Text style={styles.rating}>Review Now</Text>
                                </TouchableOpacity>
                                :
                                null
                        }
                    </View>
                    {date}
                </View>
                :
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                    <Text style={{ fontFamily: 'Share', fontSize: 22, color: '#0b5345' }}>Whazzap Man !!</Text>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    containter: {
        marginVertical: 5,
        marginHorizontal: 5,
        padding: 5,
        borderRadius: 10,
        textAlign: 'center',
        backgroundColor: '#f1f1f1'
    },
    bookingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#52BE80',
        borderRadius: 5,
        padding: 5
    },
    doctorName: {
        fontFamily: 'Share',
        fontSize: 22,
        textAlign: 'center'
    },
    specialization: {
        fontFamily: 'Share',
        fontSize: 18,
        textAlign: 'center'
    },
    chamber: {
        fontFamily: 'Share',
        fontSize: 16,
        textAlign: 'center'
    },
    rating: {
        fontFamily: 'Share',
        fontSize: 18,
        textAlign: 'center'
    },
    ratingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    date: {
        fontFamily: 'Share',
        fontSize: 20,
        textAlign: 'center'
    }
});

export default PendingAppointmentsListItem;