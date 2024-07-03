import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from "../context/firebase";

const ListingPage = () => {

const firebase = useFirebase();

  const [name, setName]=useState('');
  const [isbnNumber,setIsbnNumber]=useState('');
  const [price, setPrice]=useState('');
  const [coverPic,setCoverPic]=useState('');


  const handleSubmit = async (e) => {
    console.log("Wait Adding Book to Database ... ")  
    e.preventDefault();
   await firebase.handleCreateNewListing(name,isbnNumber,price,coverPic);
console.log("Book added Successfully")  
}



    return (
        <div className="container">
          <h1 className='mb-3'>Books of User </h1>
        <Form  onSubmit={handleSubmit} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Book Name</Form.Label>
          <Form.Control 
          type="text"
          onChange={(e)=> setName(e.target.value)}
          value={name}
          placeholder="Enter Book Name" />
          
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN</Form.Label>
          <Form.Control 
          type="text" 
          onChange={(e)=> setIsbnNumber(e.target.value)  }
          value={isbnNumber}
          placeholder="ISBN  Number" />
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control 
          type="number" 
          onChange={(e)=> setPrice(e.target.value)  }
          value={price}
          placeholder="Enter Price" />
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cover Picture</Form.Label>
          <Form.Control 
          type="file" 
          onChange={(e)=> setCoverPic(e.target.files[0])  }
          
          placeholder="Select Picture" />
        </Form.Group>

      <div className="text-center">
        <Button  variant="primary" type="submit">
       Add Book
        </Button>
        </div>
      </Form>
      
     
      
      
      
        </div>
        );


}


export default ListingPage;