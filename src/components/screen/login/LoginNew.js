import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {empty} from '../../../utils/Validation';
import {loginUserStart} from '../../../redux/actions/LoginAction';
import illustrationImage from '../../../assests/images/loginIllustration.jpg';
import TouchableButton from '../../common/TouchableButton/Index';
import googleIcon from '../../../assests/images/google.png';
import ImageView from '../../common/TextInputImageView/ImageView';
import TextInputImage from '../../common/TextInputImageView/TextInputImage';
import NetInfo from "@react-native-community/netinfo";
import { useRoute } from '@react-navigation/native';

export default function LoginNew({navigation}) {
  const [showEmptyMsg, setShowEmptyMsg] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  const [loginData, setLoginData] = useState({
    userName: '',
    password: '',
  });


  const route=useRoute()
  console.log(route);
  
  const dispatch = useDispatch();
  let stores = useSelector(reduxStoreData);
  
  useEffect(() => {
    unsubscribe();
  }, []);
  
  const unsubscribe = NetInfo.addEventListener(state => {
    // console.log("Connection type", state.type);
    // console.log("Is connected?", state.isConnected);

    // if(!state.isConnected){
    //   Alert.alert('check Internet connection')
    // }
  });

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true)
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

  },[])

  // useEffect(()=>{
  //     if(!empty(stores.showLoginErrorMessage)){
  //         console.log(stores.showLoginErrorMessage);
  //     }
  // },[stores.showLoginErrorMessage])

  // useEffect(() => {
  //     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
  //     return () => backHandler.remove()
  //     // setInitialRoute()
  //   }, [])
  function onChangeLoginFields(text, name) {
    let value = text;
    let elementId = name;
    let tempLoginData = _.cloneDeep(loginData);
    tempLoginData[elementId] = value;
    setLoginData(tempLoginData);
  }

  function onShowEyeClick() {
    setShowPassword(!showPassword);
  }

  function handleOnClickLogin() {
    setShowEmptyMsg(true);
    if (!(empty(loginData.userName) && empty(loginData.password))) {
      dispatch(loginUserStart(loginData));
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{height: '100%' ,paddingTop:keyboardStatus?"40%":0, backgroundColor:"white"}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
         {!keyboardStatus && <ImageView illustrationImage={illustrationImage} /> }
          <TextInputImage
            title="Login"
            textStyle={styles.loginTextStyle}
            inputTitle="＠"
            placeholder="username"
            onChangeText={text => onChangeLoginFields(text, 'userName')}
          />
          {!empty(stores.showLoginErrorMessage.InvalidUserID) && (
            <Text style={styles.emptyErrorMsgStyle}>
              **{stores.showLoginErrorMessage.InvalidUserID}**
            </Text>
          )}
          {showEmptyMsg && empty(loginData.userName) && (
            <Text style={styles.emptyErrorMsgStyle}>
              UserName cannot be Empty!!
            </Text>
          )}
          <TextInputImage
            inputTitle="🔐"
            passwordPlaceholder="password"
            onChangeText={text => onChangeLoginFields(text, 'password')}
            secure={showPassword ? false : true}
            onShowEyeClick={onShowEyeClick}
          />
          {!empty(stores.showLoginErrorMessage.InvalidPassword) && (
            <Text style={styles.emptyErrorMsgStyle}>
              **{stores.showLoginErrorMessage.InvalidPassword}**
            </Text>
          )}
          {showEmptyMsg && empty(loginData.password) && (
            <Text style={styles.emptyErrorMsgStyle}>
              Password cannot be Empty!!
            </Text>
          )}
          <TouchableButton
            onPress={() => navigation.navigate('forgetPassword')}
            touchableViewStyle={styles.forgetViewStyle}
            buttonTitle="Forget Password ?"
            textStyle={styles.forgetTextStyle}
          />

          <TouchableButton
            onPress={handleOnClickLogin}
            touchableViewStyle={{...styles.loginViewButton, height: 40}}
            buttonTitle="Login"
            textStyle={styles.loginButton}
          />
          {  !keyboardStatus &&
            <>
          <Text style={styles.orText}>OR</Text>

          <TouchableOpacity style={styles.loginByGoogleView}>
            <Image source={googleIcon} style={styles.googleIconStyle} />
            <Text style={styles.loginByGoogleText}>Login with Google</Text>
          </TouchableOpacity>

          <View style={styles.registerViewStyle}>
            <Text style={{...styles.registerTextStyle, color: 'black'}}>
              New to MarketWorld ?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('signupNew')}>
              <Text style={styles.registerTextStyle}> Register</Text>
            </TouchableOpacity>
          </View>
            </>
          }
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

function reduxStoreData(store) {
  return {
    members: store.adminReducers.members,
    validUser: store.adminReducers.validUser,
    showLoginErrorMessage: store.adminReducers.showLoginErrorMessage,
  };
}

export const styles = StyleSheet.create({
  illustrationViewStyle: {
    height: '30%',
    width: '100%',
  },
  illustrationImageStyle: {
    height: '100%',
    width: '100%',
  },
  loginTextStyle: {
    color: 'black',
    fontSize: 35,
    fontFamily: 'Roboto-Medium',
    marginBottom: 20,
  },
  userNamePasswordIconStyle: {
    fontSize: 30,
    width: '15%',
  },
  userNameInputStyle: {
    width: '70%',
    color: 'black',
    fontSize: 27,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  emptyErrorMsgStyle: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
  },
  passwordViewStyle: {
    flexDirection: 'row',
    width: '70%',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passwordInputStyle: {
    width: '85%',
    color: 'black',
    fontSize: 27,
  },
  forgetViewStyle: {
    height: 50,
    paddingTop: 8,
  },
  forgetTextStyle: {
    color: 'blue',
    textAlign: 'right',
    fontSize: 20,
    marginRight: 22,
  },
  loginButton: {
    color: 'white',
    height: '100%',
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    fontSize: 25,
  },
  orText: {
    color: 'black',
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 15,
  },
  loginViewButton: {
    width: '90%',
    alignSelf: 'center',
    height: '10%',
    borderRadius: 15,
    backgroundColor: '#1e90ff',
    // justifyContent: 'center',
    alignItems:"center",
    marginTop:8
  },
  loginByGoogleView: {
    height: "5%",
    flexDirection: 'row',
    backgroundColor: 'lightblue',
    width: '70%',
    borderRadius: 20,
    alignSelf: 'center',
    paddingLeft: "5%",
    marginTop: 20,
    alignItems:"center"
  },
  googleIconStyle: {
    height: "80%",
    width: "12%",
  },
  loginByGoogleText: {
    color: 'grey',
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    fontSize: 20,
    paddingLeft: 20,
  },
  registerViewStyle: {
    height: 50,
    paddingTop: 8,
    flexDirection: 'row',
    marginTop: 45,
    alignSelf: 'center',
  },
  registerTextStyle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    color: 'blue',
  },
});
