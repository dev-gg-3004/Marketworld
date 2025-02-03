import { useRoute } from '@react-navigation/native';
import {ActivityIndicator, Button, Modal, ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import Loader from '../../common/Loader/Index';
import NewsCards from '../../common/newscard/NewsCards';

export default function News() {
  let {newsList, showLoader} = useSelector(state => state.adminReducers);
  let images = [];
  
  function renderNewsCards() {
    return newsList?.map((value, i) => {
      images.push(value.urlToImage);
      return (
        <View key={i} style={{marginLeft: 15, marginBottom: 10}}>
          <NewsCards
            id={i}
            newsimg={value.urlToImage}
            newsTitle={value.title}
            newsBodyContent={value.description}
            handleOnReadMore={value.url}
            data={value}
          />
        </View>
      );
    });
  }

  return (
    <ScrollView style={{alignContent: 'center', backgroundColor: 'grey',paddingTop:10}}>
      {/* {showLoader &&  <ActivityIndicator size="large" color="#0000ff"  />} */}
      <Modal animationType="slide" transparent={true} visible={showLoader}>
        <Loader  />
      </Modal>
      {renderNewsCards()}
      {/* <SliderBox images={images}/> */}
    </ScrollView>
  );
}
