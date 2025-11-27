/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AppColors from '../../../utils/AppColors';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../../components/AppHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import APPImages from '../../../assets/APPImages';
import Feather from 'react-native-vector-icons/Feather';
import LineBreak from '../../../components/LineBreak';
import AppTextInput from '../../../components/AppTextInput';
import Background from '../../../utils/Background';
import { Color } from '../../../utils/Colors';
import StyleButton from '../../../components/StyleButton';
import { useDispatch, useSelector } from 'react-redux';
import { ImageBaseUrl } from '../../../assets/Utils/BaseUrl';
import { selectImage, updateUser } from '../../../GlobalFunctions';
import AppText from '../../../components/AppTextComps/AppText';

const EditProfile = () => {
  const navigation = useNavigation();
  const { userData } = useSelector(state => state?.user);
  const [imageUri, setImageUri] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    userName: null,
    phone: null,
  });
  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };
  const showImagePickerOptions = () => {
    Alert.alert(
      'Select an Option',
      'Do you want to upload an image or click one from the camera?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Camera',
          onPress: () => selectImageHandler(true), // true → camera
        },
        {
          text: 'Upload',
          onPress: () => selectImageHandler(false), // false → gallery
        },
      ],
      { cancelable: true },
    );
  };

  const selectImageHandler = async (fromCamera = false) => {
    const response = await selectImage(fromCamera ? 'camera' : 'gallery');
    if (response) {
      setImageUri(response);
    }
  };

  const editProfile = async () => {
    const { userName, phone } = form;
    console.log(userName, phone);
    setIsLoading(true);
    // return;
    try {
      const response = await updateUser(
        userData?._id,
        userName || null,
        imageUri || null,
        null,
        null,
        null,
        phone || null,
        dispatch,
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <Background>
      <AppHeader onPress={() => navigation.goBack()} title="Edit Profile" />

      <View>
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              borderWidth: 2,
              borderColor: Color('gold'),
              width: 110,
              height: 110,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Image
              source={
                imageUri
                  ? { uri: imageUri }
                  : userData?.image
                  ? { uri: `${ImageBaseUrl}${userData?.image}` }
                  : APPImages.userDummy
              }
              style={{ width: 100, height: 100, borderRadius: 100 }}
            />
            <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
              <TouchableOpacity
                onPress={showImagePickerOptions}
                style={{
                  backgroundColor: Color('gold'),
                  padding: 8,
                  borderRadius: 100,
                }}
                activeOpacity={0.7}
              >
                <Feather
                  name={'camera'}
                  size={responsiveFontSize(1.6)}
                  color={AppColors.BLACK}
                />
              </TouchableOpacity>
            </View>
          </View>
          <LineBreak space={2.5} />
          <AppText
            title={userData?.email}
            textColor={AppColors.WHITE}
            textSize={2}
          />
          <LineBreak space={6} />

          <View>
            <AppTextInput
              onChangeText={value => handleInputChange('userName', value)}
              inputPlaceHolder={userData?.username}
              containerBg={Color('lightTheme')}
              borderWidth={1}
              inputWidth={78}
              borderColor={Color('gold')}
            />
            <LineBreak space={2} />

            {/* <AppTextInput
              keyboardType="email-address"
              onChangeText={value => handleInputChange('email', value)}
              inputPlaceHolder={userData?.email}
              containerBg={Color('lightTheme')}
              borderWidth={1}
              inputWidth={78}
              borderColor={Color('gold')}
            />

            <LineBreak space={2} /> */}

            <AppTextInput
              keyboardType="numeric"
              onChangeText={value => handleInputChange('phone', value)}
              inputPlaceHolder={'Phone Number'}
              containerBg={Color('lightTheme')}
              borderWidth={1}
              inputWidth={78}
              borderColor={Color('gold')}
            />
          </View>
          <LineBreak space={2} />
          <View>
            <StyleButton
              btnWidth={responsiveWidth(90)}
              btnHeight={responsiveHeight(5)}
              justifyContent={'center'}
              color={AppColors.BLACK}
              onPress={editProfile}
            >
              {isLoading ? (
                <ActivityIndicator size={'large'} color={AppColors.BLACK} />
              ) : (
                'Save'
              )}
            </StyleButton>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default EditProfile;
