import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Button
} from 'react-native';
import { fetchBookings } from '../actions/fetchBookings';
import BookingComponent from './BookingComponent';
import * as actionTypes from '../constants/actionTypes';

var styles = StyleSheet.create({
  schedule: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 64
  }
})

export default class ScheduleComponent extends Component {
  onFetch () {
    this.props.dispatch({
      type: actionTypes.RESET_BOOKINGS
    });
    for(program of this.props.programs) {
      fetchBookings(program)
    }
  }

  render() {
    let stuffToRender = [];
    if (!this.props.bookings.list.length && !this.props.bookings.loading && this.props.programs.length) {
        stuffToRender.push(
          <Button
            onPress={this.onFetch.bind(this)}
            title="HÄMTA SCHEMA"
            color="#841584"
            key="loadStuff"
          />);
    }
    if (!this.props.programs.length) {
      stuffToRender.push(
        <Text
          key="infoTextWhenNoPrograms"
          style={styles.text}>
          Lägg till schema genom att dra åt sidan!
        </Text>
      )
    }
    let mappedBookings = this.props.bookings.list.map(booking => <BookingComponent booking={booking} key={booking.uid}/>);
    stuffToRender = stuffToRender.concat(mappedBookings);

    return (
      <View style={styles.schedule}>
        <ScrollView refreshControl={
            <RefreshControl
              refreshing={this.props.bookings.loading}
              onRefresh={this.onFetch.bind(this)}
            />
          }>
          {stuffToRender}
        </ScrollView>
      </View>
    )
  }
}

AppRegistry.registerComponent('ScheduleComponent', () => ScheduleComponent);
