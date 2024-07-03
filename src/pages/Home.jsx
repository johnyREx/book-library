import React   from "react";
import { useEffect , useState } from "react";
import { useFirebase } from "../context/firebase";
import BookCard from "../components/card";
import { Card, CardGroup } from "react-bootstrap";


const HomePage= () => {

 
  const [books, setBooks]=useState([]);


  const firebase = useFirebase();
 
  useEffect( ()=>{
       firebase.listAllBooks().then( (books) => {
      // console.log(books.docs[0].data())
      setBooks(books.docs)
    });
  },[] )


    return (
       <div className="container mt-5">
        <h3  className="my-3">List of All Books </h3>
        <CardGroup>
        {   books.map( (book) => ( 
        <BookCard   link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()}  /> )  )}
      </CardGroup>
      </div>
    )
    
};


export default HomePage;
