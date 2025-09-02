import { useState } from "react";
import { Dimensions, FlatList, ImageBackground, Modal, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { ArrowDown2, User } from "iconsax-react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Color } from "../../lux/src/utils/Colors";
import { Pera, Small } from "./Text";

const { width, height } = Dimensions.get('screen');
const Dropdown = ({ style, data, selectedValue, onValueChange, defaultStyle, label, icon }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleSelect = (item) => {
        onValueChange(item);
        setIsVisible(false);
    };

    const defaultDropdownButton = defaultStyle ? {
        minHeight: Platform.OS === 'ios' ? 50 : height * 0.065
    } : {};
    const defaultDropdownButtonText = defaultStyle ? {
        color: Color('inputPlaceholder'),
        fontSize: RFValue(15, height)
    }: {};

    return (
        <View style={style}>
            {defaultStyle && label && <Small style={{
                fontFamily: 'Manrope-font',
                marginBottom: height * 0.008,
                marginLeft: width * 0.03
            }}>{label}</Small>}
            <ImageBackground source={require('../../assets/input-background.png')} resizeMode='stretch' style={{ alignItems: icon ? 'center' : 'flex-start', flexDirection: 'row', paddingLeft: width * 0.07, height: height * 0.075 }}>
                <TouchableOpacity style={[styles.dropdownButton, defaultDropdownButton]} onPress={() => setIsVisible(true)}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
                        {icon}
                        <Small style={[styles.dropdownButtonText, defaultDropdownButtonText]}>{selectedValue || "Select an option"}</Small>
                    </View>
                    <ArrowDown2
                        size="20"
                        color={Color('inputPlaceholder')}
                        variant="Bold"
                    />
                </TouchableOpacity>
            </ImageBackground>
            <Modal visible={isVisible} transparent={true} animationType="slide">
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsVisible(false)}>
                    <View style={styles.dropdown}>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelect(item.value)}>
                                    <Pera style={styles.dropdownItemText}>{item.label}</Pera>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width * 0.76
    },
    dropdownButtonText: {
        color: Color('inputPlaceholder')
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color('modalBackground'),
        zIndex: 1
    },
    dropdown: {
        width: width * 0.9,
        backgroundColor: Color('textColor'),
        borderRadius: 5,
        maxHeight: height * 0.5,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Color('lightBorder'),
    },
    dropdownItemText: {
        color: Color('btnText')
    },
});

export default Dropdown;
