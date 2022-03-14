import { View, Text, Linking } from "react-native";
import React from "react";
import { VStack, Box, Container, ScrollView, Image, Button, AspectRatio } from "native-base";
import firestore from "@react-native-firebase/firestore";

const GroupDetail = ({ navigation, route }) => {
  const { id, data } = route.params;
  console.log(data.bannerURL);

  const deletegroup = async () => {
    const col = firestore().collection("group").doc(id);
    console.log(col);
    col.delete().then(() => {
      navigation.goBack();
    });
  };

  return (
    <Box>
      <ScrollView>
        <VStack>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={{ uri: data.bannerURL }} alt="banner"></Image>
          </AspectRatio>
        </VStack>
        <VStack>
          <Text>
            {data.Tag}|{data.Name}
          </Text>
        </VStack>
        <VStack>
          <Text>{data.Description}</Text>
        </VStack>
        <VStack>
          <Text>
            เวลาส่งวิ่ง : {data.RunDate ? data.runDate : "ไม่ปรากฎวันวิ่ง"}
          </Text>
        </VStack>
        <VStack>
          <Text
            onPress={() => {
              Linking.openURL(data.SMLink);
            }}
          >
            ลิงก์กลุ่มคอมมู : {data.SMLink ? data.SMlink : "ยังไม่มีลิงก์ด็อค"}
          </Text>
        </VStack>
        <Button onPress={deletegroup}>ลบกลุ่ม</Button>
        <Button
          onPress={() => {
            navigation.navigate("Edit Group", { id: id, data: data });
          }}
        >
          แก้ไขกลุ่ม
        </Button>
      </ScrollView>
    </Box>
  );
};

export default GroupDetail;
