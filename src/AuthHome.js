import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './components/screen/login/Signup';
import splashScreen from "./components/common/SplashScreen/Index"
import LoginNew from './components/screen/login/LoginNew';
import ForgetPassword from './components/screen/login/ForgetPassword';
import VerifyOTP from './components/screen/login/VerifyOTP';
import ResetPassword from './components/screen/login/ResetPassword';
import SignupNew from './components/screen/login/SignupNew';
import Login from './components/screen/login/Login';
import LoginByClass from './components/screen/login/LoginByClass';

const Stack = createNativeStackNavigator();

export default function AuthHome() {
  
    return(
        <Stack.Navigator initialRouteName='splashScreen' screenOptions={{
            headerShown: false
            }}>
        <Stack.Screen name="splashScreen" component={splashScreen}/>
        <Stack.Screen name="login" component={Login}/>
        <Stack.Screen name="loginNew" component={LoginNew} />
        <Stack.Screen name="loginNewClass" component={LoginByClass} />
        <Stack.Screen name="forgetPassword" component={ForgetPassword} options={{headerShown: false}}/>
        <Stack.Screen name="verifyOTP" component={VerifyOTP} options={{headerShown: false}}/>
        <Stack.Screen name="resetPassword" component={ResetPassword} options={{headerShown: false}}/>
        <Stack.Screen name="signup" component={Signup} options={{headerShown: false}}/>
        <Stack.Screen name="signupNew" component={SignupNew} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}
