import React, { Component } from 'react';
import { AsyncStorage, View, ScrollView, Text } from 'react-native';
import StorageKeys from '../../constants/asyncStorageKeys.json';
import PendingAppointmentsListItem from '../PendingListItem';
import Loading from '../Loading';
import Icon from 'react-native-vector-icons/FontAwesome';

class PendingReviewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingReviews: null,
            loading: true
        };
    }

    componentDidMount() {
        AsyncStorage.getItem(StorageKeys.PendingAppointment).then(data => {
            data = JSON.parse(data);
            console.log('async got', data);
            if (!data || data.length === 0 ) {
                this.setState({
                    pendingReviews: [],
                    loading: false
                });
            }
            else {
                let review = [];
                for(let i=0;i<data.length;i++){
                    if(!data[i].reviewed && !data[i].pending){
                        review.push(data[i]);
                    }
                }
                this.setState({
                    pendingReviews: review,
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
                        this.state.pendingReviews.length > 0 ?
                            this.state.pendingReviews.map((item, key) => {
                                return (
                                    <PendingAppointmentsListItem key={key} data={item} user='review' navigation={this.props.navigation} />
                                );
                            })
                            :
                            <View style={{flex:1, alignItems:'center',justifyContent:'center',marginTop:15}}>
                                <Icon name='check-circle' size={100} color='#16A085' style={{marginVertical:15}} />
                                <Text style={{fontFamily:'Share', fontSize:22, color:'#0b5345'}}>Congratulations ! No Pending Review Left</Text>
                            </View>
                    }
                </ScrollView>
        );
    }
}

export default PendingReviewsList;