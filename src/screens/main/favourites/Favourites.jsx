import React, {useState} from 'react';
import {View, ScrollView, FlatList} from 'react-native';
import AppHeader from '../../../components/AppHeader';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../../utils/AppColors';
import LineBreak from '../../../components/LineBreak';
import {responsiveWidth} from '../../../utils/Responsive_Dimensions';
import SaloonsArray from '../../../utils/SaloonsArray';
import SaloonsCard from '../../../components/SaloonsCard';
import RemoveFavouritesModal from '../../../components/RemoveFavouritesModal';
import Background from '../../../utils/Background';

const Favourites = () => {
  const navigation = useNavigation();
  const [isShowDeleteIcon, setIsShowDeleteIcon] = useState({
    id: 0,
    shown: false,
  });
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  return (
    <Background>
      <AppHeader onPress={() => navigation.goBack()} title="Favourites" />
      <LineBreak space={2} />

      <RemoveFavouritesModal
        visible={showRemoveModal}
        handleAppointmentButtonPress={() => {
          setShowRemoveModal(false);
          setIsShowDeleteIcon({id: 0, shown: false});
        }}
        handleCancelButtonPress={() => {
          setShowRemoveModal(false);
          setIsShowDeleteIcon({id: 0, shown: false});
        }}
      />

      <View >
        <FlatList
          data={SaloonsArray}
          ItemSeparatorComponent={<LineBreak space={2} />}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <SaloonsCard
              title={item.title}
              KM={item.KM}
              Rating={item.Rating}
              TotalNoOfRating={item.TotalNoOfRating}
              img={item.img}
              location={item.location}
              component="fav"
              itemId={item.id}
              isShowDeleteIcon={isShowDeleteIcon}
              setIsShowDeleteIcon={setIsShowDeleteIcon}
              setShowRemoveModal={setShowRemoveModal}
            />
          )}
        />
      </View>
    </Background>
  );
};

export default Favourites;
