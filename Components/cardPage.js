/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Appbar, Avatar, Card, IconButton, Text } from 'react-native-paper';
import { Image } from 'react-native';
import { Banner } from 'react-native-paper';
export default function cardPage() {
    const [visible, setVisible] = useState(true);
    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');
    return (
        <>
            <Appbar.Header mode='center-aligned'>
                <Appbar.BackAction onPress={_goBack} />
                <Appbar.Content title="Title" />
                <Appbar.Action icon="magnify" onPress={_handleSearch} />
                <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
            </Appbar.Header>
            <Card>
                <Card.Content>
                    <Text variant="titleLarge">Card title</Text>
                    <Text variant="bodyMedium">Card content</Text>
                </Card.Content>
            </Card>
            <Card>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            </Card>
            <View>
            
            </View>
            <Banner
                visible={visible}
                actions={[
                    {
                        label: 'Fix it',
                        onPress: () => setVisible(false),
                    },
                    {
                        label: 'Learn more',
                        onPress: () => setVisible(false),
                    },
                ]}
                icon={({ size }) => (
                    <Image
                        source={{
                            uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
                        }}
                        style={{
                            width: size,
                            height: size,
                        }}
                    />
                )}>
                There was a problem processing a transaction on your credit card.
            </Banner>
        </>
    );
}

const styles = StyleSheet.create({});
