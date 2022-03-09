import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import { Entypo } from "@expo/vector-icons";

export default function SideBar(props) {
  return (
    <ScrollView>
      <ImageBackground
        source={require("../assets/bg.jpg")}
        style={{ width: undefined, padding: 16, paddingTop: 48 }}
      >
        <Image
          source={require("../assets/Comuthor1.png")}
          style={styles.profile}
        ></Image>
        <Text style={styles.name}>John Doe</Text>
      </ImageBackground>
      <View style={styles.container}>
          <DrawerNavigatorItems {...props}/>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  name:{
      color: "#FFF",
      fontSize: 20,
      fontWeight: "800",
      marginVertical:8
  }
});
