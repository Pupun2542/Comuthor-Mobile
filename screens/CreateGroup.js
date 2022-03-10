import { StyleSheet, View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
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
  Image
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
// import ImagePicker from 'react-native-image-crop-picker';
import ImageCropPicker from "react-native-image-crop-picker";

const validateSchema = Yup.object().shape({
  Tag: Yup.string()
    .required("ใส่แท็คคอมมูด้วย")
    .max(4, "แท็คจะต้องมีไม่เกิน 4 ตัวอักษร"),
  // RunDate: Yup.number().moreThan(0, ""),
  Name: Yup.string().required("ใส่ชื่อคอมมูด้วย"),
  Description: Yup.string().required("ใส่คำอธิบายด้วย"),
});

const CreateGroup = ({ navigation }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [seldate, setSeldate] = useState("");
  const [banner, setBanner] = useState("https://firebasestorage.googleapis.com/v0/b/comuthor-dev.appspot.com/o/resource%2Fimageplaceholder.png?alt=media&token=b051fff3-c143-4e92-ab5a-7929e3b8edca")
  // const [loading, setLoading] = useState(true);

  const handleUpload = ()=>{
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true
    // }).then(image => {
    //   setBanner(image);
    // });
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
        setBanner(image);
      });
  }

  return (
    <Box alignContent="center">
      <Button backgroundColor={'white'} onPress={handleUpload}>
      <AspectRatio w="100%" ratio={16 / 9}>
        <Image
          source={{
            uri: banner,
          }}
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
        // onSubmit={async (values, { setSubmitting }) => {
        //   // same shape as initial values
        //   // alert(JSON.stringify(values));
        //   try {
        //     const url = "https://api.codingthailand.com/api/register";
        //     const res = await axios.post(url, {
        //       name: values.name,
        //       email: values.email,
        //       password: values.password,
        //     });
        //     alert(res.data.message);
        //     navigation.navigate("Home");
        //   } catch (error) {
        //     alert(error.response.data.errors.email[0]);
        //   } finally {
        //     setSubmitting(false);
        //   }
        // }}
      >
        {/*//errors ใช้สำหรับการตรวจสอบ state (ถ้าผู้ใช้ไม่กรอกข้อมูลจะให้ error อะไรเกิดขึ้น)*/}
        {/* touched  เมื่อผู้ใช้ไปกดที่ name และเลื่อนเม้าส์ไปด้านนอกช่อง input โดยไม่กรอกข้อมูล*/}

        {({
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <ScrollView>
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
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Run Date</FormControl.Label>
                {show && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="calendar"
                    onChange={(event, selectedDate) => {
                      const currentDate = selectedDate || date;
                      setShow(Platform.OS === "ios");
                      setDate(currentDate);
                      const d =
                        date.getDate() +
                        "/" +
                        date.getMonth() +
                        "/" +
                        date.getFullYear();
                      setSeldate(d);
                      values.RunDate = d;
                    }}
                  />
                )}
                <Box
                  // value={values.RunDate}
                  onTouchStart={() => setShow(true)}
                  // isDisabled={true}
                >
                  {/*  */}
                  {seldate ? <Text>{seldate}</Text> : <Text>เลือกเวลา</Text>}
                  {/* {values.RunDate? <Text>{values.RunDate}</Text> : <Text>เลือกเวลา</Text>} */}
                </Box>
              </FormControl>
              <FormControl>
                <FormControl.Label>Doc Link</FormControl.Label>
                <Input
                  value={values.DocLink}
                  onChangeText={handleChange("DocLink")}
                  onBlur={handleBlur("DocLink")}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Group Link</FormControl.Label>
                <Input
                  value={values.SMlink}
                  onChangeText={handleChange("SMlink")}
                  onBlur={handleBlur("SMlink")}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Contact Link</FormControl.Label>
                <Input
                  value={values.ContactLink}
                  onChangeText={handleChange("ContactLink")}
                  onBlur={handleBlur("ContactLink")}
                />
              </FormControl>
              <Button
                block
                large
                style={{ marginTop: 30, backgroundColor: "#E9AB17" }}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                <Text
                  style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
                >
                  Submit
                </Text>
              </Button>
            </VStack>
          </ScrollView>
        )}
      </Formik>
      {/* )} */}
    </Box>
  );
};

export default CreateGroup;
