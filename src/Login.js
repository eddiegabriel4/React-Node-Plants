
import './SignUp.css';
import './Home.css'
import axios from 'axios';
import { useState, useEffect } from "react";
import{useNavigate} from 'react-router-dom'
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FiMail } from "react-icons/fi";
import { FiKey } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";

const Login=()=> {
    let navigate = useNavigate();

    const [user,setUser] = useState({email:'', password:''})

    const handleChange=(e)=> {
        setUser({...user, [e.target.name]: e.target.value});
    }

    useEffect(()=> {
        var auth = localStorage.getItem('first_name');
    })

    const submitForm=(e)=>{
        e.preventDefault();
        const dataFin = {
            email:user.email,
            password:user.password
        }

        if (user.email == "" || user.password == "") {
            alert('please fill out all fields');
        }

        else {

        axios.post("https://react-plants.herokuapp.com/login.php", dataFin)
        .then((result)=> {
            if (result.data.status == 'invalid') {
                alert('Invalid User');
            }
            my_if: if (result.data.status == 'wrong password') {
                alert('incorrect password');
                break my_if;

            }
            if (result.data.status == 'no user found') {
                alert('no users with this email were found, please register first');
            }
            if (result.data.Status == 'GOOD') {
                window.localStorage.setItem('email', result.data.email);
                window.localStorage.setItem('first_name', result.data.first_name);
                window.localStorage.setItem('user_id', result.data.user_id);
                navigate('/home');
            }
        })
    }

    }

    const inputs = document.querySelectorAll('.input');

    function focusFunc() {
        let parent = this.parentNode.parentNode;
        parent.classList.add('focus');
    }

    function blurFunc() {
        let parent = this.parentNode.parentNode;
        if(this.value == "") {
            parent.classList.remove('focus');
        }
    }

    inputs.forEach(input => {
        input.addEventListener('focus', focusFunc);
        input.addEventListener('blur', blurFunc);
    });

    const [auth,setAuth] = useState("");
    useEffect(()=> {
        var auth = localStorage.getItem('first_name');
        setAuth(auth);
    })

    const LogOut = () => {
        localStorage.clear();
        navigate('/login');
    }

    if (auth === null) {
    return (
        <div className="main-box">
        <div className="form-control1">
        <form onSubmit={submitForm}>
        <div>
            <h1>LOGIN</h1>
        </div>

        <div className="input-div two">
            <div className="i">
                <FiMail classname='i'/>
            </div>
            <div>
                <h5>Email</h5>
                <input type="text" name="email" className="input" 
                onChange={handleChange} value={user.email} />
            </div>
        </div>

        <div className="input-div two">
            <div className="i">
                <FiKey classname='i'/>
            </div>
            <div>
                <h5>Password</h5>
                <input type="password" name="password" className="input" 
                onChange={handleChange} value={user.password} />
            </div>
        </div>

            
            <div>
                <input type="submit" name="submit" value="Login" className="btn" />
            </div>
            </form>
            </div>
        </div>
        
    )
    }

    else {
        return (
            <div className = 'big-text-main'>
                <h3 >{auth.toUpperCase()}, </h3> 
                <h3>YOU ARE ALREADY LOGGED IN. </h3>
                <br></br>
                <h3 className='motion' onClick={LogOut}>LOGOUT HERE</h3>
            </div>
        )
    }
}


export default Login;