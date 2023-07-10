/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../Components/Home';
import FormPage from '../Components/FormPage';
import cardPage from '../Components/cardPage';
import DataTable from '../Components/DataTable';

const Tab = createMaterialBottomTabNavigator();

export default function BottomTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="FormPage" component={FormPage} />
            <Tab.Screen name="cardPage" component={cardPage} />
            <Tab.Screen name="DataTable" component={DataTable} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({});
