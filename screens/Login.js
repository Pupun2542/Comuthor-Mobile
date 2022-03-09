import { View, Text, Button } from 'react-native'
import React from 'react'
// import { Button } from 'native-base';
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth"
import { useApp } from '../src/hook/local';


const Login = ({navigation}) => {



  const app = useApp();
  const auth = getAuth(app);
    const handleLogin = async () =>{
      const provider = new GoogleAuthProvider;
      signInWithRedirect(auth, provider);
    }

  return (
    <View>
      <Button
        onPress={handleLogin}
      >Login with Google</Button>

    </View>
  )
}

export default Login