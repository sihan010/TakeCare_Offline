import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Keys from '../../constants/asyncStorageKeys.json';

class StartUp extends Component {
    constructor(props){
        super(props);
    }

    saveLanguage = (data) =>{
        AsyncStorage.setItem(Keys.Language, JSON.stringify(data)).then(()=>{
            this.props.complete(data);
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <FontAwesome 
                    name='medkit' 
                    size={80} 
                    color='#C0392B' 
                    style={{textAlign:'center', padding:5, marginBottom:50}}
                />
                <Text style={styles.headerText}>Your preferred language</Text>
                <TouchableOpacity style={styles.bigButton} onPress={()=>this.saveLanguage('en')}>
                    <Text style={styles.buttonText}>English</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bigButton}  onPress={()=>this.saveLanguage('bn')}>
                    <Text style={styles.buttonText}>বাংলা</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    bigButton:{
        margin:10,
        padding:10,
        width:200,
        borderWidth:2,
        borderColor:'#6C3483',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText:{
        fontFamily:'Share',
        fontSize:24,
        color:'#2E4053'
    },
    headerText:{
        fontFamily:'Share',
        fontSize:30,
        color:'#2874A6',
        marginBottom:30
    }
});

export default StartUp;