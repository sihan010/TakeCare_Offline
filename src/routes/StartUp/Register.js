import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, AsyncStorage, ToastAndroid} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StorageKeys from '../../constants/asyncStorageKeys.json';

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            phone:'',
            password:'',
            errorText:null
        };
    }

    handlePress = (v) =>{
        if(v==='in'){
            this.props.complete(false);
        }
        else if(v==='up'){
            if(this.state.name===''){
                this.setState({
                    errorText:'Your name is required'
                });
            }
            else if(this.state.phone===''){
                this.setState({
                    errorText:'Phone number is required'
                });
            }
            else if(this.state.phone.length!==11){
                this.setState({
                    errorText:'Phone number must be 11 digit'
                });
            }
            else if(this.state.password===''){
                this.setState({
                    errorText:'Password is required'
                });
            }            
            else{
                let d = {
                    name:this.state.name,
                    phone:this.state.phone,
                    password:this.state.password,
                    type:'p'
                };
                AsyncStorage.setItem(StorageKeys.User,JSON.stringify(d)).then(()=>{
                    ToastAndroid.show('Sign Up Successfull', ToastAndroid.SHORT);
                    this.props.complete(true);
                });                
            }
        }
    }

    render(){
        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{alignItems:'center', justifyContent:'center'}}>
                    <FontAwesome 
                        name='medkit' 
                        size={80} 
                        color='#C0392B' 
                        style={{textAlign:'center', padding:5, marginBottom:50}}
                    />
                    <Text style={styles.headerText}>Craete a new account</Text>
                    {
                        this.state.errorText?
                            <Text style={styles.errorText}>{this.state.errorText}</Text>
                            :
                            null
                    }
                    <TextInput 
                        style={styles.textInput} 
                        value={this.state.name}
                        placeholder='Name'
                        onChangeText={(c)=>this.setState({name:c})} />
                    <TextInput 
                        style={styles.textInput} 
                        value={this.state.phone} 
                        autoCompleteType='tel'
                        placeholder='Mobile Number'
                        onChangeText={(c)=>this.setState({phone:c})} />
                    <TextInput 
                        style={styles.textInput} 
                        password value={this.state.password} 
                        autoCompleteType='password'
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={(c)=>this.setState({password:c})} />
                    <TouchableOpacity style={styles.bigButton} onPress={()=>this.handlePress('up')}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <Text style={styles.subText}>Already have an account?</Text>
                    <TouchableOpacity onPress={()=>this.handlePress('in')}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style={{alignItems:'flex-end', justifyContent:'flex-end'}}
                    onPress={()=>this.props.change()}>
                    <Text style={styles.subText}>Change User Type</Text>          
                </TouchableOpacity>
            </ScrollView>
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
    },
    textInput:{
        borderWidth:1,
        borderColor:'#2E4053',
        borderRadius:10,
        backgroundColor:'#EBF5FB',
        fontFamily:'Share',
        fontSize:18,
        width:300,
        margin:5,
        textAlign:'center'
    },
    subText:{
        fontFamily:'Share',
        fontSize:18,
        color:'#2E4053'
    },
    errorText:{
        fontFamily:'Share',
        fontSize:18,
        color:'#C0392B'
    }
});

export default Register;