/* eslint-disable react-native/no-inline-styles */
import { View, Text, FlatList } from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';

const ServiceLoader = () => {
  return (
    <SkeletonPlaceholder
      backgroundColor="#1A1C5A" // base skeleton background (slightly lighter than screen)
      highlightColor="#2D2F7A"
      borderRadius={12}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: responsiveHeight(2),
        }}
      >
        <View style={{ width: 100, height: 45, borderRadius: 12 }} />
        <View style={{ width: 100, height: 45, borderRadius: 12 }} />
        <View style={{ width: 100, height: 45, borderRadius: 12 }} />
      </View>
    </SkeletonPlaceholder>
  );
};

const SalonLoader = () => {
  return (
    <SkeletonPlaceholder
      backgroundColor="#1A1C5A" // base skeleton background (slightly lighter than screen)
      highlightColor="#2D2F7A"
      borderRadius={12}
    >
      {[1, 2, 3].map(index => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: responsiveHeight(1),
            paddingVertical: responsiveHeight(1.2),
            borderRadius: 16,
          }}
        >
          {/* Salon Image */}
          <View
            style={{
              width: responsiveWidth(22),
              height: responsiveHeight(10),
              borderRadius: 12,
            }}
          />

          {/* Right side: details */}
          <View style={{ marginLeft: responsiveWidth(4), flex: 1 }}>
            {/* Salon name */}

            <View
              style={{
                flexDirection: 'row',
                marginBottom: responsiveHeight(1),
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  width: responsiveWidth(45),
                  height: responsiveHeight(2.2),
                  borderRadius: 6,
                }}
              />
              <View
                style={{
                  width: responsiveWidth(10),
                  height: responsiveHeight(2.2),
                  borderRadius: 6,
                }}
              />
            </View>
            {/* Location */}
            <View
              style={{
                width: responsiveWidth(35),
                height: responsiveHeight(1.8),
                borderRadius: 6,
                marginBottom: responsiveHeight(1),
              }}
            />
            {/* Rating + distance */}
            <View
              style={{
                width: responsiveWidth(45),
              }}
            >
              <View
                style={{
                  width: responsiveWidth(15),
                  height: responsiveHeight(1.8),
                  borderRadius: 6,
                }}
              />
            </View>
          </View>
        </View>
      ))}
    </SkeletonPlaceholder>
  );
};

const SalonDetails = () => {
  return (
    <SkeletonPlaceholder
      backgroundColor="#1A1C5A" // base skeleton background (slightly lighter than screen)
      highlightColor="#2D2F7A"
      borderRadius={8}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <View
          style={{
            width: '100%',
            height: responsiveHeight(25),
            borderRadius: 10,
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        {/* 🔹 Image Carousel */}

        {/* 🔹 Title */}
        <View
          style={{
            width: '60%',
            height: responsiveHeight(3),
            marginBottom: 10,
          }}
        />

        {/* 🔹 Address */}
        <View
          style={{ width: '80%', height: responsiveHeight(2), marginBottom: 6 }}
        />

        {/* 🔹 Time & Days */}
        <View
          style={{ width: '70%', height: responsiveHeight(2), marginBottom: 6 }}
        />

        {/* 🔹 Rating */}
        <View
          style={{
            width: '40%',
            height: responsiveHeight(2),
            marginBottom: 16,
          }}
        />

        {/* 🔹 Description */}
        <View
          style={{
            width: '100%',
            height: 40,
            marginTop: responsiveHeight(1),
            marginBottom: 20,
          }}
        />

        {/* 🔹 Tabs (Services | Stylists | Products) */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: responsiveHeight(7),
          }}
        >
          {[...Array(3)].map((_, i) => (
            <View
              key={i}
              style={{
                width: responsiveWidth(27),
                height: responsiveHeight(4),
                borderRadius: 6,
              }}
            />
          ))}
        </View>

        {/* 🔹 Services List */}
        {[...Array(3)].map((_, i) => (
          <View
            key={i}
            style={{
              width: '100%',
              height: responsiveHeight(8),
              borderRadius: 10,
              marginBottom: 12,
            }}
          />
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

const ProductsLoader = ({ height, width }) => {
  return (
    <SkeletonPlaceholder
      backgroundColor="#1A1C5A" // base skeleton background (slightly lighter than screen)
      highlightColor="#2D2F7A"
      borderRadius={12}
    >
      <View
        style={{
          backgroundColor: '#4F4F4F',
        }}
      >
        <View
          style={{
            height: responsiveHeight(height ? height : 20),
            width: responsiveWidth(width ? width : 42),
            backgroundColor: '#000',
          }}
        />
      </View>
    </SkeletonPlaceholder>
  );
};
const StylistLoader = ({ height }) => {
  return (
    <FlatList
      contentContainerStyle={{ gap: responsiveHeight(1.5) }}
      data={[1, 2, 3]}
      renderItem={({ item, index }) => {
        return (
          <SkeletonPlaceholder
            backgroundColor="#1A1C5A" // base skeleton background (slightly lighter than screen)
            highlightColor="#2D2F7A"
            borderRadius={12}
          >
            <View
              style={{
                backgroundColor: '#4F4F4F',
              }}
            >
              <View
                style={{
                  height: responsiveHeight(height ? height : 13),
                  width: '100%',
                  backgroundColor: '#000',
                }}
              />
            </View>
          </SkeletonPlaceholder>
        );
      }}
    />
  );
};
const ReviewsLoader = ({ height, width, data, isHorizontal = true }) => {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: responsiveHeight(1.5), flexGrow: 1 }}
      data={data ? data : [1, 2, 3]}
      horizontal={isHorizontal ? true : false}
      renderItem={({ item, index }) => {
        return (
          <SkeletonPlaceholder
            backgroundColor="#1A1C5A" // base skeleton background (slightly lighter than screen)
            highlightColor="#2D2F7A"
            borderRadius={12}
          >
            <View
              style={{
                backgroundColor: '#4F4F4F',
              }}
            >
              <View
                style={{
                  height: responsiveHeight(height ? height : 15),
                  width: responsiveWidth(width ? width : 70),
                  backgroundColor: '#000',
                }}
              />
            </View>
          </SkeletonPlaceholder>
        );
      }}
    />
  );
};
export {
  ServiceLoader,
  SalonLoader,
  SalonDetails,
  ProductsLoader,
  StylistLoader,
  ReviewsLoader,
};
