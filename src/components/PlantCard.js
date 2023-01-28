import React from 'react'
import './PlantCard.css'
import { useState, useEffect } from "react";
import axios from 'axios'
import GenInfo from './GenInfo';
import PlantImage from './PlantImage'
import PlantWater from './PlantWater';
import Small from './Small';
import WateredButton from './WateredButton';

export default function PlantCard({common_name, scientific_name, plant_family, img_url, plant_id, date_last_watered, effect}) {
    return (
        <div>
        
        <div className='mainCard' onClick={() => {console.log(common_name)}}>

        <div className='noCut'>
            <PlantImage img_url={img_url} />
        </div>
    

            <GenInfo common_name={common_name} scientific_name={scientific_name} plant_family={plant_family} />
            
            <PlantWater date_last_watered={date_last_watered} plant_id={plant_id}/>
            <Small date_last_watered={date_last_watered} />
            <WateredButton plant_id={plant_id} effect={effect} date_last_watered={date_last_watered}/>

        </div>
        </div>

    )
}
