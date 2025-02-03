import React, { Component } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { empty } from '../../../utils/Validation'
import ImageView from '../../common/TextInputImageView/ImageView'
import NetInfo from "@react-native-community/netinfo";
import { loginUserStart } from '../../../redux/actions/LoginAction';
import TouchableButton from '../../common/TouchableButton/Index';
import { connect } from 'react-redux';
import TextInputImage from '../../common/TextInputImageView/TextInputImage';
import googleIcon from '../../../assests/images/google.png';
import illustrationImage from '../../../assests/images/loginIllustration.jpg';

class LoginByClass extends Component {

    constructor(props){
        super(props);
        this.state={
            loginData:{},
            showEmptyMsg:false,
            showPassword:false,
            members:this.props.members,
            validUser:this.props.validUser,
            keyboardStatus:false,
            showLoginErrorMessage:this.props.showLoginErrorMessage,
            

        }
        this.onChangeLoginFields=this.onChangeLoginFields.bind(this);
        this.onShowEyeClick=this.onShowEyeClick.bind(this);
        this.handleOnClickLogin=this.handleOnClickLogin.bind(this);
        // this.unsubscribe=this.unsubscribe.bind(this)
        
    }

    componentDidMount(){
        this.unsubscribe();
    }

    unsubscribe = NetInfo.addEventListener(state => {
        // console.log("Connection type", state.type);
        // console.log("Is connected?", state.isConnected);
    
        // if(!state.isConnected){
        //   Alert.alert('check Internet connection')
        // }
    });




    onChangeLoginFields(text, name) {
        let value = text;
        let elementId = name;

        this.setState({
            loginData:{
                ...this.state.loginData,
                [elementId]:text,
            }
        })
    }

    onShowEyeClick() {

      this.setState({
          showPassword:!this.state.showPassword
      })

        
    }

    handleOnClickLogin() {
        console.log("loginData==>",this.state.loginData);
        console.log("75",this.props);
        const {dispatch} =this.props
        this.setState({
            showEmptyMsg:!this.state.showPassword
        })

        if (!(empty(this.state.loginData.userName) && empty(this.state.loginData.password))) {
               dispatch(loginUserStart(this.state.loginData));
        }
      }


    render() {
        return (
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{height: '100%' ,paddingTop:this.state.keyboardStatus?"40%":0, backgroundColor:"white"}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{flex: 1, backgroundColor: 'white'}}>
               {!this.state.keyboardStatus && <ImageView illustrationImage={illustrationImage} /> }
                <TextInputImage
                  title="Login"
                  textStyle={styles.loginTextStyle}
                  inputTitle="＠"
                  placeholder="username"
                  onChangeText={text => this.onChangeLoginFields(text, 'userName')}
                />
                {/* {!empty(stores.showLoginErrorMessage.InvalidUserID) && (
                  <Text style={styles.emptyErrorMsgStyle}>
                    **{stores.showLoginErrorMessage.InvalidUserID}**
                  </Text>
                )} */}
                {/* {showEmptyMsg && empty(loginData.userName) && (
                  <Text style={styles.emptyErrorMsgStyle}>
                    UserName cannot be Empty!!
                  </Text>
                )} */}
                <TextInputImage
                  inputTitle="🔐"
                  passwordPlaceholder="password"
                  onChangeText={text => this.onChangeLoginFields(text, 'password')}
                  secure={this.state.showPassword ? false : true}
                  onShowEyeClick={this.onShowEyeClick}
                />
                {/* {!empty(stores.showLoginErrorMessage.InvalidPassword) && (
                  <Text style={styles.emptyErrorMsgStyle}>
                    **{stores.showLoginErrorMessage.InvalidPassword}**
                  </Text>
                )}
                {showEmptyMsg && empty(loginData.password) && (
                  <Text style={styles.emptyErrorMsgStyle}>
                    Password cannot be Empty!!
                  </Text>
                )} */}
                <TouchableButton
                  onPress={() => this.props.navigation.navigate('forgetPassword')}
                  touchableViewStyle={styles.forgetViewStyle}
                  buttonTitle="Forget Password ?"
                  textStyle={styles.forgetTextStyle}
                />
      
                <TouchableButton
                  onPress={this.handleOnClickLogin}
                  touchableViewStyle={{...styles.loginViewButton, height: 40}}
                  buttonTitle="Login"
                  textStyle={styles.loginButton}
                />
                { 
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
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('signupNew')}>
                    <Text style={styles.registerTextStyle}> Register</Text>
                  </TouchableOpacity>
                </View>
                  </>
                }
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        )
    }
}

function mapStateToProps(store){
    return {
        members: store.adminReducers.members,
        validUser: store.adminReducers.validUser,
        showLoginErrorMessage: store.adminReducers.showLoginErrorMessage,
    }
}

export default connect(mapStateToProps)(LoginByClass);

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
  