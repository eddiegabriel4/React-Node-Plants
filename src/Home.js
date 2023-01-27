import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './Home.css'
import AddPlant from './AddPlant';
import Modal from "./components/Modal";
import axios from 'axios';
import PlantCard from './components/PlantCard';
import { Card, Row, Col, Container } from "react-bootstrap";
import Tilt from 'react-parallax-tilt';
import Logout from './components/Logout';



const Home=()=> {

    const [auth,setAuth] = useState("");
    const [isOpen, setIsOpen] = useState(false)
    const [allPlants, setAllPlants] = useState([]);

    let navigate = useNavigate()
    useEffect(()=> {
        var auth = localStorage.getItem('first_name');
        setAuth(auth);
        getAllPlants();
        console.log(allPlants)
    },[])

    const getAllPlants = () => {
        var user_id = localStorage.getItem('user_id')
        const dataFin = {
            user_id:user_id
        }

        axios.post("https://react-plants.herokuapp.com/getPlants.php", dataFin)
        .then((result)=> {

            setAllPlants(result.data);

        })

    }

    const LogOut = () => {
        localStorage.clear();
        navigate('/login')
    }

    const gogolog= () => {
        navigate('/login')
    }

    const gogosign= () => {
        navigate('/signup')
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const getPlantCards = (plants) => {

        let cols = []
        
        for (let i = 0; i < plants.length; i++) {
            cols.push(
                <Col className='ok' xxl='4' xl='6' lg='6' md='12' sm='12'>
                        <PlantCard common_name={plants[i].common_name} scientific_name={plants[i].scientific_name} plant_family={plants[i].plant_family} img_url={plants[i].img_url} date_last_watered={plants[i].date_last_watered} plant_id={plants[i].id} />
                </Col>
            )
        }

        return (
            <div>
                <Container fluid>
                    <Row>
                        {cols}
                    </Row>
                </Container>
            </div>
        )
    }



    if (auth === null) {
        
        return (
            <div className = 'big-text-main'>
                <h2>HEY,</h2> 
                <br></br>
                <h3 >LOOKS LIKE YOU STILL NEED TO </h3>
                <br></br>
                <h3 className='motion' onClick={gogolog}>LOGIN</h3>
                <br></br>
                <h3>OR</h3>
                <br></br>
                <h3 className='motion' onClick={gogosign}>SIGN UP</h3>
            </div>
        )
    }


    else {
    return (
        <div>
        <div >
                <Logout click={LogOut}/>
                <AddPlant onClick={openModal}/>
        </div>
        <div className='welcome-header'>
            <div className='big-text-official'>
                <h3>HI, {auth.toUpperCase()}</h3>
            </div>
            <div className='big-text-sub'>
                <h2>WELCOME TO YOUR GARDEN</h2>
            </div>
            <Modal open = {isOpen} onClose = {closeModal}/>

            {(allPlants.length > 0) && getPlantCards(allPlants)}
            <p className='p1'>built by eddie</p>
            
        </div>
        </div>
    )
    }
}


export default Home;


