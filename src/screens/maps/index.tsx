import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import { GOOGLE_MAPS_API_KEY } from '@env';

import {
  AddCircle,
  ArrowCircleRight,
  ArrowForwardSquare,
  I3Dcube,
  Location,
  LocationAdd,
  SecurityUser,
  Send2,
  Stickynote,
} from 'iconsax-react-nativejs';
import { MapTypes, screenHeight, screenWidth } from '../../utils/constants';
import { request, PERMISSIONS, check, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import { NOTESROUTES } from '../../utils/routes';
import { Collections } from '../../utils/collections';
import LocationIcon from '../../components/ui/locationIcon';
import LottieView from 'lottie-react-native';

const Map: React.FC = ({ navigation, route }) => {
  const [markers, setMarkers] = useState([]);

  const [myPosition, setPosition] = useState(null);
  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapType, setMapType] = useState(MapTypes.hybrid);

  const addMarker = values => {
    const newItem = {
      title: 'Konum',
      description: 'Seçili Konum',
      coordinate: values,
    };
    setSelectedLocation(newItem);
    getAddressFromCoors(values.latitude, values.longitude);
  };

  const changeMapType = () => {
    switch (mapType) {
      case MapTypes.hybrid:
        setMapType(MapTypes.hybridFlyover);
        break;
      case MapTypes.hybridFlyover:
        setMapType(MapTypes.mutedStandard);
        break;
      case MapTypes.mutedStandard:
        setMapType(MapTypes.none);
        break;
      case MapTypes.none:
        setMapType(MapTypes.satellite);
        break;
      case MapTypes.satellite:
        setMapType(MapTypes.satelliteFlyover);
        break;
      case MapTypes.satelliteFlyover:
        setMapType(MapTypes.standard);
        break;
      case MapTypes.standard:
        setMapType(MapTypes.terrain);
        break;
      case MapTypes.terrain:
        setMapType(MapTypes.hybrid);

        break;

      default:
        setMapType(MapTypes.satellite);
        break;
    }
  };

  const getPermissionLocation = async () => {
    try {
      if (Platform.OS == 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (granted == RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              setPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              });
            },
            error => {
              console.log(error);
            },
            {
              enableHighAccuracy: true,
              timeout: 15000,
            },
          );
        }
      } else {
        const granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      }
    } catch (error) {}
  };

  const getAddressFromCoors = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}&language=tr`,
      );

      const data = await response.json();
      console.log('Gelen veri', data);

      if (data.results && data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        setAddress(formattedAddress);
        console.log('Adres:', formattedAddress);
        return formattedAddress;
      } else {
        console.warn('Adres Bulunamadı');
        return null;
      }
    } catch (error) {
      console.error('Adres Alınırken Hata:', error);
      return null;
    }
  };

  const getNotes = async () => {
    try {
      const data = await firestore().collection(Collections.NOTES).get();
      const notes = data.docs.map(request => ({
        id: request.id,
        ...request.data(),
      }));
      console.log(notes);
      setMarkers(notes);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotes();
    getPermissionLocation();
  }, []);

  return (
    <View style={styles.container}>
      {myPosition && (
        <MapView
          showsUserLocation={true}
          mapType={mapType}
          onPress={values => addMarker(values.nativeEvent.coordinate)}
          // showsTraffic
          // provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={myPosition}
        >
          {selectedLocation && (
            <Marker coordinate={selectedLocation.coordinate}>
              <View>
                <LocationAdd size={35} variant="Bold" color="#37d67a" />
              </View>
              <Callout
                tooltip
                onPress={() =>
                  navigation.navigate(NOTESROUTES.NOTEADD, {
                    address: address,
                    coordinate: selectedLocation.coordinate,
                  })
                }
              >
                {' '}
                //! tooltip verince tüm özellikleri biz söylüyoruz
                <View
                  style={{
                    minWidth: screenWidth * 0.5,
                    minHeight: screenHeight * 0.2,
                    backgroundColor: 'white',
                    borderRadius: 8,
                    padding: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: 18, fontWeight: '700' }}>
                        {selectedLocation.title}
                      </Text>
                    </View>
                    <View>
                      <AddCircle size={25} variant="Bold" color="green" />
                    </View>
                  </View>

                  <Text>{address}</Text>
                </View>
              </Callout>
            </Marker>
          )}

          <Marker coordinate={myPosition} title="Konumum" description="Konumum">
            <View style={{zIndex:9999}} >
              <LottieView
                source={require('../../assets/animation/Location.json')}
                style={{ width: 100, height: 100 }}
                autoPlay
                loop
              />
            </View>
          </Marker>

          {markers.map((marker, index) => (
            <Marker
              //  image={require("../../assets/icons/3d.png")}
              key={index}
              title={marker?.title}
              description={marker?.description}
              coordinate={marker.coordinate}
            >
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 100,
                  padding: 5,
                }}
              >
                <LocationIcon type={marker.type} />
              </View>
              <Callout tooltip onPress={() => console.log(marker)}>
                {' '}
                //! tooltip verince tüm özellikleri biz söylüyoruz
                <View
                  style={{
                    minWidth: screenWidth * 0.5,
                    minHeight: screenHeight * 0.2,
                    backgroundColor: 'white',
                    borderRadius: 8,
                    padding: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View>
                      <Text style={{ fontWeight: 'bold', marginVertical: 5 }}>
                        Başlık:
                      </Text>

                      <Text> {marker.title}</Text>
                    </View>
                    <View>
                      <ArrowCircleRight
                        size={25}
                        variant="Bold"
                        color="green"
                      />
                    </View>
                  </View>

                  <Text style={{ fontWeight: 'bold', marginVertical: 5 }}>
                    Açıklama:
                  </Text>
                  <Text>{marker.description}</Text>
                  <Text style={{ fontWeight: 'bold', marginVertical: 5 }}>
                    Adres:
                  </Text>
                  <Text>{marker.address}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}

      <View
        style={{
          backgroundColor: '#37d67a',
          position: 'absolute',
          left: '20',
          padding: 8,
          bottom: 50,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white' }}>{mapType}</Text>
      </View>

      {/* <TouchableOpacity
        onPress={() => {
          navigation.dispatch(DrawerActions.toggleDrawer());
        }}
        activeOpacity={0.5}
        style={styles.button}
      >
        <HamburgerMenu size={32} color="black" />
      </TouchableOpacity>  */}

      <View style={styles.rightButtonContainer}>
        <TouchableOpacity
          onPress={() => changeMapType()}
          activeOpacity={0.5}
          style={styles.rightButton}
        >
          <I3Dcube size={28} color="black" variant="Bold" />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5} style={styles.rightButton}>
          <Send2 size={28} color="black" variant="Bold" />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5} style={styles.rightButton}>
          <ArrowForwardSquare size={28} color="black" variant="Bold" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: 'flex-end',
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 999,
    top: 60,
    left: 20,
    borderRadius: 10,
    shadowColor: '#000',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  rightButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },

  rightButtonContainer: {
    backgroundColor: 'white',

    position: 'absolute',
    zIndex: 999,
    top: 60,
    right: 20,
    borderRadius: 10,
    shadowColor: '#000',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Map;
