/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Modal, FlatList, TouchableOpacity } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import AppColors from '../utils/AppColors';
import LineBreak from './LineBreak';
import AppText from './AppTextComps/AppText';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AppButton from './AppButton';
import { Color } from '../utils/Colors';
import StyleButton from './StyleButton';

const sortMenus = [
  { id: 1, name: 'Nearest' },
  { id: 2, name: 'Top Rated' },
  { id: 3, name: 'Price low to high' },
  { id: 4, name: 'Price high to low' },
];

const services = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Male Only' },
  { id: 3, name: 'Female Only' },
];

const FilterModal = ({ visible, setVisible }) => {
  const [sorted, setSorted] = useState({ id: 1 });
  const [selectedService, setSelectedService] = useState({ id: 1 });

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
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
            height: responsiveHeight(53),
          }}
        >
          <LineBreak space={1} />
          <View
            style={{
              backgroundColor: Color('gold'),
              width: responsiveWidth(15),
              height: responsiveHeight(0.7),
              borderRadius: 100,
              alignSelf: 'center',
            }}
          />

          <LineBreak space={2} />

          <View style={{ paddingHorizontal: responsiveWidth(4) }}>
            <AppText
              title="Filters"
              textColor={AppColors.WHITE}
              textSize={2.5}
              textFontWeight
            />

            <LineBreak space={2} />

            <AppText
              title="Sort by"
              textColor={AppColors.WHITE}
              textSize={2.2}
              textFontWeight
            />

            <LineBreak space={2} />

            <FlatList
              data={sortMenus}
              contentContainerStyle={{ gap: 12 }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 12,
                    }}
                    onPress={() => setSorted({ id: item.id })}
                  >
                    <Fontisto
                      name={
                        sorted.id === item.id
                          ? 'radio-btn-active'
                          : 'radio-btn-passive'
                      }
                      size={responsiveFontSize(2.5)}
                      color={Color('gold')}
                    />
                    <AppText
                      title={item.name}
                      textColor={AppColors.WHITE}
                      textSize={1.7}
                    />
                  </TouchableOpacity>
                );
              }}
            />

            <LineBreak space={3} />

            <AppText
              title="Service Availability"
              textColor={AppColors.WHITE}
              textSize={2.2}
              textFontWeight
            />

            <LineBreak space={2} />

            <FlatList
              data={services}
              horizontal
              contentContainerStyle={{ gap: 12 }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor:
                        selectedService.id === item.id
                          ? Color('gold')
                          : Color('lightTheme'),
                      borderWidth: selectedService.id === item.id ? 0 : 1,
                      borderColor: Color('gold'),
                      paddingHorizontal: responsiveWidth(3),
                      paddingVertical: responsiveHeight(1),
                      gap: 12,
                      borderRadius: 100,
                    }}
                    onPress={() => setSelectedService({ id: item.id })}
                  >
                    <AppText
                      title={item.name}
                      textColor={AppColors.WHITE}
                      textSize={1.7}
                    />
                  </TouchableOpacity>
                );
              }}
            />

            <LineBreak space={3} />

            <View>
              <StyleButton onPress={() => setVisible(false)}>Apply</StyleButton>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
