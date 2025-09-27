//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {RouteType} from "../routes/RouteType"
import { Map, Note, User } from 'iconsax-react-nativejs';


type Props = RouteType<"drawerMenuIcon">

const DrawerMenuIcon: React.FC<Props> = ({name}) => {
   switch (name) {
    case "Map": return <Map size ={28} color="black" variant="Bold" />
    case "Notes": return <Note size ={28} color="black" variant="Bold" />
    case "Profile": return <User size ={28} color="black" variant="Bold" />
        
   }
};



//make this component available to the app
export default DrawerMenuIcon;
