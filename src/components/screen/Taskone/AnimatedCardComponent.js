import React from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';

export default function AnimatedCardComponent(props) {
  const onSwipeRight = (prop_one, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-60, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    
    return (
      <Animated.View
        style={{
          justifyContent: 'center',
          padding: '5%',
          transform: [{scale: scale}],
        }}>
        <AntDesign
          name="delete"
          size={30}
          color="black"
          onPress={props.handleOnPressDeleteItem}
        />
      </Animated.View>
    );
  };

  const onSwipeLeft = (prop_one, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 60],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        style={{justifyContent: 'center', padding: '5%', transform: [{scale}]}}>
        <AntDesign
          name="shoppingcart"
          size={30}
          color="white"
          onPress={props.handleOnPressAddItem}
        />
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderLeftActions={onSwipeLeft}
        renderRightActions={onSwipeRight}>
        <View style={style.mainViewStyle}>
          <View
            style={{
              height: '100%',
              width: '35%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{elevation: 10, borderColor: 'white', borderRadius: 60}}>
              <Image
                source={props.image}
                style={{height: 120, width: 120, borderRadius: 60}}
              />
            </View>
          </View>

          <View style={{width: '65%', padding: '5%'}}>
            <Text style={{color: 'black', fontSize: 20}}>{props.title}</Text>
            <Text style={{color: 'grey', fontSize: 18}}>{props.subTitle}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '10%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: 100,
                  padding: 5,
                  justifyContent: 'space-around',
                  backgroundColor: 'orange',
                  borderRadius: 25,
                  alignItems: 'center',
                }}>
                <AntDesign name="minus" size={20} color="black" />
                <Text style={{fontSize: 20, color: 'black'}}>
                  {props.quantity}
                </Text>
                <AntDesign name="plus" size={20} color="black" />
              </View>
              <Text style={{color: 'black', fontSize: 20, paddingRight: '10%'}}>
                {props.price}
              </Text>
            </View>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const style = StyleSheet.create({
  mainViewStyle: {
    backgroundColor: 'white',
    flexDirection: 'row',
    margin: '3%',
    borderRadius: 25,
    height: 150,
    elevation: 5,
    borderColor: 'white',
  },
});
