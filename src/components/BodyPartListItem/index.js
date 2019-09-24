import React from 'react';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListItemWithLogo = (props) => {
    return (
        <ListItem
            leftAvatar={{
                rounded: true,
                title: props.name[0],
                titleStyle: { fontFamily: 'Share', color: '#fff' },
                overlayContainerStyle: { backgroundColor: '#d6eaf8' },
                source: props.logo ? props.logo : null,
                size: 'medium'
            }}
            badge={{
                value: props.found,
                status: 'success',
                textStyle: {
                    color: '#fff',
                    fontFamily: 'Share',
                    fontSize: 18,
                },
                badgeStyle: {
                    padding: 12,
                    borderRadius: 100
                },
                //onPress: () => props.navigation.navigate('Doctors', { bodyPart: props.name, bodyPartIndex: props.index })
            }}
            rightIcon={
                <Icon
                    name='chevron-right'
                    size={20}
                    color='#1A5276'
                    //onPress={() => props.navigation.navigate('Doctors', { bodyPart: props.name, bodyPartIndex: props.index })}
                />
            }
            containerStyle={{
                width: '100%',
                backgroundColor:'#d6eaf8', 
                borderRadius:5
            }}
            title={props.name}
            titleStyle={{
                fontFamily: 'Share',
                fontSize: 22,
                color: 'black'
            }}
            subtitle={props.subtitle}
            subtitleStyle={{
                fontFamily: 'Share',
                fontSize: 14,
                color: 'black'
            }}
        />

    );
};

export default ListItemWithLogo;