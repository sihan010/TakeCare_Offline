import React, { Component } from 'react';
import { AsyncStorage, View, ScrollView, Text } from 'react-native';
import StorageKeys from '../../constants/asyncStorageKeys.json';
import PendingAppointmentsListItem from '../PendingListItem';
import Loading from '../Loading';
import Icon from 'react-native-vector-icons/FontAwesome';

class CompletedReviewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completedReviews: null,
            loading: true
        };
    }

    componentDidMount() {
        AsyncStorage.getItem(StorageKeys.PendingAppointment).then(data => {
            data = JSON.parse(data);
            console.log('async got', data);
            if (!data || data.length === 0 ) {
                this.setState({
                    completedReviews: [],
                    loading: false
                });
            }
            else {
                let complete = [];
                for(let i=0;i<data.length;i++){
                    if(!data[i].pending && data[i].reviewed){
                        complete.push(data[i]);
                    }
                }
                this.setState({
                    completedReviews: complete,
                    loading: false
                });
            }
        });
    }

    render() {
        return (
            this.state.loading ?
                <Loading />
                :
                <ScrollView>
                    {
                        this.state.completedReviews.length > 0 ?
                            this.state.completedReviews.map((item, key) => {
                                return (
                                    <PendingAppointmentsListItem key={key} data={item} user='complete' navigation={null} />
                                );
                            })
                            :
                            <View style={{flex:1, alignItems:'center',justifyContent:'center',marginTop:15}}>
                                <Icon name='exclamation-circle' size={100} color='#F4D03F' style={{marginVertical:15}} />
                                <Text style={{fontFamily:'Share', fontSize:22}}>No Completed Appointments !</Text>
                            </View>
                    }
                </ScrollView>
        );
    }
}

export default CompletedReviewsList;