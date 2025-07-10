// import { initializeApp } from 'firebase/app';
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyA40jWRV6Pgh3z7tEnMEgFKfImJW7NXSMc",
//   authDomain: "authcheck-57f6f.firebaseapp.com",
//   databaseURL: "https://authcheck-57f6f-default-rtdb.firebaseio.com",
//   projectId: "authcheck-57f6f",
//   storageBucket: "authcheck-57f6f.firebasestorage.app",
//   messagingSenderId: "680221490837",
//   appId: "1:680221490837:web:c76c00eb9c0a35ffbd259c",
//   measurementId: "G-BC9ZJ1HQ4W"
// };

// // const firebaseConfig = {
// //   apiKey: "AIzaSyBlj1GUGTM22h0-qGayhta1xb0P0UAA5GA",
// //   authDomain: "bhok-metau.firebaseapp.com",
// //   projectId: "bhok-metau",
// //   storageBucket: "bhok-metau.appspot.com",
// //   messagingSenderId: "605607847658",
// //   appId: "1:605607847658:web:8f771fdeccea8bcdf6d993",
// //   measurementId: "G-2WCWZ29BS0"
// // };

// const app = initializeApp(firebaseConfig);

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage)
// });

// export { auth };

// firebase.js


import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA40jWRV6Pgh3z7tEnMEgFKfImJW7NXSMc",
  authDomain: "authcheck-57f6f.firebaseapp.com",
  databaseURL: "https://authcheck-57f6f-default-rtdb.firebaseio.com",
  projectId: "authcheck-57f6f",
  storageBucket: "authcheck-57f6f.firebasestorage.app",
  messagingSenderId: "680221490837",
  appId: "1:680221490837:web:c76c00eb9c0a35ffbd259c",
  measurementId: "G-BC9ZJ1HQ4W"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app); // ✅ CORRECTLY create Firestore instance

export { auth, db };

// import { initializeApp } from 'firebase/app';
// import {
//   initializeAuth,
//   getReactNativePersistence
// } from 'firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { initializeFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyA40jWRV6Pgh3z7tEnMEgFKfImJW7NXSMc",
//   authDomain: "authcheck-57f6f.firebaseapp.com",
//   databaseURL: "https://authcheck-57f6f-default-rtdb.firebaseio.com",
//   projectId: "authcheck-57f6f",
//   storageBucket: "authcheck-57f6f.firebasestorage.app",
//   messagingSenderId: "680221490837",
//   appId: "1:680221490837:web:c76c00eb9c0a35ffbd259c",
//   measurementId: "G-BC9ZJ1HQ4W"
// };

// const app = initializeApp(firebaseConfig);

// // ✅ Persistent auth using AsyncStorage
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

// // ✅ Use long polling for Firestore if using Expo/Android
// const db = initializeFirestore(app, {
//   experimentalForceLongPolling: true,
// });

// export { auth, db };


