import { StyleSheet, View, Text } from "react-native";
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
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";

const validateSchema = Yup.object().shape({
  Tag: Yup.string()
    .required("ใส่แท็คคอมมูด้วย")
    .max(4, "แท็คจะต้องมีไม่เกิน 4 ตัวอักษร")
    .uppercase("พิมพ์ใหญ่ทั้งหมด"),
  // RunDate: Yup.number().moreThan(0, ""),
  Name: Yup.string().required("ใส่ชื่อคอมมูด้วย"),
  Description: Yup.string().required("ใส่คำอธิบายด้วย"),
});

const CreateGroup = ({ navigation }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const d = Date.now();
    setDate(d);
    setLoading(false);
  });

  return (
    <Container>
      {!loading && (
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
            <FormControl>
              {/* กำหนดให้มีเส้นสีแดงถ้าผู้ใช้ไม่กรอกข้อมูลชื่อ */}
              <Box error={errors.Tag && touched.Tag ? true : false}>
                <FormControl.Label>Hashtag#</FormControl.Label>
                <Input
                  value={values.Tag}
                  onChangeText={handleChange("Tag")}
                  onBlur={handleBlur("Tag")}
                />
                {errors.Tag && touched.Tag && <Icon name="close-circle" />}
              </Box>
              <Box
                fixedLabel
                error={errors.Name && touched.Name ? true : false}
              >
                <FormControl.Label>Name</FormControl.Label>
                <Input
                  value={values.Name}
                  onChangeText={handleChange("Name")}
                  onBlur={handleBlur("Name")}
                />
                {errors.Name && touched.Name && <Icon name="close-circle" />}
              </Box>
              {errors.Name && touched.Name && (
                <FormControl.HelperText>
                  <FormControl.Label style={{ color: "red" }}>
                    {errors.Name}
                  </FormControl.Label>
                </FormControl.HelperText>
              )}
              <Box
                fixedLabel
                error={errors.Description && touched.Description ? true : false}
              >
                <FormControl.Label>Description</FormControl.Label>
                <TextArea
                  value={values.Description}
                  onChangeText={handleChange("Description")}
                  onBlur={handleBlur("Description")}
                />
                {errors.Description && touched.Description && (
                  <Icon name="close-circle" />
                )}
              </Box>
              <Box fixedLabel>
                <FormControl.Label>Run Date</FormControl.Label>
                {/* <DateTimePicker
                  value={date}
                  mode={"date"}
                  display="default"
                  onChange={(e, v) => setDate(v)}
                /> */}
              </Box>
              <Box fixedLabel>
                <FormControl.Label>Contact Link</FormControl.Label>
                <Input
                  value={values.ContactLink}
                  onChangeText={handleChange("ContactLink")}
                  onBlur={handleBlur("ContactLink")}
                />
              </Box>
              <Box fixedLabel>
                <Label>Doc Link</Label>
                <Input
                  value={values.DocLink}
                  onChangeText={handleChange("DocLink")}
                  onBlur={handleBlur("DocLink")}
                />
              </Box>
              <Box fixedLabel>
                <Label>Group Link</Label>
                <Input
                  value={values.SMlink}
                  onChangeText={handleChange("SMlink")}
                  onBlur={handleBlur("SMlink")}
                />
              </Box>

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
            </FormControl>
          )}
        </Formik>
      )}
    </Container>
  );
};

export default CreateGroup;
