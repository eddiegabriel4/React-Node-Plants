import { motion } from "framer-motion"
import { useState } from "react";
import axios from 'axios'
import{useNavigate} from 'react-router-dom'
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './AddPlant.css'
import { FiPlus } from "react-icons/fi";


const AddPlant=({onClick})=> {


    return (
        <div className="example-container" >
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }} onClick={onClick}>
            <section className = "message">
                <FiPlus className="plus"/>
                <h3>Add Plant</h3> 
            </section> 
        </motion.div>
      </div>
    )
}

export default AddPlant;
