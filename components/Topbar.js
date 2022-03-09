import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

const Topbar = (props) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ alignItems: "flex-end", margin: 10 }}
          onPress={props.navigation.openDrawer}
        >
          <Entypo name="menu" size={24} color="black" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};
export default Topbar;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFF"
    },
    text:{
        color:"#161924",
        fontSize:20,
        fontWeight:"500"
    }
});