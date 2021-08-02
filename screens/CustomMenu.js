import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import { DrawerContentScrollView, DrawerContentsScrollView, DrawerItemList} from "@react-navigation/drawer";
import firebase from "firebase";
import { exp } from "react-native-reanimated";
import { render } from "react-dom";
export default class CustomSideMenu extends Component{
    constructor (props){
        super(props);
        this.state={
          light_theme:true
        }
      }
      componentDidMount(){
        this.fetchUser()
      }
      fetchUser = () => {
        let theme;
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", snapshot => {
            theme = snapshot.val().current_theme;
            this.setState({ light_theme: theme === "light" });
          });
      };
    render(){
        let props=this.props;
        return(
            <View style={{flex:1,backgroundColor:this.state.light_theme?"white":"#15193c"}}>
            <Image source={require('../assets/logo.png')}
            style={{
                width:RFValue(140),
                height:RFValue(140),
                borderRadius:RFValue(70),
                alignSelf:"center",
                marginTop:RFValue(60),
                resizeMode:"contain"
            }}/>
            <DrawerContentScrollView{...props}>
            <DrawerItemList {...props}></DrawerItemList>
            </DrawerContentScrollView>
            </View>
        )
    }
}