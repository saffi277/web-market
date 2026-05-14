// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-RFVGky1poJ5ko3se6iDJPSD_LQ1otTA",
  authDomain: "zawan-website.firebaseapp.com",
  projectId: "zawan-website",
  storageBucket: "zawan-website.firebasestorage.app",
  messagingSenderId: "62985963332",
  appId: "1:62985963332:web:26c65a1fd7ebd1b839f911",
  measurementId: "G-5QX9K11CWH"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
