/* eslint-disable react-native/no-inline-styles */
import { View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppHeader from '../../components/AppHeader';
import Background from '../../utils/Background';
import { ProductsLoader } from '../../components/Loaders';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import ProductCard from '../../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductsData } from '../../redux/DataSlice';
const AllProducts = ({ navigation }) => {
  const { allProductsData, loading } = useSelector(state => state.data);
  const isLoading = loading?.allProductsData;
  const dispatch = useDispatch();
  console.log('allProductsData', allProductsData);

  useEffect(() => {
    const existingData = allProductsData;

    if (!existingData || existingData.length === 0) {
      dispatch(fetchAllProductsData());
    } else {
      dispatch(fetchAllProductsData({ silent: true }));
    }
  }, []);
  return (
    <Background
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: responsiveHeight(2),
      }}
    >
      <AppHeader
        title="Products"
        showFvrtIcon={false}
        onPress={() => navigation.goBack()}
      />
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View style={{ width: '100%' }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={[1, 2, 3, 4, 5, 6, 7, 8]}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              contentContainerStyle={{ gap: responsiveHeight(2) }}
              renderItem={({ item, index }) => {
                return <ProductsLoader />;
              }}
            />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            data={allProductsData}
            contentContainerStyle={{ gap: responsiveWidth(5) }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <ProductCard
                item={item}
                onCardPress={
                  () =>
                    navigation.navigate('HomeDetails', {
                      id: item?.salonId?._id,
                      showProductTab: true,
                    })
                  // navigation.navigate('ProductDetails', { data: item })
                }
              />
            )}
          />
        )}
      </View>
    </Background>
  );
};

export default AllProducts;
