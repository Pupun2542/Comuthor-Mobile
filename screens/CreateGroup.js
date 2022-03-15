import { StyleSheet, View, Text, ScrollView } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  Container,
  FormControl,
  Input,
  Label,
  Button,
  Icon,
  TextArea,
  Box,
  VStack,
  Center,
  AspectRatio,
  Image,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { uploadBanner } from "../src/services/filestoreageservice";

const validateSchema = Yup.object().shape({
  Tag: Yup.string()
    .required("ใส่แท็คคอมมูด้วย")
    .max(4, "แท็คจะต้องมีไม่เกิน 4 ตัวอักษร"),
  // RunDate: Yup.number().moreThan(0, ""),
  Name: Yup.string().required("ใส่ชื่อคอมมูด้วย"),
  Description: Yup.string().required("ใส่คำอธิบายด้วย"),
});

const CreateGroup = ({ navigation }) => {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // useLayoutEffect(() => {
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

  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [seldate, setSeldate] = useState("");
  const [banner, setBanner] = useState(
    "https://firebasestorage.googleapis.com/v0/b/comuthor-dev.appspot.com/o/resource%2Fimageplaceholder.png?alt=media&token=b051fff3-c143-4e92-ab5a-7929e3b8edca"
  );
  const [imgchange, setImgchange] = useState(false);
  // const [loading, setLoading] = useState(true);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        console.log(result);
        setBanner(result.uri);
        setImgchange(true);
      }
    } catch (error) {
      alert("ไม่สามารถใช้รูปนี้ได้ กรุณาเปลี่ยนรูป");
    }
  };

  return (
    <ScrollView>
      <Box alignContent="center" background={"gray.400"}>
        <Button backgroundColor={"white"} onPress={pickImage}>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: banner,
              }}
              alt={"banner"}
            />
          </AspectRatio>
        </Button>

        {/* {!loading && ( */}
        <Formik
          //ค่าเริ่มต้นของข้อมูลโดยกำหนดให้ตรงกัน backend
          initialValues={{
            Tag: "",
            Name: "",
            Description: "",
            RunDate: "",
            SMlink: "",
            ContactLink: "",
            DocLink: "",
          }}
          validationSchema={validateSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            console.log("submit");

            const coll = firestore().collection("group");
            coll
              .add({
                Tag: values.Tag,
                Name: values.Name,
                Description: values.Description,
                RunDate: values.RunDate,
                SMlink: values.SMlink,
                ContactLink: values.ContactLink,
                DocLink: values.DocLink,
              })
              // .then(async (res) => {
              //   if(imgchange){
              //     // console.log(res.id);
              //     // console.log(banner);
              //     uploadBanner(banner, id + "_banner.jpg").then((dlurl) => {
              //       console.log(dlurl);
              //       coll.update({ bannerURL: dlurl });
              //     });
              //     const d = await res.get();
              //     navigation.navigate("Detail", {
              //       id: res.id,
              //       data: d.data(),
              //     });
              //     setBanner("https://firebasestorage.googleapis.com/v0/b/comuthor-dev.appspot.com/o/resource%2Fimageplaceholder.png?alt=media&token=b051fff3-c143-4e92-ab5a-7929e3b8edca")
              //   }
              // })
              .then((res) => {
                if (imgchange) {
                  console.log(res.id);
                  uploadBanner(banner, res.id + "_banner.jpg").then((dlurl) => {
                    console.log(dlurl);
                    res.update({ bannerURL: dlurl });
                    res.get().then(d=>{
                      navigation.navigate("Detail", {
                        id: res.id,
                        data: d.data(),
                      });
                    })
                    setBanner("https://firebasestorage.googleapis.com/v0/b/comuthor-dev.appspot.com/o/resource%2Fimageplaceholder.png?alt=media&token=b051fff3-c143-4e92-ab5a-7929e3b8edca")
                    setSeldate("");
                  });

                }
              })
              .finally(() => {
                setSubmitting(false);
                console.log("submitted");
                resetForm();
              });
          }}
        >
          {({
            errors,
            touched,
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <VStack
              width="90%"
              space={4}
              justifyContent="center"
              marginLeft={5}
            >
              <FormControl isRequired isInvalid={"Tag" in errors}>
                <FormControl.Label>Hashtag#</FormControl.Label>
                <Input
                  value={values.Tag}
                  onChangeText={handleChange("Tag")}
                  onBlur={handleBlur("Tag")}
                  backgroundColor={"white"}
                />
                <FormControl.ErrorMessage>
                  {errors.Tag}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={"Name" in errors}>
                <FormControl.Label>Name</FormControl.Label>
                <Input
                  value={values.Name}
                  onChangeText={handleChange("Name")}
                  onBlur={handleBlur("Name")}
                  backgroundColor={"white"}
                />
                <FormControl.ErrorMessage>
                  {errors.Name}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label>Description</FormControl.Label>
                <TextArea
                  value={values.Description}
                  onChangeText={handleChange("Description")}
                  onBlur={handleBlur("Description")}
                  backgroundColor={"white"}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Run Date</FormControl.Label>
                <Box backgroundColor={"white"} padding={3} rounded={5}>
                  <Text onPress={() => setShow(true)}>
                    {seldate ? seldate : "เลือกเวลา"}
                  </Text>
                </Box>
                {show && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="calendar"
                    onChange={(event, selectedDate) => {
                      // console.log(selectedDate);
                      const currentDate = selectedDate || date;
                      // console.log(currentDate);
                      setShow(Platform.OS === "ios");
                      setDate(currentDate);
                      const d =
                        currentDate.getDate() +
                        "/" +
                        currentDate.getMonth() +
                        "/" +
                        currentDate.getFullYear();
                      setSeldate(d);
                      values.RunDate = d;
                      // console.log(d);
                    }}
                  />
                )}
              </FormControl>
              <FormControl>
                <FormControl.Label>Doc Link</FormControl.Label>
                <Input
                  value={values.DocLink}
                  onChangeText={handleChange("DocLink")}
                  onBlur={handleBlur("DocLink")}
                  backgroundColor={"white"}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Group Link</FormControl.Label>
                <Input
                  value={values.SMlink}
                  onChangeText={handleChange("SMlink")}
                  onBlur={handleBlur("SMlink")}
                  backgroundColor={"white"}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Contact Link</FormControl.Label>
                <Input
                  value={values.ContactLink}
                  onChangeText={handleChange("ContactLink")}
                  onBlur={handleBlur("ContactLink")}
                  backgroundColor={"white"}
                />
              </FormControl>
              <Button
                block
                large
                style={{ marginTop: 30, backgroundColor: "#E9AB17" }}
                onPress={handleSubmit}
                disabled={isSubmitting}
                backgroundColor={"white"}
              >
                <Text
                  style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
                >
                  Submit
                </Text>
              </Button>
            </VStack>
          )}
        </Formik>
        {/* )} */}
      </Box>
    </ScrollView>
  );
};

export default CreateGroup;
