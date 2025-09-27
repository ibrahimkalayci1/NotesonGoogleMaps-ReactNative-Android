//import liraries
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteType } from '../routes/RouteType';
import { Logout, Profile } from 'iconsax-react-nativejs';
import DrawerMenuIcon from './drawerMenuIcon';

type Props = RouteType<'CustomDrawerContent'>;

// create a component
const CustomDrawerContent: React.FC<Props> = props => {
  const { navigation } = props;
  return (
    <DrawerContentScrollView contentContainerStyle={{flex:1, backgroundColor:"white"}} >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: '#D9E3FD',
            width: 80,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
          }}
        >
          <Profile size={32} color="#697689" variant="Bold" />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: 'black',
            }}
          >
            İbrahim KALAYCI{' '}
          </Text>
          <Text style={{ color: 'gray', fontSize: 16 }}>
            {' '}
            İbrahimkalayci1990@hotmail.com{' '}
          </Text>
        </View>
      </View>
      
   <View style={{marginTop:50,flex:1}}>
   {props.state.routes?.map((item,index) => (
        <DrawerItem
        
        style={{ borderRadius:8,marginVertical:5,paddingVertical:5}}
        icon={()   => <DrawerMenuIcon name= {item.name}  />}
        key={index}
          label={item.name}
          onPress={() => navigation.navigate(item.name)}
        />
      ))}
   </View>

      <TouchableOpacity style={{flexDirection:"row",
        alignItems:"center"
      }}  >
        <Logout  size={28} color='red' />
        <Text style={{fontSize:20, marginLeft:10 }} >Çıkış Yap</Text>
      </TouchableOpacity>

    </DrawerContentScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default CustomDrawerContent;
