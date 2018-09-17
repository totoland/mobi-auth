import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
  ImageBackground,
  BackHandler,
  I18nManager,
  ListView,
  ScrollView,
  AsyncStorage,
  NetInfo,
  FlatList,
} from "react-native";
import {
  Container,
  Button,
  Icon,
  Right,
  Item,
  Input,
  Header,
  Left,
  Body,
  Title,
  Content,
  Spinner
} from "native-base";
import Swiper from "react-native-swiper";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Dropdown from "../../../Components/Dropdown/dropdown/";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Globals from '../Globals';

// Screen Styles
import styles from "./styles";
import { Images, Metrics } from "../../../Themes/";

const rowHasChanged = (r1, r2) => r1 !== r2;
const ds = new ListView.DataSource({ rowHasChanged });

const allLikedposts = [];
const AllPosts = [];
const blogs = [];
var rerloadlog = [];
var totalpages = 0;
var listViewHeight = 0;

function handleFirstConnectivityChange(isConnected) {
  NetInfo.isConnected.removeEventListener(
    "connectionChange",
    handleFirstConnectivityChange
  );
}

export default class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allBlog: [],
      isLoading: false,
      donecategoryCall: false,
      internetConnection: false,
      searchlist: false,
      CatNAME: "",
      CatID: "",
      dot_index: 0,
      page: 1,
      paginationCount: 0,
      dataSourceBlog: ds.cloneWithRows(blogs)
    };
  }

  _handleBack() {
    this.props.navigation.navigate("CategoryList");
  }

  componentWillMount() {
    var that = this;

    AsyncStorage.multiGet(["LikedPostList", "CatID", "CatNAME","AllLikedPosts"]).then(data => {
      this.setState({
        CatID: data[1][1],
        CatNAME: data[2][1],
        blogCount: []
      });
      console.log(this.state.CatID);
      var Alllike = JSON.parse(data[3][1]);

      console.log("getLikedPosts");
      console.log(data[3][1]);

      var temp = [];

      var templike = [];
      for (var i = 0; i < Alllike.length; i++) {
            templike.push({
              index: i,
              id: Alllike[i].id,
              title: Alllike[i].title,
              excerpt: Alllike[i].excerpt,
              content: Alllike[i].content,
              date: Alllike[i].date,
              img: Alllike[i].img,
              author: Alllike[i].author,
              bgColor: Alllike[i].bgColor,
              isLiked: Alllike[i].isLiked
            });
      }
      allLikedposts = templike;

    });

    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("CategoryList");
      return true;
    });
  }

  // Time Calculation
  _dateConvert = receivedTimeStamp => {
    // Date Formate "2018-07-17T21:00:17"

    var timeAgo = " ";
    var timeMonth = " ";
    const TimeStamp = receivedTimeStamp.split(" ")[0];
    const Year = TimeStamp.split("-")[0];
    const Month = TimeStamp.split("-")[1];
    const Day = TimeStamp.split("-")[2];

    if (Month == "01" || Month == "1") {
      timeMonth = "January";
    } else if (Month == "02" || Month == "2") {
      timeMonth = "February";
    } else if (Month == "03" || Month == "3") {
      timeMonth = "March";
    } else if (Month == "04" || Month == "4") {
      timeMonth = "April";
    } else if (Month == "05" || Month == "5") {
      timeMonth = "May";
    } else if (Month == "06" || Month == "6") {
      timeMonth = "June";
    } else if (Month == "07" || Month == "7") {
      timeMonth = "July";
    } else if (Month == "08" || Month == "8") {
      timeMonth = "August";
    } else if (Month == "09" || Month == "9") {
      timeMonth = "September";
    } else if (Month == "10") {
      timeMonth = "October";
    } else if (Month == "11") {
      timeMonth = "November";
    } else if (Month == "12") {
      timeMonth = "December";
    }
    timeAgo = Day + " " + timeMonth; //+ " " + Year;  '// uncomment it if you want to add year
    //  console.log(timeAgo);
    return timeAgo;
  };
  // Time Calculation

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      handleFirstConnectivityChange
    );
  }

  // Function to Get Post on Change Text
  onChangeText = (newText) => {
    // insert your logic here
    console.log(newText);
    this.setState({
      searchText: newText,
    });

    this._getSearchList();
  }

  // Function to Get Post on Change Text
  _getSearchList() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      handleFirstConnectivityChange
    );

    const config = {
      method: "GET"
    };

    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.setState({ isLoading: true });
        //console.log(this.state.CatID);
        //var categoryid = this.state.CatID.toString();
        //console.log(categoryid);
        fetch(Globals.SITE_URL+"get_search_results/?search="+this.state.searchText+"&page="+this.state.page,config)
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson);

            dataSourceObjects = [];
            tempData = [];
            var i;
            var categoryID = "";

            if(responseJson.posts.length == 0){
                dataSourceObjects = [];
                console.log("No Data");
            }
            else {
              //set total pages
              console.log();
              totalpages = responseJson.pages;

             //catID: responseJson.posts[i].categories[0].id,
              for (i = 0; i < responseJson.posts.length; i++) {
                tempData.push({
                  id: responseJson.posts[i].id,
                  title: responseJson.posts[i].title,
                  content: responseJson.posts[i].content,
                  excerpt: responseJson.posts[i].excerpt,
                  date: responseJson.posts[i].date,
                  img: responseJson.posts[i].thumbnail,
                  author: responseJson.posts[i].author.name,
                  bgColor: "#92dcff"
                });
              }
              console.log(tempData);

              for (var j = 0; j < tempData.length; j++) {
                var isLiked = false;
                lasttitle = "";

                var SampleText = tempData[j].title.toString();
                resultArray = SampleText.split(" ");
                for (var i = 0; i < resultArray.length; i++) {
                  var NewText = "";
                  var changeText = resultArray[i].toString();
                  NewText = changeText.replace("&amp;", "&");
                  lasttitle = `${lasttitle} ${NewText}`;
                }

                if (allLikedposts.length != 0) {
                  for (var i = 0; i < allLikedposts.length; i++) {
                    if (allLikedposts[i].id == tempData[j].id) {
                      console.log(allLikedposts[i].id);
                      console.log(tempData[j].id);
                      isLiked = true;
                    }
                  }
                } else {
                  isLiked: false;
                }

                dataSourceObjects.push({
                  index: j,
                  id: tempData[j].id,
                  title: lasttitle,
                  excerpt: tempData[j].excerpt,
                  content: tempData[j].content,
                  date: tempData[j].date,
                  img: tempData[j].img,
                  author: tempData[j].author,
                  bgColor: "#92dcff",
                  isLiked: isLiked
                });
              }
            }

            rerloadlog = dataSourceObjects;
            console.log(dataSourceObjects);

            this.setState({
              dataSourceBlog: ds.cloneWithRows(dataSourceObjects),
              doneApiCall: true,
              internetConnection: true,
              isLoading: false,
              searchlist: true,
            });

            if (dataSourceObjects.length == 0) {
              this.setState({
                searchlist: false,
              });
            }

          })
          .catch(error => {
            this.setState({
              isLoading: false,
              internetConnection: false
            });
            //console.error(error);
          });
      } else {
        this.setState({
          isLoading: false,
          internetConnection: false
        });
      }
    });
  }

  onContentSize(contentWidth, contentHeight) {
    listViewHeight = contentHeight;
  }

  _handleNavigation(post_id) {
    var postID = post_id.toString();
    AsyncStorage.multiSet([
      ["postID", postID],
      ["arriveFrom", "search"]
    ]);
    this.props.navigation.navigate("CategoryDetail");
  }

  _backArrowfun() {
    myArray = [];
    AsyncStorage.removeItem("SmsInboxList");
    this.props.navigation.navigate("CategoryList");
  }


  renderItem = ({ item, index }) => {
    //_renderRowBlog(rowData) {
      return (
        <View>
          {item.index % 2 === 0 ? (
            <TouchableOpacity
              style={[styles.evenOddBlogBg, { backgroundColor: "#92dcff" }]}
              onPress={() => this._handleNavigation(item.id)}
            >
              <ImageBackground
                source={item.img == undefined ?Images.No_image_found:{ uri: item.img }}
                style={styles.evenOddImgBg}
              >
                {item.isLiked == true ? (
                  <TouchableOpacity
                    onPress={() => this.onLikeClick(item.id)}
                    style={[styles.heart, { paddingLeft: Metrics.WIDTH * 0.02 }]}
                  >
                    <Image
                      style={styles.likeBtn}
                      source={Images.heart_selected}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => this.onLikeClick(item.id)}
                    style={[styles.heart, { paddingLeft: Metrics.WIDTH * 0.02 }]}
                  >
                    <Image
                      style={styles.likeBtn}
                      source={Images.heart_unselected}
                    />
                  </TouchableOpacity>
                )}
              </ImageBackground>

              <View style={styles.evenReadMoreBg}>
                <View>
                  <TouchableOpacity
                    onPress={() => this._handleNavigation(item.id)}
                  >
                    <Text numberOfLines={2} style={styles.titleReadMoreTxt}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.dateReadMoreTxt}>
                    {this._dateConvert(item.date)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this._handleNavigation(item.id)}
                  >
                    <Text numberOfLines={3} style={styles.descriptionReadMoreTxt}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.readMoreTxtBg}
                    onPress={() => this._handleNavigation(item.id)}>
                    <Text style={styles.readMoreTxt}>Read More</Text>
                    {I18nManager.isRTL ? (
                      <Image
                        source={Images.readMoreLeftArrow}
                        style={styles.readMoreArrow}
                      />
                    ) : (
                      <Image
                        source={Images.readMoreArrow}
                        style={styles.readMoreArrow}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {/* Author Name
                <Text numberOfLines={1} style={styles.titleAuthorNameTxt1}>
                  {"Auther Name : "}{item.author}
                </Text>
                */}
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.evenOddBlogBg, { backgroundColor: "#baff88" }]}
              onPress={() => this._handleNavigation(item.id)}
            >
              <View style={styles.oddReadMoreBg}>
                <View>
                  <TouchableOpacity
                    onPress={() => this._handleNavigation(item.id)}
                  >
                    <Text numberOfLines={2} style={styles.titleReadMoreTxt}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.dateReadMoreTxt}>
                    {this._dateConvert(item.date)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this._handleNavigation(item.id)}
                  >
                    <Text numberOfLines={3} style={styles.descriptionReadMoreTxt}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.readMoreTxtBg}
                    onPress={() => this._handleNavigation(item.id)}
                  >
                    <Text style={styles.readMoreTxt}>Read More</Text>
                    {I18nManager.isRTL ? (
                      <Image
                        source={Images.readMoreLeftArrow}
                        style={styles.readMoreArrow}
                      />
                    ) : (
                      <Image
                        source={Images.readMoreArrow}
                        style={styles.readMoreArrow}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {/* Author Name
                  <Text numberOfLines={1} style={styles.titleAuthorNameTxt}>
                    {"Auther Name : "}{item.author}
                  </Text>
                  */}
              </View>
              <ImageBackground
                source={item.img == undefined ?Images.No_image_found:{ uri: item.img }}
                style={styles.evenOddImgBg}>
                {item.isLiked == true ? (
                  <TouchableOpacity
                    onPress={() => this.onLikeClick(item.id)}
                    style={[styles.heart, { paddingLeft: Metrics.WIDTH * 0.39 }]}
                  >
                    <Image
                      style={styles.likeBtn}
                      source={Images.heart_selected}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => this.onLikeClick(item.id)}
                    style={[styles.heart, { paddingLeft: Metrics.WIDTH * 0.39 }]}
                  >
                    <Image
                      style={styles.likeBtn}
                      source={Images.heart_unselected}
                    />
                  </TouchableOpacity>
                )}
              </ImageBackground>
            </TouchableOpacity>
          )}
        </View>
      );
    }


  reload = () => {
    this.state.page += 1
    console.log("Re Fetching Posts");
    this.setState({isfiltering: true});
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      handleFirstConnectivityChange
    );

    const config = {
      method: "GET"
    };

    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        console.log(this.state.CatID);
        var categoryid = this.state.CatID.toString();
        console.log(categoryid);
        console.log("Page Number :"+ this.state.page);
        fetch(Globals.SITE_URL + "get_search_results/?search="+this.state.searchText+"&page="+this.state.page, config)  //"get_category_posts/?id="+categoryid,config)
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson);
            var tempData1 = [];
            var dataSourceObjects1 = [];

            var categoryID = "";
            var isTrending = false;
            var trendingCount = 0;
            var posts_per_page = Globals.POSTS_PER_PAGE;
            var page_number = 0;

            if (responseJson.posts.length != 0) {
              console.log(responseJson.posts.length);

              for (var i = 0; i < responseJson.posts.length; i++) {
                  tempData1.push({
                    id: responseJson.posts[i].id,
                    title: responseJson.posts[i].title,
                    content: responseJson.posts[i].content,
                    excerpt: responseJson.posts[i].excerpt,
                    date: responseJson.posts[i].date,
                    img: responseJson.posts[i].thumbnail,
                    author: responseJson.posts[i].author.name,
                    bgColor: "#92dcff"
                  });
               }

              console.log(tempData1);

              for (var j = 0; j < tempData1.length; j++) {
                var isLiked = false;
                lasttitle = "";
                catName = "";

                var SampleText = tempData1[j].title.toString();
                var resultArray = SampleText.split(" ");
                for (var i = 0; i < resultArray.length; i++) {
                  var NewText = "";
                  var changeText = resultArray[i].toString();
                  NewText = changeText.replace("&amp;", "&");
                  lasttitle = `${lasttitle} ${NewText}`;
                }


                if (allLikedposts.length != 0) {
                  for (var i = 0; i < allLikedposts.length; i++) {
                    if (allLikedposts[i].id == tempData1[j].id) {
                      console.log(allLikedposts[i].id);
                      console.log(tempData1[j].id);
                      isLiked = true;
                    }
                  }
                } else {
                  isLiked: false;
                }

                dataSourceObjects1.push({
                  index: j,
                  id: tempData1[j].id,
                  title: lasttitle,
                  catName: catName,
                  excerpt: tempData1[j].excerpt,
                  content: tempData1[j].content,
                  date: tempData1[j].date,
                  img: tempData1[j].img,
                  author: tempData1[j].author,
                  bgColor: "#92dcff",
                  isLiked: isLiked
                });
              }

              console.log(dataSourceObjects1);

              var length = dataSourceObjects.length;

              console.log(length);
              for(var k=0;k<dataSourceObjects1.length;k++){
                dataSourceObjects.push({
                  index: length,
                  id: dataSourceObjects1[k].id,
                  title: dataSourceObjects1[k].title,
                  catName: dataSourceObjects1[k].catName,
                  excerpt: dataSourceObjects1[k].excerpt,
                  content: dataSourceObjects1[k].content,
                  date: dataSourceObjects1[k].date,
                  img: dataSourceObjects1[k].img,
                  author: dataSourceObjects1[k].author,
                  bgColor: "#92dcff",
                  isLiked: dataSourceObjects1[k].isLiked
                })
                length++;
              }

              console.log(dataSourceObjects);

              this.setState({
                internetConnection: true,
                isfiltering: false,
                isSearching: false,
                isLoading: false,
                dataSourceBlog: ds.cloneWithRows(dataSourceObjects),
              });

        }
        else{
          this.setState({
            internetConnection: true,
            isfiltering: false,
            isSearching: false,
            isLoading: false,
            dataSourceBlog: ds.cloneWithRows([]),
          });
        }
    }).catch(error => {
      this.setState({
        internetConnection: false,
        isLoading: false,
      });
      console.error(error);
    });
} else {
  this.setState({
    isLoading: false,
    internetConnection: false,
  });
  //alert("please check your Internet");
}
});
}

  backArrowfun() {
    myArray = [];
    AsyncStorage.removeItem("SmsInboxList");
    this.props.navigation.navigate("CategoryList");
  }

  render() {
    // console.log("dataSourceblog==");
    // console.log(" " + this.state.dataSourceBlog.getRowCount());
    const { blogCount } = this.state;
    StatusBar.setBarStyle("light-content", true);
    var that = this;

    return (
      <View style={styles.mainView}>
      <Header androidStatusBarColor={"#0e1130"} style={styles.header}>
        <Left style={styles.left}>
          <TouchableOpacity
            style={styles.backArrow}
            onPress={() => this.backArrowfun()}
          >
            <Ionicons
              name={
                I18nManager.isRTL ? "ios-arrow-forward" : "ios-arrow-back"
              }
              size={35}
              color="white"
              style={{ paddingRight: 10 }}
            />
          </TouchableOpacity>
        </Left>

        <Body style={styles.body}>
          <Text style={styles.textTitle}>Search</Text>
        </Body>

        <Right style={styles.right} transparent />
      </Header>
        <Content>
          <View style={styles.searchViewBg}>
            <View style={styles.searchBg}>
              <Input
                style={styles.searchInput}
                placeholder="Search for News"
                placeholderTextColor="#555567"
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                keyboardType="default"
                selectionColor="#6d6d71"
                onChangeText={this.onChangeText}
                value={this.state.searchText}
                ref={comp => { this.textInputRef = comp; }}
              />
              <EvilIcons name={"search"} size={24} color="#8e8e93" />
            </View>
            <View style={styles.searchYellowBlog} />
          </View>

          <View style={{ marginTop:2 }}>
            {this.state.isLoading ? (
              <View style={styles.imageOverlay}>
                <Spinner color="black" />
              </View>
            ) : this.state.internetConnection == true ? (
              <View>
                {this.state.doneApiCall == true ? (
                  <View>
                    <Text style={styles.blogTxt}>Blogs</Text>
                    {this.state.searchlist == true ? (
                      <View>
                        <FlatList
                            data={dataSourceObjects}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => `categoryList-${item.id} || ${index}`}
                            ref={ref => (this.flatList = ref)}
                            onContentSizeChange={() =>
                              this.flatList.scrollToEnd({ animated: true })
                            }
                            onLayout={() =>
                              this.flatList.scrollToEnd({ animated: true })
                            }
                          />
                          {
                            (totalpages<=this.state.page)?
                              null
                              :
                              <TouchableOpacity style={styles.more} onPress={() => this.reload()} >
                                <Text
                                  name="arrow-down"
                                  style={styles.moreTxt}>
                                Load More
                                </Text>
                              </TouchableOpacity>
                          }
                          {
                            (this.state.isfiltering)?
                              <View style={styles.imageOverlayLoadMore}>
                                <Spinner color="black" />
                              </View>
                            :
                            null
                          }
                      </View>
                      ) : (
                        <View
                          style={{
                            height: Metrics.HEIGHT*0.25,
                            width: Metrics.WIDTH,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "transparent"
                          }}>
                          <Text style={styles.noInternetText}>No Data Found</Text>
                        </View>
                      )}
                  </View>
                ) : null }
              </View>
            ) : null }
          </View>
        </Content>
      </View>
    );
  }

  // Like/Dislike Function
  onLikeClick(listId) {
    var templikePosts = [];
    var templikePosts1 = [];
    templikePosts = allLikedposts;
    templikePosts1 = allLikedposts;
    var ismatch = false;

    if (templikePosts.length != 0) {
      ismatch = false;

      for (var o = 0; o < templikePosts.length; o++) {
        if (templikePosts[o].id == listId) {
          ismatch = true;
          console.log("ID Removed");
          var toRemove = listId;
          console.log(toRemove);
          var index = templikePosts1.indexOf(toRemove);
          templikePosts1.splice(o, 1);
          break;
        }
      }

      if (ismatch == false) {
        console.log("ID Added");

        for (var k = 0; k < dataSourceObjects.length; k++) {
               if (dataSourceObjects[k].id == listId) {
                      templikePosts1.push({
                        index: k,
                        id: dataSourceObjects[k].id,
                        title: dataSourceObjects[k].title,
                        excerpt: dataSourceObjects[k].excerpt,
                        content: dataSourceObjects[k].content,
                        date: dataSourceObjects[k].date,
                        img: dataSourceObjects[k].img,
                        author: dataSourceObjects[k].author,
                        bgColor: dataSourceObjects[k].bgColor,
                        isLiked: dataSourceObjects[k].isLiked
                      });
               }
           }
       }
    } else {
      console.log("ID Added");

      console.log(templikePosts1);

      for (var k = 0; k < dataSourceObjects.length; k++) {
             if (dataSourceObjects[k].id == listId) {
                    templikePosts1.push({
                      index: k,
                      id: dataSourceObjects[k].id,
                      title: dataSourceObjects[k].title,
                      excerpt: dataSourceObjects[k].excerpt,
                      content: dataSourceObjects[k].content,
                      date: dataSourceObjects[k].date,
                      img: dataSourceObjects[k].img,
                      author: dataSourceObjects[k].author,
                      bgColor: dataSourceObjects[k].bgColor,
                      isLiked: dataSourceObjects[k].isLiked
                    });
             }
         }
    }

    console.log(templikePosts1);


    for (var i = 0; i < dataSourceObjects.length; i++) {
      if (dataSourceObjects[i].id == listId) {
        if (dataSourceObjects[i].isLiked) {
          dataSourceObjects[i].isLiked = false;
        } else {
          dataSourceObjects[i].isLiked = true;
        }
      }
    }

    console.log(dataSourceObjects);
    allLikedposts = templikePosts1;
    console.log(templikePosts);

    this.setState({
      dataSourceBlog: ds.cloneWithRows(dataSourceObjects)
    });


    AsyncStorage.multiSet([["AllLikedPosts", JSON.stringify(allLikedposts)]]);
    //}
  }

}
