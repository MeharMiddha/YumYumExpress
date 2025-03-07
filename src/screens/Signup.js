import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Signup() {
    // we will change the value of first using setfirst without reloading the first
    const [credentials,setcredentials] = useState({name:"",email:"",password:"",geolocation:""});
    let navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser",{
            method:'POST',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation}),
        });
        const json = await response.json();
        console.log(json);
        if(!json.success){
            alert("Enter Valid Credentials");
        }
        if(json.success){
            navigate("/login")
        }
    };

    const onChange = (event) => {
        setcredentials({...credentials,[event.target.name]:event.target.value});
    }

  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
    <div>
        <Navbar />
    </div>
        <div className="container">
            <form onSubmit={handleSubmit} className='w-50 m-auto mt-5 border bg-dark  rounded' >
                <div className='m-3'>
                    <label htmlFor="name" className='form-label text-white'>
                    Name
                    </label>
                    <input type="text" className='form-control' name='name' value={credentials.name} onChange={onChange} />
                </div>
                <div className="m-3">
                    <label htmlFor="geolocation" className="form-label text-white">Address</label>
                    <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange}/>
                </div>
                <div className='m-3'>
                    <label htmlFor="exampleInputEmail1" className='form-label text-white'>Email Address</label>
                    <input type="email" className='form-control' name='email' value={credentials.email} onChange={onChange} id='exampleInputEmail1' aria-describedby='emailHelp'/>
                    <div id="emailHelp" className="form-text">We'll never share you email with anyone else.</div>
                </div>
                <div className="m-3">
                    <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                </div>
                <button className="m-3 btn text-white" type='submit' style={{backgroundColor:'#ed8936'}}>Submit</button>
                <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
            </form>
        </div>
    </div>
  );
}

