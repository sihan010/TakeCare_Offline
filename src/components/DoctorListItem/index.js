import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';
import DoctorBadge from '../DoctorPositionBadge';
import Icon from 'react-native-vector-icons/FontAwesome';

const DoctorListItem = (props) => {
    let param = {
        name: props.name,
        degree: props.degree,
        chamber: props.chamber,
        position: props.position,
        rating: props.rating
    };
    return (
        <View style={styles.containter}>
            <Text style={styles.doctorName}>{props.name}</Text>
            <Text style={styles.specialization}>Specialization: {props.degree}</Text>
            <Text style={styles.chamber}>Chamber: {props.chamber}</Text>
            <DoctorBadge position={props.position} />
            <View style={styles.actionContainer}>
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>Rating: {props.rating}/5 </Text>
                    <Rating
                        imageSize={20}
                        readonly={true}
                        startingValue={props.rating}
                        ratingColor='#C0392B'
                        ratingCount={5}
                        type='heart'
                    />
                </View>
                {
                    props.hasAppointmentButton ?
                        <TouchableOpacity style={styles.bookingContainer}
                            onPress={() => props.navigation.navigate('MakeAppointment', { data: param })}>
                            <Icon style={{marginRight:5}} name='plus-square' size={20} color='#16A085' />
                            <Text style={styles.rating}>Book an Appoinment</Text>
                        </TouchableOpacity> : null                        
                }
                {
                    props.confirmAction?
                        <TouchableOpacity style={styles.bookingContainer}
                            onPress={props.confirmAction}>
                            <Icon style={{marginRight:5}} name='check' size={20} color='#16A085' />
                            <Text style={styles.rating}>Submit Appoinment</Text>
                        </TouchableOpacity> : null
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containter: {
        marginVertical: 5,
        marginHorizontal: 5,
        padding: 5,
        borderRadius: 5,
        textAlign: 'center'
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    bookingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#16A085',
        borderRadius: 5,
        padding:5
    }
});

export default DoctorListItem;