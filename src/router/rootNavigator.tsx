import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from '../screens/maps';
import Notes from '../screens/Notes';
import Profile from '../screens/profile';
import NotesAdd from '../screens/Notes/noteAdd';
import { MAPROUTES, NOTESROUTES, PROFILEROUTES } from '../utils/routes';



const RootNavigator: React.FC = () => {
    const Stack = createNativeStackNavigator();
    return (
         <Stack.Navigator
         screenOptions={{
            headerShown:true,
         }}>
      <Stack.Screen  
      options={{headerShown:false}} name={MAPROUTES.MAP} component={Map} />
      <Stack.Screen name={NOTESROUTES.NOTES} component={Notes} />
      <Stack.Screen name={NOTESROUTES.NOTEADD} component={NotesAdd} />

      <Stack.Screen name={PROFILEROUTES.PROFILE} component={Profile} />   
       </Stack.Navigator>
    )
}



export default RootNavigator
