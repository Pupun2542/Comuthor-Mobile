import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Group from "./screens/Group";
import CreateGroup from "./screens/CreateGroup";
import GroupDetail from "./screens/GroupDetail";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import { AppProvider } from "./src/hook/local";

const Tabs = createBottomTabNavigator();

const Stack = createStackNavigator();

function GroupStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Group" component={Group} />
      <Stack.Screen name="Detail" component={GroupDetail} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
function CreateGroupStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Create Group" component={CreateGroup} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <View style={styles.container}>
        <NavigationContainer>
          <Tabs.Navigator screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="groups" component={GroupStack} />
            <Tabs.Screen name="CreateGroup" component={CreateGroupStack} />
          </Tabs.Navigator>
        </NavigationContainer>
      </View>
    </AppProvider>
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
