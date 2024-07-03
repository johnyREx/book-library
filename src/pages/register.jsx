import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//Using hook to access the funtion to register user.
import { useFirebase } from '../context/firebase';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {

   const firebase = useFirebase();
   console.log(firebase);    //It will contain the method signupuserwithEmailAndPassword as sent from the App.js in UserProvider values ={{}}

   const [email,setEmail]=useState('');
   const[password,setPassword]=useState('');


   const navigate = useNavigate();
   useEffect( () => {
    if(firebase.isLoggedIn){
        //navigate to home page
        navigate("/");
    }
    // else show the login Page 
   } 
   , [firebase,navigate] );

   const handleSubmit = async(e) =>{
    e.preventDefault();
   console.log("Registering the user ")
    const result =  await firebase.signupUserWithEmailAndPassword(email,password);
    console.log("Successful Regiseted " , result);
   };

    return (
  <div className="container">
    <h1>Register User </h1>
  <Form  onSubmit={handleSubmit} >
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email"
    onChange={(e)=> setEmail(e.target.value)}
    value={email}
    placeholder="Enter email" />
    
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" 
    onChange={(e)=> setPassword(e.target.value)  }
    value={password}
    placeholder="Password" />
  </Form.Group>

<div className="text-center">
  <Button  variant="primary" type="submit">
    Create User
  </Button>
  </div>
</Form>
  </div>
  );
}

export default RegisterPage ;