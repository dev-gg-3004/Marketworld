import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import editIcon from '../../../assests/images/draw.png';
import {getSession} from '../../../utils/Session';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {updateMemberDataStart} from '../../../redux/actions/LoginAction';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {empty} from '../../../utils/Validation';
import { useDispatch } from 'react-redux';
export default function ProfileCard(props) {
  const [userData, setUserData] = useState({});
  const [showImgEditOption, setShowImgEditOption] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const dispatch= useDispatch();

  useEffect(() => {
    // SecureScreenCaptureModule.setFlags();
    getUserSession();
  }, []);

  async function getUserSession() {
    let session = await getSession();
    if (session) {
      setUserData(session);
      if (!empty(session.userImage)) return setProfileImage(session.userImage);
    }
  }

  function handleOnClickEditPic() {
    // setShowImgEditOption(true)

    Alert.alert('Update Profile Photo', 'Select any one ', [
      {
        text: 'Open Camera',
        onPress: () => onPressOpenCamera(),
        style: style.loginViewButton,
      },
      {
        text: 'Open Gallery',
        onPress: () => onPressOpenGallery(),
        style: style.loginViewButton,
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
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
        updateUserImage(imageSource);
      }
    });
  }

  function updateUserImage(imageSource) {
    let obj = {...userData, userImage: imageSource};
    dispatch(updateMemberDataStart(obj, 0));
  }

  return (
    <View style={{...style.cardViewStyle, ...props.cardViewStyle}}>
      <View>
        <Text style={style.TextBoldStyle}>{props.boldText}</Text>
        <Text style={style.textStyle}>{props.normalText}</Text>
      </View>

      <View style={style.imageViewStyle}>
        <Image source={ profileImage ? {uri :profileImage} :require('../../../assests/images/user.png')}  style={style.imageStyle} />
        {props.imageEditIcon && (
          <TouchableOpacity onPress={() => handleOnClickEditPic()} style={{...style.imageEditIconStyle}}>
            <Image
            // resizeMode='center'
            style={{width: '55%', height: '55%'}}
              source={editIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* <AntDesign name="edit" color={"red"} size={40} /> */}
    </View>
  );
}

const style = StyleSheet.create({
  TextBoldStyle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 25,
    color: 'black',
    marginBottom: '4%',
  },
  textStyle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    color: 'grey',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 55,
  },
  imageEditIconStyle: {
    // borderWidth: 1,
    // borderColor: 'red',
    position: 'relative',
    height: '28%',
    width: '28%',
    right: 30,borderRadius:50,
    backgroundColor:"skyblue",
    justifyContent:"center",
    alignItems:"center"    // backgroundColor: 'skyblue',
    // borderRadius: 5,
    // marginTop: '66%',
    // marginLeft: '60%',
  },
  imageViewStyle: {
    // borderWidth: 1,
    // borderColor: 'black',
    height: 110,
    width: 110,
    // position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-end'

  },
  cardViewStyle: {
    height: '20%',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5%',
    borderWidth: 1,
    borderColor: 'white',
    borderBottomColor: 'lightgrey',
  },
  loginButton: {
    color: 'white',
    height: '100%',
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: '2%',
  },
  loginViewButton: {
    width: '44%',
    alignSelf: 'center',
    height: '80%',
    borderRadius: 15,
    backgroundColor: '#1e90ff',
  },
});
