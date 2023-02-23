
import './App.css';
import Home from './Components/Home';
import {Product} from './Components/Product';
import {Category} from './Components/Category';
import {Order} from './Components/Order';
import {OrderDetail} from './Components/OrderDetail';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className='d-flex justify-content-center m-3'>
        Invoices Management 
      </h3>
      <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
        <ul className='navbar-nav'>
          <li className='nav-item- m-1'>
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
            </NavLink>
          </li>

          <li className='nav-item- m-1'>
            <NavLink className="btn btn-light btn-outline-primary" to="/category">
              Category
            </NavLink>
          </li>

          <li className='nav-item- m-1'>
            <NavLink className="btn btn-light btn-outline-primary" to="/product">
              Product
            </NavLink>
          </li>

          <li className='nav-item- m-1'>
            <NavLink className="btn btn-light btn-outline-primary" to="/order">
              Order
            </NavLink>
          </li>

          <li className='nav-item- m-1'>
            <NavLink className="btn btn-light btn-outline-primary" to="/orderdetail">
              OrderDetail
            </NavLink>
          </li>

        
        </ul>
      </nav>
     
     <Routes>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/category' element={<Category/>}></Route>
      <Route path='/product' element={<Product/>}></Route>
      <Route path='/order' element={<Order/>}></Route>
      <Route path='/orderdetail' element={<OrderDetail/>}></Route>
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
