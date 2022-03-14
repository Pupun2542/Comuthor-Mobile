import { View, Linking } from "react-native";
import React from "react";
import {
  VStack,
  Box,
  Container,
  ScrollView,
  Image,
  Button,
  AspectRatio,
  Text,
  HStack,
} from "native-base";
import firestore from "@react-native-firebase/firestore";

const GroupDetail = ({ navigation, route }) => {
  const { id, data } = route.params;
  // console.log(data.bannerURL);
  // console.log(data.RunDate);
  const deletegroup = async () => {
    const col = firestore().collection("group").doc(id);
    // console.log(col);
    col.delete().then(() => {
      navigation.goBack();
    });
  };

  return (
    <Box>
      <ScrollView alignContent={"center"}>
        <VStack>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={{ uri: data.bannerURL }} alt="banner"></Image>
          </AspectRatio>
        </VStack>
        <VStack alignItems={"center"} backgroundColor={"black"}>
          <Text fontSize={"3xl"} color="white">
            {data.Tag}|{data.Name}
          </Text>
        </VStack>
        <VStack
          backgroundColor="gray.400"
          marginLeft={3}
          marginRight={3}
          marginTop={3}
          borderRadius={5}
          paddingTop={2}
          paddingBottom={2}
          paddingLeft={2}
        >
          <Text fontSize={"lg"}>{data.Description}</Text>
        </VStack>
        <VStack
          backgroundColor={data.RunDate? "gray.400" : "red.500"}
          marginLeft={3}
          marginRight={3}
          marginTop={3}
          borderRadius={5}
          paddingTop={2}
          paddingBottom={2}
          paddingLeft={2}
        >
          <Text fontSize={"lg"}>
            เวลาส่งวิ่ง : {data.RunDate ? data.RunDate : "ไม่ปรากฎวันวิ่ง"}
          </Text>
        </VStack>
        <VStack
          backgroundColor={data.DocLink? "gray.400" : "red.500"}
          marginLeft={3}
          marginRight={3}
          marginTop={3}
          borderRadius={5}
          paddingTop={2}
          paddingBottom={2}
          paddingLeft={2}
        >
          <Text
            fontSize={"lg"}
            onPress={() => {
              if (data.DocLink) {
                Linking.openURL(data.DocLink);
              }
            }}
          >
            ลิงก์กลุ่มคอมมู : {data.DocLink ? "กดเพื่อดูลิงค์ด็อค" : "ยังไม่มีลิงก์ด็อค"}
          </Text>
        </VStack>
        <VStack
          backgroundColor={data.SMlink? "gray.400" : "red.500"}
          marginLeft={3}
          marginRight={3}
          marginTop={3}
          borderRadius={5}
          paddingTop={2}
          paddingBottom={2}
          paddingLeft={2}
        >
          <Text
            fontSize={"lg"}
            onPress={() => {
              if (data.SMLink) {
                Linking.openURL(data.SMLink);
              }
            }}
          >
            ลิงก์กลุ่มคอมมู : {data.SMLink ? data.SMlink : "ยังไม่มีลิงก์กลุ่ม"}
          </Text>
        </VStack>
        <HStack marginTop={5}>
          <Button onPress={deletegroup} marginLeft={3} background={'red.500'}>
            ลบกลุ่ม
          </Button>
          <Button
            marginLeft={3}
            onPress={() => {
              navigation.navigate("Edit Group", { id: id, data: data });
            }}
          >
            แก้ไขกลุ่ม
          </Button>
        </HStack>
      </ScrollView>
    </Box>
  );
};

export default GroupDetail;
