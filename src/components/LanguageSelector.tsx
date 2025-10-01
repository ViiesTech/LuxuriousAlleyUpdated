/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    TextInput,
    Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "../utils/Responsive_Dimensions";
import APPImages from "../assets/APPImages";
import AppColors from "../utils/AppColors";

const languages = [
    { code: "en", name: "English", flag: APPImages.us },
    { code: "es", name: "Spanish", flag: APPImages.spain },
    { code: "fr", name: "French", flag: APPImages.france },
    { code: "de", name: "German", flag: APPImages.germany },
    { code: "hi", name: "Hindi", flag: APPImages.india },
    { code: "ko", name: "Korean", flag: APPImages.korea },
];

const LanguageSelector = () => {
    const [selected, setSelected] = useState(languages[0]);
    const [search, setSearch] = useState("");
    const [visible, setVisible] = useState(false);

    const filteredLanguages = languages.filter(lang =>
        lang.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={{ alignItems: "center" }}>
            {/* Dropdown Button */}
            <TouchableOpacity
                onPress={() => setVisible(true)}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: responsiveWidth(90),
                    paddingHorizontal: responsiveWidth(4),
                    paddingVertical: responsiveHeight(1),
                    paddingLeft: responsiveWidth(1),
                    borderRadius: 25,
                    backgroundColor: "#fff",
                    shadowColor: "#000",
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    elevation: 5,
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={selected.flag} style={{ width: 35, height: 35, marginRight: 10, borderRadius: 100 }} />
                    <Text style={{ fontSize: responsiveFontSize(2), fontWeight: "600" }}>{selected.name}</Text>
                </View>
                <Ionicons name="checkmark-circle" size={25} color="#ffcc00" />
            </TouchableOpacity>

            {/* Modal for dropdown */}
            <Modal visible={visible} transparent animationType="fade">
                <View style={{ flex: 1, marginTop: responsiveHeight(13), backgroundColor: "transparent", justifyContent: "center", alignItems: "center" }}>
                    <View
                        style={{
                            width: responsiveWidth(90),
                            maxHeight: responsiveHeight(60),
                            backgroundColor: "#1b1464",
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: AppColors.WHITE,
                            padding: 10,
                        }}
                    >
                        {/* Search */}
                        <View style={{ flexDirection: "row", borderBottomWidth: 1, borderBottomColor: AppColors.WHITE, alignItems: "center", borderRadius: 10, paddingHorizontal: 10 }}>
                            <Ionicons name="search" size={18} color={AppColors.WHITE} />
                            <TextInput
                                placeholder="Search"
                                value={search}
                                onChangeText={setSearch}
                                placeholderTextColor={AppColors.WHITE}
                                style={{ flex: 1, padding: 8, fontSize: 14, color: AppColors.WHITE }}
                            />
                        </View>

                        {/* List */}
                        <FlatList
                            data={filteredLanguages}
                            keyExtractor={item => item.code}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelected(item);
                                        setVisible(false);
                                    }}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingVertical: 12,
                                        paddingHorizontal: 10,
                                        backgroundColor: item.code === selected.code ? "rgba(255,255,255,0.2)" : "transparent",
                                        borderRadius: 8,
                                    }}
                                >
                                    <Image source={item.flag} style={{ width: 28, height: 28, marginRight: 10, borderRadius: 100, }} />
                                    <Text style={{ color: item.code === selected.code ? AppColors.BLACK : AppColors.DARKGRAY, fontSize: 16, flex: 1 }}>{item.name}</Text>
                                    {item.code === selected.code && (
                                        <Ionicons name="checkmark-circle" size={20} color="#ffcc00" />
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default LanguageSelector;
