/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import GetLocation from 'react-native-get-location'
import MapView from 'react-native-maps';
import openMap from 'react-native-open-maps';

export default function map() {
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
    const openMapVisitStore = () => {
        const facebookHQ = { latitude: location.latitude, longitude: location.longitude };
        openMap(facebookHQ);
    };
    return (
        <>
            <MapView
                style={{ width: "100%", height: '90%' }}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </>
    );
}

const styles = StyleSheet.create({});
