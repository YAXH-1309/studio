// IMPORTANT: Some values below are derived from the Android google-services.json-like structure you provided.
// Ensure you have the correct WEB APP configuration from your Firebase project settings.
// Go to: Firebase console > Project settings > General > Your apps > Select your WEB APP > Firebase SDK snippet > Config
//
// FAILURE TO USE THE CORRECT WEB APP CONFIG (ESPECIALLY appId) WILL LIKELY CAUSE ISSUES.
const firebaseConfig = {
  apiKey: "AIzaSyDMgBHZK77X1j73u_YaOBGH0Tug-fLxTJ8", // From client[0].api_key[0].current_key
  authDomain: "erpsystem-836e6.firebaseapp.com", // Derived: project_info.project_id + ".firebaseapp.com"
  projectId: "erpsystem-836e6", // From project_info.project_id
  storageBucket: "erpsystem-836e6.firebasestorage.app", // From project_info.storage_bucket
  messagingSenderId: "355827975506", // From project_info.project_number
  // IMPORTANT: The 'appId' below IS A PLACEHOLDER.
  // You MUST replace it with the 'appId' from your Firebase project's WEB APP configuration.
  // The 'mobilesdk_app_id' in the JSON you provided (1:355827975506:android:...) is for an ANDROID app, NOT for your web app.
  // Get your web appId from: Firebase console > Project Settings > General > Your apps > Web app > App ID.
  appId: "YOUR_WEB_APP_ID_FROM_FIREBASE_CONSOLE",
  // Optional: If you use Google Analytics for Firebase, get this from your WEB APP configuration as well.
  measurementId: "YOUR_MEASUREMENT_ID_FROM_FIREBASE_CONSOLE"
};

export default firebaseConfig;
