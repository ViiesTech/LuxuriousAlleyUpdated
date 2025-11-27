/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, FlatList, Switch, TouchableOpacity } from 'react-native';
import Background from '../../../utils/Background';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../../components/AppHeader';
import AppColors from '../../../utils/AppColors';
import AppText from '../../../components/AppTextComps/AppText';
import LineBreak from '../../../components/LineBreak';
import { Color } from '../../../utils/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import StyleButton from '../../../components/StyleButton';

const data = [
  { id: 1, title: 'Remember me' },
  { id: 2, title: 'Face ID' },
  { id: 3, title: 'Biometric ID' },
  { id: 4, title: 'Google Authenticator' },
];

const Security = () => {
  const navigation = useNavigation();
  const [switchStates, setSwitchStates] = useState({});

  const toggleSwitch = id => {
    setSwitchStates(prev => ({
      ...prev,
      [id]: !prev[id], // toggle only the clicked one
    }));
  };

  return (
    <Background>
      <AppHeader onPress={() => navigation.goBack()} title="Security" />

      <FlatList
        data={data}
        ItemSeparatorComponent={<LineBreak space={3} />}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <AppText
              title={item.title}
              textColor={AppColors.DARKGRAY}
              textSize={2}
            />
            {item.id == 4 ? (
              <TouchableOpacity>
                <Feather
                  name={'chevron-right'}
                  size={responsiveFontSize(3)}
                  color={AppColors.WHITE}
                />
              </TouchableOpacity>
            ) : (
              <Switch
                trackColor={{
                  false: Color('serviceCheckbox'),
                  true: Color('serviceCheckbox'),
                }}
                thumbColor={'#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => toggleSwitch(item.id)}
                value={!!switchStates[item.id]}
              />
            )}
          </View>
        )}
      />
      <LineBreak space={2} />
      <View>
        <StyleButton
          btnWidth={responsiveWidth(90)}
          btnHeight={responsiveHeight(6)}
          justifyContent={'center'}
          color={AppColors.BLACK}
          onPress={() => {}}
          fontSize={2}
        >
          Change Password
        </StyleButton>
      </View>
    </Background>
  );
};

export default Security;
