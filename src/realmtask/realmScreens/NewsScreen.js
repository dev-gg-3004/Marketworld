import { useNavigation, useRoute } from '@react-navigation/native';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { empty, isArrayNotNullUndefined } from '../../utils/Validation';
import { createNewsList, getAllNewsList, updateNewsList } from '../schema/NewsSchema';

export default function NewsScreen(props) {

    const [newsData,setNewsData]=useState({_id:0,newsTitle:"",newsContent:"",source:""})
    const [showAddButton,setShowAddButton]=useState(true)
    const [realmData, setRealmData] = useState([]);
    const navigation=useNavigation()
    const route=useRoute()

    useEffect(()=>{
        getDataFromRealm()
        if(route.params){
            setShowAddButton(false)
            let temp=JSON.parse(JSON.stringify(route.params.item))
            setNewsData(temp)
        }
    },[])

    async function getDataFromRealm() {
        let temp = await getAllNewsList();
        if (!isArrayNotNullUndefined(temp)) {
            setRealmData(temp)
            console.log("getAllNewsList===>",temp);
        }
    }

    function onChangeFields(text, name) {
        let temp = _.cloneDeep(newsData);
        // let temp=JSON.parse(JSON.stringify(newsData))
    
        temp[name] = text;
        // console.log("temp onChangeFields==>",temp);
        setNewsData(temp);
    }

    function handleOnPressButton(type){
        if(empty(newsData.newsContent) || empty(newsData.newsTitle) || empty(newsData.source)){
            Alert.alert('please Enter Valid Details')
            return
        }

        if(type==="Add"){
          
            let tempArray=realmData.slice(-1);
            let _id=0;
            if(tempArray.length>0){

              _id=tempArray[0]._id+1
            }
            let tempData={...newsData,"_id":_id}
            console.log("tempNewsData :===>",tempData)
            createNewsList(tempData)
            navigation.navigate('DashBoardRealm')
            setNewsData({_id:0,newsTitle:"",newsContent:"",source:""})
            getDataFromRealm()
        }

        if(type==="Update"){
            let tempData={...newsData}
            console.log("tempNewsData :===>",tempData)
            updateNewsList(tempData)
            navigation.navigate('DashBoardRealm',{item:"change"})
            setNewsData({_id:0,newsTitle:"",newsContent:"",source:""})
            getDataFromRealm()

        }
    }


    return (
        <View style={{margin:20,flex:1}}>
           {!props.update &&  <Text style={style.titleStyle}>Add News Details</Text>}
           {props.update &&  <Text style={style.titleStyle}>Update News Details</Text>}

            <View style={{ marginTop:15,flexDirection:"row",alignItems:"center"}}>
                <Text style={{width:"30%",fontSize:22,color:"black"}}>News Title:</Text>
                <TextInput
                    placeholder="Enter Title"
                    style={style.userNameInputStyle}
                    value={newsData.newsTitle}
                    onChangeText={(text)=> onChangeFields(text,'newsTitle')}
                    placeholderTextColor="grey"
                />
            </View>
        
            <View style={{ marginTop:15,flexDirection:"row",alignItems:"center"}}>
                <Text style={{width:"30%",fontSize:22,color:"black"}}>Content:</Text>
                <TextInput
                    placeholder="Enter Content"
                    style={style.userNameInputStyle}
                    value={newsData.newsContent}
                    onChangeText={(text)=> onChangeFields(text,'newsContent')}
                    placeholderTextColor="grey"
                />
            </View>
        
            <View style={{ marginTop:15,flexDirection:"row",alignItems:"center"}}>
                <Text style={{width:"30%",fontSize:22,color:"black"}}>source:</Text>
                <TextInput
                    placeholder="Enter source"
                    style={style.userNameInputStyle}
                    value={newsData.source}
                    onChangeText={(text)=> onChangeFields(text,'source')}
                    placeholderTextColor="grey"
                />
            </View>

            {showAddButton &&  <View style={{marginTop:20}}>
                <Button title='Add News' onPress={()=>handleOnPressButton('Add')} />
            </View>}
            {!showAddButton &&  <View style={{marginTop:20}}>
                <Button title='Update News' onPress={()=>handleOnPressButton('Update')} />
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