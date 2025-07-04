
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyBrhPYvef_YZbISHxWeZL0MuQVAQYtTN4M",
  authDomain: "nomago-bikes-portal-f33da.firebaseapp.com",
  projectId: "nomago-bikes-portal-f33da",
  storageBucket: "nomago-bikes-portal-f33da.appspot.com",
  messagingSenderId: "647987655592",
  appId: "1:647987655592:web:7731d4ca344ce804bdc96d",
  measurementId: "G-D1CBD3V7ZV"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Prejeto ozadno sporočilo:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/android-chrome-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
