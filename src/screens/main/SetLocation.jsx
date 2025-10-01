import React from 'react';
import Background from '../../utils/Background';
import SVGXml from '../../components/SVGXML';
import { AppIcons } from '../../assets/Icons';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import StyleButton from '../../components/StyleButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize } from '../../utils/Responsive_Dimensions';
import { useNavigation } from '@react-navigation/native';

const SetLocation = () => {
  const nav = useNavigation();
  return (
    <Background>
      <LineBreak space={10} />
      <SVGXml icon={AppIcons.location} width={50} height={50} />
      <LineBreak space={2} />
      <AppText
        title={'Hello, nice to meet you!'}
        textSize={4}
        lineHeight={4.5}
        textFontWeight
        textColor={AppColors.WHITE}
        textwidth={65}
      />
      <LineBreak space={1.5} />
      <AppText
        title={'Set your location to start find salons around you'}
        textSize={2}
        textColor={AppColors.DARKGRAY}
        textwidth={70}
      />
      <LineBreak space={4} />
      <StyleButton
        onPress={() => nav.navigate('UseCurrentLocation')}
        color={AppColors.BLACK}
        leftIcon={
          <FontAwesome
            name={'send'}
            color={AppColors.BLACK}
            size={responsiveFontSize(2)}
          />
        }
      >
        Use current location
      </StyleButton>
      <LineBreak space={2} />
      <StyleButton
        onPress={() => nav.navigate('Home')}
        color={AppColors.BLACK}
      >
        Go to home
      </StyleButton>
      <LineBreak space={2} />
      <AppText
        title={
          'We only access your location while you are using this incredible app'
        }
        textSize={2}
        textColor={AppColors.DARKGRAY}
        textwidth={80}
      />
      <LineBreak space={4} />
      <AppText
        title={'or set your location manually'}
        textSize={2}
        textColor={AppColors.DARKGRAY}
        textwidth={80}
      />
    </Background>
  );
};

export default SetLocation;
