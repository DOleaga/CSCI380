import React, {useEffect, useContext, useState} from 'react';
import { ScrollView } from "react-native" 

import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Dimensions,
  StyleSheet,
  StatusBar,
  TextInput,
  Image
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome'; //https://github.com/oblador/react-native-vector-icons#android
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import { AuthContext } from '../Navigation/AuthProvider';

//Status bar color fix: https://www.youtube.com/watch?v=Rs72pRwXIzA 23:32
//Firebase Stuff: https://www.youtube.com/watch?v=J7pkSP18Oko

const SignInScreen = ({ navigation }) => {

  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_TextInputChange: false,
    secureTextEntry: true
  });

  const textInputChange = (val) => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        check_TextInputChange: true
      })
    }
    else {
      setData({
        ...data,
        email: val,
        check_TextInputChange: false
      })
    }
  }

  const HandlePasswordChange = (val) => {
    setData({
      ...data,
      password: val
    });
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }

  const {login} = useContext(AuthContext);

  /* useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if(user){
        navigation.navigate("Home");
      }
    });
    return unsubscribe; // unsubscribe on unmount
  }, []); */

  /* const handleLogin = () => {
    auth().signInWithEmailAndPassword(data.email, data.password)
          .then(userCredentials => {
            user = userCredentials.user;
          })
  } */

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome
            name="user"
            color="#05375a"
            size={20}
          />
          <TextInput
            placeholder='Your Email'
            style={styles.textInput}
            autoCapitalize='none'
            onChangeText={(val) => textInputChange(val)}
          />
          {data.check_TextInputChange ?
            <Feather
              name="check-circle"
              color="green"
              size={20}
            />
            : null}
        </View>

        <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
        <View style={styles.action}>
          <Feather
            name="lock"
            color="#05375a"
            size={20}
          />
          <TextInput
            placeholder='Your Password'
            style={styles.textInput}
            autoCapitalize='none'
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(val) => HandlePasswordChange(val)}
          />
          <TouchableOpacity onPress={(updateSecureTextEntry)}>
            {data.secureTextEntry ?
              <Feather
                name="eye-off"
                color="#05375a"
                size={20}
              />
              :
              <Feather
                name="eye"
                color="#05375a"
                size={20}
              />
            }
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
          <Text style={[styles.button_label, { color: '#6495ed' }]}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          //onPress={handleLogin}
          onPress={() => login(data.email, data.password)}
          //onPress={() => navigation.navigate("Home")}
        >
          <View style={styles.button}>
            <LinearGradient
              colors={['#8800C7', '#8800C7']}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, { color: '#ffff' }]}>Sign In</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("SignUpScreen")}
          style={[styles.signIn, {
            borderColor: '#009387',
            borderWidth: 1,
            marginTop: 10
          }]}
        >
          <Text style={styles.textSign}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8800C7'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    alignItems: 'center',
    alignContent: 'center',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});