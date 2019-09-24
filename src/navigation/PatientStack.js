import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import BodyPartsList from '../routes/BodyPartsList';
import DoctorList from '../routes/DoctorList';
import MakeAppointment from '../routes/MakeAppointment';

const PatientStack = createStackNavigator({
  'Body Parts': {screen: BodyPartsList},
  'Doctors': {screen: DoctorList},
  'MakeAppointment':{screen:MakeAppointment}
},{
  initialRouteName:'Body Parts'
});

export default createAppContainer(PatientStack);