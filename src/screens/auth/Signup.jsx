import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AppText from '../../components/AppTextComps/AppText';
import {responsiveFontSize, responsiveHeight} from '../../utils/Responsive_Dimensions';
import BackgroundScreen from '../../components/AppTextComps/BackgroundScreen';
import AppTextInput from '../../components/AppTextInput';
import AppColors from '../../utils/AppColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'
import AppButton from '../../components/AppButton';
import SocialAuthButton from '../../components/SocialAuthButton';
import AntDesign from 'react-native-vector-icons/AntDesign'
const Signup = () => {
  return (
    <BackgroundScreen>
        <View style={{height:responsiveHeight(10), justifyContent:'flex-end', marginBottom:20}}>
      <AppText
        textSize={2.5}
        title={'Signup'}
        textAlignment={'center'}
        textFontWeight
      />
      </View>

        <View style={{gap:20}}>
        <AppTextInput
          inputPlaceHolder={'Username'}
          containerBg={AppColors.INPUTBG}
          logo={
            <Ionicons
              name={'person-outline'}
              color={AppColors.BTNCOLOURS}
              size={responsiveFontSize(2.5)}
            />
          }
        />

      <AppTextInput
        inputPlaceHolder={'Email'}
        containerBg={AppColors.INPUTBG}
        logo={
          <Feather
            name={'mail'}
            color={AppColors.BTNCOLOURS}
            size={responsiveFontSize(2.5)}
          />
        }
      />

      <AppTextInput
        inputPlaceHolder={'Password'}
        containerBg={AppColors.INPUTBG}
        logo={
          <Feather
            name={'key'}
            color={AppColors.BTNCOLOURS}
            size={responsiveFontSize(2.5)}
          />
        }
      />

      <AppButton />

      <View style={{flexDirection:'row', gap:10, alignItems:'center' }}>
            <TouchableOpacity style={{height:responsiveHeight(3), width:responsiveHeight(3), backgroundColor:AppColors.LIGHTGRAY, borderRadius:5}}>

            </TouchableOpacity>
            <AppText textSize={2} title='I agree to Nail Warz Terms of Service 
                and Privacy Policy' textFontWeight={100}/>
      </View>

        <View style={{ height:responsiveHeight(30), justifyContent:'flex-end', gap:10}}>
      <SocialAuthButton bgColor={AppColors.BLACK} title={"Continue with Apple"} logo={<AntDesign name={"apple1"} size={responsiveFontSize(2)} color={AppColors.WHITE}/>}/>
      <SocialAuthButton txtColor={AppColors.BLACK} bgColor={AppColors.LIGHTGRAY} title={"Continue with Google"} logo={<AntDesign name={"google"} size={responsiveFontSize(2)} color={AppColors.BLACK}/>}/>
      </View>
      </View>
    </BackgroundScreen>
  );    
};

export default Signup;
