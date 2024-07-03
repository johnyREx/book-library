//CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import {Button} from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';

//PAGES
import RegisterPage from './pages/register';
import  LoginPage from './pages/login';
import HomePage from './pages/Home'
import MyNavbar from './components/navbar';
import ListingPage from './pages/List';
import BookDetailsPage from './pages/Details';
import OrdersPage from './pages/ViewOrder';
import ViewOrderDetails from './pages/ViewOrderDetailPage';


function App() {
  return (
   <div>

<MyNavbar></MyNavbar>

   <Routes>
 <Route  path="/"  element={<HomePage />}  />
 <Route  path="/register"  element={<RegisterPage /> }  />
 <Route  path="/login"  element={<LoginPage />}  />
 <Route  path="/book/list"  element={<ListingPage /> }  />
 <Route  path="/book/view/:bookId"  element={<BookDetailsPage /> }  />
 <Route  path="/book/order"  element={<OrdersPage /> }  />
 <Route  path="/book/orders/:bookId"  element={<ViewOrderDetails /> }  />
  
  </Routes>
  </div>
)}

export default App;