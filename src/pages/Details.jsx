import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const BookDetailsPage = () => {
  // const params = useParams();
  // console.log(params)

  const firebase = useFirebase();
  const params = useParams();
  const [url, setURL] = useState(null);

  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => {
      // console.log(value.data())
      setData(value.data());
    });
  }, []);

  //   This useEffect is to render the image , when data is present.
  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL; //First fetching url value from data object, then downloiading image and setting to url variable.
      firebase.getImageUrl(imageURL).then((url) => {
        setURL(url);
      });
    }
  }, [data]);

  if (data == null) return <h1 className="text-center">Loading Data ..</h1>;

  const placeorder = async() => {
    const result = await firebase.placeOrder(params.bookId, quantity);
    console.log("order Placed " , result)
  }



  return (
    <div className="container m-5 p-5 ">
      <h1>{data.name}</h1>
      <img
        src={url}
        width="50%"
        style={{ borderRadius: "10px" }}
        alt="Loading Image"
      ></img>

      <h1>Details</h1>
      <h4>Price : Rs {data.price}</h4>
      <h4>ISBN Number : {data.isbn} </h4>
      <h1>Owner Details </h1>
      <h4>Name : {data.displayName} </h4>
      <h4>Email : {data.userEmail} </h4>

      <Form.Group className="mb-3" controlId="fromBasicPassword">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
          type="Number"
          placeholder="Password"
        />
      </Form.Group>

      <Button onClick={placeorder} variant="success">BUY NOW</Button>
    </div>
  );
};

export default BookDetailsPage;