import './PlantSearch.css'
import { useState, useEffect } from "react";
import React from 'react'
import axios from 'axios';
import { RiPlantLine } from "react-icons/ri";
import { FiX } from "react-icons/fi";
import validator from 'validator'

export default function PlantSearch({placeHolder, handlePlantChange, showImage, imageLink, plantChosen, setPlantChosen, closeModal}) {

    const [plantData, setplantData] = useState({
        common_name:"",
        scientific_name:"",
        family:"",
        img_url:""
    })

    const [dateWatered, setDateWatered] = useState(null);

    const [searchResults, setSearchResults] = useState([]);

    const [inputTimer, setInputTimer] = useState(null);

    const [searchVal, setSearchVal] = useState("")

    

    const searchChange = async (e) => {
        setSearchVal(e.target.value);
        clearTimeout(inputTimer);

        let timeout = setTimeout(() => {
            if (e.target.value.length >= 1 & plantChosen == false) {
            axios.get('https://node-plants.herokuapp.com/testAPI?q=' + e.target.value)
            .then((res) => {
                setSearchResults(res.data.data);
                console.log(res.data.data);
            });
        }
        else {
            setSearchResults([]);
        }
        }, 200);
        setInputTimer(timeout);
    
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

    const getPlantInfo = (value) => {
        setSearchVal("")
        setSearchResults([])
        const tempPlant = {
            common_name:value.common_name,
            scientific_name:value.scientific_name,
            family:value.family,
            img_url:value.image_url
        }
        handlePlantChange(tempPlant)
        setplantData(tempPlant)
        setPlantChosen(true);
        console.log(tempPlant);
    }

    const removeChosenPlant = () => {
        setPlantChosen(false);
        const tempPlant = {
            common_name:"",
            scientific_name:"",
            family:"",
            img_url:""
        }
        setplantData(tempPlant)
        handlePlantChange(tempPlant)
        showImage(false)
        setDateWatered(null)
    }

    const changeDate = (e) => {
        setDateWatered(e.target.value);
    }

    const submitPlantData = (e) => {
        e.preventDefault();
        const dataFin = {
            common_name:plantData.common_name,
            scientific_name:plantData.scientific_name,
            family:plantData.family,
            img_url:plantData.img_url,
            date:dateWatered
        }
        
        axios.post("https://react-plants.herokuapp.com/insertPlant.php", dataFin)
        .then((result)=> {

            if (result.status === 200) {
                var plant_id = result.data
                var user_id = localStorage.getItem('user_id');
                insertDbRelation(user_id, plant_id)
                closeModal()
                removeChosenPlant()
                /* figure out how to refresh home after adding new plant
                so it shows up */
            }
            else {
                alert("could not connect to database")
            }
            
        })
        

    }

    function insertDbRelation(user_id, plant_id) {
        const dataFin = {
            user_id:user_id,
            plant_id:plant_id
        }
        axios.post("https://react-plants.herokuapp.com/insertRelation.php", dataFin)
        .then((result)=> {

            window.location.reload();
        })
    }

  return (
        <>
        {(validator.isDate(dateWatered) && plantChosen) && (
            <div>
                <input value="Add Plant" name="add plant" className="btnng" onClick={submitPlantData}/>
            </div>
        )}
        {plantChosen && (
            
            <div className='all'>
                <div className='datesection'>
                <h3>Enter date last watered</h3>
                <input className='date' value = {dateWatered} onChange={changeDate} type='date'></input>
                </div>
            <div className='selectedPlant'>
                <div className='selectedPlantText'>
                <h3>Selected Plant</h3>
                <p>{plantData.common_name}</p>
                <p className='scientific'>{plantData.scientific_name}</p>
                
                <input value="Clear" name="clear" className="btnn" onClick={removeChosenPlant}/>
                </div>
            </div>
            </div>
        )}
        <div className='search'>

            <div className='searchInput'>
            <div className='i'>
                <RiPlantLine className='i'/>
            </div>
            <div>
                <input className='input' spellcheck='false' type='text' placeholder={placeHolder} onChange = {searchChange} value = {searchVal} />
            </div>
            </div>
    
        <div className='dataResult'>
            {searchResults.map((value, key) => {
                if (value.common_name != null) {
                return (<a className='dataItem' onClick={() => {
                    if (!plantChosen) {
                        getPlantInfo(value)
                    }
                }} target='_blank' onMouseEnter={() => {
                    if (!plantChosen) {
                        showImage(true)
                        imageLink(value.image_url)}}} onMouseLeave={() => { 
                    if (!plantChosen) {
                        showImage(false)
                    }}}>
                    <p>{value.common_name}</p>
                    </a>
                );}
            })}
        </div>
        
        
    </div>
    </>
  )
}
