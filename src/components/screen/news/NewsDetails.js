// import { useRoute } from '@react-navigation/native';
// import React, { useEffect } from 'react'
// import { View } from 'react-native'
// import { useSelector } from 'react-redux';
// import { isArrayNotNullUndefined, notNullUndefined } from '../../../utils/Validation';

// export default function NewsDetails({route}) {
//     let {newsList, showLoader} = useSelector(state => state.adminReducers);

//     console.log("route",route.params.dataId);
//     // const newsData=props.data
//     // console.log("newsData",newsData);

//     console.log(route.name);
//     useEffect(()=>{
//         if(isArrayNotNullUndefined(newsList)){

//             let tempId=route.params.dataId;
//             let filterlist = newsList.filter((value, i) => {
                
//                 return (i===tempId);
//             });
//             console.log(filterlist);
//         }
//     },[])
//     return (
//         <View>
        
//         </View>
//     )
// }


import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Linking, Button } from 'react-native';
import { useSelector } from 'react-redux';

export default function NewsDetails({ route, navigation }) {
  const { newsList } = useSelector(state => state.adminReducers);
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    if (newsList && newsList.length > 0) {
      const article = newsList.find(item => item.title === route.params.title);
      setNewsData(article);
    }
  }, [newsList, route.params.title]);

  if (!newsData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {newsData.urlToImage && (
        <Image source={{ uri: newsData.urlToImage }} style={styles.image} />
      )}
      <Text style={styles.title}>{newsData.title}</Text>
      <Text style={styles.author}>By {newsData.author || 'Unknown'}</Text>
      <Text style={styles.publishedAt}>
        Published on {new Date(newsData.publishedAt).toLocaleDateString()}
      </Text>
      {newsData.description && (
        <Text style={styles.description}>{newsData.description}</Text>
      )}
      <Text style={styles.content}>
        {newsData.content || 'No content available.'}
      </Text>
      <Text
        style={styles.readMore}
        onPress={() => Linking.openURL(newsData.url)}
      >
        Read full article
      </Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  publishedAt: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    fontStyle: 'italic',
    color:'black'
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color:'black'
  },
  readMore: {
    fontSize: 16,
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
});
