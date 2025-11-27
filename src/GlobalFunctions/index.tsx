import axios from "axios";
import { BaseUrl } from '../assets/Utils/BaseUrl';
import Toast from "react-native-toast-message";
import { setToken, setUserData, UserLogin } from '../redux/Slices';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { fetchFavSalons } from "../redux/DataSlice";
import BookingSummary from "../screens/main/BookingSummary";
import { addOrUpdateUserInFirestore } from '../assets/Utils/FireStoreHelper'
const ShowToast = (type: string, text: string) => {
  return Toast.show({
    type: type,
    text1: text,
  });
};

const RegisterUser = async (userName: string, email: string, password: string, navigation: any) => {
  let data = JSON.stringify({
    "username": userName,
    "email": email,
    "password": password,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}SignupWithEmailOrPhoneandPassword`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  try {
    const response = await axios.request(config);
    console.log('response', response?.data);
    if (response?.data?.success) {
      navigation.navigate('Otp', { registerUser: true, token: response?.data?.token, email, userName, password })
      ShowToast('success', response?.data?.message);
    } else {
      ShowToast('error', response?.data?.message);
    }
    return response?.data;
  } catch (error) {
    console.log('error', error?.response)
    ShowToast('error', error?.response?.data?.message);
    throw error;
  }
}
const LoginUser = async (email: string, password: string, dispatch: any) => {
  let data = JSON.stringify({
    "email": email,
    "password": password
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}loginWitheEmailAndPassword`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  const response = await dispatch(UserLogin(config));

  // ✅ After successful login — sync with Firestore
  if (response?.payload?.success && response?.payload?.data) {
    await addOrUpdateUserInFirestore(response.payload.data);
    console.log('✅ Firestore user synced successfully');
  }

  return response;

}

const verifyOtp = async (token: string, otp: number, navigation: any, dispatch: any) => {
  let data = JSON.stringify({
    "token": token,
    "otp": otp
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}VerifyOtpAndCreate`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  try {
    const response = await axios.request(config);
    if (response?.data?.success) {
      ShowToast('success', response?.data?.message);
      dispatch(setToken(response?.data?.token));
      dispatch(setUserData(response?.data?.data));
      await addOrUpdateUserInFirestore(response?.data?.data);
      // navigation.navigate('Main', { screen: 'SetLocation' });
    } else {
      ShowToast('error', response?.data?.message)
    }
    return response?.data;
  } catch (error) {
    ShowToast('error', error?.response?.data?.message)
    throw error;
  }
}

const forgotPasswordUser = async (email: string, navigation: any) => {
  let data = JSON.stringify({
    "email": email
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}forgetPasswordOtpUser`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  try {
    const response = await axios.request(config);
    console.log('response', response?.data)
    if (response?.data?.success) {
      ShowToast('success', response?.data?.message);
      navigation.navigate('Otp', { registerUser: false, email })
    } else {
      ShowToast('error', response?.data?.message);
    }
    return response?.data;
  } catch (error) {
    ShowToast('error', error?.response?.data?.message);
    throw error;
  }
}

const verifyForgotPassOtp = async (email: string, otp: number, navigation: any) => {
  let data = JSON.stringify({
    "email": email,
    "Otp": otp
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}verifyOtp`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  try {
    const response = await axios.request(config);
    console.log('response/data', response?.data)
    if (response?.data?.success) {
      ShowToast('success', response?.data?.message);
      navigation.navigate('NewPassword', { email })
    } else {
      ShowToast('error', response?.data?.message);
    }
    return response?.data;
  } catch (error) {
    ShowToast('error', error?.response?.data?.message);
    throw error;
  }
}

const resetPassword = async (email: string, newPass: string, navigation: any) => {
  let data = JSON.stringify({
    "email": email,
    "newPassword": newPass
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}setNewPasswordByUser`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  try {
    const response = await axios.request(config);
    const status = response?.data?.success
    console.log('ress', response?.data);
    ShowToast(status ? 'success' : 'error', response?.data.message);
    if (response?.data?.success) {
      console.log('gff');
      navigation.navigate('SigninWithEmailAndPassword')
    }
    return response?.data;
  } catch (error) {
    ShowToast('error', error?.response?.data?.message);
    throw error;
  }
}

const deleteUser = async (userId: string) => {
  let data = JSON.stringify({
    "userId": userId,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}deleteUser`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    return response?.data;
  } catch (error) {
    throw error;
  }
}

const selectImage = async (source = 'gallery') => {
  try {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    let result;
    if (source === 'camera') {
      result = await launchCamera(options);
    } else {
      result = await launchImageLibrary(options);
    }

    if (result.didCancel) {
      console.log('User cancelled image picker');
      return null;
    } else if (result.errorMessage) {
      console.log('ImagePicker Error: ', result.errorMessage);
      return null;
    } else {
      return result.assets?.[0]?.uri || null;
    }
  } catch (error) {
    console.log('Error selecting image:', error);
    return null;
  }
};

const updateUser = async (
  userId: string,
  username: string,
  image: any,
  longitude: number,
  latitude: number,
  locationName: string,
  phone?: number,
  // navigation: any,
  dispatch: any,
  // stripeCustomerId: string,
) => {
  console.log('phonnne', phone)
  let data = new FormData();
  data.append('userId', userId);
  if (username) {
    data.append('username', username);
  }
  if (image) {
    data.append('image', {
      uri: image,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
  }
  if (longitude) {
    data.append('longitude', longitude);
  }
  if (latitude) {
    data.append('latitude', latitude);
  }
  if (locationName) {
    data.append('locationName', locationName);
  }
  if (phone) {
    data.append('phone', Number(phone));
  }
  console.log('data', data);
  // if (stripeCustomerId) {
  //   data.append('stripeCustomerId', stripeCustomerId);
  // }
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}updateUserById`,
    headers: {
      'Content-Type': 'multipart/form-data',
      // Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    console.log('Post Response:', response.data);
    if (response.data.success) {
      ShowToast('success', response.data.message);
      dispatch(setUserData(response.data?.data));
      await addOrUpdateUserInFirestore(response?.data?.data);

    } else {
      ShowToast('error', response.data.message);
    }
    return response.data;
  } catch (error) {
    ShowToast('error', error.response.data.message);
    console.error(
      'Error creating post:',
      error?.response
    );
    console.error(
      'Error creating post:',
      error?.response?.data?.message || error.message,
    );
    throw error;
  }
};


const getAllCategories = async () => {
  let data = '';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}getAllCategories`,
    headers: {},
    data: data
  };
  try {
    const response = await axios.request(config);
    if (!response?.data?.success) {
      ShowToast('error', response?.data?.message);
    }
    return response?.data;
  } catch (error) {
    ShowToast('error', error?.response?.data?.message);
    throw error;
  }
}

const getNearbySalons = async (lat: number, lng: number, categoryId: string) => {
  let data = '';
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}getSalons?bLongitude=${lng}&bLatitude=${lat}&categoryId=${categoryId}`,
    headers: {},
    data: data
  };
  console.log('config', config)
  try {
    const response = await axios.request(config);
    // if (!response?.data?.success) {
    //   ShowToast('error', response?.data?.message);
    // }
    return response?.data;
  } catch (error) {
    ShowToast('error', error?.response?.data?.message);
    throw error;
  }
}

const getSalonById = async (salonId: string) => {
  let data = '';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}getAdminById?salonId=${salonId}`,
    headers: {},
    data: data
  };
  try {
    const response = await axios.request(config);
    return response?.data;
  } catch (error) {
    throw error;
  }
}

const addOrRemoveFvrts = async (userId: string, salonId: string, dispatch: any) => {
  let data = JSON.stringify({
    "userId": userId,
    "salonId": salonId
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}addFavouriteSalon`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  try {
    const response = await axios.request(config);
    console.log('response.daaaaa', response?.data)
    if (response?.data?.success) {
      dispatch(setUserData(response?.data?.user))
      await dispatch(fetchFavSalons({ userId: userId }));
    } else {
      ShowToast('error', response?.data?.message);
    }
    return response?.data
  } catch (error) {
    console.log('error', error?.response)
    ShowToast('error', error?.response?.data?.message);
    throw error;
  }
}

const getFvrtSalons = async (userId: string) => {
  let data = '';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}getAllFavSalonByUserId?userId=${userId}`,
    headers: {},
    data: data
  };
  try {
    const response = await axios.request(config);
    return response?.data
  } catch (error) {
    throw error;
  }
}

const getAllProducts = async (categoryId: string) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}getAllProductsBySalonId?categoryId=${categoryId}`,
    headers: {}
  };
  try {
    const response = await axios.request(config);
    console.log('resss', response?.data)
    return response?.data;
  } catch (error) {
    throw error;
  }
}

const getStylistByServiceId = async (serviceId: string) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}getServiceById?id=${serviceId}`,
    headers: {}
  };
  try {
    const response = await axios.request(config);
    return response?.data;
  } catch (error) {
    throw error;
  }
}

const getServicesByStylistId = async (salonId: string, technicianId: string) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}getStylistsServices?salonId=${salonId}&technicianId=${technicianId}`,
    headers: {}
  };
  try {
    const response = await axios.request(config);
    console.log('resssponse.dattttttttta', response.data)
    return response?.data;
  } catch (error) {
    throw error
  }
}

const getTimeSlotsByDate = async (stylistId: string, date: string) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}getStylistsById?id=${stylistId}&date=${date}`,
    headers: {}
  };
  try {
    const response = await axios.request(config);
    return response?.data;
  } catch (error) {
    throw error;
  }
}

const getTimeSlotsByDateAndStylistId = async (stylistId: string, date: string) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}getStylistsById?id=${stylistId}&date=${date}`,
    headers: {}
  };
  try {
    const response = await axios.request(config);
    return response?.data;
  } catch (error) {
    throw error;
  }
}

const createAppointment = async (userId: string, salonId: string, serviceId: string, technicianId: string, date: string, time: string, amount: Number) => {
  let data = JSON.stringify({
    "userId": userId,
    "salonId": salonId,
    "serviceId": serviceId,
    "technicianId": technicianId,
    "date": date,
    "time": time,
    "totalAmount": amount
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}createBooking`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  try {
    const response = await axios.request(config);
    console.log('response.datafsdfkjdfs', response?.data)
    if (!response?.data?.success) {
      ShowToast('error', response.data.message)
    }
    return response?.data;
  } catch (error) {
    ShowToast('error', error?.response?.data?.message)
    throw error;
  }
}

const createProductOrder = async (userId: string, salonId: string, product: { productId: string; quantity: number }[], date: string, subTotal: number) => {

  let data = JSON.stringify({
    "userId": userId,
    "salonId": salonId,
    "product": product,
    "date": date,
    "subTotal": subTotal
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}createOrder`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  try {
    const response = await axios.request(config);
    return response?.data;
  } catch (error) {
    ShowToast('error', error?.response?.data?.message);
    throw error;
  }
}

const getAllOrdersByUserId = async (userId: string, status: string) => {
  let data = '';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}getAllOrders?userId=${userId}&status=${status}`,
    headers: {},
    data: data
  };
  try {
    const response = await axios.request(config);
    return response?.data
  } catch (error) {
    throw error;
  }

}

const getAllBookingsByUserId = async (userId: string, status: string) => {
  let data = '';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}getBookingsByUserIdAndStatus?userId=${userId}&status=${status}`,
    headers: {},
    data: data
  };
  try {
    const response = await axios.request(config);
    console.log('rerrerr', response?.data)
    return response?.data;
  } catch (error) {
    throw error;
  }
}
const getAllProductsOrdersByStatus = async (userId: string, status: string) => {
  let data = '';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}getAllOrders?userId=${userId}&status=${status}`,
    headers: {},
    data: data
  };
  try {
    const response = await axios.request(config);
    return response?.data;
  } catch (error) {
    throw error;
  }
}
const getAllAppointmentsByStatus = async (userId: string, status: string) => {
  let data = '';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}getBookingsByUserIdAndStatus?userId=${userId}&status=${status}`,
    headers: {},
    data: data
  };
  try {
    const response = await axios.request(config);
    return response?.data;
  } catch (error) {
    throw error;
  }
}

const fetchAllProducts = async () => {
  let data = '';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}getAllProductsBySalonId`,
    headers: {},
    data: data
  };
  try {
    const response = await axios.request(config);
    if (!response?.data?.success) {
      ShowToast('error', response?.data?.message)
    }
    return response?.data;
  } catch (error) {
    throw error;
  }
}
const cancelBookingByUser = async (bookingId: string) => {
  let data = JSON.stringify({
    "bookingId": bookingId,
    "status": "Canceled",
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}updateBookingStatusByUser`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  try {
    const response = await axios.request(config);
    return response?.data;
  } catch (error) {
    throw error;
  }
}

const addReview = async (
  productId: string,
  salonId: string,
  userId: string,
  stars: number,
  msg: string,
  ratingToSalon: boolean,
) => {
  // compute dynamic key name and value
  const key = ratingToSalon ? 'salonId' : 'productId';
  const value = ratingToSalon ? salonId : productId;

  const data = JSON.stringify({
    [key]: value,
    userId,
    stars,
    message: msg,
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BaseUrl}${ratingToSalon ? 'giveRatingToSalon' : 'giveRatingToProduct'}`,
    headers: { 'Content-Type': 'application/json' },
    data,
  };

  try {
    const response = await axios.request(config);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

const getReviewsBySalonId = async (salonId: string) => {
  let data = '';
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}getRatingBySalonOrStar?salonId=${salonId}`,
    headers: {},
    data: data
  };
  try {
    const response = await axios.request(config);
    // if (!response?.data?.success) {
    //   ShowToast('error', response?.data?.message);
    // }
    return response?.data;
  } catch (error) {
    ShowToast('error', error?.response?.data?.message);
    throw error;
  }
}

const getReviewsByProductId = async (productId: string) => {
  let data = '';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BaseUrl}getRatingByProductOrStar?productId=${productId}`,
    headers: {},
    data: data
  };
  try {
    const response = await axios.request(config);
    // if (!response?.data?.success) {
    //   ShowToast('error', response?.data?.message);
    // }
    return response?.data;
  } catch (error) {
    ShowToast('error', error?.response?.data?.message);
    throw error;
  }
}
export { RegisterUser, LoginUser, verifyOtp, getReviewsBySalonId, getReviewsByProductId, addReview, forgotPasswordUser, fetchAllProducts, verifyForgotPassOtp, resetPassword, deleteUser, ShowToast, updateUser, selectImage, getAllCategories, getNearbySalons, getSalonById, addOrRemoveFvrts, getFvrtSalons, getAllProducts, getStylistByServiceId, getServicesByStylistId, getTimeSlotsByDate, getTimeSlotsByDateAndStylistId, createAppointment, createProductOrder, getAllBookingsByUserId, getAllOrdersByUserId, getAllAppointmentsByStatus, getAllProductsOrdersByStatus, cancelBookingByUser }