import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from './Colors.tsx';

const { width, height } = Dimensions.get('screen');

interface Props {
    children: any;
    contentContainerStyle: any;
}
const Background = ({ children, contentContainerStyle }: Props) => {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Image source={require('../assets/background.png')} style={styles.backgroundImage} />
            <View style={styles.content}>
                <ScrollView style={styles.safeAreaView} contentContainerStyle={contentContainerStyle} showsVerticalScrollIndicator={false}>
                    {children}
                </ScrollView>
            </View>
        </SafeAreaView>
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
        flex: 1,
        alignSelf: 'center',
        width: width * 0.9,
    }
});