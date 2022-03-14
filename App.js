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
import auth from "@react-native-firebase/auth";
import EditGroup from "./screens/EditGroup";

export default function App() {
  const Tabs = createBottomTabNavigator();
  const Stacks = createStackNavigator();

  function GroupStack() {
    return (
      <Stacks.Navigator>
        <Stacks.Screen name="Group" component={Group} />
        <Stacks.Screen name="Detail" component={GroupDetail} />
        <Stacks.Screen name="Edit Group" component={EditGroup} />
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

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleLogin = async () => {
    auth().signInAnonymously();
  };

  return (
    <NativeBaseProvider>
      {user && (
        <View style={styles.container}>
          <NavigationContainer>
            <Tabs.Navigator screenOptions={{ headerShown: false }}>
              <Tabs.Screen name="groups" component={GroupStack} />
              <Tabs.Screen name="CreateGroup" component={CreateGroupStack} />
            </Tabs.Navigator>
          </NavigationContainer>
        </View>
      )}
      {!user && (
        <View>
          <Button onPress={handleLogin} title={"Login"} />
        </View>
      )}
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
