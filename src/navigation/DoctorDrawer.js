import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DoctorAppointmentStack from './DoctorAppointmentStack';
import Setting from '../routes/Settings';
import About from '../routes/About';

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}>
        <FontAwesome 
          name='close' 
          size={28} 
          color='#F9EBEA' 
          style={{textAlign:'right', padding:5}} 
          onPress={()=>props.navigation.closeDrawer()} 
        />
        <FontAwesome 
          name='medkit' 
          size={80} 
          color='#C0392B' 
          style={{textAlign:'center', padding:5}}
        />
      <DrawerNavigatorItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems:'center',
    // justifyContent:'center'
  },
});

const DoctorDrawer = createDrawerNavigator({
  'Appointments': {
    screen: DoctorAppointmentStack,
    navigationOptions: {
      drawerLabel: 'Appointments',
      drawerIcon: (
        <FontAwesome name='hospital-o' size={26} color='#D0ECE7' />
      ),
    }
  },
  'Setting': {
    screen: Setting,
    navigationOptions: {
      drawerLabel: 'Setting',
      drawerIcon: (
        <FontAwesome name='gear' size={26} color='#D0ECE7' />
      ),
    }
  },
  'About': {
    screen: About,
    navigationOptions: {
      drawerLabel: 'About',
      drawerIcon: (
        <FontAwesome name='info' size={26} color='#D0ECE7' />
      ),
    }
  }
}, {
    drawerBackgroundColor: 'rgba(21, 67, 96,.9)',
    drawerType: 'front',
    initialRouteName:'Appointments',
    //drawerWidth: 250,
    keyboardDismissMode: 'on-drag',
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      activeTintColor: '#D0ECE7',
      activeBackgroundColor: '#1B4F72',
      inactiveTintColor: '#D0ECE7',
      itemsContainerStyle: {
        width: '100%'
      },
      labelStyle: {
        // flex: 1,
        // alignSelf: 'center',
        // textAlign: 'center',
        fontFamily: 'Share',
        fontWeight: 'normal',
        fontSize: 16
      }
    }
  });

export default createAppContainer(DoctorDrawer);