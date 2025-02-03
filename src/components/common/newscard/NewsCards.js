import {Image, StyleSheet, Text, TouchableOpacity, View,Linking, Share} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TouchableButton from '../TouchableButton/Index'
import shareimg from '../../../assests/images/share.png'
import { useEffect, useState } from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { getSession } from '../../../utils/Session';
import NewsDetails from '../../screen/news/NewsDetails';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function NewsCards(props) {
  const [userData,setUserData]=useState({})
  const [url, setUrl] = useState(null);
  const [generatedLink,setGeneratedLink]=useState('')

  const navigation=useNavigation()
const route=useRoute();
  async function getUserSession(){
    let session = await getSession()
      if(session){
        setUserData(session)
        console.log(session);
    }
  }

 
  
  const buildLink=async ()=> {
    const link = await dynamicLinks().buildLink({
      link: 'https://invertase.io/offer',
      // domainUriPrefix is created in your Firebase console
      domainUriPrefix: 'https://marketworldlink.page.link',
      // optional setup which updates Firebase analytics campaign
      // "banner". This also needs setting up before hand
      analytics: {
        campaign: 'banner',
      },
    });
    console.log("link",link);
    setGeneratedLink(link);
  }

  const handleDynamicLink = link => {
    console.log("link",link);
    // Handle dynamic link inside your own application
    if (link.url === 'https://invertase.io/offer') {
      // ...navigate to your offers screen
      alert("matched")
    }
  };

  function handleOnClickReadMore(){
    let temp=props.id;
    console.log(temp);
    let data=props.data
    navigation.navigate('NewsDetails' ,{dataId:temp})
  }

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);


  useEffect(() => {
    const getUrlAsync = async () => {

      // Get the deep link used to open the app
      // const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      // setTimeout(() => {
      //   setUrl(initialUrl);
      // }, 1000);
    };

    getUrlAsync();

  }, []);

 
function handleOnPressShare(){

    // getUserSession();
 
    // console.log("linking",);

    const message = `marketworld://${route.name}/:${props.id}`;
    const title = "Checkout  latest news";
    const options = {
      title,
      message,
    };

    Share.share(options).then(res=>{
      console.log(res)
  }).catch(e=> console.log(e))






    // buildLink()
    // console.log("generatedLink",generatedLink);
  }
  function renderNewsImage() {
    const image={uri:props.newsimg}
    return (
      <View style={{height:"60%",width:"100%"}}>

        <Image source={image} style={{...Style.imageStyle, }} />
      </View>
    )
  }

  function renderNewsContent() {
    return (
      <View style={Style.newsContent}>
        <Text style={{color:"black",fontSize:22}}>{props.newsTitle}</Text>
        <View style={Style.readmoreShareImgView}> 

          <TouchableButton buttonTitle="Read More" onPress={handleOnClickReadMore} touchableViewStyle={Style.readmoreViewStye} textStyle={Style.readMoreTextStyle}/>
          <TouchableOpacity style={{paddingRight:"5%"}} onPress={()=>handleOnPressShare()}>
            <Image source={shareimg} style={{height:25 ,width:25}} />  
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={Style.mainBody}>
        {renderNewsImage()}
        <View>

          {renderNewsContent()}
        </View>
    </View>
  );
}

const Style = StyleSheet.create({
  imageStyle: {
    borderRadius: 20,
    width:"100%",
    height:"100%"
  },
  newsContent:{
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    marginTop:"5%"
  },
  mainBody:{
    height:550,
    width:"94%",
    borderRadius:25,
    backgroundColor:"white",
  },
  readmoreShareImgView:{
    // backgroundColor:"lightblue",
    height:"30%",
    width:"100%",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'space-between',
    paddingLeft:"30%"
  },
  readmoreViewStye:{
    width:"70%",
    bordercolor:"blue",
    borderWidth:1,
    backgroundColor:"royalblue",
    borderRadius:25
  },
  readMoreTextStyle:{
    color:"white",
    fontFamily:"Roboto-Regular",
    fontSize:20,
    padding:"3%",
    textAlign:"center"

  }



});


// Todays task
// ---> in zoom meeting --->
// ---> Rnd on error boundary--->1hrs
// ---> implementation and new screen for error boundary-->1.3
// --->Add Activity indicator ---->30min
// ---> news page card n screen  changing --->1hrs
// --->rnd on push notification --> 1hrs
// --->implementation and setup -->1.3hrs