import React, {Component} from 'react';
import {ScrollView,View} from 'react-native';
import DoctorListItem from '../DoctorListItem';

class DoctorList extends Component{
    render(){
        return(
            <ScrollView>
                {
                    this.props.dortorList.map((item,key)=>{
                        return(
                            <View key={key}>
                                <DoctorListItem                                    
                                    name={item.name} 
                                    degree={item.degree} 
                                    chamber={item.chamber} 
                                    rating={item.rating} 
                                    position={item.position} 
                                    hasAppointmentButton={true}
                                    navigation={this.props.navigation}
                                />
                                <View style={{backgroundColor:'black', height:1}}/>
                            </View>
                        );
                    })
                }
            </ScrollView>
        );
    }
}

export default DoctorList;