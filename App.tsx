/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './Navigation/StackNavigation';
import {NativeBaseProvider} from 'native-base';
import {PaperProvider} from 'react-native-paper';
export default function App() {
  return (
    <>
      <PaperProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </NativeBaseProvider>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({});
