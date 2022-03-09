import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
import { Button } from 'native-base';

const IoniconsHeaderButton = (props) => (
    <HeaderButton IconComponent={Ionicons} iconSize={23} {...props} />
  );

const Group = ({navigation}) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Ionicons name="person-add" size={24} color="black" onPress={()=>navigation.navigate("Login")}/>
          ),
        });
      }, [navigation]);
    return (
        <View>
            <Text>Group</Text>
        </View>
    )
}

export default Group
