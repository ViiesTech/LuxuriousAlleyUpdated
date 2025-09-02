/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Modal } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import AppColors from '../utils/AppColors';
import LineBreak from './LineBreak';
import AppText from './AppTextComps/AppText';
import AppButton from './AppButton';
import { Color } from '../utils/Colors';
import StyleButton from './StyleButton';

const RemoveFavouritesModal = ({
  visible,
  handleCancelButtonPress,
  handleAppointmentButtonPress,
}) => {
  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: Color('otpInputBackground'),
            borderRadius: 10,
            width: responsiveWidth(100),
            height: responsiveHeight(38),
          }}
        >
          <LineBreak space={1} />
          <View
            style={{
              backgroundColor: AppColors.LIGHTGRAY,
              width: responsiveWidth(15),
              height: responsiveHeight(0.7),
              borderRadius: 100,
              alignSelf: 'center',
            }}
          />

          <LineBreak space={2} />

          <View style={{ paddingHorizontal: responsiveWidth(4) }}>
            <AppText
              title="Remove from Favorites"
              textColor={AppColors.LIGHTGRAY}
              textSize={2.5}
              textFontWeight
              textAlignment={'center'}
            />

            <LineBreak space={2} />

            <AppText
              title="Are you sure you want to remove this?"
              textColor={AppColors.LIGHTGRAY}
              textSize={2.2}
              textFontWeight
            />

            <LineBreak space={1} />

            <AppText
              title="Removing this salon will delete it from your saved favorites list."
              textColor={AppColors.DARKGRAY}
              textSize={1.9}
              textwidth={80}
            />

            <LineBreak space={2} />

            <AppButton
              title={`Yes, Remove Salon`}
              handlePress={handleCancelButtonPress}
              bgColor={Color('otpInputBackground')}
              textColor={AppColors.WHITE}
              borderColor={Color('gold')}
              borderWidth={2}
            />

            <LineBreak space={1} />

            <View>
              <StyleButton onPress={handleAppointmentButtonPress}>
                Keep in Favorites
              </StyleButton>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RemoveFavouritesModal;
