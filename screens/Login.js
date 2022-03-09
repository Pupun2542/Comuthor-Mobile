import { View, Text, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';


const Login = ({navigation}) => {
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

  // const app = useApp();
  // const auth = getAuth(app);
    const handleLogin = async () =>{
      auth().signInAnonymously();
    }
    const handleLogout = async() =>{
      auth().signOut();
    }

    if (!user){
      return (
        <View>
          <Button
            onPress={handleLogin}
            title={'Login'}
          />
    
        </View>
      )
    }
    return (
      <View>
        <Text>
          Logged In
          <Button
          title='logout'
          onPress={handleLogout}
          />
        </Text>
      </View>
    )
    

  
}

export default Login