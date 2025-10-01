/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import AppColors from '../../../utils/AppColors';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../../components/AppHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import APPImages from '../../../assets/APPImages';
import Feather from 'react-native-vector-icons/Feather';
import LineBreak from '../../../components/LineBreak';
import AppTextInput from '../../../components/AppTextInput';
import Background from '../../../utils/Background';
import { Color } from '../../../utils/Colors';
import StyleButton from '../../../components/StyleButton';

const EditProfile = () => {
  const navigation = useNavigation();
  return (
    <Background>
      <AppHeader onPress={() => navigation.goBack()} title="Edit Profile" />

      <View>
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              borderWidth: 2,
              borderColor: Color('gold'),
              width: 110,
              height: 110,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Image
              source={APPImages.nailsTwo}
              style={{ width: 100, height: 100, borderRadius: 100 }}
            />
            <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: Color('gold'),
                  padding: 8,
                  borderRadius: 100,
                }}
                activeOpacity={0.7}
              >
                <Feather
                  name={'camera'}
                  size={responsiveFontSize(1.6)}
                  color={AppColors.BLACK}
                />
              </TouchableOpacity>
            </View>
          </View>

          <LineBreak space={7} />

          <View>
            <AppTextInput
              inputPlaceHolder={'Charles James'}
              containerBg={Color('lightTheme')}
              borderWidth={1}
              inputWidth={78}
              borderColor={Color('gold')}
            />
            <LineBreak space={2} />

            <AppTextInput
              inputPlaceHolder={'charlesjames988@gmail.com'}
              containerBg={Color('lightTheme')}
              borderWidth={1}
              inputWidth={78}
              borderColor={Color('gold')}
            />

            <LineBreak space={2} />

            <AppTextInput
              inputPlaceHolder={'+123 456 7890'}
              containerBg={Color('lightTheme')}
              borderWidth={1}
              inputWidth={78}
              borderColor={Color('gold')}
            />
          </View>
          <LineBreak space={2} />
          <View>
            <StyleButton
              btnWidth={responsiveWidth(90)}
              btnHeight={responsiveHeight(5)}
              justifyContent={"center"}
              color={AppColors.BLACK}
              onPress={() => {}}
            >
              Save
            </StyleButton>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default EditProfile;
