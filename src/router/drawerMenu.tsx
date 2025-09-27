//import liraries
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Map from '../screens/maps';
import Notes from '../screens/Notes';
import Profile from '../screens/profile';
import CustomDrawerContent from '../components/router/customDrawerContent';
// create a component
const DrawerMenu : React.FC = () => {
    const Drawer = createDrawerNavigator();
  
  return (
    <Drawer.Navigator
    screenOptions={{
      //  headerShown:false,
        drawerType:"slide",
      //  drawerStyle:{width:300},
     
    }}
    drawerContent={(props)  => <CustomDrawerContent {...props} /> }
    >
      <Drawer.Screen name="Map" component={Map} />
      <Drawer.Screen name="Notes" component={Notes} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}
    


//make this component available to the app
export default DrawerMenu;
