import React from 'react'
import './Logout.css'

export default function Logout({click}) {
  return (
    <div className='log'>
        <input type="submit" name="submit" value="Logout" className="btn4" onClick={click}/>
    </div>
  )
}
