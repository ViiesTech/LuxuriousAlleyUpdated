import React from 'react';
import Background from '../../../utils/Background';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../../components/AppHeader';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppTextComps/AppText';
import AppColors from '../../../utils/AppColors';

const PrivacyPolicy = () => {
  const navigation = useNavigation();

  return (
    <Background>
      <AppHeader onPress={() => navigation.goBack()} title="Privacy Policy" />

      <AppText
        title={
          'Duis aute irure dolor in reprehenderit in voluptate vel esse cillum dolore eu fugiat nulla pariatuDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu'
        }
        textColor={AppColors.DARKGRAY}
        textSize={2}
        lineHeight={2.7}
      />
      <LineBreak space={3} />
      <AppText
        title={
          'Duis aute irure dolor in reprehenderit in volupta esse cillum dolore eu fugiat nulla pariatuDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu'
        }
        textColor={AppColors.DARKGRAY}
        textSize={2}
        lineHeight={2.7}
      />
      <LineBreak space={3} />
      <AppText
        title={
          'Duis aute irure dolor in reprehenderit in volupt esse cillum dolore eu fugiat nulla pariatuDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.'
        }
        textColor={AppColors.DARKGRAY}
        textSize={2}
        lineHeight={2.7}
      />
    </Background>
  );
};

export default PrivacyPolicy;
