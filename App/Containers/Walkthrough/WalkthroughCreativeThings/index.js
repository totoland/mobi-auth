
import React, { Component } from 'react';
import { Text, View, Image, StatusBar, Platform, ImageBackground,Dimensions,TouchableOpacity, BackHandler, I18nManager} from 'react-native';
import { Container, Button, Icon, Right, Header, Left, Body } from 'native-base';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// Screen Styles
import styles from './styles';

export default class WalkthroughCreativeThings extends Component {

  constructor(props) {
 		super(props);
 		this.state = {
      index:0,
    };
 	}

  componentWillMount() {
	  var that = this
	  BackHandler.addEventListener('hardwareBackPress', function() {
			that.props.navigation.navigate('Walkthrough')
	   	return true;
	  });
	}

  swipePages = () =>{
    if(this.state.index == 4){
      this.setState({index:0})
    }
    this.refs.swiper.scrollBy(1)
  }

  render(){
		StatusBar.setBarStyle('light-content', true);
		if(Platform.OS === 'android') {
			StatusBar.setBackgroundColor('rgba(0,0,0,0.3)',true);
			StatusBar.setTranslucent(true);
		}

    var renderPagination = function(index, total) {
      return <View style={{}}><Text>{index}/{total}</Text></View>
    }

		let swiperImage = {
			uri : 'https://antiqueruby.aliansoftware.net//Images/walkthrough/light_wt14.png'
		};

    var data = [
      {
        id: 1,
        image: swiperImage,
        title: 'Creative Things',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: 2,
        image: swiperImage,
        title: 'Creative Things',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: 3,
        image: swiperImage,
        title: 'Creative Things',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: 4,
        image: swiperImage,
        title: 'Creative Things',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: 5,
        image: swiperImage,
        title: 'Creative Things',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
    ]

    return(
     <Container>
      <LinearGradient locations={[0.15,1]} colors={['#ff895b','#ff4863']} style={styles.shadowBg}>
       <Header style={styles.header}>
         <Left style={styles.left}>
           <TouchableOpacity style={styles.backArrow} onPress={()=>this.props.navigation.navigate('Walkthrough')}>
             <FontAwesome name={I18nManager.isRTL ? "angle-right" : "angle-left"} size={30} color="white"/>
           </TouchableOpacity>
         </Left>
         <Body style={styles.body}>
         </Body>
         <Right style={styles.right}/>
       </Header>

       <Swiper showsButtons={false}
         autoplay={false}
         loop={true}
         ref="swiper"
         index={this.state.index}
         activeDot={<View style={styles.activeDot} />}
         dot={<View style={styles.dot} />}
         onIndexChanged={(index)=>this.setState({index})}>
         {
          data.map((item, index) => {
             return (
               <View style={styles.slide} key={index}>
                 <Text style={styles.headertext}>
                  {item.title}
                 </Text>
                 <Text style={styles.desctext}>
                  {item.description}
                 </Text>
                 <Text style={styles.steptext}>
                  Step {(this.state.index+1)}/5
                 </Text>
                 <Image source={item.image} style={styles.sliderImage}/>
               </View>
             )
           })
         }
       </Swiper>

       <View style={styles.btnsec}>
         <Button rounded onPress = {() => this.refs.swiper.scrollBy(1)} style={styles.nextBotton}>
           <Text style={styles.nextText}>NEXT</Text>
         </Button>
         <Right>
         <TouchableOpacity onPress={() => alert('Skip')}>
           <Text style={styles.skipText}>Skip</Text>
         </TouchableOpacity>
         </Right>
       </View>
      </LinearGradient>
    </Container>

    );
  }
}
