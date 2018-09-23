import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import LoginScreen from './LoginScreen';
import DrawerSocialCustom from '../../../Drawer/DrawerSocialCustom/index';
import checkIn from "../../../Drawer/Checkin/CheckInUI.js";

export default class Main extends Component {
  render() {
	  return (
	    <Router>
	      <Scene key="root">
	        <Scene key="loginScreen"
	          component={LoginScreen}
	        	animation='fade'
	          hideNavBar={true}
	          initial={true}
	        />
	        <Scene key="mainScreen"
	          component={checkIn}
	          animation='fade'
	          hideNavBar={true}
	        />
					<Scene key="checkInScreen"
	          component={checkIn}
	          animation='fade'
	          hideNavBar={true}
	        />
	      </Scene>
			</Router>
			// <LoginScreen></LoginScreen>
	  );
	}
}