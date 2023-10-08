import { initializeApp } from "firebase/app";
import {
  getStorage, // Make sure you import getStorage
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDG-mIBKhsu_mPDqaaukpcXh0eJbq9a8uM",
  authDomain: "group-bio.firebaseapp.com",
  projectId: "group-bio",
  storageBucket: "group-bio.appspot.com",
  messagingSenderId: "841094275904",
  appId: "1:841094275904:web:a6e5bc3d49eedadb05d0a5",
  measurementId: "G-XH98C61KD6",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app); // Define the storage object

export { storage };
