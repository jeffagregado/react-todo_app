import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBFvpmyi7QGqUga_oIa9ycbTD3p4oVVirQ",
  authDomain: "todo-app-cp-374bb.firebaseapp.com",
  databaseURL: "https://todo-app-cp-374bb.firebaseio.com",
  projectId: "todo-app-cp-374bb",
  storageBucket: "todo-app-cp-374bb.appspot.com",
  messagingSenderId: "489473425403",
  appId: "1:489473425403:web:8dd4ca1c9184c2cb99555e",
  measurementId: "G-KG8L41YC8M",
});

const db = firebaseApp.firestore();

export default db;
