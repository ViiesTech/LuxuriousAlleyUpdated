/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  FlatList,
  Alert,
  PermissionsAndroid,
  Platform,
  Linking,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';
import LineBreak from '../../components/LineBreak';
import Background from '../../utils/Background';
import { Color } from '../../utils/Colors';
import StyleButton from '../../components/StyleButton';
import moment from 'moment';
import FileViewer from 'react-native-file-viewer';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import { useSelector } from 'react-redux';

const DownloadReceipt = ({ route }) => {
  const navigation = useNavigation();
  const {
    salonId,
    serviceId,
    technicianId,
    product,
    userId,
    _id,
    time,
    date,
    totalAmount,
    subTotal,
  } = route?.params?.data;

  const { isProductReceipt, goToHome } = route?.params;
  const { username } = useSelector(state => state?.user?.userData);
  console.log('totalAmount', totalAmount);
  // console.log('route?.params?.data',userData);

  const formattedDate = moment(date, 'DD-MM-YYYY').format('MMMM D, YYYY');

  // ✅ Booking / Common Details
  const sectionDataOne = [
    { id: 1, title: 'Salon', subTitle: salonId?.bName },
    { id: 2, title: 'Customer Name', subTitle: userId?.username || username },
    { id: 3, title: 'Phone', subTitle: salonId?.bPhoneNumber },
    { id: 4, title: 'Booking Date', subTitle: formattedDate },
    // Only add time and stylist if it's not a product receipt
    ...(!isProductReceipt
      ? [
          { id: 5, title: 'Booking Time', subTitle: time },
          { id: 6, title: 'Stylist', subTitle: technicianId?.fullName },
        ]
      : []),
  ];

  // ✅ PDF Permission Handler
  async function requestStoragePermission() {
    if (Platform.OS === 'android' && Platform.Version < 30) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to save the receipt.',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }
    return true;
  }

  // ✅ Handle Receipt Download
  const handleDownloadReceipt = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Please allow storage access to save the receipt.',
      );
      return;
    }

    if (!_id) {
      Alert.alert('Error', 'Booking details not loaded yet.');
      return;
    }

    try {
      // 🧾 Generate PDF
      const pdf = await RNHTMLtoPDF.convert({
        html: isProductReceipt
          ? `
          <h2 style="text-align:center;">Product Purchase Receipt</h2>
          <p><strong>Receipt ID:</strong> ${_id}</p>
          <p><strong>Salon:</strong> ${salonId?.bName}</p>
          <p><strong>Customer Name:</strong> ${userId?.username || username}</p>
          <p><strong>Phone:</strong> ${salonId?.bPhoneNumber}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <hr/>
          <h3>Purchased Products:</h3>
          <ul>
            ${product
              ?.map(
                p =>
                  `<li>${p?.productId?.productName} - $${
                    p?.productId?.price
                  } (Qty: ${p?.quantity || 1})</li>`,
              )
              .join('')}
          </ul>
          <hr/>
          <p><strong>Total Amount:</strong> $${subTotal}</p>
        `
          : `
          <h2 style="text-align:center;">Service Booking Receipt</h2>
          <p><strong>Booking ID:</strong> ${_id}</p>
          <p><strong>Salon:</strong> ${salonId?.bName}</p>
          <p><strong>Customer Name:</strong> ${userId?.username || username}</p>
          <p><strong>Phone:</strong> ${salonId?.bPhoneNumber}</p>
          <p><strong>Booking Date:</strong> ${formattedDate}</p>
          <p><strong>Booking Time:</strong> ${time}</p>
          <p><strong>Stylist:</strong> ${technicianId?.fullName}</p>
          <hr/>
          <p><strong>Service:</strong> ${serviceId?.serviceName}</p>
          <p><strong>Total Amount:</strong> $${totalAmount}</p>
        `,
        fileName: `Receipt_${_id}`,
        directory: 'Documents',
      });

      if (pdf.filePath) {
        console.log('📁 PDF generated at:', pdf.filePath);

        // Copy to PUBLIC Downloads folder
        const publicDownloadsPath = `/storage/emulated/0/Download/Receipt_${_id}.pdf`;

        try {
          await RNFS.copyFile(pdf.filePath, publicDownloadsPath);
          console.log('✅ PDF copied to:', publicDownloadsPath);

          // Make file visible in Downloads app
          if (Platform.OS === 'android') {
            await RNFS.scanFile(publicDownloadsPath);
          }

          Alert.alert(
            '✅ Receipt Downloaded Successfully!',
            `Receipt saved to your Downloads folder\n\nFile: Receipt_${_id}.pdf`,
            [
              // This is properly commented now
              // {
              //   text: 'Open File',
              //   onPress: async () => {
              //     try {
              //       await FileViewer.open(publicDownloadsPath, {
              //         showOpenWithDialog: true,
              //         showAppsSuggestions: true,
              //       });
              //     } catch (error) {
              //       console.log('Error opening file:', error);
              //       Alert.alert('Error', 'Could not open file. Please check your Downloads folder.');
              //     }
              //   }
              // },
              {
                text: 'View in Downloads',
                onPress: () => {
                  if (Platform.OS === 'android') {
                    Linking.openURL(
                      'content://com.android.externalstorage.documents/document/primary%3ADownload',
                    ).catch(() => {
                      FileViewer.open(publicDownloadsPath, {
                        showOpenWithDialog: true,
                        showAppsSuggestions: true,
                      });
                    });
                  } else {
                    FileViewer.open(publicDownloadsPath);
                  }
                },
              },
              {
                text: 'OK',
                style: 'cancel',
              },
            ],
          );
        } catch (copyError) {
          console.log('Copy error:', copyError);
          // If copy fails, open the original file
          Alert.alert('✅ Receipt Generated!', 'Opening receipt now...', [
            {
              text: 'OK',
              onPress: () => FileViewer.open(pdf.filePath),
            },
          ]);
        }
      }
    } catch (err) {
      console.error('PDF Generation Error:', err);
      Alert.alert('Error', 'Failed to generate receipt. Please try again.');
    }
  };

  // ✅ UI Rendering
  return (
    <Background>
      <AppHeader
        onPress={() =>
          goToHome ? navigation.navigate('Home') : navigation.goBack()
        }
        title="Receipt"
      />

      <View>
        {/* Common Booking Info */}
        <View
          style={{
            backgroundColor: Color('lightTheme'),
            borderRadius: 15,
            borderWidth: 1,
            borderColor: Color('gold'),
            paddingVertical: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(4),
          }}
        >
          <FlatList
            data={sectionDataOne}
            ItemSeparatorComponent={() => <LineBreak space={1.5} />}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <AppText
                  title={item.title}
                  textSize={2}
                  textColor={Color('gold')}
                />
                <AppText
                  title={item.subTitle}
                  textSize={2}
                  textColor={AppColors.WHITE}
                />
              </View>
            )}
          />
        </View>

        <LineBreak space={2} />

        {/* Product or Service Details */}
        {isProductReceipt ? (
          <View
            style={{
              backgroundColor: Color('lightTheme'),
              borderRadius: 15,
              borderWidth: 1,
              borderColor: Color('gold'),
              paddingVertical: responsiveHeight(2),
              paddingHorizontal: responsiveWidth(4),
            }}
          >
            <FlatList
              data={product}
              ItemSeparatorComponent={() => <LineBreak space={1.5} />}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <AppText
                    title={`${item.productId?.productName} (x${
                      item.quantity || 1
                    })`}
                    textSize={2}
                    textColor={Color('gold')}
                  />
                  <AppText
                    title={`$${item?.productId?.price}`}
                    textSize={2}
                    textColor={AppColors.WHITE}
                  />
                </View>
              )}
            />
            <LineBreak space={1.5} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <AppText
                title="Total"
                textSize={2.2}
                textColor={Color('gold')}
                textFontWeight
              />
              <AppText
                title={`$${subTotal}`}
                textSize={2.2}
                textFontWeight
                textColor={AppColors.WHITE}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: Color('lightTheme'),
              borderRadius: 15,
              borderWidth: 1,
              borderColor: Color('gold'),
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: responsiveHeight(2),
              paddingHorizontal: responsiveWidth(4),
            }}
          >
            <AppText
              title={serviceId?.serviceName}
              textSize={2.2}
              textColor={Color('gold')}
            />
            <AppText
              title={`$${totalAmount}`}
              textSize={2.2}
              textColor={AppColors.WHITE}
            />
          </View>
        )}
      </View>

      <LineBreak space={2} />

      <StyleButton onPress={handleDownloadReceipt}>
        Download Receipt
      </StyleButton>

      <LineBreak space={2} />
    </Background>
  );
};

export default DownloadReceipt;
