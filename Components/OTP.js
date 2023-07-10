/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Button, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import { View } from 'native-base';

export default function OTP() {
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');

    const signInWithPhoneNumber = async (phoneNumber) => {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
        console.log('====================================');
        console.log(confirmation);
        console.log('====================================');
    };

    const confirmCode = async () => {
        try {
            await confirm.confirm(code);
        } catch (error) {
            console.log('Invalid code.');
        }
    }

    if (!confirm) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    title="Phone Number Sign In"
                    onPress={() => signInWithPhoneNumber('+91 7027496996')}
                />
            </View>
        );
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput value={code} onChangeText={text => setCode(text)} />
            <Button title="Confirm Code" onPress={() => confirmCode()} />
        </View>
    );
}

