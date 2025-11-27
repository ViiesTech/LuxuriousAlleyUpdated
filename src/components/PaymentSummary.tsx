/* eslint-disable react-native/no-inline-styles */
import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Color } from '../utils/Colors'
import { responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions'
import AppText from './AppTextComps/AppText'
import AppColors from '../utils/AppColors'

const PaymentSummary = ({ summary }) => {
  return (
    <View
      style={{
        backgroundColor: Color('cardColor'),
        paddingHorizontal: responsiveWidth(2),
        paddingVertical: responsiveHeight(1),
        borderWidth: 1,
        borderColor: Color('gold'),
        borderRadius: 10,
      }}
    >
      <FlatList
        data={summary}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: responsiveHeight(2),
              borderBottomWidth: item.id == 3 ? 0 : 0.5,
              borderBottomColor: Color('gold'),
            }}
          >
            <AppText
              title={item.title}
              textSize={1.8}
              textColor={AppColors.WHITE}
            />
            <AppText
              title={item.price}
              textSize={1.8}
              textColor={item.id === 3 ? Color('gold') : AppColors.WHITE}
            />
          </View>
        )}
      />
    </View>
  )
}

export default PaymentSummary