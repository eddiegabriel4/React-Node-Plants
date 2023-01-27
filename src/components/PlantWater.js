import React from 'react'
import './PlantWater.css'
import { useState, useEffect } from "react";
import axios from 'axios'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'




function PlantWater({date_last_watered, plant_id}) {

    
    

    function getDays() {
        
        var x = String(date_last_watered).replace(/-/g, "/")
        var today = new Date();
        var day_watered = new Date(date_last_watered);
        var Difference_In_Time = today.getTime() - day_watered.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        var cssClass = ""
        if ((Difference_In_Days < 7) & (Difference_In_Days >= 3)) {
            cssClass = "yellow"
            
        }
        if (Difference_In_Days >= 7) {
            cssClass = "red"
            
        }
        if (Difference_In_Days < 3) {
            cssClass = "green"
        }
        return cssClass
    }

    function getMessage() {

        var x = String(date_last_watered).replace(/-/g, "/")
        var today = new Date();
        var day_watered = new Date(date_last_watered);
        var Difference_In_Time = today.getTime() - day_watered.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        var message = ""
        if ((Difference_In_Days < 7) & (Difference_In_Days >= 3)) {
            
            message = "Getting thirsty"
        }
        if (Difference_In_Days >= 7) {
            
            message ="Needs water"
        }
        if (Difference_In_Days < 3) {
            message = "Freshly watered"
        }
        return message
        
    }

    


    return (
        <div className='waterMain'>
            <Tooltip anchorId={plant_id} place="bottom"/>
          
            <span id={plant_id} data-tooltip-content={getMessage()} className={getDays()}></span>
            

            
            

        </div>
    )
}


export default PlantWater;