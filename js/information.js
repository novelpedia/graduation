var firebaseConfig = {
    apiKey: "AIzaSyDkGeh_PXavAP0-dIgNoMTpxYftAmBUvhs",
    authDomain: "novelpedia2223-2ce3c.firebaseapp.com",
    projectId: "novelpedia2223-2ce3c",
    storageBucket: "novelpedia2223-2ce3c.appspot.com",
    messagingSenderId: "693960594059",
    appId: "1:791349138937:web:e8dd1af3750611fc3b9928"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebaseEmailAuth = firebase.auth();


const db = firebase.firestore();