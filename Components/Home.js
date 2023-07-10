/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, IconButton, ScrollView } from 'native-base';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import GetLocation from 'react-native-get-location'
import openMap from 'react-native-open-maps';

export default function Home() {
  const navigation = useNavigation();
  const [state, setstate] = useState([]);
  const [data, setData] = useState('');
  // useEffect(() => {
  //   getProduct();
  // }, [])
  // const getProduct = async () => {
  //   axios
  //     .get(
  //       `https://jsonplaceholder.typicode.com/comments/`,
  //     )
  //     .then(res => {
  //       setstate(res.data);
  //     })
  //     .catch(err => {
  //       console.log('Error', err);
  //     });
  // };
  // const getProductFilter = async () => {
  //   axios
  //     .get(
  //       `https://jsonplaceholder.typicode.com/comments?postId=${data}`,
  //     )
  //     .then(res => {
  //       setstate(res.data);
  //     })
  //     .catch(err => {
  //       console.log('Error', err);
  //     });
  // };
  const [location, setLocation] = useState({})
  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setLocation(location);
        console.log(location);
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      });
  }, []);
  const getProductFilter = async () => {
    setstate(state.filter(item => item?.postId == data.toString()));
  };
  const openMapVisitStore = () => {
    const facebookHQ = { latitude: location.latitude, longitude: location.longitude };
    openMap(facebookHQ);
  };
  return (
    <>
      {/* <TextInput
        style={{
          width: "90%",
          backgroundColor: 'white',
          margin: responsiveScreenHeight(2),

        }}
        value={data}
        onChangeText={(text) => setData(text)}
      /> */}
      {/* <Button
        style={{
          width: "90%",
          backgroundColor: 'black',
          margin: responsiveScreenHeight(2),
          alignItems: "center",
        }}
        onPress={() => getProductFilter()}
      >Search filter</Button> */}
      <Button
        style={{
          width: "90%",
          backgroundColor: 'black',
          margin: responsiveScreenHeight(2),
          alignItems: "center",
        }}
        onPress={() => navigation.navigate('map')}
      >Map </Button>
      <Button
        style={{
          width: "90%",
          backgroundColor: 'black',
          margin: responsiveScreenHeight(2),
          alignItems: "center",
        }}
        onPress={() => openMapVisitStore()}
      >Open Phone map </Button>
      {/* <Button
        style={{
          width: "90%",
          backgroundColor: 'black',
          margin: responsiveScreenHeight(2),
          alignItems: "center",
        }}
        onPress={() => getProduct()}
      >Clear filter</Button> */}
      {/* <ScrollView>
        {state?.map(item => {
          return (
            <View key={item.id} style={{
              width: "90%",
              backgroundColor: 'white',
              margin: responsiveScreenHeight(2),
              alignItems: "center",
              padding: responsiveScreenHeight(2),
              elevation: 5
            }}>
              <Text>Id: {item.id}</Text>
              <Text>postId: {item.postId}</Text>
              <Text>Name: {item.name}</Text>
              <Text>Email: {item.email}</Text>
            </View>
          );
        })}
      </ScrollView> */}
    </>
  );
}

const styles = StyleSheet.create({});
