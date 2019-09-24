import React from 'react';
import {View ,Text} from 'react-native';

const DoctorBadge = (props) => {
    return(
        <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            {
                props.position.map((item,key)=>{
                    return(
                        <View key={key} style={{backgroundColor:'#34495E', margin:3, padding:5, borderRadius:5}}>
                            <Text style={{fontFamily:'Share', fontSize:16, color:'#fff'}}>{item}</Text>
                        </View>
                    );
                })
            }
        </View>
    );
};

export default DoctorBadge;