import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from './ContextReducer';

export default function Navbar(props) {

    let data = useCart();

    const[cartView, setCartView] = useState(false);
    localStorage.setItem('temp',"first");
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }
    const loadCart = () => {
        setCartView(true);
    }


  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light position-sticky">
            <div className="container-fluid">
                <Link className="navbar-brand fs-1 fst-italic" to="/">YumYumExpress</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav me-auto mb-2 mb-lg-0">
                            <Link className="nav-link active fs-5 mx-3 active" aria-current="page" to="/">Home</Link>

                        {(localStorage.getItem("authToken")) ?
                            <Link className="nav-link active fs-5 mx-3 active" aria-current="page" to="/myOrder">My Orders</Link>
                        : ""}
                    </div>
                    {(!localStorage.getItem("authToken")) ?
                    <div className='d-flex'>
                        <Link className="btn bg-danger text-white mx-1" to="/login">Login</Link>
                        <Link className="btn bg-danger text-white mx-1" to="/createuser">SignUp</Link>
                    </div>
                    : 
                    <div>
                        <div className='btn bg-danger text-white mx-2' onClick={loadCart}>
                            My Cart {" "}
                            <Badge pill bg="white" text='danger'> { data.length } </Badge>
                        </div>
                        {cartView? <Modal onClose={()=>setCartView(false)}><Cart /></Modal>:""}
                        <div className='btn bg-danger text-white mx-2' onClick={handleLogout}>
                            Logout
                        </div>
                    </div>
                    }
                </div>
            </div>
        </nav>
    </div>
  )
}
