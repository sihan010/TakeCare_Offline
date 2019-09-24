import React from 'react';
import { ListItem } from 'react-native-elements';
import { Linking, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListItemWithLogo = (props) => {

    const callAmbulance = (phone) => {
        console.log('callNumber ----> ', phone);
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${phone}`;
        }
        else {
            phoneNumber = `tel:${phone}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Can not call this number');
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <ListItem
            rightIcon={
                <Icon
                    name='phone-square'
                    size={40}
                    style={{margin:5}}
                    color='#1e8449'
                    onPress={() => callAmbulance(props.phone)}
                />
            }
            containerStyle={{
                width: '100%',
                backgroundColor: '#f1f1f1',
                margin: 5,
                padding: 5,
                borderRadius: 10
            }}
            title={props.hospitalName}
            titleStyle={{
                fontFamily: 'Share',
                fontSize: 22,
                color: 'black'
            }}
            subtitle={props.phone}
            subtitleStyle={{
                fontFamily: 'Share',
                fontSize: 16,
                color: 'black'
            }}
        />

    );
};

export default ListItemWithLogo;