import React, { useEffect, useState } from "react";
import { View, Text, Button, RefreshControl, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {
  Box,
  AspectRatio,
  Center,
  Stack,
  Heading,
  HStack,
  Image,
} from "native-base";

const Group = ({ navigation }) => {
  const GroupCollection = firestore().collection("group");
  const [group, setGroup] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    const res = GroupCollection.orderBy("createAt", "desc")
      .get()
      .then((val) => {
        setGroup(val.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
  };
  // useEffect(() => {
  //   const load = loadData()
  //   return load
  // },[]);

  useEffect(() => {
    const subscribe = GroupCollection.onSnapshot(
      (q) => {
        setGroup(q.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      },
      (e) => {
        alert(e.message);
      }
    );
    return subscribe;
  });

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Ionicons
  //         name="person-add"
  //         size={24}
  //         color="black"
  //         onPress={() => navigation.navigate("Login")}
  //       />
  //     ),
  //   });
  // }, [navigation]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Box background={"gray.400"}>
        {group.map((d, k) => {
          return (
            <Box
              alignItems="center"
              key={k}
              onTouchEnd={() => {
                navigation.navigate("Detail", {
                  id: d.id,
                  data: d,
                });
              }}
              marginBottom={3}
            >
              <Box
                maxW="80"
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                _dark={{
                  borderColor: "coolGray.600",
                  backgroundColor: "gray.700",
                }}
                _web={{
                  shadow: 2,
                  borderWidth: 0,
                }}
                _light={{
                  backgroundColor: "gray.50",
                }}
              >
                <Box>
                  <AspectRatio w="100%" ratio={16 / 9}>
                    <Image
                      source={{
                        uri: d.bannerURL,
                      }}
                      alt="image"
                    />
                  </AspectRatio>
                </Box>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="md" ml="-1">
                      [{d.Tag}]|{d.Name}
                    </Heading>
                  </Stack>
                  <Text fontWeight="400">
                    {d.Description.length > 50
                      ? d.Description.slice(0, 50)
                      : d.Description}
                  </Text>
                </Stack>
              </Box>
            </Box>
          );
        })}
      </Box>
    </ScrollView>
  );
};

export default Group;
