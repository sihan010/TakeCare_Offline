import React, {Component} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import BodyPartListItem from '../BodyPartListItem';
import partsList from '../../constants/BodyParts.json';

class BodyPartsList extends Component{
    constructor(props){
        super(props);
        this.state={
            logos:{}
        };
    }

    componentDidMount(){
        let logos={};
        logos['Accident & Emergency'] = require('../../../assets/png/first-aid-kit.png');
        logos['General Medicine'] = require('../../../assets/png/pills-1.png');
        logos['Blood'] = require('../../../assets/png/blood-sample.png');
        logos['Heart'] = require('../../../assets/png/cardiogram.png');
        logos['Head'] = require('../../../assets/png/brain-1.png');
        logos['Eye'] = require('../../../assets/png/eye.png');
        logos['Ear'] = require('../../../assets/png/ear.png');
        logos['Nose'] = require('../../../assets/png/nose.png');
        logos['Throat'] = require('../../../assets/png/thin.png');
        logos['Chest'] = require('../../../assets/png/lungs-1.png');
        logos['Belly / Stomach'] = require('../../../assets/png/stomach-1.png');
        logos['Bone'] = require('../../../assets/png/bone.png');
        logos['Skin'] = require('../../../assets/png/arm-1.png');
        logos['Kidney'] = require('../../../assets/png/kidney.png');
        logos['Liver'] = require('../../../assets/png/liver.png');
        logos['Women'] = require('../../../assets/png/women.png');
        logos['Men'] = require('../../../assets/png/men.png');
        this.setState({
            logos
        });
    }
    
    render(){
        return(
            <ScrollView>
                {
                    partsList.map((item,key)=>{                   
                        return(
                            <View key={key} style={{margin:5}}>
                                <TouchableOpacity                                
                                    onPress={() => this.props.navigation.navigate('Doctors', { bodyPart: item.name, bodyPartIndex: key })}>
                                    <BodyPartListItem 
                                        name={item.name} 
                                        subtitle={item.subTitle}
                                        found={item.found}
                                        logo={this.state.logos[item.name]}
                                    />
                                </TouchableOpacity>
                                {/* <View style={{backgroundColor:'#212f3c', height:2}}/> */}
                            </View>
                        );
                    })
                }
            </ScrollView>
        );
    }
}

export default BodyPartsList;