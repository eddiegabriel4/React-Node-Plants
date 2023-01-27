import React from 'react'
import axios from 'axios'
import "./WateredButton.css"
import { FiDroplet } from "react-icons/fi";

export default function WateredButton({plant_id, effect, date_last_watered}) {
  
    function WaterPlant() {
        
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

       
        let currentDate = `${year}-${month}-${day}`;
        
        const dataFin = {
            id:plant_id,
            date:currentDate
        }

        axios.post("https://react-plants.herokuapp.com/updateWater.php", dataFin)
        .then((result)=> {

            window.location.reload();
  
        })        

        
    }
  
    return (
    <div className="OK">
        <div className='wrapper' onClick={WaterPlant}>
        <FiDroplet className='icon'/>
        <input  name="clear" className="btnn2" />
        </div>
    </div>
  )
}
