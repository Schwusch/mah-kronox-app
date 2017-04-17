import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet
} from 'react-native';
import moment from 'moment'
import Hr from 'react-native-hr'

const style = StyleSheet.create({
  box: {
    backgroundColor: '#9DD6EB',
    margin: 5,
    padding: 5
  }
});

export default class BookingComponent extends Component {
  render() {
    const start = moment(this.props.booking.start)
    const end = moment(this.props.booking.end)
    return (
      <View>
        <Hr text={start.format('MMMM Do YYYY')} lineColor="#000"/>
        <View style={style.box}>
          <Text>{this.props.booking.summary}</Text>
          <Text>Location: {this.props.booking.location}</Text>
          <Text>Time: {start.format('HH:mm')} - {end.format('HH:mm')}</Text>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('BookingComponent', () => BookingComponent);
