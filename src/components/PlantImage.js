import React from 'react'
import './PlantImage.css'
import { useState, useEffect } from "react";
import axios from 'axios'
import Tilt from 'react-parallax-tilt';


function PlantImage({img_url}) {
    return (
        
        <div className='cardImage'>
            <Tilt className = "tilty" tiltMaxAngleY='14' tiltMaxAngleX='14' glareEnable='true' glareMaxOpacity={0.3} glareColor="#ffffff" glarePosition='all' glareBorderRadius='15px'>
            <img className='actualImage' src={img_url}></img>
            </Tilt>
        </div>
    )
}


export default PlantImage;