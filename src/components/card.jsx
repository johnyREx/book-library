import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

import { useFirebase } from "../context/firebase";

const BookCard = (props) =>{

  const navigate = useNavigate();
  const firebase = useFirebase();
 const [url, setURL] = useState(null);

 useEffect(  () =>{
 firebase.getImageUrl(props.imageURL).then( (url) => setURL(url) );
 },[] );

//  console.log(props)   : To check is id comming when click View Button.
  return  (
    <Card style={{ width: '18rem' , margin:'25px' }}>
    <Card.Img variant="top" src={url} />
    <Card.Body>
      <Card.Title>{props.name} </Card.Title>
      <Card.Text>
      This Book has a  {props.title}   title and Sold by {props.displayName} .
       The Cost of book is  {props.price}
      </Card.Text>
      <Button variant="primary"
        //      onClick=  { e  => navigate(`/book/view/${props.id}`) }   latter changed it 
      onClick=  { e  => navigate(props.link) }
      > View </Button>
    </Card.Body>
  </Card>
  )
};

export default BookCard;