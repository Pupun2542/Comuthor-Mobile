import { View, Text } from 'react-native'
import React from 'react'
import { VStack, Box, Container, ScrollView, Image } from 'native-base';

const GroupDetail = ({navigation,route}) => {
  const {id, data} = route.params;
  console.log(route);
  return (
    <Box>
      <ScrollView>
        <VStack>
        <Image
          source={{uri: data.bannerURL }}
          alt="banner"
        ></Image>
        </VStack>
        <VStack>
        <Text>
          {data.Description}
        </Text>
        </VStack>
      </ScrollView>
    </Box>
  )
}

export default GroupDetail