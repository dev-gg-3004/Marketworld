import { useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  BackHandler,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import logoutimg from '../assests/images/logout.png'
import MarketSummary from './common/MarketSummary/Index';
import TouchableButton from './common/TouchableButton/Index';
import marketimage from '../assests/images/app.png';
import calculatorimg from '../assests/images/calculator.png';
import Profileimg from '../assests/images/user.png';
import Newsimg from '../assests/images/news.png';
import ipoimg from '../assests/images/ipo.png';
import cagrimg from '../assests/images/cagr.png';
import { useDispatch, useSelector } from 'react-redux';
import { NativeModules } from 'react-native';  ///
import { getSession } from '../utils/Session';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { updateMemberDataStart } from '../redux/actions/LoginAction';
import { empty } from '../utils/Validation';
import CustomAlert from './common/customAlert/CustomAlert';
import { requestUserPermission } from '../utils/MessagePermission';
import ErrorBoundaryScreen from './common/ErrorBoundaryScreen/Index';
import Loader from './common/Loader/Index';
// import AppWrapper from '../utils/RealmTask';
import AntDesign from 'react-native-vector-icons/AntDesign'


const {Toast }=NativeModules  

// const { SecureScreenCaptureModule } = NativeModules;

// Set the FLAG_SECURE flag to prevent screen capture

const HomeScreen = ({navigation,...props}) => {

  const {showLoader,counterValueArray} =useSelector(state=>state.adminReducers)
  const [userData,setUserData]=useState({})
  const [showImgEditOption, setShowImgEditOption] = useState(false);
  const [profileImage, setProfileImage] = useState();
  let dispatch=useDispatch();
  
  // useEffect(()=>{
  //  console.log("counterValueArray ==>HomeScreen",counterValueArray);
  // },[])
  useEffect(()=>{
    // SecureScreenCaptureModule.setFlags();
    // requestUserPermission()
    getUserSession();

    // if(true){
    //   throw new Error("custom error")
    // }
  },[])
  
  async function getUserSession(){
    let session = await getSession()
      if(session){
        setUserData(session)
        if(!empty(session.userImage)) setProfileImage(session.userImage)
    }
  }

  useEffect(() => {
    Toast.showToast("Welcome Home")

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onPressBack,
    );
    return () => backHandler.remove();
  }, []);

  function onPressBack(e) {
    // console.log(route);
    return true;
  }

  function handleOnPressButton(item) {
    switch (item) {
      case 'Marketwatch':
        navigation.navigate('Market');
        break;
      case 'News':
        navigation.navigate('News');
        break;
      case 'Calculator':
        navigation.navigate('Calculator');
        break;
      case 'CheckCagr':
        navigation.navigate('CheckCAGR');
        break;
      case 'View Profile':
        navigation.navigate('Profile');
        break;
      case "IPO's":
        navigation.navigate('ipo');
        break;
      case "Tabs":
        navigation.navigate('TopTabHome');
        break;
      case "StockTabs":
        navigation.navigate('stockTopTabHome');
        break;
      case "MapsHome":
        navigation.navigate('MapsHome');
        break;
      case "AllLocation":
        navigation.navigate('AllLocation');
        break;
    }
  }
  
  const buttonsTitle = [
    {value: 'Marketwatch', image: marketimage},
    {value: "IPO's", image: ipoimg},
    {value: 'News', image: Newsimg},
    // {value: 'CheckCagr', image: cagrimg},
    // {value: 'Calculator', image: calculatorimg},
    {value: 'View Profile', image: Profileimg},
    {value: 'Tabs', image: marketimage},
    {value: 'StockTabs', image: marketimage},
    // {value: 'BottomTabs', image: marketimage},
    {value: 'MapsHome', image: marketimage},
    {value: 'AllLocation', image: marketimage},
  ];

  function renderButtons() {
    return (
      <View
        style={{
          paddingTop: '3%',
          alignItems: 'center',
          marginBottom: '4%',
          width: '100%',
        }}>
          {/* <AntDesign name="up" /> */}
        <FlatList
          data={buttonsTitle}
          keyExtractor={(item, index) => item.value}
          numColumns={3}
          columnWrapperStyle={{marginBottom: 6}} //************************ */
          renderItem={({item}) => {
            return (
              <TouchableButton
                buttonTitle={item.value}
                textStyle={styles.homeButtonStyle}
                image={item.image}
                imageStyle={styles.imageStyle}
                touchableViewStyle={styles.homeButtonCardStyle}
                onPress={() => handleOnPressButton(item.value)}
              />
            );
          }}
        />
      </View>
    );
  }
 
  function renderHeaderContents(){
    return(
      <View style={{height:"28%"}}>

        <View style={{flexDirection:"row",alignItems:"center",marginTop:"4%",justifyContent:"space-between",marginRight:"4%",marginLeft:"3%",}}>
          
          <Text style={{color:"black",fontFamily:"Roboto-Medium",fontSize:22}}>Welcome! {userData?.fullName}</Text>
         
          <TouchableOpacity onPress={props.handleOnPressLogout} >
            <Image source={logoutimg} style={{height:35,width:35,marginLeft:25}}/>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row',alignItems: 'flex-end',justifyContent:"center",paddingLeft:"10%"}}>
          <Image source={ profileImage ? {uri :profileImage} :require('../assests/images/user.png')} style={{height:130,width:130,borderRadius:100,marginTop:"4%"}}/>
          <TouchableOpacity onPress={handleOnClickEditPic} style={{position: 'relative',height: '22%', width: '8%',right: 30,borderRadius:50, backgroundColor:"skyblue", justifyContent:"center",alignItems:"center"}}>
            <Image source={require('../assests/images/draw.png')} style={{width: '55%', height: '55%'}}/>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  function handleOnClickEditPic(){
    // setShowImgEditOption(true)
   
    Alert.alert(
      "Update Profile Photo",
      "Select any one ",
      [
        {
          text: "Open Camera",
          onPress: () => onPressOpenCamera(),
          style:styles.loginViewButton
        },
        {
          text: "Open Gallery",
          onPress: () => onPressOpenGallery(),
          style:styles.loginViewButton
        },
        { text: "Cancel", onPress: () => console.log("Cancel Pressed"),
      style:"cancel" }
      ],
      
    );
  }

  function onPressOpenCamera() {
    let options = {
      storageOption: {
        path: '../../../assests/images',
        mediaType: 'photo',
      },
      includeBase64: true,
      saveToPhotos: true,
    };
    launchCamera(options, response => {
      setShowImgEditOption(false);
      if (response.didCancel) {
        setShowImgEditOption(false);
      } else if (response.errorMessage) {
        // console.log(response.errorMessage);
      } else {
        const imageSource = response.assets[0].uri;
        setProfileImage(imageSource);
        updateUserImage(imageSource);

      }
    });
  }

  function onPressOpenGallery() {
    let options = {
      storageOption: {
        path: '../../../assests/images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setShowImgEditOption(false);
      } else if (response.errorMessage) {
      } else {
        const imageSource = response.assets[0].uri;
        setProfileImage(imageSource);
        setShowImgEditOption(false);
        updateUserImage(imageSource)
      }
    });
  }

  function updateUserImage(imageSource){
    let obj={...userData,"userImage":imageSource}
    dispatch(updateMemberDataStart(obj,0));
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{height: '100%',backgroundColor:showLoader?"lightgrey":"#f8f8ff",opacity :showLoader ? 0.2 : 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{flex: 1}}>
        <ErrorBoundaryScreen >
          <Modal animationType="slide" transparent={true} visible={showLoader}>
            <Loader  />
          </Modal>
          {renderHeaderContents()}
          <Modal animationType="slide" transparent={true} visible={showImgEditOption}>
            {/* <View > */}
                <CustomAlert 
                showPopup="true"
                mainTitle="Update Profile Photo"
                subTitle="Select any one"
                buttonTitleOne="Open Camera"
                onPressButtonTitleOne={onPressOpenCamera}
                buttonTitleTwo="Open Gallery"
                onPressButtonTitleTwo={onPressOpenGallery}
                buttonTitleThree="Cancel"
                onPressButtonTitleThree={()=>setShowImgEditOption(false)}
                />

            {/* </View> */}

          </Modal>
         
          {/* {showImgEditOption && (
            <View style={{flexDirection:"row",height:"6%",justifyContent:"center"}}>
              <TouchableButton
                buttonTitle="Open Camera"
                touchableViewStyle={{
                  ...styles.loginViewButton,
                  marginRight:"3%"
                }}
                textStyle={styles.loginButton}
                onPress={onPressOpenCamera}
              />

              <TouchableButton
                buttonTitle="Open Gallery"
                touchableViewStyle={{...styles.loginViewButton}}
                textStyle={styles.loginButton}
                onPress={onPressOpenGallery}
              />
            </View>
          )} */}

          {renderButtons()}
          <View style={{height:"30%"}}>

            { showLoader && <ActivityIndicator   size="small" color="#0000ff"/> }

              <MarketSummary />

          </View>
          </ErrorBoundaryScreen>


        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  homeButtonStyle: {
    fontSize: 15,
    color: 'blue',
  },
  homeButtonCardStyle: {
    height: '95%',
    backgroundColor: 'skyblue',
    width: '30%',
    margin: 6,
    borderWidth: 2,
    borderRadius: 10,
    paddingTop: '2%',
    borderColor: 'grey',
    borderWidth: 2,
    alignItems: 'center',
  },
  imageStyle: {
    height: 40,
    width: 40,
  },
  loginButton: {
    color: 'white',
    height: '100%',
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    fontSize: 20,
    paddingTop:"2%"
  }, 
   loginViewButton: {
    width: '44%',
    alignSelf: 'center',
    height: '80%',
    borderRadius: 15,
    backgroundColor: '#1e90ff',
    
  },
});

export default HomeScreen;

// import { useEffect } from "react";
// import { Button, View } from "react-native";
// import { WebView } from 'react-native-webview';
// import { useDispatch } from "react-redux";
// import { getNewsListStart } from "../redux/actions/NewsActions";
// import WebViews from "./common/webview/WebViews";

// export default function HomeScreen({ navigation }) {

//   let NSEURI= 'https://www.nseindia.com/'

//   return  <WebViews URI={NSEURI}/>
// }



// (akash==="akash||number===18&&job===true)



// import { View } from 'react-native';

// const App = () => {
//   const viewRef = useRef(null);

//   useEffect(() => {
//     // Set the FLAG_SECURE flag to prevent screen capture
//     viewRef.current.setNativeProps({
//       flags: View.SCREEN_STATE_ON,
//     });
//   }, []);

//   return (
//     <View ref={viewRef}>
//       {/* Your app content goes here */}
//     </View>
//   );
// };

// export default App;
