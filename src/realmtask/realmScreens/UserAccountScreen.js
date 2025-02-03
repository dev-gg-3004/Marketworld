import { useNavigation, useRoute } from '@react-navigation/native'
import _, { forEach } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { empty, isArrayNotNullUndefined } from '../../utils/Validation'
import { createUserList, getAllUserList, updateUserList } from '../schema/UserSchema'

export default function UserAccountScreen(props) {

    const [userData,setUserData] =useState({_id:0,userName:"",accountNo:"",aadharNo:"",ifscCode:""})
    const [showAddButton,setShowAddButton]=useState(true)
    const [realmData, setRealmData] = useState([]);
    const navigation=useNavigation();

    const route=useRoute()
    

    useEffect(()=>{
        getDataFromRealm()
        if(route.params?.item){
            setShowAddButton(false)
            // console.log("26",JSON.parse(JSON.stringify(route.params.item)));
            let temp=JSON.parse(JSON.stringify(route.params.item))

            let aadharNo=temp.aadharNo.toString()
            let accountNo=temp.accountNo.toString()
            let tempData={...temp,"aadharNo":aadharNo,"accountNo":accountNo}
            
            setUserData(tempData)
        }
    },[])

    async function getDataFromRealm() {
        console.log("insode");
        let temp = await getAllUserList();
        if (!isArrayNotNullUndefined(temp)) {
            setRealmData(temp)
            console.log(temp);
        }
    }
    
    function onChangeFields(text, name) {
        let temp = _.cloneDeep(userData);
        // let temp=JSON.parse(JSON.stringify(newsData))
        temp[name] = text;
        // console.log("temp onChangeFields==>",temp);
        setUserData(temp);
    }

    function handleOnPressButton(type){
        if(empty(userData.userName) || empty(userData.aadharNo) || empty(userData.accountNo)|| empty(userData.ifscCode)){
            Alert.alert('please Enter Valid Details')
            return
        }

        if(type==="Add"){
            let aadharNo=parseInt(userData.aadharNo)
            let accountNo=parseInt(userData.aadharNo)

            let tempArray=realmData.slice(-1);
            let _id=0;
            if(tempArray.length>0){

              _id=tempArray[0]._id+1
            }

            
            let tempData={...userData,"aadharNo":aadharNo,"accountNo":accountNo,"_id":_id}
            console.log("tempUserData :===>",tempData)
            createUserList(tempData);
            navigation.navigate('DashBoardRealm')
            getDataFromRealm()
            setUserData({_id:0,userName:"",accountNo:"",aadharNo:"",ifscCode:""})
        }

        if(type==="Update"){
            console.log("userData before",userData);
            let aadharNo=parseInt(userData.aadharNo)
            let accountNo=parseInt(userData.accountNo)

            let temp=JSON.parse(JSON.stringify(userData))
            let tempData={...temp,"aadharNo":aadharNo,"accountNo":accountNo,}
            console.log("tempUserData 82:===>",tempData)
            updateUserList(tempData)
            navigation.navigate('DashBoardRealm',{item:"change"})
            setUserData({_id:0,userName:"",accountNo:"",aadharNo:"",ifscCode:""})
            getDataFromRealm()
        }
    }


    return (
        <View style={{margin:20,flex:1}}>
          {!props.update &&  <Text style={style.titleStyle}>Add User Details</Text>}
          {props.update &&  <Text style={style.titleStyle}>Update User Details</Text>}
            <View style={{ marginTop:15,flexDirection:"row",alignItems:"center"}}>
                <Text style={{width:"32%",fontSize:22,color:"black"}}>Name:</Text>
                <TextInput
                    placeholder="Enter Name"
                    style={style.userNameInputStyle}
                    value={userData.userName}
                    onChangeText={(text)=> onChangeFields(text,'userName')}
                    placeholderTextColor="grey"
                />
            </View>
        
        
        
            <View style={{ marginTop:15,flexDirection:"row",alignItems:"center"}}>
                <Text style={{width:"32%",fontSize:22,color:"black"}}>AccountNo:</Text>
                <TextInput
                    placeholder="Enter AccountNo"
                    style={style.userNameInputStyle}
                    value={userData.accountNo}
                    keyboardType='numeric'
                    onChangeText={(text)=> onChangeFields(text,'accountNo')}
                    placeholderTextColor="grey"
                />
            </View>

            <View style={{ marginTop:15,flexDirection:"row",alignItems:"center"}}>
                <Text style={{width:"32%",fontSize:22,color:"black"}}>Aadhar No:</Text>
                <TextInput
                    placeholder="Enter Aadhar No..."
                    style={style.userNameInputStyle}
                    value={userData.aadharNo}
                    keyboardType='numeric'
                    onChangeText={(text)=> onChangeFields(text,'aadharNo')}
                    placeholderTextColor="grey"
                />
            </View>

            <View style={{ marginTop:15,flexDirection:"row",alignItems:"center"}}>
                <Text style={{width:"32%",fontSize:22,color:"black"}}>IfscCode:</Text>
                <TextInput
                    placeholder="Enter IfscCode"
                    style={style.userNameInputStyle}
                    value={userData.ifscCode}
                    onChangeText={(text)=> onChangeFields(text,'ifscCode')}
                    placeholderTextColor="grey"
                />
            </View>

            {showAddButton &&  <View style={{marginTop:20}}>
                <Button title='Add Account' onPress={()=>handleOnPressButton('Add')} />
            </View>}
            {!showAddButton &&  <View style={{marginTop:20}}>
                <Button title='Update Account' onPress={()=>handleOnPressButton('Update')} />
            </View>}
           
        
        </View>
    )
}


const style=StyleSheet.create({
    titleStyle:{
        color:"black",
        fontSize:25,
        fontFamily:"Roboto-Medium"
    },
    userNameInputStyle:{
        fontSize: 20,
        width:"70%",
        color:"grey",
        borderColor:"white",
        borderWidth:1,
        borderBottomColor:"black"
    }
})