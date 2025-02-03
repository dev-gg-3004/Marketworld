import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, View ,Animated, StatusBar, SafeAreaView, ScrollView, ImageBackground} from 'react-native'
import userImage from '../../../assests/images/profile_user.jpg'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AnimatedCardComponent from './AnimatedCardComponent'

import image from '../../../assests/images/bganimated.jpeg'

export default function AnimatedTask() {

    const array=[
        {image:userImage,title:"Main title",subTitle:'Sub Title',price:"$25",quantity:2},
        {image:userImage,title:"Main title",subTitle:'Sub Title',price:"$25",quantity:1},
        {image:userImage,title:"Main title",subTitle:'Sub Title',price:"$25",quantity:5},
        {image:userImage,title:"Main title",subTitle:'Sub Title',price:"$25",quantity:4},
        {image:userImage,title:"Main title",subTitle:'Sub Title',price:"$25",quantity:4},
        {image:userImage,title:"Main title",subTitle:'Sub Title',price:"$25",quantity:4},
        {image:userImage,title:"Main title",subTitle:'Sub Title',price:"$25",quantity:4},
        {image:userImage,title:"Main title",subTitle:'Sub Title',price:"$25",quantity:4},
    ]

    const [arrayData,setArrayData]=useState(array)
    const [cardArrayData,setCardArrayData]=useState([])




    function handleOnPressDeleteItem(i){
       
        let temp = [...arrayData];
        temp.splice(i,1)
        setArrayData(temp)
    }

    function handleOnPressAddItem(item,i){
        console.log(item);
        console.log(i);
        let temp=[...cardArrayData,item]

        console.log("tempCartArray==>",temp);
        setCardArrayData(temp)


    }

    

    function renderHeader(){
        
        return(
            <View style={style.headerMainView}>
                <AntDesign name='leftcircle' size={35} color='white'/>
                <Text style={{color:"black",fontSize:25}}>Cart</Text>
                <View style={{height:45,width:45,borderRadius:50}}>
                    <Image  source={userImage} style={{height:"100%",width:"100%",borderRadius:50}}/>
                </View>
            </View>
        )
    }

    function renderItem(){

        return(
           <FlatList 
                data={arrayData}
                style={{flex:1}}
                keyExtractor={(item,index) => index}
                renderItem={({item,index})=>{
                    return(
                      
                        <AnimatedCardComponent 
                        handleOnPressDeleteItem={()=>handleOnPressDeleteItem(i)}
                         handleOnPressAddItem={()=>handleOnPressAddItem(item)} image={item.image} title={item.title}  values={item}
                            subTitle={item.subTitle}  price={item.price} quantity={item.quantity}
                        />
                        
                
                    )
                }}
           />
        )
    }


    return (
        <SafeAreaView style={{flex:1,backgroundColor:"lightslategrey",}}>
            <ImageBackground source={image}  style={{flex:1}} blurRadius={50}>
                {renderHeader()}
                {renderItem()}
            </ImageBackground>
        </SafeAreaView>
    )
}


const style=StyleSheet.create({
    headerMainView:{
        flexDirection:"row",
        justifyContent:'space-between',
        height:"10%",
        padding:"3%",
        alignItems:"center"
    }
})



// export default function AnimatedTask(){

    
//     const array=[
//         {image:userImage,title:"Main title",subTitle:'Sub Title',price:"$25",quantity:2},
//         {image:userImage,title:"Main title",subTitle:'Sub Title',price:"$25",quantity:1},
//         {image:userImage,title:"Main title",subTitle:'Sub Title',price:"$25",quantity:5},
//         {image:userImage,title:"Main title",subTitle:'Sub Title',price:"$25",quantity:4},
//         {image:userImage,title:"Main title",subTitle:'Sub Title',price:"$25",quantity:4},
//         {image:userImage,title:"Main title",subTitle:'Sub Title',price:"$25",quantity:4},
//         {image:userImage,title:"Main title",subTitle:'Sub Title',price:"$25",quantity:4},
//         {image:userImage,title:"Main title",subTitle:'Sub Title',price:"$25",quantity:4},
//     ]
//     const [arrayData,setArrayData]=useState(array)
//     const [cardArrayData,setCardArrayData]=useState([])

//     function renderHeader(){
        
//         return(
//             <View style={style.headerMainView}>
//                 <AntDesign name='leftcircle' size={35} color='white'/>
//                 <Text style={{color:"black",fontSize:25}}>Cart</Text>
//                 <View style={{height:45,width:45,borderRadius:50}}>
//                     <Image  source={userImage} style={{height:"100%",width:"100%",borderRadius:50}}/>
//                 </View>
//             </View>
//         )
//     }

//     function renderItem(){
//         return(
//                 <FlatList 
//                     data={arrayData}
//                     style={{flex:1}}
//                     keyExtractor={(item,index) => index}
//                     renderItem={({item,index})=>{
//                         return(
                          
//                             <AnimatedCardComponent  image={item.image} title={item.title}  values={item}
//                                 subTitle={item.subTitle}  price={item.price} quantity={item.quantity}
//                             />
                    
//                         )
//                     }}
//                 />
//             )
//         }
                
      


//     return(
//         <SafeAreaView style={{flex:1,backgroundColor:"lightslategrey",}}> 
            
//             {renderHeader()}
//             {/* {renderItem()} */}
//             <ScrollView style={{flex:1}}>
//                 {array.map((item,i)=>(
//                   <View key={i}>
//                      <AnimatedCardComponent  image={item.image} title={item.title}  values={item}
//                             subTitle={item.subTitle}  price={item.price} quantity={item.quantity}
//                         />
//                   </View>
//                 ))}
//             </ScrollView>

//         </SafeAreaView>

//     )
// }