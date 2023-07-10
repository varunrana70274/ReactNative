/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import { Button, Center, Image, useToast } from 'native-base';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Login() {
  const initialState = {
    username: '',
    password: '',
  };
  const [user, setUser] = useState(initialState);
  const [show, setShow] = React.useState(false);
  const [error, setError] = useState({});
  const navigation = useNavigation();
  const toast = useToast();
  const handleValidation = () => {
    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const err = {};
    if (user.username === '') {
      err.username = 'Required';
    }
    if (user.password === '') {
      err.password = 'Required';
    }
    setError(err);
    return err;
  };
  const RenderErrorText = text => {
    return (
      <Text style={{ color: 'red', fontSize: responsiveScreenFontSize(1.6) }} >
        {text}
      </Text>
    );
  };
  const onSubmit = () => {
    const localError = handleValidation();
    if (Object.keys(localError).length === 0) {
      navigation.navigate('BottomTab');

    } else {
      console.log('Invalid Credential!');
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.topBox} >
          <View style={styles.starPosition}>
            <MaterialCommunityIcons name="star-four-points" size={responsiveScreenFontSize(6)} color="#010035" />
          </View>
          <Center>
            <View style={styles.imageBox}>
              <Image
                alt='SplashScreen'
                source={require("../Resourse/image20.png")}
                style={styles.image}
              />
            </View>
          </Center>
          <Text style={styles.textHeading}>
            Login
          </Text>
          <Text style={styles.textHeadingSec}>
            Please sign in to continue.
          </Text>
          <View style={styles.topBottom} >
            <View>
              <TextInput
                mode='flat'
                label="Username *"
                value={user.username}
                activeUnderlineColor="rgba(29, 166, 132, 1)"
                underlineColor='black'
                onChangeText={text => setUser({ ...user, username: text })}
                style={styles.textInput}
              />
              {RenderErrorText(error.username)}
            </View>
            <View style={styles.inputBox}>
              <TextInput
                mode='flat'
                label="Password *"
                value={user.password}
                activeUnderlineColor="rgba(29, 166, 132, 1)"
                underlineColor='black'
                style={styles.textInput}
                maxLength={10}
                secureTextEntry={show ? true : false}
                onChangeText={text => setUser({ ...user, password: text })}
              />
              {RenderErrorText(error.password)}
              <TouchableOpacity onPress={() => setShow(!show)} style={styles.absolute}>
                {show ? (
                  <MaterialIcons
                    name="visibility-off"
                    size={responsiveScreenFontSize(3.5)}
                    color="#000"
                  />
                ) : (
                  <MaterialIcons
                    name="visibility"
                    size={responsiveScreenFontSize(3.5)}
                    color="#000"
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.forgotBtn}>
              <TouchableOpacity style={{ width: responsiveScreenWidth(30) }} onPress={() => alert("djf")}>
                <Text style={styles.text}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <Center >
              <Button onPress={() => onSubmit()} size={"lg"} _text={{ fontWeight: 800 }} style={styles.btn}>Submit</Button>
            </Center>
          </View>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: "100%",
  },
  topBox: {
    paddingHorizontal: responsiveScreenHeight(2),
  },
  topBottom: {
    backgroundColor: "white",
    width: "100%",
  },
  image: {
    flex: 1,
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(100),
    resizeMode: 'contain',
  },
  imageBox: {
    width: responsiveScreenWidth(50),
    height: responsiveScreenHeight(30),
  },
  textInput: {
    backgroundColor: 'white',
    fontSize: responsiveScreenFontSize(2),
    fontFamily: 'Roboto-Regular',
    borderBottomWidth: 1,
  },
  inputBox: {
    marginTop: responsiveScreenHeight(2),
  },
  btn: {
    backgroundColor: 'rgba(29, 166, 132, 1)',
    marginVertical: responsiveScreenHeight(2),
    width: responsiveScreenWidth(80),
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: responsiveScreenHeight(2),
  },
  text: {
    fontSize: responsiveScreenFontSize(1.8),
    fontFamily: 'Roboto-Regular',
    color: 'grey',
    fontWeight: '700',
  },
  textHeading: {
    fontSize: responsiveScreenFontSize(3.5),
    fontFamily: 'Roboto-Regular',
    color: 'black',
    fontWeight: '800',
  },
  textHeadingSec: {
    fontSize: responsiveScreenFontSize(2),
    fontFamily: 'Roboto-Regular',
    color: '#4D4D4D',
    fontWeight: '500',
    lineHeight: responsiveScreenFontSize(3),
    marginBottom: responsiveScreenHeight(3),
  },
  starPosition: {
    position: 'absolute',
    top: responsiveScreenHeight(2),
    right: responsiveScreenHeight(3)
  },
  absolute:{
    position: 'absolute',
    top: responsiveScreenHeight(2.5),
    right: responsiveScreenHeight(1)
  }
});
