/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Background from '../../utils/Background';
import ChatCom from '../../components/ChatCom';
import { KeyboardAvoidingView } from 'react-native';
import { responsiveHeight } from '../../utils/Responsive_Dimensions';

const ChatMessages = () => {
  return (
    <KeyboardAvoidingView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}} behavior="height">
      <Background contentContainerStyle={{ flex: 1, paddingBottom: responsiveHeight(1) }}>
        <ChatCom />
      </Background>
    </KeyboardAvoidingView>
  );
};

export default ChatMessages;
