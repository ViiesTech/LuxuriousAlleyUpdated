/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';
import {
  responsiveFontSize,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import AppText from './AppTextComps/AppText';
import AppColors from '../utils/AppColors';
import LineBreak from './LineBreak';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppButton from './AppButton';
import { useNavigation } from '@react-navigation/native';
import StyleButton from './StyleButton';
import { Color } from '../utils/Colors';

const ConfirmationModal = ({
  iconName,
  title,
  subTitle,
  buttonOneTitle,
  buttonTwoTitle,
  isChangeColor,
  visible,
  setVisible,
  buttonTwoHandlePress,
}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
            width: responsiveWidth(90),
          }}
        >
          <View
            style={{
              backgroundColor: Color('gold'),
              padding: 10,
              borderRadius: 100,
            }}
          >
            <AntDesign
              name={iconName}
              size={responsiveFontSize(5)}
              color={AppColors.WHITE}
            />
          </View>

          <LineBreak space={2} />

          <AppText
            title={title}
            textSize={2.5}
            textColor={AppColors.BLACK}
            textFontWeight
            textAlignment={'center'}
          />

          <LineBreak space={1} />

          <AppText
            title={subTitle}
            textSize={2}
            textColor={AppColors.DARKGRAY}
            textAlignment={'center'}
          />

          <LineBreak space={2} />

          <View style={{ width: '100%' }}>
            <View>
              <StyleButton onPress={setVisible}>{buttonOneTitle}</StyleButton>
            </View>

            <LineBreak space={2} />

            <AppButton
              title={buttonTwoTitle}
              handlePress={buttonTwoHandlePress}
              bgColor={AppColors.WHITE}
              textColor={AppColors.BLACK}
              borderWidth={2}
              borderColor={AppColors.BLACK}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
