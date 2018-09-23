import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, TouchableOpacity, BackHandler, I18nManager, AsyncStorage } from 'react-native';
import { Container, Content, Right, Item, Input, Header, Left, Body, Title } from 'native-base';
const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0,
  }
}
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Drawer from 'react-native-drawer';
import MyControlPanel from './ControlPanel';
import tweens from './tweens';
import styles from './styles';

import MapView from 'react-native-maps';

import { RkButton, RkTextInput, RkText } from 'react-native-ui-kitten';


export default class CheckInUI extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      drawerType: 'static',
      openDrawerOffset: 50,
      closedDrawerOffset: 0,
      panOpenMask: .1,
      relativeDrag: false,
      panThreshold: .25,
      tweenHandlerOn: false,
      tweenDuration: 350,
      tweenEasing: 'linear',
      disabled: false,
      tweenHandlerPreset: null,
      acceptDoubleTap: false,
      acceptTap: false,
      acceptPan: true,
      tapToClose: true,
      negotiatePan: false,
      side: "left",
    };
  }

  componentWillMount() {
    console.log("componentWillMount");

    // setTimeout(() => { this.drawer.open() }, 1000);
    // var that = this
    // BackHandler.addEventListener('hardwareBackPress', function () {
    //   that.props.navigation.navigate('Drawer')
    //   return true;
    // });

  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidCatch() {
    console.log("componentDidCatch");
  }

  componentWillUpdate() {
    console.log("componentWillUpdate");
  }

  setDrawerType(type) {
    this.setState({
      drawerType: type
    })
  }

  tweenHandler(ratio) {
    if (!this.state.tweenHandlerPreset) { return {} }
    return tweens[this.state.tweenHandlerPreset](ratio)
  }

  noopChange() {
    this.setState({
      changeVal: Math.random()
    })
  }

  openDrawer() {
    this.drawer.open()
  }

  setStateFrag(frag) {
    this.setState(frag);
  }

  render() {
    var controlPanel = <MyControlPanel closeDrawer={() => {
      this.drawer.close();
    }} />
    return (
      <View style={styles.container}>
        <Drawer
          ref={c => this.drawer = c}
          type={this.state.drawerType}
          animation={this.state.animation}
          openDrawerOffset={this.state.openDrawerOffset}
          closedDrawerOffset={this.state.closedDrawerOffset}
          panOpenMask={this.state.panOpenMask}
          panCloseMask={this.state.panCloseMask}
          relativeDrag={this.state.relativeDrag}
          panThreshold={this.state.panThreshold}
          content={controlPanel}
          styles={drawerStyles}
          disabled={this.state.disabled}
          tweenHandler={this.tweenHandler.bind(this)}
          tweenDuration={this.state.tweenDuration}
          tweenEasing={this.state.tweenEasing}
          acceptDoubleTap={this.state.acceptDoubleTap}
          acceptTap={this.state.acceptTap}
          acceptPan={this.state.acceptPan}
          tapToClose={this.state.tapToClose}
          negotiatePan={this.state.negotiatePan}
          changeVal={this.state.changeVal}
          side={this.state.side}
        >
          <View style={styles.drawercontainer}>

            <Header style={styles.headerSec}>
              <Left style={styles.left}>
                <TouchableOpacity onPress={() => this.openDrawer()} style={styles.backArrow}>
                  <MaterialCommunityIcons name="menu" size={30} color="#fff" />
                </TouchableOpacity>
              </Left>

              <Body style={styles.body}>
                <View>
                  <Text style={styles.textTitle}>Check-in</Text>
                </View>
              </Body>


              <Right style={styles.right}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Drawer')} style={styles.backArrow}>
                  {
                    (I18nManager.isRTL)
                      ?
                      <Ionicons name="ios-arrow-round-forward-outline" size={30} color="#ffffff" />
                      :
                      <Ionicons name="ios-arrow-round-back-outline" size={30} color="#ffffff" />
                  }
                </TouchableOpacity>
              </Right>
            </Header>

            <View style={styles.section}>
              {/* <RkText rkType='header'>Default input</RkText> */}
              <View style={styles.rowContainer}>
                <View style={{ flex: 1 }}>
                  <RkTextInput placeholder='Customer name' />
                  <RkTextInput placeholder='Company name' />
                  <RkTextInput placeholder='Project' />
                  {/* <RkTextInput placeholder='Minite of meeting' /> */}
                  <RkTextInput placeholder="Minite of meeting"
                    multiline={true}
                    numberOfLines={4} />


                  <RkButton onPress={() => alert('Check in')}>
                    <Icon style={[styles.icon, { marginHorizontal: 12, fontSize: 22 }]} name="location-arrow" />
                    <RkText rkType='caption' style={styles.icon}>Check in</RkText>
                  </RkButton>

                </View>
              </View>
            </View>

          </View>
        </Drawer>
      </View>
    )
  }
}