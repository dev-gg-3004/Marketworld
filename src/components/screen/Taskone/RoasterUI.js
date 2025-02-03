import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import profilebg from '../../../assests/images/task.png'
import userimg from '../../../assests/images/mypic.jpeg'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import KinsDisplay from './KinsDisplay'
import { deleteKinDetail } from '../../../redux/actions/KinAction'


export default function RoasterUI({navigation}) {
    const [showPin,setShowPin] = useState(false)
    const [kinsArrayDetails,setKinsArrayDetails]=useState([])
    const {kinData} =useSelector(store=>store.adminReducers)
    const contactno='978521946'
    const dispatch=useDispatch()

    useEffect(()=>{
        setKinsArrayDetails(kinData)
        console.log("kinData",kinData);
    },[kinData])

    function renderProfileImage(){
        return(
            <ImageBackground  source={profilebg} resizeMode="cover" style={style.profileBgstyle}>
                    <View style={{flexDirection: 'row',alignItems: 'flex-end',justifyContent:"center",marginLeft:"8%",width:"40%",height:"70%"}}>

                        <Image source={userimg} style={{height:"100%",width:'100%',borderRadius:100,borderColor:"blue",borderWidth:1}}/>

                        <View style={{position: 'relative',right:40, marginBottom:"6%",backgroundColor:"lightseagreen",borderRadius:100,height:"22%",width:"22%",justifyContent:"center",alignItems:"center"}}>
                            <Entypo name='edit'  size={23} color='white'  />
                        </View>
                    </View>

                    <View style={{width:"50%",height:"50%",justifyContent:"center",paddingTop:"11%",}}>
                        <Text style={{color:"black",fontFamily:"Roboto-Medium",textAlign:"center",fontSize:22,paddingLeft:"15%"}} > carrer</Text>
                        <Text style={{color:"black",fontFamily:"Roboto-Medium",fontSize:25, paddingTop:"10%",textAlign:"center"}} >Hello User</Text>
                    </View>
                    
                </ImageBackground>
        )
    }

    function onPressDeleteKinDetails(value,i){
        let temp=[...kinsArrayDetails]
        temp.splice(i,1)
        setKinsArrayDetails(temp)
        dispatch(deleteKinDetail(value,i))
    }

    function renderKinsDetails(){
        console.log("kinsArrayDetails",kinsArrayDetails);
        return kinsArrayDetails?.map((value,i)=>{
            return (
                <View key={i}>

                    <KinsDisplay  firstName={value.firstName} lastName={value.lastName}
                    email={value.email}  relationship={value.relationship}  homeNo={value.homeNo}
                    mobileNo={value.mobileNo}   onPressDelete={()=>onPressDeleteKinDetails(value,i)}
                    />
                </View>
            )
        })
    }

    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <View style={{height:'28%',width:"94%",flexDirection:"row",alignSelf:"center",elevation:5,backgroundColor:"red",marginTop:"3%"}}>
               {renderProfileImage()}
            </View>
            <ScrollView style={{margin:"3%",marginTop:"5%"}}>

                <View style={{flexDirection:"row",paddingRight:"5%",justifyContent:"space-between"}}>
                    <Text style={{color:"lightseagreen",fontSize:22}}>Manage My Details</Text>
                    <Entypo name='edit'  size={23} color='black'  />
                </View>                

                <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:"5%"}}>
                    <Text style={{color:"lightseagreen",fontSize:20}}>My Pin</Text>
                    <View style={{flexDirection:"row",paddingRight:20}}>
                        {!showPin &&  <Entypo name='eye-with-line' size={25} color='black' onPress={()=>setShowPin(true)}/>}
                        {showPin &&  <Text style={{color:"lightseagreen",fontSize:20,marginRight:25}}>48555</Text> }
                        {showPin &&  <Entypo name='eye' size={25} color='black' onPress={()=>setShowPin(false)}/> }
                    </View>
                </View>

                <View style={{marginTop:"4%",flexDirection:"row"}}>
                    <Text style={{color:"lightseagreen",fontSize:20,width:"35%"}}>My Address</Text>
                    <Text style={{color:"black",fontSize:17,width:"55%"}}>jhgdzhgxc hjgfhjkhj hfcjgvh bkjhykfjcv khc vbkchg vhjklj fhghlck vgh bh </Text>
                </View>

                <View style={{marginTop:"4%",flexDirection:"row",borderColor:"white",borderBottomColor:"grey",borderWidth:2,paddingBottom:"5%"}}>

                    <Text style={{color:"lightseagreen",fontSize:20,width:"35%"}}>My Contact</Text>

                    <View style={{flexDirection:"row",width:"55%"}}>

                        <Text style={{color:"black",fontSize:17}}>1234567890</Text> 
                        <Text style={{color:"black",fontSize:17}}> /{contactno}</Text> 
                    </View>
                </View>

                <View style={{marginTop:"4%",flexDirection:"row",marginBottom:"7%"}}>
                    <Text style={{color:"lightseagreen",fontSize:20,width:"35%"}}>My Next Kin </Text>
                    <View style={{backgroundColor:'lightseagreen',borderRadius:50,height:25,width:25,alignItems:"center"}}>
                        <Ionicons name='add-outline'  size={23} color='white' onPress={()=>navigation.navigate('AddKin')}/>
                    </View>
                </View>

             {renderKinsDetails()}
            </ScrollView>


        
        </View>
    )
}


const style=StyleSheet.create({

    profileBgstyle:{
        height:"100%",
        width:"100%",
        justifyContent:"center",
        flexDirection:"row",
        alignItems:"center",
        
    }
})