/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import { Button, Center, Divider, Image, Input, useToast } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Toast } from './ToastPage';

export default function OtpScreen() {
    const [mobileNumber, setMobileNumber] = useState('');
    const [error, setError] = useState({});
    const [otpScreen, setOtpScreen] = useState(false);
    const [otpVerfie, setOtpVerfie] = useState('');
    const navigation = useNavigation();
    const toast = useToast();
    const [otp, setOtp] = useState('');
    let defaultResendTime = 30;
    const [seconds, setSeconds] = useState(defaultResendTime);
    const [isResendVisible, setIsResendVisible] = useState(false);
    const [animation, setAnimation] = useState(false);
    const [otpErrorMessage, setOtpErrorMessage] = useState(false)

    useEffect(() => {
        if (otpScreen === true) {
            const interval = setInterval(() => {
                if (seconds === 0) {
                    setIsResendVisible(true);
                    clearInterval(interval);
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [otpScreen, seconds])
    const handleValidation = () => {
        const pattern =
            /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const err = {};
        if (mobileNumber === '') {
            err.mobileNumber = 'Required';
        } else if (mobileNumber.length < 10) {
            err.mobileNumber = 'Please complete Mobile Number';
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
    const otpVerfies = () => {
        var val = Math.floor(1000 + Math.random() * 9000);
        setOtpVerfie(val);
        toast.show({
            isClosable: true,
            placement: "top",
            duration: 5000,
            render: () => {
                return <Toast Status={'info'} Description={val} />
            }
        });
        setIsResendVisible(false);
        setSeconds(30);
    };
    const onSubmit = () => {
        const localError = handleValidation();
        if (Object.keys(localError).length === 0) {
            console.warn("dsfsdfsdfdsfds");
            setOtpScreen(true);
            otpVerfies();
        } else {
            console.log('Invalid Credential!');
        }
    };
    return (
        <>
            {otpScreen == false ?
                <View style={styles.container}>
                    <View style={styles.starPosition}>
                        <MaterialCommunityIcons name="star-four-points" size={responsiveScreenFontSize(6)} color="#010035" />
                    </View>
                    <Center>
                        <View style={styles.imageBox}>
                            <Image
                                alt='SplashScreen'
                                source={require('../Resourse/image20.png')}
                                style={styles.image}
                            />
                        </View>
                    </Center>
                    <View style={styles.topBottom} >
                        <View>
                            <Text style={styles.textHeading}>
                                Log in
                            </Text>
                            <Text style={styles.textHeadingSec}>
                                Enter your phone number.
                            </Text>
                        </View>
                        <View style={{ marginTop: responsiveScreenHeight(2) }}>
                            <Input
                                InputLeftElement={
                                    <View>
                                        <Image
                                            alt='SplashScreen'
                                            source={require('../Resourse/india.png')}
                                            style={{
                                                width: responsiveScreenWidth(10),
                                                height: responsiveScreenHeight(5),
                                            }}
                                        />
                                    </View>
                                }
                                isInvalid={true}
                                invalidOutlineColor='black'
                                placeholder="Country Code"
                                variant="underlined"
                                value='    India'
                                editable={false}
                                style={[styles.textInput]}
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <Input
                                InputLeftElement={
                                    <View>
                                        <Text style={styles.countryText}>+91   </Text>
                                    </View>
                                }
                                placeholder="000 000 0000"
                                isInvalid={true}
                                variant="underlined"
                                invalidOutlineColor='black'
                                value={mobileNumber}
                                style={styles.textInput}
                                keyboardType='numeric'
                                maxLength={10}
                                onChangeText={(text) => setMobileNumber(text.replace(/[^0-9]/g, ''))}
                            />
                            {RenderErrorText(error.mobileNumber)}
                        </View>
                        <Center>
                            <Button size={"lg"} _text={{ fontWeight: 800 }} style={styles.btn} onPress={() => onSubmit()}>Get OTP</Button>
                        </Center>
                    </View>
                </View>
                :
                <View style={styles.container}>
                    <View style={[styles.flexOtp]}>
                        <TouchableOpacity onPress={() => setOtpScreen(false)} style={{
                            borderWidth: responsiveScreenFontSize(0.3),
                            borderColor: 'grey',
                            borderRadius: 5,
                            padding: responsiveScreenHeight(0.5)
                        }}>
                            <AntDesign name="left" size={responsiveScreenFontSize(3)} color="#010035" />
                        </TouchableOpacity>
                        <View>
                            <MaterialCommunityIcons name="star-four-points" size={responsiveScreenFontSize(6)} color="#010035" />
                        </View>
                    </View>
                    <Text style={styles.textHeading}>
                        Enter code
                    </Text>
                    <Text style={styles.textHeadingSec}>
                        We’ve sent an SMS with an activation code to your phone +91 {mobileNumber}
                    </Text>
                    <View style={styles.topBottom} >
                        <Animatable.View
                            animation={animation ? 'shake' : ''}
                            duration={animation ? 1000 : 0}
                            delay={0}
                            style={{ margin: responsiveScreenWidth(5) }}
                        >
                            <OTPInputView
                                style={{ width: '100%', height: "50%" }}
                                pinCount={4}
                                onCodeChanged={val => setOtp(val)}
                                autoFocusOnLoad={true}
                                codeInputFieldStyle={styles.underlineStyleBase}
                                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                onCodeFilled={(code) => {
                                    if (otpVerfie == code) {
                                        navigation.navigate('Login');
                                        setOtpScreen(false);
                                        setMobileNumber('');
                                    } else {
                                        setOtp('');
                                        setAnimation(true);
                                        setOtpErrorMessage(true);
                                        setTimeout(() => {
                                            setAnimation(false);
                                        }, 1500);
                                        toast.show({
                                            isClosable: true,
                                            placement: "top",
                                            duration: 2500,
                                            render: () => {
                                                return <Toast Status={'error'} Description={"Wrong OTP"} />
                                            },
                                        });
                                    }
                                }}
                            />
                            {otpErrorMessage &&
                                <Text style={styles.wrongOtp}>Wrong code, please try again</Text>
                            }
                        </Animatable.View>
                        <View>
                            <Text style={styles.reciveOtp}>Don't receive an OTP ? </Text>
                            {isResendVisible ?
                                <TouchableOpacity onPress={() => otpVerfies()}>
                                    <Text style={styles.resenOtp}>Resend OTP</Text>
                                </TouchableOpacity>
                                :
                                <Text style={styles.resenOtpSec}>
                                    Resend OTP in 00:{seconds} Seconds
                                </Text>
                            }
                        </View>
                    </View>
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',

        height: "100%",
        paddingTop: responsiveScreenHeight(4),

    },
    topBottom: {
        width: "100%",
        paddingVertical: responsiveScreenHeight(2),
        paddingHorizontal: responsiveScreenHeight(2),
    },
    image: {
        flex: 1,
        width: responsiveScreenWidth(100),
        height: responsiveScreenHeight(100),
        resizeMode: 'contain',
    },
    imageBox: {
        width: responsiveScreenWidth(40),
        height: responsiveScreenHeight(25),
    },
    textHeading: {
        fontSize: responsiveScreenFontSize(3.5),
        color: 'black',
        fontWeight: '800',
        fontFamily: 'Poppins-Regular',
    },
    textHeadingSec: {
        fontFamily: 'Roboto-Regular',
        fontSize: responsiveScreenFontSize(2),
        color: '#4D4D4D',
        fontWeight: '500',
        lineHeight: responsiveScreenFontSize(3),
        // marginBottom: responsiveScreenHeight(3),
    },
    textInput: {
        backgroundColor: 'white',
        fontSize: responsiveScreenFontSize(2),
        marginBottom: 0,
    },
    inputBox: {
        marginVertical: responsiveScreenHeight(3),
    },
    btn: {
        backgroundColor: 'rgba(29, 166, 132, 1)',
        marginVertical: responsiveScreenHeight(5),
        width: responsiveScreenWidth(80)
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "rgba(29, 166, 132, 1)",
    },

    underlineStyleBase: {
        width: responsiveScreenWidth(15),
        height: responsiveScreenHeight(7),
        borderWidth: responsiveScreenFontSize(0.3),
        borderRadius: 10,
        color: 'black',
        fontWeight: '800',
    },

    underlineStyleHighLighted: {
        borderColor: "#000",
    },
    reciveOtp: {
        fontSize: responsiveScreenFontSize(1.8),
        color: 'black',
        fontFamily: 'Roboto-Regular',
        fontWeight: '600',
        textAlign: 'center',
    },
    resenOtp: {
        fontSize: responsiveScreenFontSize(2),
        color: 'green',
        fontFamily: 'Roboto-Regular',

        fontWeight: '700',
        textAlign: 'center',
        marginTop: responsiveScreenHeight(1),
    },
    wrongOtp: {
        fontSize: responsiveScreenFontSize(2),
        color: 'red',
        fontFamily: 'Roboto-Regular',

        fontWeight: '700',
        textAlign: 'center',
        marginTop: responsiveScreenHeight(1),
    },
    resenOtpSec: {
        fontSize: responsiveScreenFontSize(2),
        color: 'red',
        fontWeight: '700',
        fontFamily: 'Roboto-Regular',

        textAlign: 'center',
        marginTop: responsiveScreenHeight(1),
    },
    starPosition: {
        position: 'absolute',
        top: responsiveScreenHeight(2),
        right: responsiveScreenHeight(3)
    },
    countryText: {
        fontSize: responsiveScreenFontSize(2),
        color: 'black',
        fontFamily: 'Roboto-Regular',
        fontWeight: '700',
    },
    flexOtp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: responsiveScreenHeight(4),
    },
});
