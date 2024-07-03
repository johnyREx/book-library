import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
 
} from "firebase/auth";

import { getFirestore, collection, addDoc, getDocs, doc , getDoc , query , where , } from "firebase/firestore";
import { getStorage, ref, uploadBytes , getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);
// Creating hook to use the context in app.js file
export const useFirebase = () => useContext(FirebaseContext);

// Code from firebase web app
const firebaseConfig = {
    apiKey: "AIzaSyAdG7nlr9kWP3IKs8DRJB8ECybiiaEP1dY",
    authDomain: "book-library-e07c3.firebaseapp.com",
    projectId: "book-library-e07c3",
    storageBucket: "book-library-e07c3.appspot.com",
    messagingSenderId: "671600463935",
    appId: "1:671600463935:web:6bf66ba79e01363551688a",
    measurementId: "G-VK9D8WDVY6"
};
const firebaseApp = initializeApp(firebaseConfig);

//To Regiter user with Firebase app Authentication.
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  //To check the auth state change : loggedIn or LoggedOut
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      // console.log(user)
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const isLoggedIn = user ? true : false;

  //1 Register :  Making function for the Registering User with Email and Password.
  const signupUserWithEmailAndPassword = (email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  //2.Login  Making function to login user with Email and password

  const signinUserWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  //3. Login with Google
  const signInWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider);
  };


 // console.log(user);
  //4. To Connect Database and save Books data
  const handleCreateNewListing = async (name, isbn, price, cover) => {
    //upload the cover photo in firebase storage
    const imageRef = ref(storage, `upload/images/${Date.now()}-${cover.name}`);
    const uploadResult = await uploadBytes(imageRef, cover);
    //put this in firebastore using collection and addDoc of firestore
    return await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      imageURL: uploadResult.ref.fullPath,
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };


// 5. Getting all documents to display . 
const listAllBooks =  () => {
    return  getDocs(collection(firestore, 'books'));
}

// 6.Method for Rendering the image . Along with Books details.
const getImageUrl = (path) =>{
  return getDownloadURL(ref(storage,path));
}


// 7. To Fetch the Full Details of the Book 
const getBookById =   async (id) =>{
  const docRef = doc (firestore , 'books', id );
  const result = await getDoc(docRef);
  return result;
}


// 8. To save order in the books (adding collections inside the book document , when buy Now button is clicked. )
const placeOrder = async (bookId , quantity) => {

  const collectionRef= collection(firestore , 'books' , bookId , 'orders')   //giving the path to make coll in Firebase  books/123/orders/
  const result = await addDoc(collectionRef , {
    userId: user.uid,
    userEmail: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    quantity: Number(quantity),
  });
  return result;
};

//9.This Function is to fetch the books of particular user and then dislplay the orderrr he got.
const fetchMyBooks = async (userId) => {

 
  
  const collectionRef = collection(firestore, "books");
  const q = query(collectionRef , where("userId","==", userId)) ;

  

  const result = await getDocs(q);
  // console.log(result)
  return result
}

// 10. Making function to get the Details of Orderr of Particular Id Book
const getOrders  = async(bookId) => {
  const collectionRef = collection(firestore,'books',bookId,'orders');
  const result = await getDocs(collectionRef);
  // console.log("Get Orders " , result)
  return result;
}



  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signInWithGoogle,
        handleCreateNewListing,
        listAllBooks,
        getImageUrl,
        getBookById,
        placeOrder,
        fetchMyBooks,
        isLoggedIn,
        user,
        getOrders,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};