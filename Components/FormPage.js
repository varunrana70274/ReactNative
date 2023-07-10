/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Checkbox, TextInput } from 'react-native-paper';
import { Button, ScrollView } from 'native-base';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';

export default function FormPage() {

  const [text, setText] = useState(["Abhay", "Varun", "Shivani", "Adarsh", "Don", "alok"]);
  const [checkData, setCheckData] = useState([]);
  const checkbox = (val) => {
    if (checkData.length <= 0) {
      setCheckData(oldArray => [...oldArray, val]);
    }
    else {
      const isPresent = checkData.filter((item) => {
        return item === val
      });
      if (isPresent.length === 1) {
        const finalList = checkData.filter(item => item !== val);
        setCheckData(finalList);
      } else {
        setCheckData([...checkData, val]);
      }
    }
  };
  const DeleteArray = () => {
    const removedArray = text.filter(function (el) {
      return !checkData.includes(el);
    });
    setText(removedArray);
    setCheckData([]);
  };
  useEffect(() => {
    console.log(checkData);
  }, [checkData.length]);
  return (

    <View>
      <View style={{ margin: responsiveScreenHeight(5) }}>
        <Button onPress={() => DeleteArray()}>Delete</Button>
      </View>
      <ScrollView>
        {text.map((item, index) => {
          return (
            <>
              <Checkbox.Item
                label={item}
                onPress={() => checkbox(item, index)}
                status={checkData.includes(`${item}`) ? 'checked' : 'unchecked'}
              />
            </>
          );
        })
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
