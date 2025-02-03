



// const [currentlocation, setCurrentLocation] = useState({
//   latitude: 0,
//   longitude: 0,
// });
// const [showPopup, setShowPop] = useState(false);
// const [locationTitle, setLocationTitle] = useState('');
// const dispatch = useDispatch();
// const route = useRoute();
// const origin = {latitude: 37.3318456, longitude: -122.0296002};
// const destination = {latitude: 37.771707, longitude: -122.4053769};
// const GOOGLE_MAPS_APIKEY = '';

// useEffect(() => {
//   if (route.params) {
//     const {latitude, longitude} = route.params.location;
//     setCurrentLocation({latitude, longitude});
//   } else {
//     Geolocation.getCurrentPosition(data => setUserCurrentLoaction(data));
//   }
// }, []);
// function setUserCurrentLoaction(data) {
//   let temp = _.cloneDeep(currentlocation);
//   temp['latitude'] = data.coords.latitude;
//   temp['longitude'] = data.coords.longitude;

//   setCurrentLocation(temp);
// }

// const marker = {
//   title: '',
//   latlng: 0.076,
//   description: 'Hello working',
// };

// function handleonChangeText(text) {
//   setLocationTitle(text);
// }

// function handleOnPressSave() {
//   setShowPop(false);
//   if (!empty(locationTitle)) {
//     let temp = {...currentlocation, locationTitle};
//     console.log('temp', temp);
//     dispatch(setLocationTitles(temp));
//     Toast.showToast('Location Added successfully');
//     // navigation.navigate('AllLocation')
//   }
// }

// function renderPopup() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: 'transparent',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <View
//         style={{
//           backgroundColor: 'lightseagreen',
//           height: 220,
//           width: '80%',
//           borderRadius: 25,
//         }}>
//         <View style={{margin: '10%'}}>
//           <Text style={{color: 'white', fontSize: 20, paddingBottom: 10}}>
//             Save This loaction as :{' '}
//           </Text>
//           <TextInput
//             placeholder="Loaction Name"
//             placeholderTextColor={'black'}
//             onChangeText={text => handleonChangeText(text)}
//             style={{
//               borderColor: 'skyblue',
//               borderWidth: 1,
//               height: 50,
//               width: 200,
//               borderRadius: 50,
//               color: 'white',
//             }}
//           />
//         </View>

//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-around',
//             width: '100%',
//           }}>
//           <Button title="Save Location" onPress={() => handleOnPressSave()} />
//           <Button title="Cancel" onPress={() => setShowPop(false)} />
//         </View>
//       </View>
//     </View>
//   );
// }

// return (
//   <SafeAreaView
//     style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//     <MapView
//       showsUserLocation={true}
//       region={{
//         latitude: currentlocation.latitude,
//         longitude: currentlocation.longitude,
//         latitudeDelta: 0.05, ///
//         longitudeDelta: 0.021, ////    this both are for zooming and see exact loaction purpose
//       }}
//       onPress={e => {
//         setCurrentLocation(e.nativeEvent.coordinate);
//         setShowPop(true);
//         console.log('e.nativeEvent.coordinate', e.nativeEvent.coordinate);
//       }}
//       style={styles.map}>
//       <Marker
//         draggable
//         coordinate={{
//           latitude: currentlocation.latitude,
//           longitude: currentlocation.longitude,
//         }}
//         title={marker.title}
//         description={marker.description}
//       />
//     </MapView>
//     <Modal animationType="slide" transparent={true} visible={showPopup}>
//       {showPopup && renderPopup()}
//     </Modal>
//   </SafeAreaView>













//   const [currentlocation, setCurrentLocation] = useState({
//     latitude: 0,
//     longitude: 0,
//   });
//   const [destinationlocation, setDestinationLocation] = useState({
//     latitude: 0,
//     longitude: 0,
//   });

//   const [showPopup, setShowPop] = useState(false);
//   const [locationTitle, setLocationTitle] = useState('');
//   const dispatch = useDispatch();
//   const route = useRoute();
//   const origin = {latitude: 37.3318456, longitude: -122.0296002};
//   const destination = {latitude: 37.771707, longitude: -122.4053769};
//   const GOOGLE_MAPS_APIKEY = '';

//   useEffect(() => {
//     if (route.params) {
//       const {latitude, longitude} = route.params.location;
//       setDestinationLocation({latitude, longitude});
//     } else {
//       Geolocation.getCurrentPosition(data => setUserCurrentLoaction(data));
//     }
//   }, []);
//   function setUserCurrentLoaction(data) {
//     let temp = _.cloneDeep(currentlocation);
//     temp['latitude'] = data.coords.latitude;
//     temp['longitude'] = data.coords.longitude;

//     setCurrentLocation(temp);
//   }

//   const marker = {
//     title: '',
//     latlng: 0.076,
//     description: 'Hello working',
//   };

//   function handleonChangeText(text) {
//     setLocationTitle(text);
//   }

//   function handleOnPressSave() {
//     setShowPop(false);
//     if (!empty(locationTitle)) {
//       let temp = {...currentlocation, locationTitle};
//       console.log('temp', temp);
//       dispatch(setLocationTitles(temp));
//       Toast.showToast('Location Added successfully');
//       // navigation.navigate('AllLocation')
//     }
//   }

//   function renderPopup() {
//     return (
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: 'transparent',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <View
//           style={{
//             backgroundColor: 'lightseagreen',
//             height: 220,
//             width: '80%',
//             borderRadius: 25,
//           }}>
//           <View style={{margin: '10%'}}>
//             <Text style={{color: 'white', fontSize: 20, paddingBottom: 10}}>
//               Save This loaction as :{' '}
//             </Text>
//             <TextInput
//               placeholder="Loaction Name"
//               placeholderTextColor={'black'}
//               onChangeText={text => handleonChangeText(text)}
//               style={{
//                 borderColor: 'skyblue',
//                 borderWidth: 1,
//                 height: 50,
//                 width: 200,
//                 borderRadius: 50,
//                 color: 'white',
//               }}
//             />
//           </View>

//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-around',
//               width: '100%',
//             }}>
//             <Button title="Save Location" onPress={() => handleOnPressSave()} />
//             <Button title="Cancel" onPress={() => setShowPop(false)} />
//           </View>
//         </View>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView
//       style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <MapView
//         showsUserLocation={true}
//         region={{
//           latitude: currentlocation.latitude,
//           longitude: currentlocation.longitude,
//           latitudeDelta: 0.05, ///
//           longitudeDelta: 0.021, ////    this both are for zooming and see exact loaction purpose
//         }}
//         onPress={e => {
//           setDestinationLocation(e.nativeEvent.coordinate);
//           setShowPop(true);
//           console.log('e.nativeEvent.coordinate', e.nativeEvent.coordinate);
//         }}
//         style={styles.map}>
//         <Marker
//           draggable
//           coordinate={{
//             latitude: currentlocation.latitude,
//             longitude: currentlocation.longitude,
//           }}
//           title={marker.title}
//           description={marker.description}
//         />
//         <Marker
//           draggable
//           coordinate={{
//             latitude: destinationlocation.latitude,
//             longitude: destinationlocation.longitude,
//           }}
//           title={marker.title}
//           description={marker.description}
//         />
//       </MapView>
//       <Modal animationType="slide" transparent={true} visible={showPopup}>
//         {showPopup && renderPopup()}
//       </Modal>
//     </SafeAreaView>