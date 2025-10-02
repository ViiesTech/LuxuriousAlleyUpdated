/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, FlatList } from 'react-native';
import Background from '../../../utils/Background';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../../components/AppHeader';
import { Color } from '../../../utils/Colors';
import APPImages from '../../../assets/APPImages';
import AppText from '../../../components/AppTextComps/AppText';
import AppColors from '../../../utils/AppColors';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import LineBreak from '../../../components/LineBreak';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const bio = [
  { id: 1, title: 'Experience', subTitle: '10 Year' },
  { id: 2, title: 'Review', subTitle: '4.7 (2.7k)' },
];

const AccountDetail = () => {
  const navigation = useNavigation();

  return (
    <Background>
      <AppHeader onPress={() => navigation.goBack()} title="Account" />

      <View style={{ alignItems: 'center', gap: responsiveHeight(1.5) }}>
        <View
          style={{
            borderWidth: 2,
            borderColor: Color('gold'),
            width: 110,
            height: 110,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={APPImages.nailsTwo}
            style={{ width: 100, height: 100, borderRadius: 100 }}
          />
        </View>
        <AppText
          title={'Charles James'}
          textColor={AppColors.WHITE}
          textSize={2.5}
          textFontWeight
        />

        <AppText
          title={'360 Stillwater Rd. Palm City, FL 34990'}
          textColor={AppColors.DARKGRAY}
          textSize={2}
        />
      </View>

      <LineBreak space={1} />

      <View>
        <FlatList
          data={bio}
          keyExtractor={item => item.id.toString()}
          horizontal
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            paddingVertical: responsiveHeight(1),
          }}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: 'row',
                gap: responsiveWidth(4),
                alignItems: 'center',
              }}
            >
              {/* One Column */}
              <View style={{ alignItems: 'center', }}>
                <AppText
                  title={item.title}
                  textColor={AppColors.WHITE}
                  textSize={2}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: responsiveWidth(2),
                    marginTop: responsiveHeight(1),
                    paddingLeft: 10,
                  }}
                >
                  <FontAwesome
                    name={item.id === 1 ? 'briefcase' : 'star'}
                    size={16}
                    color={item.id === 1 ? AppColors.WHITE : 'orange'}
                  />
                  <AppText
                    title={` ${item.subTitle}`}
                    textColor={AppColors.DARKGRAY}
                    textSize={2}
                  />
                </View>
              </View>

              {/* Divider except after last item */}
              {index !== bio.length - 1 && (
                <View
                  style={{
                    width: 1.5,
                    height: responsiveHeight(8),
                    backgroundColor: AppColors.DARKGRAY,
                    marginHorizontal: responsiveWidth(4),
                  }}
                />
              )}
            </View>
          )}
        />
      </View>

      <View style={{ height: 1, backgroundColor: AppColors.DARKGRAY }} />

      <LineBreak space={2} />
      <AppText
        title={'About'}
        textColor={AppColors.WHITE}
        textSize={2.2}
        textFontWeight
      />
      <LineBreak space={2} />
      <AppText
        title={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
        }
        textColor={AppColors.DARKGRAY}
        textSize={1.8}
      />
    </Background>
  );
};

export default AccountDetail;
