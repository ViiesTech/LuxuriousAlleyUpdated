import { getFirestore, doc, getDoc, setDoc, updateDoc, serverTimestamp } from '@react-native-firebase/firestore';

export const addOrUpdateUserInFirestore = async userData => {
  try {
    console.log('📝 Saving user to Firestore with data:', userData);
    
    if (!userData?._id) {
      console.log('❌ No user ID provided');
      return;
    }

    const db = getFirestore();
    const userRef = doc(db, 'users', userData._id);
    const userDoc = await getDoc(userRef);

    // Create complete user payload
    const userPayload = {
      _id: String(userData._id || ''),
      username: String(userData.username || ''),
      email: String(userData.email || ''),
      image: userData.image || null,
      lastSeen: serverTimestamp(),
    };

    console.log('📦 User payload to save:', userPayload);

    if (userDoc.exists()) {
      console.log('🔄 Updating existing user in Firestore...');
      await updateDoc(userRef, userPayload);
      console.log('✅ Firestore user updated:', userData._id);
    } else {
      console.log('🆕 Creating new user in Firestore...');
      await setDoc(userRef, {
        ...userPayload,
        createdAt: serverTimestamp(),
      });
      console.log('✅ Firestore user created:', userData._id);
    }

    // Verify the save worked
    const updatedDoc = await getDoc(userRef);
    console.log('✅ Verification - User document after save:', updatedDoc.data());
    
  } catch (error) {
    console.log('🔥 Firestore user sync error:', error);
    console.log('🔍 Error details:', {
      message: error.message,
      code: error.code
    });
  }
};