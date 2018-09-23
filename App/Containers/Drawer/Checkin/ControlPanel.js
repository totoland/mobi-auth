import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, I18nManager } from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Left } from 'native-base';
import styles from './styles';
import { Fonts, Metrics, Colors, Images } from '../../../Themes/';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import {Actions, ActionConst} from 'react-native-router-flux';

const util = require('util');

export default class ControlPanel extends Component {

  constructor(props){
    super(props);
    console.log("print props............");
    console.log(props);
  }

  _onPress(){
    Actions.checkInScreen();
  }

  render() {
    const profileImgUri = "https://totodev.com/port/img/profile.png";
    // const _onPressCheckIn = this.props.goToEC;

    return (
      <Container style={styles.menuContainer}>
        <Header style={styles.menuheaderSec}>
          <Left style={styles.menulefts}>
            <TouchableOpacity onPress={this.props.closeDrawer}>
            {
              (I18nManager.isRTL)
              ?
                <Icon name='md-arrow-round-forward'  style={{color:'white'}} />
              :
                <Icon name='md-arrow-round-back'  style={{color:'white'}} />
            }
            </TouchableOpacity>
          </Left>
        </Header>
        <Content style={styles.menucontrolPanel}>
          <View style={styles.userProfiles}>
             <Image source={{uri:profileImgUri}} style={styles.userImageStyle}/>
             <View style={styles.userDetailsStyle}>
               <Text style={styles.userDetailsText}>Toto</Text>
               <Text style={styles.userDetailsText}>Bangkok, Thailand</Text>
             </View>
          </View>

          <View style={styles.menumainview}>
            <TouchableOpacity onPress={() => alert('Home')} >
              <View style={styles.listrow}>
                <Ionicons name="md-home" color="#ffffff" size={20} />
                <Text style={styles.rowtxt}>Home</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Meeting')} >
              <View style={styles.listrow}>
                <MaterialCommunityIcons name="file" color="#ffffff" size={20} />
                <Text style={styles.rowtxt}>Articles</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert('Message')} >
              <View style={styles.listrow}>
                <SimpleLineIcons name="bubbles" color="#ffffff" size={20} />
                <Text style={styles.rowtxt}>Message</Text>
                <View style={styles.notiCountSec}>
                 <Text style={styles.notiCount}>10</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this._onPress()} >
              <View style={styles.listrow}>
                <SimpleLineIcons name="location-pin" color='#ffffff' size={20} />
                <Text style={styles.rowtxt}>Check-in</Text>
              </View>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => alert('Favourite')} >
              <View style={styles.listrow}>
                <FontAwesome name="star" color='#ffffff' size={20} />
                <Text style={styles.rowtxt}>Favourite</Text>
              </View>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => alert('People')} >
              <View style={styles.listrow}>
                <SimpleLineIcons name="people" color='#ffffff' size={20} />
                <Text style={styles.rowtxt}>Friends</Text>
                <View style={styles.notiCountSec}>
                 <Text style={styles.notiCount}>15</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert('Logout')} >
              <View style={styles.listrow}>
                <SimpleLineIcons name="logout" color='#ffffff' size={20} />
                <Text style={styles.rowtxt}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>

        </Content>
      </Container>
    )
  }

}


// ControlPanel.propTypes = {
//   goToEC: PropTypes.func
// }

