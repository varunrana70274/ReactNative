/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Checkbox, TextInput } from 'react-native-paper';
import { Button, ScrollView } from 'native-base';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import axios from 'axios';

export default function checkBox() {
    const [text, setText] = useState([]);
    const [checkData, setCheckData] = useState([]);


    useEffect(() => {
        getProduct();
    }, [])
    const getProduct = async () => {
        axios
            .get(
                `https://jsonplaceholder.typicode.com/comments/`,
            )
            .then(res => {
                setText(res.data);
            })
            .catch(err => {
                console.log('Error', err);
            });
    };

    const checkbox = (val) => {
        if (checkData.length <= 0) {
            setCheckData(oldArray => [...oldArray, val]);
        }
        else {
            const isPresent = checkData.filter((item) => {
                return item.id === val.id
            });
            if (isPresent.length === 1) {
                const finalList = checkData.filter(item => item.id !== val.id);
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
        console.log("jhk",removedArray);
        setText(removedArray);
        setCheckData([]);
    };
    useEffect(() => {
        console.log(checkData);
    }, [checkData.length]);
    return (
        <>
            <View style={{ margin: responsiveScreenHeight(5) }}>
                <Button onPress={() => DeleteArray()}>Delete</Button>
            </View>
            <ScrollView>
                {text.map((item, index) => {
                    return (
                        <>
                            <Checkbox.Item
                                key={item.id}
                                label={item.email}
                                onPress={() => checkbox(item, index)}
                                status={checkData.includes(`${item}`) ? 'checked' : 'unchecked'}
                            />
                        </>
                    );
                })
                }
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({});
