import React from "react";
import { StyleSheet, Text, View } from "react-native";
export  function empty(s) {
  return (s===null || s===undefined|| s===""); 
}

export function nullUndefined(s){
  return(s===null || s===undefined);
}

export function notNullUndefined(s){
  return (s!==null && s!==undefined  && s !=="") ;
}

export function isArrayNotNullUndefined(s){
  return(Array.isArray(s) &&  s!==null && s!==undefined && s.length>0)
}

export function signUp(a,Text,c,d,e){
  return(a==="" || a===null || Text==="" || Text===null  || c==="" || c===null || (d==="" || d===null) || e==="" || e===null)
}

export function sum(a,Text){
  return a+Text
}

export function isHavingNumTexter(value){
  return /[0-9]/.test(value);
}

export function isHavingSpecialCharater(value){
  return /[!@#$%&?]/.test(value);
}

export function isHavingCharacter(value){
  return /[a-zA-Z]/.test(value);
}

export function isCapLetter(value){
  return /^[A-Z]/.test(value);
}

export function isSmallLetter(value){
  return /[a-z]/.test(value);
}

export function isLength(value,len){
  return value.length>=len;
}

export function isName(value){
  return (isLength(value,4) && !isHavingNumTexter(value) && !isHavingSpecialCharater(value) && isHavingCharacter(value))
}

export function isUsername(value){
  return (( isLength(value,5) && isHavingNumTexter(value) && !isHavingSpecialCharater(value) &&
  isCapLetter(value) && isSmallLetter(value) && !value.includes(' ') ))
}

export function validEmail(e){
  const regex= new RegExp('^[a-z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
  return (regex.test(e));
}
 
export function isMobContact(value){
  return  (isLength(value,10) && value.length ===10 &&  !isNaN(value)) ;
}

export function isPassword(value){
  return ( notNullUndefined(value) && isLength(value,8) && !value.includes(' ') && isCapLetter(value) && 
  isHavingNumTexter(value) && isHavingSpecialCharater(value) && isSmallLetter(value) 
  )
}

export function confirmPass(value1,value2){
  return(value1===value2)
}

export function popUpFullName(){
  return(
  <View style={styles.forView}>
   
    <Text style={styles.forText} >For Full Name</Text>
    <Text style={styles.forText} > Should contains small letters </Text>
    <Text style={styles.forText} > special characters  and digits are  not allowed</Text>
  
  </View>)
}

export function popUpUserName(){
  return(
  <View style={styles.forView}>

    <Text style={styles.forText}>**For User Name**</Text>
    <Text style={styles.forText}>First letter must Texte Capital</Text>
    <Text style={styles.forText}>Should contains small letters</Text>
    <Text style={styles.forText}>Should contains Digits </Text>
    <Text style={styles.forText}>Must contain "_" characters</Text>
    <Text style={styles.forText}>special charactersare not allowed</Text>

  </View>)
}

export function popUpValidEmail(){
  return(
  <View style={styles.forView}>
    <Text style={styles.forText}>For Email</Text> 
    <Text style={styles.forText}> All characters must be Small </Text>
    <Text style={styles.forText}>Must contain '@' and '.' in Email</Text>
    <Text style={styles.forText}>must follow abc@gmail.com</Text>
  </View>)
}

export function popUpContactNo(){
  return(
  <View style={styles.forView}>
    <Text style={styles.forText}>For Contact No</Text> 
    <Text style={styles.forText}> Please Enter only NumTexter </Text>
    <Text style={styles.forText}>Max digits should Texte 10 </Text>
   
  </View>)
}

export function popUpPassword(){
  return(
  <View style={styles.forView}>
    <Text style={styles.forText}>For Password</Text> 
    <Text style={styles.forText}> First letter must be Capital</Text>
    <Text style={styles.forText}> Should contains small letters </Text>
    <Text style={styles.forText}> Should contains Digits  </Text>
    <Text style={styles.forText}>Must contain Special characters</Text>
   
  </View>)
}

export function popUpConfirmPassword(){
  return(
  <View style={styles.forView}>
    <Text style={styles.forText}>For Confirm Password </Text> 
    <Text style={styles.forText}> should be same as Enter password</Text> 
  </View>)
}     
const styles=StyleSheet.create({
  forView:{
    borderWidth:2,
    borderColor:"blue",
    backgroundColor:`#f0ffff`,
    opacity:0.7
  },
  forText:{
    color:"blue",
    fontSize:20,
    fontWeight:"bold",
    paddingLeft:"20%"
  }
})