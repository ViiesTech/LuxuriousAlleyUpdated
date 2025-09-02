/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import AppColors from '../../utils/AppColors';
import {useNavigation} from '@react-navigation/native';
import AppHeader from '../../components/AppHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';
import LineBreak from '../../components/LineBreak';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AppButton from '../../components/AppButton';
import CalendarModal from '../../components/CalendarModal';
import Background from '../../utils/Background';
import { Color } from '../../utils/Colors';
import StyleButton from '../../components/StyleButton';

const datesData = [
  {id: 1, day: 'TUE', date: 'Sep 9', mins: '40 mins'},
  {id: 2, day: 'WED', date: 'Sep 10', mins: '21 mins'},
  {id: 3, day: 'THU', date: 'Sep 11', mins: '45 mins'},
];

const timesData = [
  {id: 1, time: '9:00 AM', offText: '20% Off'},
  {id: 2, time: '9:30 AM', offText: '20% Off'},
  {id: 3, time: '10:30 AM', offText: ''},
  {id: 4, time: '11:00 AM', offText: ''},
  {id: 5, time: '11:30 AM', offText: ''},
  {id: 6, time: '12:00 PM', offText: ''},
  {id: 7, time: '12:30 PM', offText: ''},
];

const DateAndTimeSelection = () => {
  const navigation = useNavigation();
  const [isSelectedDate, setIsSelectedDate] = useState({id: 0});
  const [isSelectedTime, setIsSelectedTime] = useState({id: 0});
  const [selectedDateFromCalendar, setSelectedDateFromCalendar] = useState('');
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  return (
    <Background>
      <AppHeader onPress={() => navigation.goBack()} title="Date and time" />

      <View
        >
        <AppText
          title="Select Date"
          textSize={2.5}
          textColor={AppColors.WHITE}
          textFontWeight
        />

        <LineBreak space={1.5} />

        <FlatList
          data={datesData}
          horizontal
          ListFooterComponent={
            <TouchableOpacity
              style={{
                backgroundColor: Color('lightTheme'),
                borderWidth: 1,
                borderColor: Color('gold'),
                borderRadius: 10,
                alignItems: 'center',
                paddingHorizontal: responsiveWidth(3.4),
                paddingVertical: 7,
                width: responsiveWidth(18),
                height: responsiveHeight(9.5),
                gap: 5,
              }}
              onPress={() => setShowCalendarModal(true)}
              >
              <EvilIcons
                name={'calendar'}
                size={responsiveFontSize(3)}
                color={Color('gold')}
              />
              <AppText
                title="More Dates"
                textSize={1.7}
                textColor={AppColors.WHITE}
                textAlignment={'center'}
              />
            </TouchableOpacity>
          }
          contentContainerStyle={{gap: 15}}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => setIsSelectedDate({id: item.id})}
                style={{
                  backgroundColor: isSelectedDate.id === item.id ? Color('gold') : Color('lightTheme'),
                  borderRadius: 10,
                  alignItems: 'center',
                  paddingHorizontal: responsiveWidth(3.4),
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: isSelectedDate.id === item.id ? AppColors.WHITE : Color('gold'),
                }}>
                <AppText
                  title={item.day}
                  textSize={1.7}
                  textColor={
                    isSelectedDate.id === item.id
                      ? AppColors.WHITE
                      : AppColors.DARKGRAY
                  }
                  textFontWeight
                />
                <LineBreak space={0.3} />

                <AppText
                  title={item.date}
                  textSize={1.5}
                  textColor={
                    isSelectedDate.id === item.id
                      ? AppColors.WHITE
                      : AppColors.WHITE
                  }
                  textFontWeight
                />
                <LineBreak space={0.3} />

                <AppText
                  title={item.mins}
                  textSize={1.3}
                  textColor={
                    isSelectedDate.id === item.id
                      ? AppColors.WHITE
                      : AppColors.DARKGRAY
                  }
                />
              </TouchableOpacity>
            );
          }}
        />

        <LineBreak space={3} />

        <AppText
          title="Select Time"
          textSize={2.5}
          textColor={AppColors.WHITE}
          textFontWeight
        />

        <LineBreak space={1.5} />

        <FlatList
          data={timesData}
          ItemSeparatorComponent={<LineBreak space={2} />}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: Color('cardColor'),
                  borderRadius: 10,
                  paddingHorizontal: responsiveWidth(3.4),
                  paddingVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderWidth: 2,
                  borderColor: isSelectedTime.id === item.id ? AppColors.WHITE : Color('gold'),
                }}
                onPress={() => setIsSelectedTime({id: item.id})}>
                <AppText
                  title={item.time}
                  textSize={2}
                  textColor={AppColors.WHITE}
                  textFontWeight
                />

                {item.offText && (
                  <AppText
                    title={item.offText}
                    textSize={1.7}
                    textColor={Color('gold')}
                    textFontWeight
                  />
                )}
              </TouchableOpacity>
            );
          }}
        />

        <CalendarModal
          visible={showCalendarModal}
          setVisible={() => setShowCalendarModal(false)}
          selected={selectedDateFromCalendar}
          setSelected={setSelectedDateFromCalendar}
        />

        <LineBreak space={4} />

         <View>
          <StyleButton
            onPress={() => navigation.navigate('BookingSummary')}
          >
            Confirm Appointment
          </StyleButton>
        </View>
      </View>
    </Background>
  );
};

export default DateAndTimeSelection;
