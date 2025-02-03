import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TouchableButton from '../TouchableButton/Index';

export default function IpoCard(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flex: 1,
        width: '100%',
        borderColor: 'white',
        borderBottomColor: 'lightgrey',
        borderWidth: 1,
        padding: '4.5%',
        backgroundColor: 'white',
      }}>
      <Text style={styles.plainTextStyle}>{props.ipoName}</Text>
      <View style={styles.viewChildStyle}>
        <Text style={styles.ipoShortTitle}>{props.ipoShortTitle}</Text>
        {
          <TouchableButton 
            buttonTitle={props.status}
            textStyle={styles.applyTextStyle}
            touchableViewStyle={
              props.status === 'Apply'
                ? styles.applyViewStyle
                : styles.closeViewStyle
            }
          />
        }
      </View>
      <View style={styles.viewChildStyle}>
        <Text style={styles.plainTextStyle}>Rs.{props.offerPrice}</Text>
        <Text style={styles.plainTextStyle}>{props.dateRange}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  applyViewStyle: {
    backgroundColor: 'royalblue',
    // opacity:0.8,
    width: '30%',
    height: '100%',
    borderRadius: 5,
    justifyContent: 'center',
  },
  closeViewStyle: {
    backgroundColor: 'grey',
    // opacity:0.8,
    width: '30%',
    height: '100%',
    borderRadius: 5,
    justifyContent: 'center',
  },
  applyTextStyle: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  plainTextStyle: {
    color: 'grey',
    fontSize: 15,
  },
  ipoShortTitle: {
    fontSize: 22,
    color: 'black',
    fontFamily: 'Roboto-Regular',
  },
  viewChildStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '35%',
    marginTop: '2%',
    alignItems: 'center',
  },
});
