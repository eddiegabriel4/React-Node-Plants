import React from 'react'
import { useState } from "react";
import './Modal.css'
import { FiX } from "react-icons/fi";
import ReactDom from 'react-dom';
import PlantSearch from './PlantSearch';

export default function Modal({open, onClose}) {

    var placeholder = "Search for a plant"

    const [imageShown, setImageShown] = useState(false);

    const [imageLink, setImageLink] = useState(null);

    const [plantChosen, setPlantChosen] = useState(false);

    const [PlantData, setPlantData] = useState({
        common_name:"",
        scientific_name:"",
        family:"",
        img_url:""
    })

    const handlePlantSelection = (plant) => {
        setPlantData({common_name: plant.common_name,
                      scientific_name: plant.scientific_name,
                      family: plant.family});
    }

    if (PlantData.common_name !== "") {
        placeholder = "Clear to search"
    }


    if (!open) return null

    return ReactDom.createPortal(
        <>
        <div className="modalBackground">
        <div className='modalStyle'>
            <div className="Xicon">
                <FiX onClick = {() => {
                    onClose()
                    const tempPlant = {
                        common_name:"",
                        scientific_name:"",
                        family:"",
                        img_url:""
                    }
                    setPlantChosen(false)
                    setPlantData(tempPlant)
                    setImageLink(null)}}/>
            </div>
            <PlantSearch placeHolder={placeholder} handlePlantChange={handlePlantSelection} showImage={setImageShown} imageLink={setImageLink} plantChosen={plantChosen} setPlantChosen={setPlantChosen} closeModal={onClose}/>
            { imageShown && (
            <div>
            <img className='plantImage' src={imageLink}></img>
            </div>
            )}
        </div>
        </div>
        </>,
        document.getElementById('portal')
    )
}
