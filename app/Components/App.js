import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import ScheduleComponent from './ScheduleComponent';
import SettingsComponent from './SettingsComponent';
import AddProgramComponent from './AddProgramComponent'
import { Actions } from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import * as actionTypes from '../constants/actionTypes';

@connect((store) => {
  return {
    bookings: store.bookings,
    programs: store.programs,
    settings: store.settings,
    autocomplete: store.autocomplete
  }
})
export default class App extends Component {
  render() {
    let swipes = [];
    const programs= this.props.programs;
    if(this.props.settings.separateSchedules){
      for(program of programs) {
        const name = program.type === "PROGRAM" ? program.name : program.name.trim().slice(0, -1);
        swipes.push(
          <ScheduleComponent
            key={name}
            tabLabel={name}
            specificProgram={program.name}
            bookings={this.props.bookings}
            programs={this.props.programs}
            dispatch={this.props.dispatch}
            settings={this.props.settings}
          />
        )
      }
    } else {
      swipes.push(
        <ScheduleComponent
          key="Alla"
          tabLabel="Alla"
          bookings={this.props.bookings}
          programs={this.props.programs}
          dispatch={this.props.dispatch}
          settings={this.props.settings}
        />
      )
    }

    return (
      <ScrollableTabView
        tabBarBackgroundColor="#633355"
        tabBarActiveTextColor="#FFFFFF"
        tabBarUnderlineStyle={{backgroundColor: "#A591C1"}}
        onChangeTab={(index) => {this.props.dispatch({type: actionTypes.RESET_AUTOCOMPLETE})}}
        >
        {swipes}
        <SettingsComponent
          key="Inställningar"
          tabLabel="Inställningar"
          loading={this.props.bookings.loading}
          programs={this.props.programs}
          dispatch={this.props.dispatch}
          settings={this.props.settings}
        />
        <AddProgramComponent
        key="Lägg till schema"
        tabLabel="Lägg till schema"
        loading={this.props.bookings.loading}
        programs={this.props.programs}
        dispatch={this.props.dispatch}
        settings={this.props.settings}
        autocomplete={this.props.autocomplete}
      />
      </ScrollableTabView>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
