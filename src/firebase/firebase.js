import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnZC_enlHds5Vw-2s45IRhMPbM3gMwCa4",
  authDomain: "shop-admin-c83eb.firebaseapp.com",
  projectId: "shop-admin-c83eb",
  storageBucket: "shop-admin-c83eb.appspot.com",
  messagingSenderId: "894293111324",
  appId: "1:894293111324:web:484f56d65488e39f4425d9",
  measurementId: "G-06GN1LFQMB",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
