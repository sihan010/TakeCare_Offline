import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import PendingReviews from '../routes/PendingAppointments';
import ReviewAppointment from '../routes/ReviewAppointment';

const ReviewStack = createStackNavigator({
  'Pending Reviews': {screen: PendingReviews},
  'Review Appointment': {screen: ReviewAppointment}
},{
  initialRouteName:'Pending Reviews'
});

export default createAppContainer(ReviewStack);