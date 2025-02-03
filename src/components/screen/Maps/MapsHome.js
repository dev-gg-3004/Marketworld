import React, {useEffect, useState} from 'react';
import { Alert, Button, Modal, NativeModules, SafeAreaView, StyleSheet,  Text, TextInput, View, } from 'react-native';
import MapView, {Callout, Circle, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import _ from 'lodash';
import {empty} from '../../../utils/Validation';
import {useDispatch} from 'react-redux';
import {setLocationTitles} from '../../../redux/actions/KinAction';
import {useRoute} from '@react-navigation/native';

const {Toast} = NativeModules;

export default function MapsHome({navigation}) {
  const [currentlocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [destinationlocation, setDestinationLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [showPopup, setShowPop] = useState(false);
  const [locationTitle, setLocationTitle] = useState('');
  const dispatch = useDispatch();
  const route = useRoute();


  const marker = {
    title: '',
    latlng: 0.076,
    description: 'Add this as favourite location',
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(data => setUserCurrentLoaction(data));
    if (route.params?.location) {
      const {latitude, longitude} = route.params.location;
      console.log("{latitude, longitude}",{latitude, longitude});
      setDestinationLocation({latitude, longitude});
    }
  }, []);

  useEffect(()=>{
    distance()
  },[destinationlocation,currentlocation])


  function setUserCurrentLoaction(data) {
    let temp = _.cloneDeep(currentlocation);
    temp['latitude'] = data.coords.latitude;
    temp['longitude'] = data.coords.longitude;

    setCurrentLocation(temp);
  }

  function distance() {
    if(destinationlocation.latitude===0 || destinationlocation.longitude ===0 || currentlocation.latitude===0 || currentlocation.longitude ===0) return

    const lat1=currentlocation.latitude;
    const lon1=currentlocation.longitude;
    const lat2=destinationlocation.latitude;
    const lon2=destinationlocation.longitude;

    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344 
      console.log("distance",dist);
      if(dist<=1){
        return Alert.alert('You have reached')
      }
      
    }
  }

  function handleonChangeText(text) {
    setLocationTitle(text);
  }

  function handleOnPressSave() {
    setShowPop(false);
    if (!empty(locationTitle)) {
      let temp = {...destinationlocation, locationTitle};
      console.log('temp', temp);
      dispatch(setLocationTitles(temp));
      Toast.showToast('Location Added successfully');
    }
  }

  function renderPopup() {
    return (
      <View
        style={styles.mainPopUpView}>
        <View
          style={styles.ChildPopUpView}>
          <View style={{margin: '10%'}}>
            <Text style={styles.popupTextTile}>
              Save This loaction as :
            </Text>
            <TextInput
              placeholder="Loaction Name"
              placeholderTextColor={'black'}
              onChangeText={text => handleonChangeText(text)}
              style={styles.popUpInputStyle}
            />
          </View>

          <View
            style={styles.popupButtonViewStyle}>
            <Button title="Save Location" onPress={() => handleOnPressSave()} />
            <Button title="Cancel" onPress={() => setShowPop(false)} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={styles.SafeAreaViewStyle}>
       
      <MapView
        showsUserLocation={true}
        showsTraffic={true}
        region={{
          latitude: (destinationlocation.latitude!==0 )? destinationlocation.latitude : currentlocation.latitude,
          longitude: (destinationlocation.longitude!==0 )? destinationlocation.longitude : currentlocation.longitude,
          latitudeDelta: 0.05, ///
          longitudeDelta: 0.021, ////    this both are for zooming and see exact loaction purpose
        }}
        onPress={e => {
          setDestinationLocation(e.nativeEvent.coordinate);
          setShowPop(true);
          console.log('e.nativeEvent.coordinate', e.nativeEvent.coordinate);
        }}
        style={styles.map}>
         <Circle
         center={{
          latitude: currentlocation.latitude,
          longitude: currentlocation.longitude,
        }}
        radius={1000}
        fillColor={'rgba(0,255,255,0.2)'}
        
        />
        <Marker
          draggable
          coordinate={{
            latitude: destinationlocation.latitude,
            longitude: destinationlocation.longitude,
          }}
          title={marker.title}
          description={marker.description}
        >
          <Callout>
          <Text style={{color:"black"}}>{route.params?.location?.locationTitle}</Text>
          </Callout>
        </Marker>
      </MapView>
      <Modal animationType="slide" transparent={true} visible={showPopup}>
        {showPopup && renderPopup()}
      </Modal>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  SafeAreaViewStyle:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '80%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mainPopUpView:{
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ChildPopUpView:{
    backgroundColor: 'lightseagreen',
    height: 220,
    width: '80%',
    borderRadius: 25,
  },
  popUpInputStyle:{
    borderColor: 'skyblue',
    borderWidth: 1,
    height: 50,
    width: 200,
    borderRadius: 50,
    color: 'white',
  },
  popupTextTile:{
    color: 'white', 
    fontSize: 20,
    paddingBottom: 10
  },
  popupButtonViewStyle:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  }
});



