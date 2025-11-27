import React, { useEffect } from 'react';
import { Animated, Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { hideDrawer } from '../../lux/src/redux/Reducers/drawerSlice';
import { Color } from '../utils/Colors';
import { ArrowLeft, ArrowRight, Bag2, Calendar, Card, Cards, Coin1, ConvertCard, Home, Location, Message, MessageNotif, Notification, Profile, Profile2User, ProfileTick, Reserve, ShoppingCart } from 'iconsax-react-native';
import { H4, H5, H6, Pera } from '../components/Text';
import Br from './Br';
import { useNavigation } from '../../lux/src/utils/NavigationContext';
import { BackButton } from '../../lux/src/components/Button';

const { width, height } = Dimensions.get('screen');

interface Props {
}

const Drawer = ({ }: Props) => {
    // Create animated value for the horizontal position
    const slideAnim = new Animated.Value(-width);
    const showDrawer = useSelector(({ drawer }: { drawer: any }) => drawer?.drawer);
    const dispatch = useDispatch();
    const { navigate } = useNavigation();

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: showDrawer ? 0 : -width, // End position (i.e., slide to the right side)
            duration: 1000, // Duration of the animation in milliseconds
            useNativeDriver: true, // Use native driver for better performance
        }).start();
    }, [slideAnim, showDrawer]);

    if (!showDrawer) return;

    const DrawerItem = ({ icon, label, screen }: { icon: any, label: string, screen: string }) => {
        const clicked = () => {
            navigate(screen);
            dispatch(hideDrawer());
        }
        return (
            <>
                <TouchableOpacity onPress={clicked}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 15,
                        paddingVertical: height * 0.005
                    }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: Color('gold_50'), borderRadius: 100 }}>
                            {icon}
                        </View>
                        <Pera style={{ fontFamily: "Lora-Regular" }}>{label}</Pera>
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    return (
        <Animated.View
            style={[
                styles.drawer,
                {
                    transform: [{ translateX: slideAnim }], // Apply the animated value to translateX
                },
            ]}
        >
            <Image source={require('../../assets/background.png')} style={styles.backgroundImage} />

            <View style={{ width: width * 0.9, paddingTop: height * 0.07, alignSelf: 'center', height: height * 0.93 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                    <BackButton onPress={() => dispatch(hideDrawer())} children={undefined} />
                    <H4>Sidemenu</H4>
                </View>
                <Br space={0.03} />
                <View style={{ flex: 1 }}>
                    <DrawerItem
                        icon={<Home size="20" color={Color('navbarIcon')} />}
                        label="Home"
                        screen="Home"
                    />
                    <DrawerItem
                        icon={<Profile size="20" color={Color('navbarIcon')} />}
                        label="Profile"
                        screen="MyProfile"
                    />
                    <DrawerItem
                        icon={<Location size="20" color={Color('navbarIcon')} />}
                        label="Location"
                        screen="Nearby"
                    />
                    <DrawerItem
                        icon={<ShoppingCart size="20" color={Color('navbarIcon')} />}
                        label="Cart"
                        screen="Inbox"
                    />
                    <DrawerItem
                        icon={<Bag2 size="20" color={Color('navbarIcon')} />}
                        label="Order Products"
                        screen="OrderProduct"
                    />
                    <DrawerItem
                        icon={<Calendar size="20" color={Color('navbarIcon')} />}
                        label="My Appointments"
                        screen="Appointments"
                    />
                    <DrawerItem
                        icon={<Message size="20" color={Color('navbarIcon')} />}
                        label="Inbox"
                        screen="Inbox"
                    />
                    <DrawerItem
                        icon={<Profile2User size="20" color={Color('navbarIcon')} />}
                        label="Service Provider"
                        screen="Home"
                    />
                    <DrawerItem
                        icon={<ConvertCard size="20" color={Color('navbarIcon')} />}
                        label="My Cards"
                        screen="Home"
                    />
                </View>
                <DrawerItem
                    icon={<ArrowRight size="20" color={Color('navbarIcon')} />}
                    label="Logout"
                    screen="Logout"
                />
            </View>
        </Animated.View>
    )
}

export default Drawer;

const styles = StyleSheet.create({
    drawer: {
        width: width,
        height: height,
        right: 0,
        top: 0,
        position: 'absolute',
        zIndex: 10,
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: width,
        height: height,
    },
    userProfilePhoto: {
        borderRadius: 6,
        width: 80,
        height: 80
    }
})