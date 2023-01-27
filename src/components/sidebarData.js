import React from 'react'
import { FiHome } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";

export const sidebarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <FiHome />,
        className: 'sidebar-text'
    },
    {
        title: 'Login',
        path: '/login',
        icon: <FiLogIn />,
        className: 'sidebar-text'
    },
    {
        title: 'Sign Up',
        path: '/signup',
        icon: <FiUserPlus />,
        className: 'sidebar-text'
    }
]