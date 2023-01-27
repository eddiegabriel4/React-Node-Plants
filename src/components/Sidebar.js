import React from 'react'
import { FiMenu, FiX } from "react-icons/fi";
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from "react";
import {sidebarData} from "./sidebarData";
import './sidebar.css'


function Sidebar() {
    const [sidebar, setSidebar] = useState(false)

    /* ! toggle the sidebar boolean variable */
    const showSidebar = () => setSidebar(!sidebar)
    return (
    <>
    <div className='sidebar'>
        <Link to="#" className='menu-bars'>
            <FiMenu onClick={showSidebar} />
        </Link>
    </div>
    {/*line below - if sidebar is true (showing) then side-menu active class, otherwise just side-menu class*/} 
    <nav className={sidebar ? 'side-menu active' : 'side-menu'}>
        <ul className='sidebar-items' onClick={showSidebar}>
            <li className='sidebar-toggle'>
                <Link to='#' className='sidebar-x'>
                    <FiX />
                </Link>
            </li>
            {sidebarData.map((item, index) => {
                return (
                    <li key={index} className={item.className}>
                        <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    </nav>
    </>
  )
}

export default Sidebar;