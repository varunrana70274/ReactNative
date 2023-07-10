/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Components/Login';
import BottomTab from './BottomTab';
import OtpScreen from '../Components/OtpScreen';
import map from '../Components/map';
import OTP from '../Components/OTP';
const Stack = createNativeStackNavigator();
export default function StackNavigation() {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }}/>
                <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }}/>
                <Stack.Screen name="OtpScreen" component={OtpScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                <Stack.Screen name="map" component={map} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </>
    );
}

const styles = StyleSheet.create({});
