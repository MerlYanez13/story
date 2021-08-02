import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";
import Logout from "../logout";
import firebase from "firebase";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import CustomSideMenu from "../screens/CustomMenu";
const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component{
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
  return (
    <Drawer.Navigator
    drawerContentOptions={{activeTintColor:'#e91e63',inactiveTintColor:this.state.light_theme?"black":white}}>
      drawerContent={props=> CustomSideMenu(...props)}
      <Drawer.Screen name="Home" component={StackNavigator} options={{unmountOnBlur:true}}/>
      <Drawer.Screen name="Profile" component={Profile} options={{unmountOnBlur:true}}/>
      <Drawer.Screen name="Logout" component={Logout} options={{unmountOnBlur:true}}/>
    </Drawer.Navigator>
  );
}
 
};

export default DrawerNavigator;
