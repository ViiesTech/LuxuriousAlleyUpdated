/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AppText from '../../components/AppTextComps/AppText';
import APPImages from '../../assets/APPImages';
import LineBreak from '../../components/LineBreak';
import Background from '../../utils/Background';
import StyleButton from '../../components/StyleButton';
import { Color } from '../../utils/Colors';

const cardData = [
  {
    id: 1,
    profImg: APPImages.CENTRALSALOONS,
    name: 'John Doe',
    designation: 'Stylist',
    ratingStatus: 'Top Rated',
  },
  {
    id: 2,
    profImg: APPImages.CENTRALSALOONS,
    name: 'Anna Lee',
    designation: 'Stylist',
    ratingStatus: 'Top Rated',
  },
  {
    id: 3,
    profImg: APPImages.CENTRALSALOONS,
    name: 'Ella Ford',
    designation: 'Stylist',
    ratingStatus: '',
  },
  {
    id: 4,
    profImg: APPImages.CENTRALSALOONS,
    name: 'Marsh Donnell',
    designation: 'Stylist',
    ratingStatus: '',
  },
];

const StylistSelect = () => {
  const navigation = useNavigation();
  const [isSelectedProfile, setIsSelectedProfile] = useState({});

  return (
    <Background>
      <AppHeader
        onPress={() => navigation.goBack()}
        title="Choose Your Stylist"
      />

      <View
        style={{
          marginVertical: responsiveHeight(2),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 10,
            borderWidth: isSelectedProfile?.id ? 1 : 0,
            borderColor: Color('gold'),
            gap: responsiveWidth(5),
            paddingHorizontal: responsiveWidth(3),
            paddingVertical: responsiveHeight(1.5),
            alignItems: 'center',
            backgroundColor: Color('lightTheme'),
          }}
        >
          <View
            style={{
              backgroundColor: Color('gold'),
              width: responsiveWidth(15),
              height: responsiveHeight(7),
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Feather
              name={'users'}
              size={responsiveFontSize(3)}
              color={AppColors.WHITE}
            />
          </View>
          <View>
            <AppText
              title="Any Stylist"
              textSize={2}
              textColor={AppColors.WHITE}
            />

            <AppText
              title="Next available Stylist"
              textSize={1.8}
              textColor={AppColors.DARKGRAY}
            />
          </View>
        </View>

        <LineBreak space={2} />

        <FlatList
          data={cardData}
          ItemSeparatorComponent={() => <LineBreak space={2} />}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => setIsSelectedProfile({ id: item.id })}
                style={{
                  flexDirection: 'row',
                  paddingLeft: responsiveWidth(3),
                  borderRadius: 10,
                  gap: responsiveWidth(5),
                  paddingVertical: responsiveHeight(1.2),
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: isSelectedProfile.id === item.id ? AppColors.WHITE : Color('gold'),
                  backgroundColor:
                    isSelectedProfile.id === item.id
                      ? Color('gold')
                      : Color('lightTheme'),
                }}
              >
                <Image
                  source={item.profImg}
                  style={{
                    width: responsiveWidth(15),
                    height: responsiveHeight(7),
                    borderRadius: 10,
                  }}
                />
                <View>
                  <AppText
                    title={item.name}
                    textSize={2.2}
                    textColor={
                      isSelectedProfile.id === item.id
                        ? AppColors.BLACK
                        : AppColors.WHITE
                    }
                  />

                  <AppText
                    title={item.designation}
                    textSize={1.9}
                    textColor={
                      isSelectedProfile.id === item.id
                        ? AppColors.BLACK
                        : AppColors.DARKGRAY
                    }
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-end',
                    paddingHorizontal: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: item.ratingStatus ? 10 : 0,
                      paddingVertical: item.ratingStatus ? 6 : 0,
                      borderRadius: 10,
                      alignItems: 'center',
                      backgroundColor:
                        isSelectedProfile.id === item.id
                          ? AppColors.WHITE
                          : Color('gold'),
                      gap: 10,
                    }}
                  >
                    {item.ratingStatus && (
                      <SimpleLineIcons
                        name={'badge'}
                        size={responsiveFontSize(1.8)}
                        color={AppColors.BLACK}
                      />
                    )}
                    <AppText
                      title={item.ratingStatus}
                      textSize={1.8}
                      textColor={AppColors.BLACK}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <LineBreak space={4} />

        <View>
          <StyleButton
            onPress={() => navigation.navigate('ChooseServices')}
            // onPress={() => navigation.navigate('DateAndTimeSelection')}
          >
            Select & Continue
          </StyleButton>
        </View>
      </View>
    </Background>
  );
};

export default StylistSelect;
