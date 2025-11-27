/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import APPImages from '../assets/APPImages';
import AppColors from '../utils/AppColors';
import LineBreak from './LineBreak';
import { responsiveWidth } from '../utils/Responsive_Dimensions';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';

const ChatCom = () => {
    const [messages, setMessages] = useState([
        {
            id: '1',
            text: 'Let me know when reached',
            time: '9:42 am',
            sender: 'other',
        },
        { id: '2', text: "I'm here", time: '9:43 am', sender: 'me' },
    ]);
    const [input, setInput] = useState('');
    const navigation = useNavigation();

    const sendMessage = () => {
        if (input.trim()) {
            const newMessage = {
                id: Date.now().toString(),
                text: input,
                time: '9:44 am',
                sender: 'me',
            };
            setMessages([...messages, newMessage]);
            setInput('');
        }
    };

    const renderItem = ({ item }) => (
        <View
            style={[
                styles.messageContainer,
                item.sender === 'me' ? styles.myMessage : styles.otherMessage,
            ]}
        >
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timeText}>{item.time}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(4) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesome6 name="chevron-left" size={22} color={AppColors.WHITE} />
                    </TouchableOpacity>
                    <Image
                        source={APPImages.NAILS}
                        style={styles.avatar}
                    />
                </View>
                <View>
                    <Text style={styles.name}>Martha Craig</Text>
                    <Text style={styles.subText}>Seller</Text>
                </View>
            </View>

            <LineBreak space={4} />

            {/* Chat messages */}
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />

            {/* Input bar */}
            <View style={styles.inputContainer}>
                <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="Hello where"
                    placeholderTextColor="#888"
                    style={styles.input}
                />

                <View style={{ flexDirection: 'row', gap: responsiveWidth(2), alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Entypo name="attachment" size={22} color={AppColors.BLACK} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                        <Icon name="send" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ChatCom;

const styles = StyleSheet.create({
    container: { flex: 1, }, // gradient-like dark purple
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingHorizontal: 0,
        borderBottomWidth: 1,
        borderColor: AppColors.WHITE,
    },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
    name: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    subText: { color: '#aaa', fontSize: 12 },
    messageContainer: {
        maxWidth: '70%',
        padding: 10,
        borderRadius: 12,
        marginBottom: 12,
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#F5A623', // orange bubble
        borderBottomRightRadius: 0,
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#2E1C78', // dark purple bubble
        borderBottomLeftRadius: 0,
    },
    messageText: { color: '#fff', fontSize: 14 },
    timeText: { fontSize: 10, color: '#ddd', marginTop: 4, textAlign: 'right' },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    input: { flex: 1, fontSize: 14, color: '#000', paddingHorizontal: 8 },
    sendButton: {
        backgroundColor: '#1A0B5C',
        padding: 10,
        borderRadius: 20,
        marginLeft: 8,
    },
});
