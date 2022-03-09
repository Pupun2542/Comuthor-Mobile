import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import * as DevMenu from "expo-dev-menu";
import { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Group from "./screens/Group";
import CreateGroup from "./screens/CreateGroup";
import GroupDetail from "./screens/GroupDetail";
import Login from "./screens/Login";
import { NativeBaseProvider } from "native-base";

export default function App() {
  const Tabs = createBottomTabNavigator();
  const Stacks = createStackNavigator();

  function GroupStack() {
    return (
      <Stacks.Navigator>
        <Stacks.Screen name="Group" component={Group} />
        <Stacks.Screen name="Detail" component={GroupDetail} />
        <Stacks.Screen name="Login" component={Login} />
      </Stacks.Navigator>
    );
  }
  function CreateGroupStack() {
    return (
      <Stacks.Navigator>
        <Stacks.Screen name="Create Group" component={CreateGroup} />
      </Stacks.Navigator>
    );
  }

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <NavigationContainer>
          <Tabs.Navigator screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="groups" component={GroupStack} />
            <Tabs.Screen name="CreateGroup" component={CreateGroupStack} />
          </Tabs.Navigator>
        </NavigationContainer>
      </View>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
});
