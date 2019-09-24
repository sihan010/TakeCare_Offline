import React, { Component } from 'react';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';

class AppointmentCalander extends Component {
    constructor(props) {
        super(props);
        let today = new Date();
        let maxDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        this.state = {
            current: today,
            minDay:today,
            maxDay: maxDate
        };
    }

    arrowComponentChoser = (d) => {
        if (d == 'left') return <ArrowLeft />;
        else if (d == 'right') return <ArrowRight />;
    }

    trial = (day) =>{        
        let selected = new Date(day.timestamp);
        this.setState({
            current:selected
        },()=>{
            this.props.addMarked(day.dateString, Moment(this.state.current).format('dddd, DD MMMM YYYY'));
        });
        
    }

    render() {
        let newMarkedDates={...this.props.markedDates}; //important
        return (
            <Calendar
                current={this.state.current}
                minDate={this.state.minDay}
                maxDate={this.state.maxDay}
                onDayPress={(day) => this.trial(day)}
                //onDayLongPress={(day) => console.log('selected day', day)}
                monthFormat={'MMMM / yyyy'}
                renderArrow={(direction) => this.arrowComponentChoser(direction)}
                hideExtraDays={true}
                disableMonthChange={false}
                firstDay={0}
                hideDayNames={false}
                showWeekNumbers={false}
                markedDates={newMarkedDates}
                style={{
                    borderWidth: 1,
                    borderColor: '#34495E',
                    borderRadius: 5,
                    margin: 5,
                    padding: 5
                }}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    selectedDayTextColor: '#ffffff',
                    textDisabledColor: '#d9e1e8',
                    textSectionTitleColor: '#0e6251',
                    todayTextColor: '#21618c',
                    dayTextColor: '#2d4150',
                    textDayFontFamily: 'Share',
                    textMonthFontFamily: 'Share',
                    textDayHeaderFontFamily: 'Share',
                    textDayFontSize: 18,
                    textMonthFontSize: 22,
                    textDayHeaderFontSize: 18
                }}
            />
        );
    }
}

const ArrowLeft = () => {
    return (
        <Icon name='chevron-left' size={20} color='#34495E' />
    );
};

const ArrowRight = () => {
    return (
        <Icon name='chevron-right' size={20} color='#34495E' />
    );
};

export default AppointmentCalander;