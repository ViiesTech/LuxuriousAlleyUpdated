/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import AppColors from '../../utils/AppColors';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../components/AppHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';
import LineBreak from '../../components/LineBreak';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CalendarModal from '../../components/CalendarModal';
import Background from '../../utils/Background';
import { Color } from '../../utils/Colors';
import StyleButton from '../../components/StyleButton';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStylistTimeSlots } from '../../redux/DataSlice';
import { StylistLoader } from '../../components/Loaders';
import { ShowToast } from '../../GlobalFunctions';

const DateAndTimeSelection = ({ route }) => {
  const navigation = useNavigation();
  const [isSelectedDate, setIsSelectedDate] = useState({ id: 0 });
  const [isSelectedTime, setIsSelectedTime] = useState({ id: 0 });
  const [selectedDateFromCalendar, setSelectedDateFromCalendar] = useState('');
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const { stylistId, stylistName, salonId, serviceId, servicePrice } =
    route?.params;
  const [selectedDateForAPI, setSelectedDateForAPI] = useState('');
  const [selectedTimeForAPI, setSelectedTimeForAPI] = useState('');
  console.log('routesasa', route?.params);
  console.log('selectedTimeForAPI', selectedTimeForAPI);
  const dispatch = useDispatch();
  const stylistTimeSlots = useSelector(state => state.data.stylistTimeSlots);
  const loading = useSelector(state => state.data.loading.stylistTimeSlots);
  const error = useSelector(state => state.data.error.stylistTimeSlots);
  const { _id } = useSelector(state => state.user.userData);
  console.log('salonId===', salonId);

  const key = `${stylistId}_${selectedDateForAPI}`;
  const selectedSlotData = stylistTimeSlots?.[key];
  const { technician } =
    stylistTimeSlots[`${stylistId}_${selectedDateForAPI}`] || {};

  const workingDays = technician?.workingDays || [];
  const appointments = selectedSlotData?.technicianAppointments || [];
  console.log('appointments', appointments);
  const [datesData, setDatesData] = useState(() => {
    const initialDates = [];
    for (let i = 0; i < 3; i++) {
      const date = moment().add(i, 'days');
      initialDates.push({
        id: i + 1,
        day: date.format('ddd').toUpperCase(), // e.g. "THU"
        date: date.format('MMM D'), // e.g. "Oct 23" (for UI display)
        apiDate: date.format('DD-MM-YYYY'), // ✅ for backend e.g. "23-10-2025"
        fullDate: date,
        mins: `${Math.floor(Math.random() * 30) + 20} mins`,
      });
    }
    return initialDates;
  });

  const generateTimeSlots = (
    start,
    end,
    duration = 30,
    breakStart,
    breakEnd,
    appointments = [],
  ) => {
    if (!start || !end) return [];

    const slots = [];
    const format = 'hh:mm A';
    let current = moment(start, format);
    const endMoment = moment(end, format);

    const breakStartMoment = breakStart ? moment(breakStart, format) : null;
    const breakEndMoment = breakEnd ? moment(breakEnd, format) : null;

    while (current.isBefore(endMoment)) {
      const next = current.clone().add(duration, 'minutes');

      // ✅ 1. Skip slots that overlap with break time
      const overlapsWithBreak =
        breakStartMoment &&
        breakEndMoment &&
        current.isBefore(breakEndMoment) &&
        next.isAfter(breakStartMoment);

      // ✅ 2. Skip slots that match booked appointments
      const isBooked = appointments.some(app =>
        moment(app.time, format).isSame(current, 'minute'),
      );

      // ✅ 3. Push only available slots
      if (!overlapsWithBreak && !isBooked) {
        slots.push({
          id: slots.length + 1,
          time: current.format(format),
        });
      }

      current = next;
    }

    return slots;
  };

  const selected = datesData.find(d => d.id === isSelectedDate.id);
  const dateForAPI = selected?.apiDate;
  const selectedDayName = selectedDateForAPI
    ? moment(selectedDateForAPI, 'DD-MM-YYYY').format('dddd')
    : '';
  const selectedWorkingDay = workingDays.find(
    d => d.day.toLowerCase() === selectedDayName.toLowerCase(),
  );
  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (!stylistId || !selectedDateForAPI) return;

      const cacheKey = `${stylistId}_${selectedDateForAPI}`;
      const cachedData = stylistTimeSlots[cacheKey];

      if (!cachedData) {
        // 🔥 First-time load
        await dispatch(
          fetchStylistTimeSlots({ stylistId, date: selectedDateForAPI }),
        );
      } else {
        // 🧠 Silent background refresh
        dispatch(
          fetchStylistTimeSlots({
            stylistId,
            date: selectedDateForAPI,
            silent: true,
          }),
        );
      }
    };

    fetchTimeSlots();
  }, [stylistId, selectedDateForAPI, dispatch]);

  // render logic
  // if (loading) {
  //   return <ActivityIndicator size="large" color={Color('gold')} />;
  // }

  // if (error) {
  //   return (
  //     <AppText title="Failed to load time slots" textColor={AppColors.WHITE} />
  //   );
  // }

  // if (!stylistTimeSlots?.length) {
  //   return (
  //     <AppText title="No available slots found" textColor={AppColors.WHITE} />
  //   );
  // }

  // 🧩 When user selects a date from the calendar
  useEffect(() => {
    if (selectedDateFromCalendar) {
      const selectedMoment = moment(selectedDateFromCalendar);

      const newDate = {
        id: 999,
        day: selectedMoment.format('ddd').toUpperCase(),
        date: selectedMoment.format('MMM D'),
        apiDate: selectedMoment.format('DD-MM-YYYY'),
        fullDate: selectedMoment,
        mins: '30 mins',
      };

      const filtered = datesData.filter(d => d.id !== 999);
      const updatedDates = [...filtered, newDate].sort(
        (a, b) => a.fullDate - b.fullDate,
      );

      setDatesData(updatedDates);
      setIsSelectedDate({ id: newDate.id });
      // ✅ Save the formatted date globally
      setSelectedDateForAPI(newDate.apiDate);
    }
  }, [selectedDateFromCalendar]);

  // const generateDates = () => {
  //   const nextThreeDays = [];

  //   for (let i = 0; i < 3; i++) {
  //     const date = moment().add(i, 'days');

  //     nextThreeDays.push({
  //       id: i + 1,
  //       day: date.format('ddd').toUpperCase(), // e.g. "THU"
  //       date: date.format('MMM D'), // e.g. "Oct 23"
  //       mins: '30 mins', // optional random mins
  //     });
  //   }

  //   return nextThreeDays;
  // };
  // const datesData = generateDates();
  return (
    <Background contentContainerStyle={{ paddingBottom: responsiveHeight(2) }}>
      <AppHeader onPress={() => navigation.goBack()} title="Date and time" />

      <View>
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
          contentContainerStyle={{ gap: 15 }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setIsSelectedDate({ id: item.id });
                  setSelectedDateForAPI(item.apiDate); // ✅ Save the date format "DD-MM-YYYY"
                }}
                style={{
                  backgroundColor:
                    isSelectedDate.id === item.id
                      ? Color('gold')
                      : Color('lightTheme'),
                  borderRadius: 10,
                  alignItems: 'center',
                  paddingHorizontal: responsiveWidth(3.4),
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor:
                    isSelectedDate.id === item.id
                      ? AppColors.WHITE
                      : Color('gold'),
                }}
              >
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
        {loading ? (
          <View style={{ flex: 1 }}>
            <StylistLoader height={10} />;
          </View>
        ) : selectedWorkingDay ? (
          <FlatList
            data={generateTimeSlots(
              selectedWorkingDay.startTime,
              selectedWorkingDay.endTime,
              30,
              selectedWorkingDay.breakStart,
              selectedWorkingDay.breakEnd,
              appointments,
            )}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={<LineBreak space={2} />}
            renderItem={({ item }) => (
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
                  borderColor:
                    isSelectedTime.id === item.id
                      ? AppColors.WHITE
                      : Color('gold'),
                }}
                onPress={() => {
                  setIsSelectedTime({ id: item.id });
                  setSelectedTimeForAPI(item?.time);
                }}
              >
                <AppText
                  title={item.time}
                  textSize={2}
                  textColor={AppColors.WHITE}
                  textFontWeight
                />
              </TouchableOpacity>
            )}
          />
        ) : (
          <AppText
            textSize={2.2}
            textFontWeight
            title="Please select a valid date to view available time slots."
            textColor={AppColors.themeColor}
          />
        )}

        <CalendarModal
          visible={showCalendarModal}
          setVisible={() => setShowCalendarModal(false)}
          selected={selectedDateFromCalendar}
          setSelected={setSelectedDateFromCalendar}
        />

        <LineBreak space={4} />

        <View>
          <StyleButton
            onPress={() => {
              !selectedDateForAPI || !selectedTimeForAPI
                ? ShowToast('error', 'Please Select  Date And Time.')
                : navigation.navigate('BookingSummary', {
                    salonId,
                    stylistId,
                    stylistName,
                    serviceId,
                    servicePrice,
                    date: selectedDateForAPI,
                    time: selectedTimeForAPI,
                  });
            }}
          >
            Confirm Appointment
          </StyleButton>
        </View>
      </View>
    </Background>
  );
};

export default DateAndTimeSelection;
