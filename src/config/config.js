export const firebaseConfig = {
  apiKey: process.env.APIKEY_FIREBASE,
  authDomain: process.env.FIREBASE_PROJECT_ID + ".firebaseapp.com",
  databaseURL: "https://" + process.env.FIREBASE_PROJECT_ID + ".firebaseio.com",
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_PROJECT_ID + ".appspot.com",
  messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
  appID: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MESUREMENT_ID,
};
