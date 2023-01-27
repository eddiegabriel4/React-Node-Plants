import React from 'react'
import './GenInfo.css'
import { useState, useEffect } from "react";
import axios from 'axios'


function GenInfo({common_name, scientific_name, plant_family}) {
    return (
        <div className='infoMain'>
            <h3>{common_name}</h3>
            <div className='secondaryInfo'>
                <p className='scienceName'>{scientific_name}</p>
                <p className='family'>The {plant_family} family</p>
            </div>
        </div>
    )
}


export default GenInfo;