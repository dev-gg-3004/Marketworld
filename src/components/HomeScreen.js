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
import AntDesign from 'react-native-vector-icons/AntDesign'
import ImageResizer from '@bam.tech/react-native-image-resizer';
import RNFetchBlob from "rn-fetch-blob";
import RNFS from "react-native-fs";
import ImageSize from 'react-native-image-size'

const {Toast }=NativeModules  

// const { SecureScreenCaptureModule } = NativeModules;

// Set the FLAG_SECURE flag to prevent screen capture

const HomeScreen = ({navigation,...props}) => {

  const {showLoader,counterValueArray} =useSelector(state=>state.adminReducers)
  const [userData,setUserData]=useState({})
  const [showImgEditOption, setShowImgEditOption] = useState(false);
  const [profileImage, setProfileImage] = useState();
  let dispatch=useDispatch();
  

  useEffect(()=>{
    getUserSession();
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
        navigation.navigate('Marketwatch');
        break;
      case "IPO's":
        navigation.navigate('ipo');
        break;
      case 'News':
        navigation.navigate('News');
        break;
      case 'CheckCagr':
        navigation.navigate('CheckCAGR');
        break;
      case 'Calculator':
        navigation.navigate('Calculator');
        break;
      case 'View Profile':
        navigation.navigate('Profile');
        break;
      
    }
  }
  
  const buttonsTitle = [
    {value: 'Marketwatch', image: marketimage},
    {value: "IPO's", image: ipoimg},
    {value: 'News', image: Newsimg},
    {value: 'CheckCagr', image: cagrimg},
    {value: 'Calculator', image: calculatorimg},
    {value: 'View Profile', image: Profileimg},
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
  
      includeBase64: true,
      saveToPhotos: true,
      quality: 1,
      noData: true,
      rotation: 0,
      storageOptions: {
        skipBackup: true,
        path: "images",
        mediaType: 'photo',
      },
    };
    launchCamera(options, response => {
      setShowImgEditOption(false);
      if (response.didCancel) {
        setShowImgEditOption(false);
      } else if (response.error) {
        setShowImgEditOption(false);
        // console.log(response.errorMessage);
      } else {
         
        const [tempResponse]=response.assets

        tempResponse.size = tempResponse.fileSize;
        tempResponse.name = response.fileName;
        compressionHandler(tempResponse);
      }
    });
  }

  const compressionHandler = (res) => {
    if (res.size < 150000) {
      prepareFile(res);
    } 
    else if (res.size < 30000000) {
      res.quality = 50;
      res.width = 600;
      res.height = 800;
    
      imageCompression(res, compressionHandler);
    }
  };
  const getSized = async (res) => {
    const { rotation } = await ImageSize.getSize(res)
    return rotation
  }

  const imageCompression = (imageData, callback) => {
    getSized(imageData?.uri).then((response) =>{
    let rotation = 0;
    if (response == 90) {
      rotation = 90;
    } else if (response == 270) {
      rotation = -90;
    }
    RNFS.readFile(imageData.uri, "base64").then((based) => {
      ImageResizer.createResizedImage(
        `data:${imageData.type};base64,${based}`, // imageData.uri,
        imageData.width, //600
        imageData.height, //800
        "JPEG",
        imageData.quality,
        rotation
      )
        .then((responses) => {
          callback(responses);
        })
        .catch((err) => {
          console.log("Failed base64");
          console.log("imageCompression err => ", err);
          setShowImgEditOption(false);
        });
    });
  })
  };


  const prepareFile = (res) => {
    RNFetchBlob.fs.readFile(res?.path || res?.uri, "base64").then((data) => {
      if (!res.type) {
        res.type = `image/${res.name.split(".").slice(-1)[0]}`;
      }

      let imageId = parseInt(Math.random() * 10000000);
      let name = res.name || res?.fileName;
      let image = `data:${res.type};base64,${data}`;
      setProfileImage(image);
      setShowImgEditOption(false);
      updateUserImage(image)
    }).catch((err) => {
      console.log("prepareFile err => ", err);
      setShowImgEditOption(false);
    });
  };

  function onPressOpenGallery() {
    let options = {
      includeBase64: true,
      saveToPhotos: true,
      quality: 1,
      noData: true,
      rotation: 0,
      storageOptions: {
        skipBackup: true,
        path: "images",
        mediaType: 'photo',
      },
    };
    launchImageLibrary(options, response => {
      setShowImgEditOption(false);
      if (response.didCancel) {
        setShowImgEditOption(false);
      } else if (response.error) {
        setShowImgEditOption(false);
        // console.log(response.errorMessage);
      } else {
         
        const [tempResponse]=response.assets

        tempResponse.size = tempResponse.fileSize;
        tempResponse.name = response.fileName;
        compressionHandler(tempResponse);
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
          <View style={{height:"30%",width:'100%'}}>

            { showLoader && <ActivityIndicator   size="small" color="#0000ff"/> }

              <MarketSummary />

          </View>
          </ErrorBoundaryScreen>


        </SafeAreaView>
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
