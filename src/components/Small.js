import React from 'react'
import './Small.css'


export default function Small({date_last_watered}) {

  function getDate() {

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    if (String(month).length === 1) {
      month = "0" + month
    }
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    if (currentDate === date_last_watered) {
      return "Today"
    }
    else {
      return date_last_watered
    }

  }

  return (
        <div className='dateText'>
                <p>Last watered</p>
                <p>{getDate()}</p>
        </div>
  )
}
