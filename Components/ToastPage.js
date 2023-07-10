/* eslint-disable prettier/prettier */
import React from 'react';
import {
  VStack,
  HStack,
  Text,
  Alert,
} from 'native-base';

export function Toast({ Status, Title, Description,width='100%' }) {
  return (
    <Alert
      Width={width}
      alignSelf="center"
      flexDirection="row"
      status={Status}
    >
      <VStack space={1} flexShrink={1} w="auto">
        <HStack
          flexShrink={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text
              fontSize="12"
              fontWeight="medium"
              flexShrink={1}
              color="darkText"
            >
              {Description}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Alert>
  );
};
