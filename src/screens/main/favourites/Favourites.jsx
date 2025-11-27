/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import AppHeader from '../../../components/AppHeader';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AppColors from '../../../utils/AppColors';
import LineBreak from '../../../components/LineBreak';
import { responsiveWidth } from '../../../utils/Responsive_Dimensions';
import SaloonsArray from '../../../utils/SaloonsArray';
import SaloonsCard from '../../../components/SaloonsCard';
import RemoveFavouritesModal from '../../../components/RemoveFavouritesModal';
import Background from '../../../utils/Background';
import { addOrRemoveFvrts, getFvrtSalons } from '../../../GlobalFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { ImageBaseUrl } from '../../../assets/Utils/BaseUrl';
import { SalonLoader } from '../../../components/Loaders';
import { fetchFavSalons } from '../../../redux/DataSlice';
import AppText from '../../../components/AppTextComps/AppText';

const Favourites = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const { _id } = useSelector(state => state?.user?.userData || {});
  const { favSalonsCache, favSalons, loading } = useSelector(
    state => state.data,
  );
  const loadingFavs = loading?.favSalons;
  const [removeFvrtsLoading, setRemoveFvrtsLoading] = useState(false);
  const [selectedSalonId, setSelectedSalonId] = useState(null);
  const [isShowDeleteIcon, setIsShowDeleteIcon] = useState({
    id: 0,
    shown: false,
  });
  console.log('favSalonsCache', favSalonsCache);

  const displayedFavSalons =
    (favSalonsCache && _id && favSalonsCache[_id]) || favSalons || [];
  // const memoizedFavSalons = useMemo(() => favSalons, [favSalons]);
  useEffect(() => {
    if (_id) {
      dispatch(fetchFavSalons({ userId: _id }));
    }
  }, [_id]);

  // const handleRemoveFromFvrts = async () => {
  //   if (!_id || !selectedSalonId) return;
  //   setRemoveFvrtsLoading(true);
  //   try {
  //     const response = await addOrRemoveFvrts(_id, selectedSalonId);
  //     if (response?.success) {
  //       // refresh favourites after removal so cache and UI update
  //       await dispatch(fetchFavSalons({ userId: _id }));
  //       setShowRemoveModal(false);
  //       setIsShowDeleteIcon({ id: 0, shown: false });
  //     } else {
  //       // handle server error message if needed (toast)
  //     }
  //   } catch (error) {
  //     console.log('remove fav error', error);
  //   } finally {
  //     setRemoveFvrtsLoading(false);
  //   }
  // };

  const addOrRemoveFvrtHandler = async () => {
    setRemoveFvrtsLoading(true);
    try {
      await addOrRemoveFvrts(_id, selectedSalonId, dispatch);
      setShowRemoveModal(false);
      setIsShowDeleteIcon({ id: 0, shown: false });
    } catch (error) {
      console.log(error);
    } finally {
      setRemoveFvrtsLoading(false);
    }
  };

  return (
    <Background contentContainerStyle={{ flexGrow: 1 }}>
      <AppHeader onPress={() => navigation.goBack()} title="Favourites" />
      <LineBreak space={2} />

      <RemoveFavouritesModal
        visible={showRemoveModal}
        handleAppointmentButtonPress={() => {
          setShowRemoveModal(false);
          setIsShowDeleteIcon({ id: 0, shown: false });
        }}
        removeSalonLoading={removeFvrtsLoading}
        // handleCancelButtonPress={() => {
        //   setShowRemoveModal(false);
        //   setIsShowDeleteIcon({ id: 0, shown: false });
        // }}
        handleCancelButtonPress={addOrRemoveFvrtHandler}
      />

      <View style={{ flex: 1 }}>
        {loadingFavs ? (
          <SalonLoader />
        ) : !favSalonsCache?.[_id] || favSalonsCache[_id].length === 0 ? (
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AppText
              textColor={AppColors.WHITE}
              textSize={2.5}
              textFontWeight
              title={'No Favourite Salons Found'}
            />
          </View>
        ) : (
          <FlatList
            data={favSalonsCache?.[_id] || []}
            ItemSeparatorComponent={<LineBreak space={2} />}
            keyExtractor={item =>
              item._id?.toString() ?? Math.random().toString()
            }
            renderItem={({ item }) => (
              <SaloonsCard
                title={item?.bName}
                // KM={
                //   item?.distanceInKm
                //     ? parseFloat(item.distanceInKm.replace(' km', '')).toFixed(1)
                //     : ''
                // }
                KM={'2'}
                
                Rating={`{${Number(item?.avgRating)?.toFixed(2)})`}
                TotalNoOfRating={item?.totalReviews}
                img={`${ImageBaseUrl}${item.bImage}`}
                location={item?.bLocationName}
                component="fav"
                itemId={item._id}
                isShowDeleteIcon={isShowDeleteIcon}
                onRemovePress={() => {
                  setShowRemoveModal(true);
                  setSelectedSalonId(item?._id);
                }}
                setIsShowDeleteIcon={setIsShowDeleteIcon}
                setShowRemoveModal={setShowRemoveModal}
              />
            )}
          />
        )}
      </View>
    </Background>
  );
};

export default Favourites;
