/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import Background from '../../utils/Background';
import AppHeader from '../../components/AppHeader';
import StyleButton from '../../components/StyleButton';
import LineBreak from '../../components/LineBreak';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils/Responsive_Dimensions';
import AppColors from '../../utils/AppColors';
import { Color } from '../../utils/Colors';
import AppText from '../../components/AppTextComps/AppText';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import APPImages from '../../assets/APPImages';
import { useNavigation } from '@react-navigation/native';

const cardData = [
  {
    id: 1,
    profImg: APPImages.CENTRALSALOONS,
    name: 'Hair Color',
    designation: 'Service',
    ratingStatus: '',
  },
  {
    id: 2,
    profImg: APPImages.CENTRALSALOONS,
    name: 'Hair Cutting',
    designation: 'Service',
    ratingStatus: '',
  },
  {
    id: 3,
    profImg: APPImages.CENTRALSALOONS,
    name: 'Facial',
    designation: 'Service',
    ratingStatus: '',
  },
  {
    id: 4,
    profImg: APPImages.CENTRALSALOONS,
    name: 'Gel Manicure/Pedicure',
    designation: 'Service',
    ratingStatus: '',
  },
];

const ChooseServices = () => {
  const navigation = useNavigation();
  const [isSelectedProfile, setIsSelectedProfile] = useState({});

  return (
    <Background>
      <AppHeader
        onPress={() => navigation.goBack()}
        title="Choose Service"
      />
      
      <View>
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
            onPress={() => navigation.navigate('DateAndTimeSelection')}
          >
            Select & Continue
          </StyleButton>
        </View>
      </View>
    </Background>
  );
};

export default ChooseServices;
