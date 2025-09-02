import React from 'react';
import { Dimensions, FlatList, Image, Keyboard, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Drawer from '../../../src/components/Drawer.tsx';
import KeyboardView from '../utils/KeyboardView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from './Colors.tsx';

const { width, height } = Dimensions.get('screen');

interface Props {
    children: any
}
const Background = ({children}: Props) => {
    return (
        <>
            {/* <Drawer /> */}
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }}>
                <SafeAreaView style={styles.safeAreaView}>
                    <Image source={require('../assets/background.png')} style={styles.backgroundImage} />
                    <View style={styles.content}>
                        <KeyboardView>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                data={[children]}
                                renderItem={({ item }) => item}
                                keyExtractor={(item, index: any) => index}
                            />
                        </KeyboardView>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </>
    )
}

export default Background;

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: Color('otpInputBackground')
    },
    content: {
        width: width * 0.9,
        alignSelf: 'center',
        flex: 1
    }
})