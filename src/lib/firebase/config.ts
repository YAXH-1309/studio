
// IMPORTANT: REPLACE ALL PLACEHOLDER VALUES BELOW WITH YOUR ACTUAL FIREBASE PROJECT CONFIGURATION.
// You can find these details in your Firebase project settings:
// Project settings > General > Your apps > Web app > Firebase SDK snippet > Config
//
//FAILURE TO REPLACE THESE PLACEHOLDERS (LIKE "YOUR_PROJECT_ID", "YOUR_API_KEY", ETC.)
// WILL RESULT IN PERMISSION DENIED ERRORS AND YOUR APP WILL NOT CONNECT TO FIREBASE.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // REPLACE THIS
  authDomain: "YOUR_AUTH_DOMAIN", // REPLACE THIS
  projectId: "YOUR_PROJECT_ID", // REPLACE THIS - The error "Permission denied on resource project YOUR_PROJECT_ID" means this is still a placeholder.
  storageBucket: "YOUR_STORAGE_BUCKET", // REPLACE THIS
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // REPLACE THIS
  appId: "YOUR_APP_ID", // REPLACE THIS
  measurementId: "YOUR_MEASUREMENT_ID" // Optional, REPLACE if you use Analytics
};

export default firebaseConfig;
