import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import BookCard from "../components/card";
const OrdersPage = () => {

const firebase = useFirebase();
const [books,setBooks]= useState([]);


useEffect( () =>{
  if (firebase.isLoggedIn )
    firebase.fetchMyBooks(firebase.user.uid)?.then( (books) =>{
      //  console.log(books.docs[0].data()); 
    setBooks(books.docs);
    } );
},[firebase] );

// console.log(books);

  if(!firebase.isLoggedIn )  return <h1>Please Login</h1>
    return (
      <div>
        {books.map((book) => (
            <BookCard  link={`/book/orders/${book.id}`} key={book.id} id={book.id} {...book.data()} ></BookCard>
        )  )}
     </div>

);
}

export default OrdersPage;