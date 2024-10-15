// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_PwhZel3pOA68UhKGIvbegQT3VpkdtPQ",
    authDomain: "csse-healthcare.firebaseapp.com",
    projectId: "csse-healthcare",
    storageBucket: "csse-healthcare.appspot.com",
    messagingSenderId: "236279470828",
    appId: "1:236279470828:web:766082024cbe7a6411a3c9",
    measurementId: "G-WL3NYZW54R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth, analytics };
