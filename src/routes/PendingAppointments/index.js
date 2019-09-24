import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { ButtonGroup } from 'react-native-elements';
import { View } from 'react-native';
import PendingAppointmentsList from '../../components/PendingAppointmentsList';
import PendingReviewsList from '../../components/PendingReviewsList';
import CompletedReviewsList from '../../components/CompletedReviewsList';

class PendingAppointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonGroupIndex: 0
        };
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Appointments',
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
                    onPress={() => navigation.openDrawer()}
                    name="menu"
                    size={30}
                    color="#EAFAF1"
                    style={{ marginLeft: 5 }} />
            )
        };
    };

    updatebuttonGroupIndex = (i) => {
        this.setState({
            buttonGroupIndex: i
        });
    }

    render() {
        const buttonGroupNames = ['Pending', 'Unreviewed', 'Completed'];
        const { buttonGroupIndex } = this.state;
        let renderContent;
        switch (buttonGroupIndex) {
            case 0: renderContent = <PendingAppointmentsList />;
                break;
            case 1: renderContent = <PendingReviewsList navigation={this.props.navigation} />;
                break;
            case 2: renderContent = <CompletedReviewsList />;
                break;
            default: renderContent = <PendingAppointmentsList />;
        }
        return (
            <View>
                <ButtonGroup
                    onPress={(i) => this.updatebuttonGroupIndex(i)}
                    selectedIndex={buttonGroupIndex}
                    buttons={buttonGroupNames}
                    containerBorderRadius={50}
                    selectedButtonStyle={{ backgroundColor: '#34495E' }}
                    textStyle={{ fontFamily: 'Share', fontSize: 18, color: '#34495E' }}
                />
                {renderContent}
            </View>
        );
    }
}

export default PendingAppointments;
