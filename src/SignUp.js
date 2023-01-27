import { useState, useEffect } from "react";
import axios from 'axios'
import{useNavigate} from 'react-router-dom'
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './SignUp.css';
import { FiMail } from "react-icons/fi";
import { FiKey } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";



const Register=()=> {
    let history = useNavigate();
    const [data, setData] = useState({
        first_name:"",
        last_name:"",
        email:"",
        password:""
    })

    const [auth,setAuth] = useState("");

    useEffect(()=> {
        var auth = localStorage.getItem('first_name');
        setAuth(auth);
    })

    const handleChange=(e)=>{
        setData({...data, [e.target.name]: e.target.value })

    }

    function newAccountNavigate (datas) {
        const loginInfo = {
            email:datas.email,
            password:datas.password
        }

         axios.post("https://react-plants.herokuapp.com/login.php", loginInfo)
        .then((result)=> {
            window.localStorage.setItem('email', result.data.email);
            window.localStorage.setItem('first_name', result.data.first_name);
            window.localStorage.setItem('user_id', result.data.user_id);
            history('/home');
        })
    }

    const submitForm=(e)=>{
        e.preventDefault();
        const dataFin = {
            first_name:data.first_name,
            last_name:data.last_name,
            email:data.email,
            password:data.password
        }

        if (data.first_name === "" || data.last_name === "" || data.email === "" || data.password === "") {
            alert('please fill out all fields');
        }
        if (!data.email.includes("@")) {
            alert('please enter a valid email')
        }

        else {

        axios.post("https://react-plants.herokuapp.com/insert.php", dataFin)
        .then((result)=> {
            if (result.data.status === 'invalid') {
                alert('Invalid User');
            }
            if (result.data.status === 'valid') {
                alert('account successfully created');
                newAccountNavigate(dataFin);
            }
            if (result.data.status === 'name taken') {
                alert('this first and last name combination has already been taken');
            }
            if (result.data.status === 'email taken') {
                alert('this email is already in use');
            }
        })
    }

    }

    const inputs = document.querySelectorAll('input');

    function focusFunc() {
        let parent = this.parentNode.parentNode;
        parent.classList.add('focus');
    }

    function blurFunc() {
        let parent = this.parentNode.parentNode;
        if(this.value === "") {
            parent.classList.remove('focus');
        }
    }

    inputs.forEach(input => {
        input.addEventListener('focus', focusFunc);
        input.addEventListener('blur', blurFunc);
    });

    return (
        <div className="main-box">
        <div className="form-control1">
        <form onSubmit={submitForm}>
        <div>
            <h1>SIGN UP</h1>
        </div>
        <div class="input-div one">
            <div class="i">
                <FiEdit2 classname='i'/>
            </div>
            <div>
                <h5>First Name</h5>
                <input type="text" name="first_name" className="input" 
                onChange={handleChange} value={data.first_name} />
            </div>
        </div>
        <div className="input-div two">
            <div className="i">
                <FiEdit2 classname='i'/>
            </div>
            <div>
                <h5>Last Name</h5>
                <input type="text" name="last_name" className="input" 
                onChange={handleChange} value={data.last_name} />
            </div>
        </div>

        <div className="input-div two">
            <div className="i">
                <FiMail classname='i'/>
            </div>
            <div>
                <h5>Email</h5>
                <input type="text" name="email" className="input" 
                onChange={handleChange} value={data.email} />
            </div>
        </div>

        <div className="input-div two">
            <div className="i">
                <FiKey classname='i'/>
            </div>
            <div>
                <h5>Password</h5>
                <input type="password" name="password" className="input" 
                onChange={handleChange} value={data.password} />
            </div>
        </div>

            
            <div>
                <input type="submit" name="submit" value="Sign Up" className="btn" />
            </div>
                
            <div className='login-redirect'>
                <p>Already have an account?</p>
                <Link to='/login' className="newbtn"><p>Login here</p></Link>
            </div>
            </form>
            </div>
        </div>
    )
}


export default Register