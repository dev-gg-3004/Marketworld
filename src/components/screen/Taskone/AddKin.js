import _ from 'lodash';
import React, { useState } from 'react'
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux';
import { addKinDetails } from '../../../redux/actions/KinAction';
import { empty } from '../../../utils/Validation';

export default function AddKin({navigation}) {

    const[fieldData,setFieldData]=useState({firstName:"",lastName:"",relationship:"",homeNo:'',mobileNo:"",email:""})
    const dispatch=useDispatch();

    function onChangeInput(text,id){

        let tempData = _.cloneDeep(fieldData);
        tempData[id] = text;
        setFieldData(tempData);

    }

    function handleOnPressSubmit(){
        if(empty(fieldData.email) && empty(fieldData.firstName) && empty(fieldData.lastName)
         && empty(fieldData.homeNo) && empty(fieldData.lastName) && empty(fieldData.relationship)  ) {
            alert('Enter Valid Details')
            return
        }

        dispatch(addKinDetails(fieldData))
        navigation.navigate('taskone')
    }

    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <Text style={{fontSize:25,color:"lightseagreen",textAlign:"center",margin:"5%"}}>Add Kin</Text>
            
            <View style={{elevation:1,margin:"3%",borderColor:"white",borderRadius:5,padding:"5%"}}>
                <View style={{flexDirection:"row",justifyContent:'space-between',marginBottom:"5%"}}>

                    <View style={{width:"47%"}}>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{color:"grey",fontSize:18,fontWeight:"bold"}}>First Name</Text>
                            <Text style={{color:"red",fontSize:20}}>*</Text>
                        </View>
                        <TextInput onChangeText={(text)=>onChangeInput(text,'firstName')} style={{color:"black",borderWidth:1,borderColor:"black",marginTop:"2%",borderRadius:10}} 
                        />
                    </View>

                    <View style={{width:"47%"}}>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{color:"grey",fontSize:18,fontWeight:"bold"}}>Last Name</Text>
                            <Text style={{color:"red",fontSize:20}}>*</Text>
                        </View>
                        <TextInput onChangeText={(text)=>onChangeInput(text,'lastName')}
                          style={{color:"black",borderWidth:1,borderColor:"black",marginTop:"2%",borderRadius:10}} 
                        />
                    </View>
                </View>

                <View style={{marginBottom:"5%"}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{color:"grey",fontSize:18,fontWeight:"bold"}}>Relationship</Text>
                        <Text style={{color:"red",fontSize:20}}>*</Text>
                    </View>
                    <TextInput  onChangeText={(text)=>onChangeInput(text,'relationship')}
                    style={{color:"black",borderWidth:1,borderColor:"black",marginTop:"2%",borderRadius:10}} 
                    />
                </View>
                <View style={{marginBottom:"5%"}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{color:"grey",fontSize:18,fontWeight:"bold"}}>Telephone</Text>
                        <Text style={{color:"red",fontSize:20}}>*</Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <TextInput 
                            placeholder='Home'
                            placeholderTextColor={"black"}
                            onChangeText={(text)=>onChangeInput(text,'homeNo')}
                            style={{color:"black",borderWidth:1,borderColor:"black",marginTop:"1%",borderRadius:10,width:"48%"}} 
                        />
                        <TextInput 
                            placeholder='Mobile'
                            placeholderTextColor={"black"}
                            onChangeText={(text)=>onChangeInput(text,'mobileNo')}
                            style={{color:"black",borderWidth:1,borderColor:"black",marginTop:"1%",borderRadius:10,width:"48%"}} 
                        />
                    </View>
                </View>
                <View style={{marginBottom:"6%"}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{color:"grey",fontSize:18,fontWeight:"bold"}}>Email</Text>
                        <Text style={{color:"red",fontSize:20}}>*</Text>
                    </View>
                    <TextInput 
                     onChangeText={(text)=>onChangeInput(text,'email')}
                     style={{color:"black",borderWidth:1,borderColor:"black",marginTop:"1%",borderRadius:10}} 
                    />
                </View>
             
                <View style={{flexDirection:"row",height:"10%",justifyContent:"space-around"}}>
                    <TouchableOpacity  onPress={()=>navigation.navigate('taskone')}
                        style={{backgroundColor:"lightseagreen",width:"40%",borderRadius:10,justifyContent:"center"}} >
                        <Text style={{color:"white",textAlign:'center',fontSize:20}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={handleOnPressSubmit}
                        style={{backgroundColor:"lightseagreen",width:"40%",borderRadius:10,justifyContent:"center"}} >
                        <Text style={{color:"white",textAlign:'center',fontSize:20}}>Save Details</Text>
                    </TouchableOpacity>
                </View>

            </View>
      
        
        </View>
    )
}
