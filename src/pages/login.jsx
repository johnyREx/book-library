import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//Using hook to access the funtion to register user.
import { useFirebase } from '../context/firebase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {

    const navigate = useNavigate();
   const firebase = useFirebase();
   console.log(firebase);    //It will contain the method signupuserwithEmailAndPassword as sent from the App.js in UserProvider values ={{}}

   const [email,setEmail]=useState('');
   const[password,setPassword]=useState('');

 
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
   console.log("Logging In the user ")
    const result =  await firebase.signinUserWithEmailAndPassword(email,password);
    console.log("Successful LoggedIn " , result);
     };

    return (
  <div className="container">
    <h1 className='mb-3'>Log in User</h1>
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
   Log In
  </Button>
  </div>
</Form>

{/* Alternate google Signin Option  */}
<div className="text-center">
  <h3 className="my-3">OR</h3>
  <Button variant='warning'
  onClick={firebase.signInWithGoogle}
  >Sign In With Google</Button>
  </div>



  </div>
  );
}

export default LoginPage ;