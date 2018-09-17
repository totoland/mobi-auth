import React, { Component } from "react";
import { AsyncStorage } from 'react-native';


module.exports = {

  SITE_URL:  "http://antiquerubyreact.aliansoftware.net/wordpress-blog/api/",  // here set the base url

  FEATURED_TAG_ID: 11, // here set ID For FEATURED BLOG For ** CategoryList Screen **
  FEATURED_BLOG_COUNT : 6, // here set Maximum FEATURED BLOG COUNT For ** CategoryList Screen **
  EXCLUDE_CARTEGORY : [12,13], // here set Exlcude Categories ids For ** CategoryList Screen ** Example. [6,2,4,25]

  LATEST_BLOG_COUNT : 5, // here set Maximum LATEST BLOG COUNT For ** Category Screen **
  SHOW_TRENDING_BLOG : true, // here set Visibility of TRENDING BLOG For ** Category Screen **
  TRENDING_BLOG_COUNT : 5, // here set Maximum TRENDING BLOG COUNT For ** Category Screen **

  SEARCH_EXCLUDE_CARTEGORY : [12], // here set Exlcude Categories ids For ** Search Screen ** Example. [6,2,4,25]

};
