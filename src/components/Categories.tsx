import React from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '../../lux/src/utils/NavigationContext';

const { width, height } = Dimensions.get('screen');

const Categories = ({activeCard}: {activeCard: number}) => {
    const { navigate } = useNavigation();
    const trending = activeCard === 1 ? require("../../assets/home-category-trending-active.png") : require("../../assets/home-category-trending.png");
    const nearby = activeCard === 2 ? require("../../assets/home-category-nearby-active.png") : require("../../assets/home-category-nearby.png");
    const recents = activeCard === 3 ? require("../../assets/home-category-recents-active.png") : require("../../assets/home-category-recents.png");
    const popular = activeCard === 4 ? require("../../assets/home-category-popular-active.png") : require("../../assets/home-category-popular.png");

    return (
        <View style={{ flexDirection: "row", justifyContent: 'center', gap: 10 }}>
            <TouchableOpacity onPress={() => navigate('Trending')} style={{ alignItems: 'center', width: width * 0.2 }}>
                <Image resizeMode='contain' source={trending} style={{ width: '100%' }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('Nearby')} style={{ alignItems: 'center', width: width * 0.2 }}>
                <Image resizeMode='contain' source={nearby} style={{ width: '100%' }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('Recent')} style={{ alignItems: 'center', width: width * 0.2 }}>
                <Image resizeMode='contain' source={recents} style={{ width: '100%' }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('Popular')} style={{ alignItems: 'center', width: width * 0.2 }}>
                <Image resizeMode='contain' source={popular} style={{ width: '100%' }} />
            </TouchableOpacity>
        </View>
    )
}

export default Categories;