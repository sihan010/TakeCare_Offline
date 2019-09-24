import React, { Component } from 'react';
import {
    ScrollView, View, Text, AsyncStorage, ToastAndroid, StyleSheet
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import FA from 'react-native-vector-icons/FontAwesome';
import StorageKeys from '../../constants/asyncStorageKeys.json';
import Loading from '../../components/Loading';

class DoctorCalander extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            date: null,
            appointments: [],
            checkbox: []
        };
    }

    //mark todays date in calander
    componentDidMount() {
        let date = this.props.navigation.getParam('data');
        AsyncStorage.getItem(StorageKeys.PendingAppointment).then(res => {
            if (res && res.length > 0) {
                res = JSON.parse(res);
                let checkbox = [];
                let appointments= [];
                for (let i = 0; i < res.length; i++) {
                    if(res[i].date===date){
                        appointments.push(res[i]);
                        if (res[i].pending) {
                            checkbox.push(false);
                        }
                        else checkbox.push(true);
                    }
                }
                this.setState({
                    date: date,
                    loading: false,
                    appointments: appointments,
                    checkbox: checkbox
                });
            }
        });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Patient List',
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

    markchecked = (i, id) => {
        let checkbox = [...this.state.checkbox];
        checkbox[i] = !checkbox[i];
        this.setState({
            checkbox: checkbox
        });
        console.log(i,id);
        AsyncStorage.getItem(StorageKeys.PendingAppointment).then(res => {
            if (res && res.length > 0) {
                res = JSON.parse(res);
                for (let i = 0; i < res.length; i++) {
                    if(res[i].id===id){
                        res[i].pending = !res[i].pending;
                    }
                }                
                AsyncStorage.setItem(StorageKeys.PendingAppointment, JSON.stringify(res)).then(() => {
                    ToastAndroid.show('Successfully changed appointment status', ToastAndroid.SHORT);
                });
            }
        });
    }

    render() {
        return (
            this.state.loading ? <Loading /> :
                <ScrollView>
                    {
                        this.state.appointments.length>0?
                            this.state.appointments.map((item, key) => {
                                return (
                                    <View key={key} style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={styles.item}>
                                            <Text style={styles.name}>{item.user}</Text>
                                            <Text style={styles.phone}>Mobile: {item.phone}</Text>
                                        </View>
                                        <CheckBox containerStyle={styles.checkbox} checked={this.state.checkbox[key]} onPress={() => this.markchecked(key,item.id)} />
                                    </View>
                                );
                            })
                        :
                        <View style={{flex:1, alignItems:'center',justifyContent:'center',marginTop:15}}>
                            <FA name='exclamation-circle' size={100} color='#A93226' style={{marginVertical:15}} />
                            <Text style={{fontFamily:'Share', fontSize:22, color:'#1F618D'}}>Sorry ! No Appoinments for today.</Text>
                        </View>
                    }
                </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkbox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontFamily: 'Share',
        fontSize: 20,
        color: '#2E4053'
    },
    phone: {
        fontFamily: 'Share',
        fontSize: 16,
        color: '#2E4053'
    }
});

export default DoctorCalander;