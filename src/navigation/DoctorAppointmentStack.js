import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import DoctorCalender from '../routes/DoctorCalender';
import DoctorAppointmentList from '../routes/DoctorAppointmentList';

const DoctorAppointmentStack = createStackNavigator({
  'DoctorCalender': {screen: DoctorCalender},
  'DoctorAppointmentList': {screen: DoctorAppointmentList}
},{
  initialRouteName:'DoctorCalender'
});

export default createAppContainer(DoctorAppointmentStack);