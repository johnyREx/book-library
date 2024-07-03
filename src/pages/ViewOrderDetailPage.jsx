import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";


const ViewOrderDetails =  () => {

const params = useParams();
// console.log(params);

const firebase = useFirebase();
const [orders, setOrders] = useState([]);

useEffect( ()=> {
    firebase
    .getOrders(params.bookId)
    .then( (orders) => {
        // console.log(orders.docs)
        setOrders(orders.docs);
    }
    );
    
}
,[] )

return (

<div className="container mt-3">
    <h1>Orders</h1>
     { 
  
     orders.map( (order) => {
        const  data = order.data();
        return <div  key={order.id}
        className="mt-5"
        style={{ border : "1px solid" , padding :"10px" }}
        > 
            <h4>Order By : {data.displayName}</h4>
            <h4>Quantity : {data.quantity}  </h4>
            <p>Email :  {data.userEmail}</p>
             </div>
     }) 
     
     }

</div>


);



};

export default ViewOrderDetails;