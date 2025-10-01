import React from 'react';
import { View, Text } from 'react-native';
import Background from './../../../utils/Background';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../../components/AppHeader';
import AppText from '../../../components/AppTextComps/AppText';
import AppColors from '../../../utils/AppColors';
import LineBreak from '../../../components/LineBreak';
import AppTextInput from '../../../components/AppTextInput';
import LanguageSelector from '../../../components/LanguageSelector';

const Language = () => {
  const navigation = useNavigation();

  return (
    <Background>
      <AppHeader onPress={() => navigation.goBack()} title="Language" />
      <AppText
        title={'Choose the language'}
        textColor={AppColors.WHITE}
        textSize={2}
      />
      <LineBreak space={1} />
      <AppText
        title={
          'Select your preferred language below This helps us serve you better.'
        }
        textColor={AppColors.DARKGRAY}
        textSize={2}
        lineHeight={2.7}
        textwidth={80}
      />
      <LineBreak space={2} />

      <LanguageSelector />
    </Background>
  );
};

export default Language;
